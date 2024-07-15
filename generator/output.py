from typing import Optional

from .utils import Color
from . import scheme


def all():
    jetbrains()
    vim()
    windows_terminal()
    total_commander()
    html_palette()


def jetbrains():
    from .scheme.jetbrains import JetbrainsColor, JetbrainsAttribute

    with open("CandyPaper.icls", "w", newline="\n") as f:
        f.write(f"""<scheme name="Candy Paper" parent_scheme="Default" version="1">
    <colors>
""")
        for i in JetbrainsColor.all:
            f.write(i.icls_item())
        f.write(f"""    </colors>
    <attributes>
""")
        for i in JetbrainsAttribute.all:
            f.write(i.icls_item())
        f.write(f"""    </attributes>
</scheme>
""")


def vim():
    from .scheme.vim import VimGroup

    with open("CandyPaper.vim/colors/CandyPaper.vim", "w", newline="\n") as f:
        f.write(f"""" Name: Candy Paper
" Author: DF_XYZ <dfxyz1@gmail.com>
" License: MIT
" Source: https://github.com/dfxyz/CandyPaper.vim

set bg=light
hi clear
let g:colors_name = "CandyPaper"

""")
        f.write("\n")
        f.write("let g:terminal_ansi_colors = [\n")
        f.write(f'   \\ "{scheme.black.hex()}", ')
        f.write(f'"{scheme.red.hex()}", ')
        f.write(f'"{scheme.green.hex()}", ')
        f.write(f'"{scheme.yellow.hex()}", ')
        f.write(f'"{scheme.blue.hex()}", ')
        f.write(f'"{scheme.pink.hex()}", ')
        f.write(f'"{scheme.cyan.hex()}", ')
        f.write(f'"{scheme.white.hex()}",\n')
        f.write(f'   \\ "{scheme.bright_black.hex()}", ')
        f.write(f'"{scheme.bright_red.hex()}", ')
        f.write(f'"{scheme.bright_green.hex()}", ')
        f.write(f'"{scheme.bright_yellow.hex()}", ')
        f.write(f'"{scheme.bright_blue.hex()}", ')
        f.write(f'"{scheme.bright_pink.hex()}", ')
        f.write(f'"{scheme.bright_cyan.hex()}", ')
        f.write(f'"{scheme.bright_white.hex()}"]\n\n')

        for group in VimGroup.all:
            f.write(group.vim_command())



def windows_terminal():
    with open("CandyPaper.wt", "w", newline="\n") as f:
        def write(name: str, color: Color):
            f.write(f"""    "{name}": "{color.hex()}",\n""")

        f.write(f"""{{
    "name": "Candy Paper",
""")
        write("foreground", scheme.primary_fg)
        write("background", scheme.primary_bg)
        write("cursorColor", scheme.primary_fg)
        write("selectionBackground", scheme.selection_bg)
        write("black", scheme.black)
        write("brightBlack", scheme.bright_black)
        write("white", scheme.white)
        write("brightWhite", scheme.bright_white)
        write("red", scheme.red)
        write("brightRed", scheme.bright_red)
        write("green", scheme.green)
        write("brightGreen", scheme.bright_green)
        write("yellow", scheme.yellow)
        write("brightYellow", scheme.bright_yellow)
        write("cyan", scheme.cyan)
        write("brightCyan", scheme.bright_cyan)
        write("blue", scheme.blue)
        write("brightBlue", scheme.bright_blue)
        write("purple", scheme.pink)
        write("brightPurple", scheme.bright_pink)

        f.write("},\n")


def total_commander():
    with open("CandyPaper.tc", "w", newline="\n") as f:
        f.write(f"""[Colors]
InverseCursor=0
ThemedCursor=0
InverseSelection=1
ForeColor={scheme.primary_fg.bit_shift_number()}
CursorColor={scheme.primary_fg.bit_shift_number()}
CursorText={scheme.primary_fg.bit_shift_number()}
BackColor={scheme.primary_bg.bit_shift_number()}
BackColor2={scheme.primary_bg.bit_shift_number()}
MarkColor={scheme.selection_bg.bit_shift_number()}
ColorFilter1=>Directory
ColorFilter1Color={scheme.blue.bit_shift_number()}
""")


def html_palette():
    css()
    with open("CandyPaperPalette.html", "w", newline="\n") as f:
        def write(title: str, fg: Optional[Color] = None, bg: Optional[Color] = None):
            style = ""
            if fg is not None:
                style += f"color: {fg.hex()};"
            if bg is not None:
                style += f"background-color: {bg.hex()};"
            f.write(f"<div style=\"{style}\">\n")
            f.write(f"<p>{title}</p>\n")
            if fg is not None:
                f.write(f"<p>FG={fg}</p>\n")
            if bg is not None:
                f.write(f"<p>BG={bg}</p>\n")
            f.write("</div>\n")

        f.write("""<!DOCTYPE html>
<html>
<head>
<title>Candy Paper Palette</title>
<link rel="stylesheet" type="text/css" href="CandyPaper.css">
<meta charset="UTF-8">
</head>
<body>
""")
        write("Primary Foreground", fg=scheme.primary_fg)
        write("Secondary Foreground", fg=scheme.secondary_fg)
        write("Tertiary Foreground", fg=scheme.tertiary_fg)
        write("Primary Background", bg=scheme.primary_bg)
        write("Secondary Background", bg=scheme.secondary_bg)
        write("Selection Background", bg=scheme.selection_bg)
        write("Red", fg=scheme.red)
        write("Bright Red", fg=scheme.bright_red)
        write("Dark Red", fg=scheme.dark_red)
        write("Orange", fg=scheme.orange)
        write("Yellow", fg=scheme.yellow)
        write("Bright Yellow", fg=scheme.bright_yellow)
        write("Olive Green", fg=scheme.olive_green)
        write("Green", fg=scheme.green)
        write("Bright Green", fg=scheme.bright_green)
        write("Cyan", fg=scheme.cyan)
        write("Bright Cyan", fg=scheme.bright_cyan)
        write("Blue", fg=scheme.blue)
        write("Bright Blue", fg=scheme.bright_blue)
        write("Purple", fg=scheme.purple)
        write("Pink", fg=scheme.pink)
        write("Bright Pink", fg=scheme.bright_pink)
        write("Black", fg=scheme.black)
        write("Bright Black", fg=scheme.bright_black)
        write("White", fg=scheme.white)
        write("Bright White", fg=scheme.bright_white)

        f.write(f"""</body>
</html>
""")


def css():
    content = f"""body {{
    color: {scheme.primary_fg.hex()};
    background-color: {scheme.primary_bg.hex()};
}}
::selection {{
    background-color: {scheme.selection_bg.hex()};
}}
"""
    with open("CandyPaper.css", "w", newline="\n") as f:
        f.write(content)
