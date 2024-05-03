use crate::ColorScheme;

pub fn generate(scheme: &ColorScheme) -> String {
    let bg = scheme.default_bg.hex();
    let fg = scheme.default_fg.hex();
    let black = scheme.get_color("black").hex();
    let dark_gray = scheme.get_color("darkGray").hex();
    let gray = scheme.get_color("gray").hex();
    let white = scheme.get_color("white").hex();
    let red = scheme.get_color("red").hex();
    let yellow = scheme.get_color("yellow").hex();
    let green = scheme.get_color("green").hex();
    let cyan = scheme.get_color("cyan").hex();
    let blue = scheme.get_color("blue1").hex();
    let purple = scheme.get_color("purple1").hex();

    format!(
        r#"BackgroundColour={bg}
ForegroundColour={fg}
CursorColour={fg}
Black={black}
BoldBlack={dark_gray}
White={gray}
BoldWhite={white}
Red={red}
BoldRed={red}
Yellow={yellow}
BoldYellow={yellow}
Green={green}
BoldGreen={green}
Cyan={cyan}
BoldCyan={cyan}
Blue={blue}
BoldBlue={blue}
Magenta={purple}
BoldMagenta={purple}
"#
    )
}
