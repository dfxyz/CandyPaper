#!/usr/bin/env python

import os
import sys
from generator import output
from generator.utils import Color


def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    args = sys.argv[1:]
    try:
        cmd = args[0]
    except IndexError:
        print("command not specified")
        sys.exit(1)

    if cmd == "preview":
        preview(args[1:])
    elif cmd == "all":
        output.all()
    elif cmd == "jb":
        output.jetbrains()
    elif cmd == "vim":
        output.vim()
    elif cmd == "wt":
        output.windows_terminal()
    elif cmd == "tc":
        output.total_commander()
    elif cmd == "html":
        output.html_palette()
    elif cmd == "css":
        output.css()
    else:
        print(f"unknown command: '{cmd}'")
        sys.exit(1)


def preview(args: list[str]):
    if len(args) <= 0:
        print("no color specified")
        sys.exit(1)

    fg = None
    bg = None

    def parse(value: str) -> Color:
        try:
            h, s, v = map(int, value.split(","))
        except ValueError:
            print(f"invalid color: '{value}'")
            sys.exit(1)
        return Color(h, s, v)

    for arg in args:
        if arg.startswith("fg="):
            fg = parse(arg[3:])
        elif arg.startswith("bg="):
            bg = parse(arg[3:])
        else:
            print(f"invalid argument: '{arg}'")
            sys.exit(1)

    style = ""
    content = ""
    if fg is not None:
        style += f"color: {fg.hex()};"
        content += f"FG: {fg}"
    if bg is not None:
        style += f"background-color: {bg.hex()};"
        if fg is not None:
            content += "; "
        content += f"BG: {bg}"

    content = f"""
<!DOCTYPE html>
<html>
<head>
<title>Color Preview</title>
<meta charset="utf-8">
</head>
<body>
<p style="{style}">{content}</p>
</body>
</html>
"""
    with open("preview.html", "w") as f:
        f.write(content)


if __name__ == "__main__":
    main()
