use crate::ColorScheme;

pub fn generate(light_scheme: &ColorScheme, dark_scheme: &ColorScheme) -> String {
    let light_fg = light_scheme.default_fg.hex();
    let light_bg = light_scheme.default_bg.hex();
    let dark_fg = dark_scheme.default_fg.hex();
    let dark_bg = dark_scheme.default_bg.hex();
    format!(
        r#"@media (prefers-color-scheme: light) {{
    body {{ color: {light_fg}; background: {light_bg}; }}
}}
@media (prefers-color-scheme: dark) {{
    body {{ color: {dark_fg}; background: {dark_bg}; }}
}}
"#
    )
}
