mod macros;
mod output;
mod scheme;

mod structs;
pub use structs::*;

fn main() {
    let light_scheme = scheme::light::define();
    let dark_scheme = scheme::dark::define();

    let now = chrono::Local::now();

    output::html(&light_scheme, &dark_scheme).unwrap();
    output::vim(&now, &light_scheme, &dark_scheme).unwrap();
    output::idea(&now, &light_scheme, &dark_scheme).unwrap();
    output::totalcmd(&light_scheme, &dark_scheme).unwrap();
    output::windows_terminal(&light_scheme, &dark_scheme).unwrap();
    output::mintty(&light_scheme, &dark_scheme).unwrap();
    output::css(&light_scheme, &dark_scheme).unwrap();
}
