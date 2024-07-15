from typing import Optional

from . import jetbrains
from . import *


class VimGroup:
    all = list()

    name: str
    fg: Optional[Color]
    bg: Optional[Color]
    gui: str

    def __init__(self, name: str, fg: Optional[Color], bg: Optional[Color], gui: str):
        self.name = name
        self.fg = fg
        self.bg = bg
        self.gui = gui

    def vim_command(self) -> str:
        s = f"hi clear {self.name}\nhi {self.name}"
        if self.fg is not None:
            s += f" guifg={self.fg.hex()}"
        if self.bg is not None:
            s += f" guibg={self.bg.hex()}"
        if len(self.gui) > 0:
            s += f" gui={self.gui}"
        s += "\n"
        return s


def g(name: str, fg: Optional[Color] = None, bg: Optional[Color] = None, gui: str = ""):
    x = VimGroup(name, fg, bg, gui)
    VimGroup.all.append(x)


g("Normal", fg=jetbrains.text.fg, bg=jetbrains.text.bg)
g("Terminal", fg=jetbrains.text.fg, bg=jetbrains.text.bg)

g("Comment", fg=jetbrains.line_comment.fg)

g("Constant", fg=jetbrains.constant.fg)
g("String", fg=jetbrains.string.fg)
g("Character", fg=jetbrains.string.fg)
g("Number", fg=jetbrains.number.fg)
g("Boolean", fg=jetbrains.keyword.fg)
g("Float", fg=jetbrains.number.fg)

g("Identifier", fg=jetbrains.identifier.fg)
g("Function", fg=jetbrains.identifier.fg)

g("Statement", fg=jetbrains.keyword.fg)
g("Conditional", fg=jetbrains.keyword.fg)
g("Repeat", fg=jetbrains.keyword.fg)
g("Label", fg=jetbrains.keyword.fg)
g("Operator", fg=jetbrains.text.fg)
g("Keyword", fg=jetbrains.keyword.fg)
g("Exception", fg=jetbrains.keyword.fg)

g("PreProc", fg=jetbrains.metadata.fg)
g("Include", fg=jetbrains.metadata.fg)
g("Define", fg=jetbrains.metadata.fg)
g("Macro", fg=jetbrains.metadata.fg)
g("PreCondit", fg=jetbrains.metadata.fg)

g("Type", fg=jetbrains.keyword.fg)
g("StorageClass", fg=jetbrains.keyword.fg)
g("Structure", fg=jetbrains.keyword.fg)
g("Typedef", fg=jetbrains.keyword.fg)

g("Special", fg=blue)
g("SpecialChar", fg=blue)
g("Tag", fg=jetbrains.reference_link.fg)
g("Delimiter", fg=jetbrains.text.fg)
g("SpecialComment", fg=jetbrains.doc_comment_tag.fg)
g("Debug", fg=cyan)

g("Underlined", fg=jetbrains.hyperlink.fg, gui="underline")

g("Error", bg=jetbrains.error.bg)

g("Todo", bg=jetbrains.todo.bg)

g("Added", fg=green)
g("Changed", fg=Color(210, 100, 75))
g("Removed", fg=red)

g("ColorColumn", bg=jetbrains.right_margin.color)
g("CursorColumn", bg=jetbrains.caret_row.color)
g("CursorLine", bg=jetbrains.caret_row.color)
g("Directory", fg=blue)
g("DiffAdd", bg=jetbrains.diff_inserted.bg)
g("DiffChange", bg=Color(210, 5, 98))
g("DiffDelete", bg=jetbrains.diff_deleted.bg)
g("DiffText", bg=jetbrains.diff_modified.bg)
g("ErrorMsg", fg=Color(0, 0, 100), bg=red)
g("VertSplit", fg=tertiary_fg)
g("Folded", fg=jetbrains.folded_text.fg, bg=jetbrains.folded_text.bg)
g("FoldColumn", fg=secondary_fg)
g("SignColumn", fg=secondary_fg)
g("LineNr", fg=jetbrains.line_number.color)
g("CursorLineNr", fg=jetbrains.line_number_on_caret_row.color)
g("CursorLineFold", fg=jetbrains.line_number_on_caret_row.color)
g("CursorLineSign", fg=jetbrains.line_number_on_caret_row.color)
g("MatchParen", bg=jetbrains.matched_brace.bg)
g("ModeMsg", fg=blue)
g("MoreMsg", fg=green)
g("NonText", fg=tertiary_fg)
g("Pmenu", bg=Color(120, 5, 95))
g("PmenuSel", bg=jetbrains.selection_bg.color)
g("PmenuSbar", bg=Color(120, 5, 95))
g("PmenuThumb", bg=Color(120, 10, 75))
g("Question", fg=green)
g("Search", fg=jetbrains.text_search_result.fg, bg=jetbrains.text_search_result.bg)
g("SpecialKey", fg=blue)
g("StatusLine", fg=primary_fg, bg=Color(120, 20, 98))
g("StatusLineNC", fg=secondary_fg, bg=Color(120, 10, 90))
g("StatusLineTerm", fg=primary_fg, bg=Color(120, 20, 98))
g("StatusLineTermNC", fg=secondary_fg, bg=Color(120, 10, 90))
g("TabLine", fg=secondary_fg, bg=Color(120, 10, 90))
g("TabLineFill", bg=Color(120, 10, 90))
g("TabLineSel", fg=primary_fg)
g("Title", fg=blue)
g("Visual", bg=jetbrains.selection_bg.color)
g("WarningMsg", fg=red)
g("WildMenu", fg=jetbrains.text_search_result.fg, bg=jetbrains.todo.bg)
