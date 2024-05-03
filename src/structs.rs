use std::{collections::HashMap, fmt::Display};

#[derive(Clone)]
pub struct HSV {
    pub h: f32, // [0, 360)
    pub s: f32, // [0, 100]
    pub v: f32, // [0, 100]
}
impl HSV {
    pub fn new(h: f32, s: f32, v: f32) -> Self {
        Self { h, s, v }
    }
}
impl Display for HSV {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "({}, {}, {})", self.h, self.s, self.v)
    }
}

#[derive(Clone)]
pub struct RGB {
    pub r: u8, // [0, 255]
    pub g: u8, // [0, 255]
    pub b: u8, // [0, 255]
}
impl RGB {
    pub fn from_hsv(h: f32, s: f32, v: f32) -> Self {
        let s = s / 100.0;
        let v = v / 100.0;

        let c = v * s;
        let x = c * (1.0 - ((h / 60.0) % 2.0 - 1.0).abs());
        let m = v - c;

        match h {
            _ if h < 60.0 => Self {
                r: ((c + m) * 255.0).round() as u8,
                g: ((x + m) * 255.0).round() as u8,
                b: (m * 255.0).round() as u8,
            },
            _ if h < 120.0 => Self {
                r: ((x + m) * 255.0).round() as u8,
                g: ((c + m) * 255.0).round() as u8,
                b: (m * 255.0).round() as u8,
            },
            _ if h < 180.0 => Self {
                r: (m * 255.0).round() as u8,
                g: ((c + m) * 255.0).round() as u8,
                b: ((x + m) * 255.0).round() as u8,
            },
            _ if h < 240.0 => Self {
                r: (m * 255.0).round() as u8,
                g: ((x + m) * 255.0).round() as u8,
                b: ((c + m) * 255.0).round() as u8,
            },
            _ if h < 300.0 => Self {
                r: ((x + m) * 255.0).round() as u8,
                g: (m * 255.0).round() as u8,
                b: ((c + m) * 255.0).round() as u8,
            },
            _ if h < 360.0 => Self {
                r: ((c + m) * 255.0).round() as u8,
                g: (m * 255.0).round() as u8,
                b: ((x + m) * 255.0).round() as u8,
            },
            _ => panic!("invalid hsv; h={}", h),
        }
    }

    pub fn hex(&self) -> String {
        format!("#{:02X}{:02X}{:02X}", self.r, self.g, self.b)
    }

    pub fn hex0(&self) -> String {
        format!("{:02X}{:02X}{:02X}", self.r, self.g, self.b)
    }
}
impl From<&HSV> for RGB {
    fn from(hsv: &HSV) -> Self {
        Self::from_hsv(hsv.h, hsv.s, hsv.v)
    }
}
impl Display for RGB {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "({}, {}, {})", self.r, self.g, self.b)
    }
}

#[derive(Clone)]
pub struct Color {
    pub name: &'static str,
    pub hsv: HSV,
    pub rgb: RGB,
}
impl Color {
    pub fn new(name: &'static str, hsv: HSV) -> Self {
        let rgb = RGB::from(&hsv);
        Self { name, hsv, rgb }
    }

    pub fn hex(&self) -> String {
        self.rgb.hex()
    }

    pub fn hex0(&self) -> String {
        self.rgb.hex0()
    }
}
impl Display for Color {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}: hsv={}; rgb={}; hex={}",
            self.name,
            self.hsv,
            self.rgb,
            self.hex(),
        )
    }
}

pub struct VimGroup {
    pub name: &'static str,
    pub fg: Option<Color>,
    pub bg: Option<Color>,
    pub gui: Option<&'static str>,
}
impl VimGroup {
    pub fn new(name: &'static str) -> Self {
        Self {
            name,
            fg: None,
            bg: None,
            gui: None,
        }
    }

