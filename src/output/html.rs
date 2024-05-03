use std::fmt::Write;

use crate::ColorScheme;

pub fn generate(light_scheme: &ColorScheme, dark_scheme: &ColorScheme) -> String {
    let mut s = String::new();
    writeln!(
        s,
        r#"<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Candy Paper Scheme Preview</title>
</head>
<body>
<h1>Candy Paper Scheme Preview</h2>"#
    )
    .unwrap();

    writeln!(s, "<h1>Light Scheme</h1>").unwrap();
    generate_scheme_preview(&mut s, light_scheme);

    writeln!(s, "<h1>Dark Scheme</h1>").unwrap();
    generate_scheme_preview(&mut s, dark_scheme);

    writeln!(s, "</body>").unwrap();
    writeln!(s, "</html>").unwrap();

    s
}

fn generate_scheme_preview(buffer: &mut String, scheme: &ColorScheme) {
    generate_basic_colors(buffer, scheme);
    generate_vim_groups(buffer, scheme);
}

fn generate_basic_colors(s: &mut String, scheme: &ColorScheme) {
    writeln!(s, "<h3>Basic Colors</h3>").unwrap();
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
    writeln!(s, "</div>").unwrap();
}

fn generate_vim_groups(s: &mut String, scheme: &ColorScheme) {
    writeln!(s, "<h3>Vim Groups</h3>").unwrap();
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
    writeln!(s, "</div>").unwrap();
}
