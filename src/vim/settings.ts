import Color from '../Color.ts';

const UNDERLINE = 'underline';

interface RawVimGroup {
  fg?: string;
  bg?: string;
  gui?: string;
}

export const ansiColors = [
  'fg.黑',
  'fg.红',
  'fg.绿',
  'fg.黄',
  'fg.蓝',
  'fg.桃红',
  'fg.青',
  'fg.白',
];

export const groups: Record<string, RawVimGroup> = {
  Normal: {
    fg: 'fg.默认',
    bg: 'bg.默认',
  },
  Terminal: {
    fg: 'fg.默认',
    bg: 'bg.默认',
  },
  Comment: {
    fg: 'fg.注释',
  },
  Constant: {
    fg: 'fg.常量',
  },
  String: {
    fg: 'fg.字符串',
  },
  Character: {
    fg: 'fg.字符串',
  },
  Number: {
    fg: 'fg.数字',
  },
  Boolean: {
    fg: 'fg.关键字',
  },
  Float: {
    fg: 'fg.数字',
  },
  Identifier: {
    fg: 'fg.标识符',
  },
  Function: {
    fg: 'fg.标识符',
  },
  Statement: {
    fg: 'fg.关键字',
  },
  Conditional: {
    fg: 'fg.关键字',
  },
  Repeat: {
    fg: 'fg.关键字',
  },
  Label: {
    fg: 'fg.关键字',
  },
  Operator: {
    fg: 'fg.默认',
  },
  Keyword: {
    fg: 'fg.关键字',
  },
  Exception: {
    fg: 'fg.关键字',
  },
  PreProc: {
    fg: 'fg.宏',
  },
  Include: {
    fg: 'fg.宏',
  },
  Define: {
    fg: 'fg.宏',
  },
  Macro: {
    fg: 'fg.宏',
  },
  PreCondit: {
    fg: 'fg.宏',
  },
  Type: {
    fg: 'fg.关键字',
  },
  StorageClass: {
    fg: 'fg.关键字',
  },
  Structure: {
    fg: 'fg.关键字',
  },
  Typedef: {
    fg: 'fg.关键字',
  },
  Special: {
    fg: 'fg.VIM_特殊字符',
  },
  // SpecialChar
  Tag: {
    fg: 'fg.链接',
  },
  Delimiter: {
    fg: 'fg.默认',
  },
  SpecialComment: {
    fg: 'fg.特殊注释',
  },
  // Debug
  Underline: {
    fg: 'fg.链接',
    gui: UNDERLINE,
  },
  Error: {
    bg: 'bg.错误',
  },
  Todo: {
    fg: 'fg.默认',
    bg: 'bg.待办事项',
  },
  Added: {
    fg: 'fg.绿',
  },
  Changed: {
    fg: 'fg.湖蓝',
  },
  Removed: {
    fg: 'fg.红',
  },
  ColorColumn: {
    bg: 'line.行宽对齐线',
  },
  CursorColumn: {
    bg: 'bg.当前行',
  },
  CursorLine: {
    bg: 'bg.当前行',
  },
  Directory: {
    fg: 'fg.VIM_特殊字符',
  },
  DiffAdd: {
    bg: 'bg.DIFF_新增文本',
  },
  DiffChange: {
    bg: 'bg.DIFF_改动文本_次要',
  },
  DiffDelete: {
    bg: 'bg.DIFF_移除文本',
  },
  DiffText: {
    bg: 'bg.DIFF_改动文本',
  },
  ErrorMsg: {
    fg: 'fg.默认',
    bg: 'bg.错误',
  },
  VertSplit: {
    fg: 'fg.次要文本',
  },
  Folded: {
    fg: 'fg.折叠文本',
    bg: 'bg.折叠文本',
  },
  FoldColumn: {
    fg: 'fg.次要文本',
  },
  SignColumn: {
    fg: 'fg.次要文本',
  },
  LineNr: {
    fg: 'fg.次要文本',
  },
  CursorLineNr: {
    fg: 'fg.默认',
    bg: 'bg.当前行',
  },
  CursorLineFold: {
    fg: 'fg.默认',
    bg: 'bg.当前行',
  },
  CursorLineSign: {
    fg: 'fg.默认',
    bg: 'bg.当前行',
  },
  MatchParen: {
    bg: 'bg.成对括号',
  },
  ModeMsg: {
    fg: 'fg.蓝',
  },
  MoreMsg: {
    fg: 'fg.绿',
  },
  NonText: {
    fg: 'fg.次要文本',
  },
  Pmenu: {
    bg: 'bg.VIM_补全菜单',
  },
  PmenuSel: {
    bg: 'bg.选中文本',
  },
  PMenuSbar: {
    bg: 'bg.VIM_补全菜单',
  },
  PMenuThumb: {
    bg: 'bg.VIM_补全菜单拖动条',
  },
  Question: {
    fg: 'fg.绿',
  },
  Search: {
    fg: 'fg.文本搜索结果',
    bg: 'bg.文本搜索结果',
  },
  SpecialKey: {
    fg: 'fg.VIM_特殊字符',
  },
  StatusLine: {
    fg: 'fg.默认',
    bg: 'bg.VIM_状态栏',
  },
  StatusLineNC: {
    fg: 'fg.VIM_状态栏_未选中',
    bg: 'bg.VIM_状态栏_未选中',
  },
  StatusLineTerm: {
    fg: 'fg.默认',
    bg: 'bg.VIM_状态栏',
  },
  StatusLineTermNC: {
    fg: 'fg.VIM_状态栏_未选中',
    bg: 'bg.VIM_状态栏_未选中',
  },
  TabLine: {
    fg: 'fg.VIM_状态栏_未选中',
    bg: 'bg.VIM_状态栏_未选中',
  },
  TabLineFill: {
    bg: 'bg.VIM_状态栏_未选中',
  },
  TabLineSel: {
    fg: 'fg.默认',
  },
  Title: {
    fg: 'fg.VIM_特殊字符',
  },
  Visual: {
    bg: 'bg.选中文本',
  },
  WarningMsg: {
    fg: 'fg.默认',
    bg: 'bg.警告',
  },
  WildMenu: {
    fg: 'fg.VIM_WildMenu',
    bg: 'bg.VIM_WildMenu',
  },
};
// g("Visual", bg=jetbrains.selection_bg.color)
// g("WarningMsg", fg=red)
// g("WildMenu", fg=jetbrains.text_search_result.fg, bg=jetbrains.todo.bg)
