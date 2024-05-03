use crate::Color;

pub fn generate(light_scheme: &crate::ColorScheme, dark_scheme: &crate::ColorScheme) -> String {
    let light_bg = color2number(&light_scheme.default_bg);
    let light_fg = color2number(&light_scheme.default_fg);
    let light_visual = color2number(&light_scheme.get_color("vimBgVisual"));
    let light_blue = color2number(&light_scheme.get_color("blue1"));
    let dark_bg = color2number(&dark_scheme.default_bg);
    let dark_fg = color2number(&dark_scheme.default_fg);
    let dark_visual = color2number(&dark_scheme.get_color("vimBgVisual"));
    let dark_blue = color2number(&dark_scheme.get_color("blue1"));
    format!(
        r#"[Colors]
InverseCursor=0
ThemedCursor=0
InverseSelection=1
BackColor={light_bg}
BackColor2={light_bg}
ForeColor={light_fg}
MarkColor={light_visual}
CursorColor={light_fg}
CursorText={light_fg}
ColorFilter1=>Directory
ColorFilter1Color={light_blue}
ColorFilter1ColorDark={dark_blue},{light_blue}
[ColorsDark]
InverseCursor=0
ThemedCursor=0
InverseSelection=1
BackColor={dark_bg}
BackColor2={dark_bg}
ForeColor={dark_fg}
MarkColor={dark_visual}
CursorColor={dark_fg}
CursorText={dark_fg}
"#
    )
}

fn color2number(color: &Color) -> u32 {
    let rgb = &color.rgb;
    (rgb.b as u32) << 16 | (rgb.g as u32) << 8 | rgb.r as u32
}