    pub fn html_style(&self) -> String {
        let mut s = String::new();
        if let Some(fg) = &self.fg {
            s += &format!("color: {};", fg.hex());
        }
        if let Some(bg) = &self.bg {
            s += &format!("background-color: {};", bg.hex());
        }
        s
    }
}
impl Display for VimGroup {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "[{}]", self.name)?;
        match &self.fg {
            Some(fg) => {
                writeln!(f, "FG: {}", fg)?;
            }
            None => {
                writeln!(f, "FG: None")?;
            }
        }
        match &self.bg {
            Some(bg) => {
                writeln!(f, "BG: {}", bg)?;
            }
            None => {
                writeln!(f, "BG: None")?;
            }
        }
        match &self.gui {
            Some(gui) => {
                writeln!(f, "GUI: {}", gui)?;
            }
            None => {}
        }
        Ok(())
    }
}

pub struct IdeaColor {
    pub name: &'static str,
    pub color: Option<Color>, // may be None to clear the color
}
impl IdeaColor {
    pub fn new(name: &'static str) -> Self {
        Self { name, color: None }
    }
}

pub const IDEA_UNDERLINE: u8 = 1;
pub const IDEA_UNDERWAVE: u8 = 2;
pub const IDEA_STRIKEOUT: u8 = 3;
pub const IDEA_DOTTEDLINE: u8 = 5;

pub struct IdeaAttr {
    pub name: &'static str,
    pub fg: Option<Color>,
    pub bg: Option<Color>,
    pub stripe: Option<Color>,
    pub effect_type: Option<u8>,
    pub effect_color: Option<Color>,
    pub use_base: bool,
}
impl IdeaAttr {
    pub fn new(name: &'static str) -> Self {
        Self {
            name,
            fg: None,
            bg: None,
            stripe: None,
            effect_type: None,
            effect_color: None,
            use_base: false,
        }
    }
}

pub struct ColorScheme {
    pub default_fg: Color,
    pub default_bg: Color,
    pub colors: HashMap<&'static str, Color>,
    pub basic_colors: Vec<Color>,
    pub vim_groups: Vec<VimGroup>,
    pub idea_colors: Vec<IdeaColor>,
    pub idea_attributes: Vec<IdeaAttr>,
}
impl ColorScheme {
    pub fn new(default_fg: Color, default_bg: Color) -> Self {
        let mut colors = HashMap::new();
        colors.insert(default_fg.name, default_fg.clone());
        colors.insert(default_bg.name, default_bg.clone());
        let basic_colors = vec![default_fg.clone()];
        Self {
            default_fg,
            default_bg,
            colors,
            basic_colors,
            vim_groups: Vec::new(),
            idea_colors: Vec::new(),
            idea_attributes: Vec::new(),
        }
    }

    pub fn default_fg_value(&self) -> f32 {
        self.default_fg.hsv.v
    }

    pub fn default_bg_value(&self) -> f32 {
        self.default_bg.hsv.v
    }

    pub fn add_color(&mut self, color: Color) {
        if self.colors.contains_key(color.name) {
            panic!("duplicated color name: {}", color.name);
        }
        self.colors.insert(color.name, color.clone());
    }

    pub fn get_color(&self, name: &str) -> Color {
        match self.colors.get(name) {
            Some(x) => x.clone(),
            None => panic!("color not found: {}", name),
        }
    }

    pub fn add_basic_color(&mut self, color: Color) {
        self.add_color(color.clone());
        self.basic_colors.push(color);
    }

    pub fn add_vim_group(&mut self, group: VimGroup) {
        if let Some(fg) = &group.fg {
            self.add_color(fg.clone());
        }
        if let Some(bg) = &group.bg {
            self.add_color(bg.clone());
        }
        self.vim_groups.push(group);
    }

    pub fn add_idea_color(&mut self, idea_color: IdeaColor) {
        if let Some(color) = &idea_color.color {
            self.add_color(color.clone());
        }
        self.idea_colors.push(idea_color);
    }

    pub fn add_idea_attr(&mut self, attribute: IdeaAttr) {
        if let Some(fg) = &attribute.fg {
            self.add_color(fg.clone());
        }
        if let Some(bg) = &attribute.bg {
            self.add_color(bg.clone());
        }
        if let Some(stripe) = &attribute.stripe {
            self.add_color(stripe.clone());
        }
        self.idea_attributes.push(attribute);
    }
}
