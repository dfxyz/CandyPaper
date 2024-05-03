use std::{fs::File, io::Write};

use crate::ColorScheme;

mod css;
mod idea;
mod mintty;
mod readme;
mod totalcmd;
mod vim;
mod windows_terminal;

pub fn readme(light_scheme: &ColorScheme, dark_scheme: &ColorScheme) -> std::io::Result<()> {
    const PATH: &str = "README.md";

    let content = readme::generate(light_scheme, dark_scheme);
    File::options()
        .create(true)
        .write(true)
        .truncate(true)
        .open(PATH)?
        .write_all(content.as_bytes())
}

pub fn vim(
    now: &chrono::DateTime<chrono::Local>,
    light_scheme: &ColorScheme,
    dark_scheme: &ColorScheme,
) -> std::io::Result<()> {
    const PATH: &str = "CandyPaper.vim/colors/CandyPaper.vim";

    let content = vim::generate(now, light_scheme, dark_scheme);
    File::options()
        .create(true)
        .write(true)
        .truncate(true)
        .open(PATH)?
        .write_all(content.as_bytes())
}

pub fn idea(
    now: &chrono::DateTime<chrono::Local>,
    light_scheme: &ColorScheme,
    dark_scheme: &ColorScheme,
) -> std::io::Result<()> {
    const LIGHT_PATH: &str = "CandyPaper.idea/CandyPaperLight.icls";
    const DARK_PATH: &str = "CandyPaper.idea/CandyPaperDark.icls";

    let content = idea::generate_light(now, light_scheme);
    File::options()
        .create(true)
        .write(true)
        .truncate(true)
        .open(LIGHT_PATH)?
        .write_all(content.as_bytes())?;

    let content = idea::generate_dark(now, dark_scheme);
    File::options()
        .create(true)
        .write(true)
        .truncate(true)
        .open(DARK_PATH)?
        .write_all(content.as_bytes())?;

    Ok(())
}

pub fn totalcmd(light_scheme: &ColorScheme, dark_scheme: &ColorScheme) -> std::io::Result<()> {
    const PATH: &str = "CandyPaper.tc";

    let content = totalcmd::generate(light_scheme, dark_scheme);
    File::options()
        .create(true)
        .write(true)
        .truncate(true)
        .open(PATH)?
        .write_all(content.as_bytes())
}

pub fn windows_terminal(
    light_scheme: &ColorScheme,
    dark_scheme: &ColorScheme,
) -> std::io::Result<()> {
    const PATH: &str = "CandyPaper.wt";
    let content = windows_terminal::generate(light_scheme, dark_scheme);
    File::options()
        .create(true)
        .write(true)
        .truncate(true)
        .open(PATH)?
        .write_all(content.as_bytes())
}

pub fn mintty(light_scheme: &ColorScheme, dark_scheme: &ColorScheme) -> std::io::Result<()> {
    const LIGHT_PATH: &str = "CandyPaper.mintty/CandyPaperLight";
    const DARK_PATH: &str = "CandyPaper.mintty/CandyPaperDark";

    let content = mintty::generate(light_scheme);
    File::options()
        .create(true)
        .write(true)
        .truncate(true)
        .open(LIGHT_PATH)?
        .write_all(content.as_bytes())?;
    let content = mintty::generate(dark_scheme);
    File::options()
        .create(true)
        .write(true)
        .truncate(true)
        .open(DARK_PATH)?
        .write_all(content.as_bytes())?;

    Ok(())
}

pub fn css(light_scheme: &ColorScheme, dark_scheme: &ColorScheme) -> std::io::Result<()> {
    const PATH: &str = "CandyPaper.css";

    let content = css::generate(light_scheme, dark_scheme);
    File::options()
        .create(true)
        .write(true)
        .truncate(true)
        .open(PATH)?
        .write_all(content.as_bytes())
}
