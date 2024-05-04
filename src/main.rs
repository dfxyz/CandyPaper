mod macros;
mod output;
mod scheme;

mod structs;
pub use structs::*;

fn main() {
    let arg = std::env::args().nth(1).unwrap_or_default();

    let light_scheme = scheme::light::define();
    let dark_scheme = scheme::dark::define();

    let now = chrono::Local::now();

    match arg {
        _ if arg == "" => {
            output::readme(&light_scheme, &dark_scheme).unwrap();
            output::vim(&now, &light_scheme, &dark_scheme).unwrap();
            output::idea(&now, &light_scheme, &dark_scheme).unwrap();
            output::totalcmd(&light_scheme, &dark_scheme).unwrap();
            output::windows_terminal(&light_scheme, &dark_scheme).unwrap();
            output::mintty(&light_scheme, &dark_scheme).unwrap();
            output::css(&light_scheme, &dark_scheme).unwrap();
        }
        _ if arg == "readme" => {
            output::readme(&light_scheme, &dark_scheme).unwrap();
        }
        _ if arg == "vim" => {
            output::vim(&now, &light_scheme, &dark_scheme).unwrap();
        }
        _ if arg == "idea" => {
            output::idea(&now, &light_scheme, &dark_scheme).unwrap();
        }
        _ if arg == "tc" => {
            output::totalcmd(&light_scheme, &dark_scheme).unwrap();
        }
        _ if arg == "wt" => {
            output::windows_terminal(&light_scheme, &dark_scheme).unwrap();
        }
        _ if arg == "mintty" => {
            output::mintty(&light_scheme, &dark_scheme).unwrap();
        }
        _ if arg == "css" => {
            output::css(&light_scheme, &dark_scheme).unwrap();
        }
        _ => {
            panic!("invalid argument: {arg}");
        }
    }
}
