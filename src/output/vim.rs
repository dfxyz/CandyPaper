use std::fmt::Write;

use chrono::Datelike;

use crate::{ColorScheme, VimGroup};

pub fn generate(now: &chrono::DateTime<chrono::Local>, light_scheme: &ColorScheme, dark_scheme: &ColorScheme) -> String {
    let mut s = String::new();

    writeln!(
        s,
        r#"" Color Scheme: Candy Paper
" Author: DF_XYZ <dfxyz1@gmail.com>
" License: MIT
" Source: http://github.com/dfxyz/CandyPaper.vim"
" Last Modified: {}-{:02}-{:02}

hi clear
let g:colors_name = "CandyPaper"
"#,
        now.year(),
        now.month(),
        now.day()
    )
    .unwrap();

    writeln!(s, r#"if &bg == "light""#).unwrap();
    for group in &light_scheme.vim_groups {
        generate_group_setting(&mut s, group);
    }
    writeln!(s, "else").unwrap();
    for group in &dark_scheme.vim_groups {
        generate_group_setting(&mut s, group);
    }
    writeln!(s, "endif").unwrap();

    s
}

fn generate_group_setting(s: &mut String, group: &VimGroup) {
    let name = group.name;

    writeln!(s, "  hi clear {name}").unwrap();
    write!(s, "  hi {name}").unwrap();
    if let Some(fg) = &group.fg {
        write!(s, " guifg={}", fg.hex()).unwrap();
    }
    if let Some(bg) = &group.bg {
        write!(s, " guibg={}", bg.hex()).unwrap();
    }
    if let Some(gui) = &group.gui {
        write!(s, " gui={}", gui).unwrap();
    }
    writeln!(s).unwrap();
}
