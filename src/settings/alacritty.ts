import { fg, bg } from '../colors.ts';

export const content = `
[colors.primary]
foreground = "${fg.default}"
background = "${bg.default}"

[colors.selection]
foreground = "CellForeground"
background = "${bg.selectedText}"

[colors.search.matches]
foreground = "${fg.searchMatchedText}"
background = "${bg.searchMatchedText}"

[colors.search.focused_match]
foreground = "${fg.searchMatchedText}"
background = "${bg.currentSearchMatchedText}"

[colors.normal]
black = "${fg.ansiBlack}"
red = "${fg.ansiRed}"
green = "${fg.ansiGreen}"
yellow = "${fg.ansiYellow}"
blue = "${fg.ansiBlue}"
purple = "${fg.ansiMagenta}"
cyan = "${fg.ansiCyan}"
white = "${fg.ansiWhite}"

[colors.bright]
black = "${fg.ansiBlack}"
red = "${fg.ansiRed}"
green = "${fg.ansiGreen}"
yellow = "${fg.ansiYellow}"
blue = "${fg.ansiBlue}"
purple = "${fg.ansiMagenta}"
cyan = "${fg.ansiCyan}"
white = "${fg.ansiWhite}"
`.trimStart();
