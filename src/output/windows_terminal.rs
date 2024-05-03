use crate::ColorScheme;

pub fn generate(light_scheme: &ColorScheme, dark_scheme: &ColorScheme) -> String {
    let light_bg = light_scheme.default_bg.hex();
    let light_fg = light_scheme.default_fg.hex();
    let light_visual = light_scheme.get_color("vimBgVisual").hex();
    let light_black = light_scheme.get_color("black").hex();
    let light_dark_gray = light_scheme.get_color("darkGray").hex();
    let light_gray = light_scheme.get_color("gray").hex();
    let light_white = light_scheme.get_color("white").hex();
    let light_red = light_scheme.get_color("red").hex();
    let light_yellow = light_scheme.get_color("yellow").hex();
    let light_green = light_scheme.get_color("green").hex();
    let light_cyan = light_scheme.get_color("cyan").hex();
    let light_blue = light_scheme.get_color("blue1").hex();
    let light_purple = light_scheme.get_color("purple1").hex();
    let dark_bg = dark_scheme.default_bg.hex();
    let dark_fg = dark_scheme.default_fg.hex();
    let dark_visual = dark_scheme.get_color("vimBgVisual").hex();
    let dark_black = dark_scheme.get_color("black").hex();
    let dark_dark_gray = dark_scheme.get_color("darkGray").hex();
    let dark_gray = dark_scheme.get_color("gray").hex();
    let dark_white = dark_scheme.get_color("white").hex();
    let dark_red = dark_scheme.get_color("red").hex();
    let dark_yellow = dark_scheme.get_color("yellow").hex();
    let dark_green = dark_scheme.get_color("green").hex();
    let dark_cyan = dark_scheme.get_color("cyan").hex();
    let dark_blue = dark_scheme.get_color("blue1").hex();
    let dark_purple = dark_scheme.get_color("purple1").hex();

    format!(
        r#"{{
    "name": "Candy Paper Light",
    "background": "{light_bg}",
    "foreground": "{light_fg}",
    "cursorColor": "{light_fg}",
    "selectionBackground": "{light_visual}",
    "black": "{light_black}",
    "brightBlack": "{light_dark_gray}",
    "white": "{light_gray}",
    "brightWhite": "{light_white}",
    "red": "{light_red}",
    "brightRed": "{light_red}",
    "yellow": "{light_yellow}",
    "brightYellow": "{light_yellow}",
    "green": "{light_green}",
    "brightGreen": "{light_green}",
    "cyan": "{light_cyan}",
    "brightCyan": "{light_cyan}",
    "blue": "{light_blue}",
    "brightBlue": "{light_blue}",
    "purple": "{light_purple}",
    "brightPurple": "{light_purple}"
}},
{{
    "name": "Candy Paper Dark",
    "background": "{dark_bg}",
    "foreground": "{dark_fg}",
    "cursorColor": "{dark_fg}",
    "selectionBackground": "{dark_visual}",
    "black": "{dark_black}",
    "brightBlack": "{dark_dark_gray}",
    "white": "{dark_gray}",
    "brightWhite": "{dark_white}",
    "red": "{dark_red}",
    "brightRed": "{dark_red}",
    "yellow": "{dark_yellow}",
    "brightYellow": "{dark_yellow}",
    "green": "{dark_green}",
    "brightGreen": "{dark_green}",
    "cyan": "{dark_cyan}",
    "brightCyan": "{dark_cyan}",
    "blue": "{dark_blue}",
    "brightBlue": "{dark_blue}",
    "purple": "{dark_purple}",
    "brightPurple": "{dark_purple}"
}},
"#
    )
}
