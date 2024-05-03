use std::fmt::Write;

use crate::ColorScheme;

const FIXED_PART: &'static str = r#"# Candy Paper

Light and dark color schemes for some applications:

* Vim
* Jetbrains' IDE
* Total Commander
* Windows Terminal
* MinTTY
* ...

"#;

pub fn generate(light_scheme: &ColorScheme, dark_scheme: &ColorScheme) -> String {
    let mut s = String::from(FIXED_PART);

    writeln!(s, "## Light Scheme Preview").unwrap();
    generate_basic_colors(&mut s, light_scheme);
    generate_vim_groups(&mut s, light_scheme);

    writeln!(s, "## Dark Scheme Preview").unwrap();
    generate_basic_colors(&mut s, dark_scheme);
    generate_vim_groups(&mut s, dark_scheme);

    s
}

fn generate_basic_colors(s: &mut String, scheme: &ColorScheme) {
    writeln!(s, "### Basic Colors").unwrap();
    writeln!(s, "<div style=\"background: {}\">", scheme.default_bg.hex()).unwrap();
    writeln!(
        s,
        r#"<p style="color: {}">{}</p>"#,
        scheme.default_fg.hex(),
        scheme.default_fg
    )
    .unwrap();
    writeln!(
        s,
        r#"<p style="color: {}">{}</p>"#,
        scheme.default_fg.hex(),
        scheme.default_bg
    )
    .unwrap();
    for color in scheme.basic_colors.iter().skip(1) {
        writeln!(s, r#"<p style="color: {}">{}</p>"#, color.hex(), color).unwrap();
    }
    writeln!(s, "</div>\n").unwrap();
}

fn generate_vim_groups(s: &mut String, scheme: &ColorScheme) {
    writeln!(s, "### Vim Groups").unwrap();
    writeln!(
        s,
        r#"<div style="color:{}; background: {}">"#,
        scheme.default_fg.hex(),
        scheme.default_bg.hex()
    )
    .unwrap();
    for group in scheme.vim_groups.iter() {
        writeln!(s, r#"<p style="{}">{}</p>"#, group.html_style(), group).unwrap();
    }
    writeln!(s, "</div>\n").unwrap();
}
