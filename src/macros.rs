macro_rules! hsv {
    ($h:literal, $s:literal, $v:literal) => {
        $crate::HSV::new($h as f32, $s as f32, $v as f32)
    };
    ($scheme:ident, ($h:literal, $s:literal, $v:literal)) => {
        $crate::HSV::new($h as f32, $s as f32, $v as f32)
    };
    ($scheme:ident, ($h:literal, $s:literal, fg)) => {
        $crate::HSV::new($h as f32, $s as f32, $scheme.default_fg_value())
    };
    ($scheme:ident, ($h:literal, $s:literal, fg+$v:literal)) => {
        $crate::HSV::new($h as f32, $s as f32, $scheme.default_fg_value() + $v as f32)
    };
    ($scheme:ident, ($h:literal, $s:literal, fg-$v:literal)) => {
        $crate::HSV::new($h as f32, $s as f32, $scheme.default_fg_value() - $v as f32)
    };
    ($scheme:ident, ($h:literal, $s:literal, bg)) => {
        $crate::HSV::new($h as f32, $s as f32, $scheme.default_bg_value())
    };
    ($scheme:ident, ($h:literal, $s:literal, bg+$v:literal)) => {
        $crate::HSV::new($h as f32, $s as f32, $scheme.default_bg_value() + $v as f32)
    };
    ($scheme:ident, ($h:literal, $s:literal, bg-$v:literal)) => {
        $crate::HSV::new($h as f32, $s as f32, $scheme.default_bg_value() - $v as f32)
    };
}
pub(crate) use hsv;

macro_rules! define_basic_colors {
    ($scheme:ident => { $( $tt:tt )* }) => {
        $(
            $crate::macros::define_basic_color!($scheme, $tt);
        )*
    };
}
pub(crate) use define_basic_colors;

macro_rules! define_basic_color {
    ($scheme:ident, ($name:literal, $tt:tt) ) => {
        let hsv = $crate::macros::hsv!($scheme, $tt);
        let color = $crate::Color::new($name, hsv);
        $scheme.add_basic_color(color);
    };
}
pub(crate) use define_basic_color;

macro_rules! color_ref {
    ($scheme:ident, $color_name:literal) => {
        $scheme.get_color($color_name)
    };
    ($scheme:ident, $tt:tt) => {{
        let hsv = $crate::macros::hsv!($scheme, $tt);
        $crate::Color::new("", hsv)
    }};
}
pub(crate) use color_ref;

macro_rules! define_vim_groups {
    ($scheme:ident => { $( $tt:tt )* }) => {
        $(
            { $crate::macros::define_vim_group!($scheme, $tt); }
        )*
    };
}
pub(crate) use define_vim_groups;

macro_rules! define_vim_group {
    ($scheme:ident, ($name:literal, $( $key:ident=$value:tt ),+ )) => {
        let mut group = $crate::VimGroup::new($name);
        $(
            $crate::macros::configure_vim_group!($scheme, $name, group, $key = $value);
        )+
        $scheme.add_vim_group(group);
    };
}
pub(crate) use define_vim_group;

macro_rules! configure_vim_group {
    ($scheme:ident, $name:literal, $group:ident, fg = $tt:tt) => {{
        let mut color = $crate::macros::color_ref!($scheme, $tt);
        color.name = concat!("vimFg", $name);
        $group.fg = Some(color);
    }};
    ($scheme:ident, $name:literal, $group:ident, bg = $tt:tt) => {{
        let mut color = $crate::macros::color_ref!($scheme, $tt);
        color.name = concat!("vimBg", $name);
        $group.bg = Some(color);
    }};
    ($scheme:ident, $name:literal, $group:ident, gui = $value:literal) => {{
        $group.gui = Some($value);
    }};
}
pub(crate) use configure_vim_group;

macro_rules! define_idea_scheme {
    ($scheme:ident => { $( $ty:ident: $tt:tt )* }) => {
        $(
            $crate::macros::define_idea_item!($scheme, $ty: $tt);
        )*
    };
}
pub(crate) use define_idea_scheme;

macro_rules! define_idea_item {
    ($scheme:ident, c: $tt:tt ) => {
        $crate::macros::define_idea_color!($scheme, $tt);
    };
    ($scheme:ident, a: $tt:tt) => {
        $crate::macros::define_idea_attr!($scheme, $tt);
    };
}
pub(crate) use define_idea_item;

macro_rules! define_idea_color {
    ($scheme:ident, ($name:literal)) => {{
        $scheme.add_idea_color($crate::IdeaColor::new($name));
    }};
    ($scheme:ident, ($name:literal, $tt:tt )) => {{
        let mut color = $crate::macros::color_ref!($scheme, $tt);
        color.name = concat!("ideaColor", $name);
        let idea_color = $crate::IdeaColor {
            name: $name,
            color: Some(color),
        };
        $scheme.add_idea_color(idea_color);
    }}
}
pub(crate) use define_idea_color;

macro_rules! define_idea_attr {
    ($scheme:ident, ($name:literal)) => {{
        $scheme.add_idea_attr($crate::IdeaAttr::new($name)); 
    }};
    ($scheme:ident, ($name:literal, $( $key:ident = $value:tt ),+ )) => {{
        let mut attr = $crate::IdeaAttr::new($name);
        $(
            $crate::macros::configure_idea_attr!($scheme, $name, attr, $key = $value);
        )+
        $scheme.add_idea_attr(attr); 
    }};
}
pub(crate) use define_idea_attr;

macro_rules! configure_idea_attr {
    ($scheme:ident, $name:literal, $attr:ident, fg = $tt:tt ) => {{
        let mut color = $crate::macros::color_ref!($scheme, $tt);
        color.name = concat!("ideaFg", $name);
        $attr.fg = Some(color);
    }};
    ($scheme:ident, $name:literal, $attr:ident, bg = $tt:tt ) => {{
        let mut color = $crate::macros::color_ref!($scheme, $tt);
        color.name = concat!("ideaBg", $name);
        $attr.bg = Some(color);
    }};
    ($scheme:ident, $name:literal, $attr:ident, stripe = $tt:tt ) => {{
        let mut color = $crate::macros::color_ref!($scheme, $tt);
        color.name = concat!("ideaStripe", $name);
        $attr.stripe = Some(color);
    }};

    ($scheme:ident, $name:literal, $attr:ident, effectColor = $tt:tt ) => {{
        let mut color = $crate::macros::color_ref!($scheme, $tt);
        color.name = concat!("ideaEffect", $name);
        $attr.effect_color = Some(color);
    }};

    ($scheme:ident, $name:literal, $attr:ident, effectType = underline ) => {{
        $attr.effect_type = Some($crate::IDEA_UNDERLINE);
    }};
    ($scheme:ident, $name:literal, $attr:ident, effectType = underwave ) => {{
        $attr.effect_type = Some($crate::IDEA_UNDERWAVE);
    }};
    ($scheme:ident, $name:literal, $attr:ident, effectType = strikeout ) => {{
        $attr.effect_type = Some($crate::IDEA_STRIKEOUT);
    }};
    ($scheme:ident, $name:literal, $attr:ident, effectType = dottedline ) => {{
        $attr.effect_type = Some($crate::IDEA_DOTTEDLINE);
    }};

    ($scheme:ident, $name:literal, $attr:ident, useBase = true ) => {{
        $attr.use_base = true;
    }};
}
pub(crate) use configure_idea_attr;
