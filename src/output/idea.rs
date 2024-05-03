use std::fmt::Write;

use crate::ColorScheme;

pub fn generate_light(now: &chrono::DateTime<chrono::Local>, scheme: &ColorScheme) -> String {
    let mut s = String::new();

    let datetime = now.format("%Y-%m-%dT%H:%M:%S%z");
    writeln!(
        s,
        r#"<scheme name="Candy Paper Light" version="142" parent_scheme="Default">
  <metaInfo>
    <property name="ide">Idea</property>
    <property name="ideVersion">2022.2.0.0</property>
    <property name="created">{datetime}</property>
    <property name="modified">{datetime}</property>
  </metaInfo>"#
    )
    .unwrap();

    generate(&mut s, scheme);

    writeln!(s, "</scheme>").unwrap();

    s
}

pub fn generate_dark(now: &chrono::DateTime<chrono::Local>, scheme: &ColorScheme) -> String {
    let mut s = String::new();

    let datetime = now.format("%Y-%m-%dT%H:%M:%S%z");
    writeln!(
        s,
        r#"<scheme name="Candy Paper Dark" version="142" parent_scheme="Darcula">
  <metaInfo>
    <property name="ide">Idea</property>
    <property name="ideVersion">2022.2.0.0</property>
    <property name="created">{datetime}</property>
    <property name="modified">{datetime}</property>
  </metaInfo>"#
    )
    .unwrap();

    generate(&mut s, scheme);

    writeln!(s, "</scheme>").unwrap();

    s
}

fn generate(s: &mut String, scheme: &ColorScheme) {
    writeln!(s, "  <colors>").unwrap();
    for color in &scheme.idea_colors {
        let name = color.name;
        write!(s, r#"    <option name="{name}" value=""#).unwrap();
        if let Some(color) = &color.color {
            write!(s, "{}", color.hex0()).unwrap();
        }
        writeln!(s, r#""/>"#).unwrap();
    }
    writeln!(s, "  </colors>").unwrap();

    writeln!(s, "  <attributes>").unwrap();
    for attr in &scheme.idea_attributes {
        let name = attr.name;

        if attr.use_base {
            writeln!(s, r#"    <option name="{name}" baseAttributes="1"/>"#).unwrap();
            continue;
        }

        write!(s, r#"    <option name="{name}">
      <value>
"#).unwrap();

        if let Some(fg) = &attr.fg {
            writeln!(s, r#"        <option name="FOREGROUND" value="{}"/>"#, fg.hex0()).unwrap();
        }

        if let Some(bg) = &attr.bg {
            writeln!(s, r#"        <option name="BACKGROUND" value="{}"/>"#, bg.hex0()).unwrap();
        }

        if let Some(stripe) = &attr.stripe {
            writeln!(s, r#"        <option name="ERROR_STRIPE_COLOR" value="{}"/>"#, stripe.hex0()).unwrap();
        }

        if let Some(effect_color) = &attr.effect_color {
            writeln!(s, r#"        <option name="EFFECT_COLOR" value="{}"/>"#, effect_color.hex0()).unwrap();
        }

        if let Some(effect_type) = &attr.effect_type {
            writeln!(s, r#"        <option name="EFFECT_TYPE" value="{}"/>"#, effect_type).unwrap();
        }


        writeln!(s, r#"      </value>
    </option>"#).unwrap();
    }
    writeln!(s, "  </attributes>").unwrap();
}
