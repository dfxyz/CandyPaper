import { basic, bg, fg, guideLine } from '../colors.ts';

const UNDERLINE = 'underline';

/** RGB=[230,242,236], HSV=[150,5,95] */
const modifiedLineBg = '#e6f2ec';
/** RGB=[230,242,230], HSV=[120,5,95] */
const menuBg = '#e6f2e6';
/** RGB=[172,192,172], HSV=[120,10,75] */
const menuHandleColor = '#acc0ac';
/** RGB=[200,250,200], HSV=[120,20,98] */
const statusLineBg = '#c8fac8';
/** RGB=[218,230,218], HSV=[120,5,90] */
const inactiveStatusLineBg = '#dae6da';
/** RGB=[255,255,255], HSV=[0,0,100] */
const wildMenuFg = '#ffffff';
/** RGB=[64,128,0], HSV=[90,100,50] */
const wildMenuBg = '#408000';

type VimGroup = {
  fg?: string;
  bg?: string;
  gui?: string;
};

export const ansiColors = [
  fg.ansiBlack,
  fg.ansiRed,
  fg.ansiGreen,
  fg.ansiYellow,
  fg.ansiBlue,
  fg.ansiMagenta,
  fg.ansiCyan,
  fg.ansiWhite,

  fg.ansiBlack,
  fg.ansiRed,
  fg.ansiGreen,
  fg.ansiYellow,
  fg.ansiBlue,
  fg.ansiMagenta,
  fg.ansiCyan,
  fg.ansiWhite,
];

export const groups: Record<string, VimGroup> = {
  Normal: {
    fg: fg.default,
    bg: bg.default,
  },
  Terminal: {
    fg: fg.default,
    bg: bg.default,
  },
  Comment: {
    fg: fg.comment,
  },
  Constant: {
    fg: fg.constant,
  },
  String: {
    fg: fg.string,
  },
  Character: {
    fg: fg.string,
  },
  Number: {
    fg: fg.literalConstant,
  },
  Boolean: {
    fg: fg.literalConstant,
  },
  Float: {
    fg: fg.literalConstant,
  },
  Identifier: {
    fg: fg.default,
  },
  Function: {
    fg: fg.default,
  },
  Statement: {
    fg: fg.keyword,
  },
  Conditional: {
    fg: fg.keyword,
  },
  Repeat: {
    fg: fg.keyword,
  },
  Label: {
    fg: fg.keyword,
  },
  Operator: {
    fg: fg.default,
  },
  Keyword: {
    fg: fg.keyword,
  },
  Exception: {
    fg: fg.keyword,
  },
  PreProc: {
    fg: fg.macro,
  },
  Include: {
    fg: fg.macro,
  },
  Define: {
    fg: fg.macro,
  },
  Macro: {
    fg: fg.macro,
  },
  PreCondit: {
    fg: fg.macro,
  },
  Type: {
    fg: fg.keyword,
  },
  StorageClass: {
    fg: fg.keyword,
  },
  Structure: {
    fg: fg.keyword,
  },
  Typedef: {
    fg: fg.keyword,
  },
  Special: {
    fg: fg.literalConstant,
  },
  SpecialChar: {
    fg: fg.literalConstant,
  },
  Tag: {
    fg: fg.hyperlink,
  },
  Delimiter: {
    fg: fg.default,
  },
  SpecialComment: {
    fg: fg.specialComment,
  },
  Debug: {
    fg: fg.default,
  },
  Underline: {
    fg: fg.hyperlink,
    gui: UNDERLINE,
  },
  Error: {
    bg: bg.error,
  },
  Todo: {
    fg: fg.default,
    bg: bg.todo,
  },
  Added: {
    fg: basic.green,
  },
  Changed: {
    fg: basic.lakeBlue,
  },
  Removed: {
    fg: basic.red,
  },
  ColorColumn: {
    bg: guideLine.margin,
  },
  CursorColumn: {
    bg: bg.cursorLine,
  },
  CursorLine: {
    bg: bg.cursorLine,
  },
  Directory: {
    fg: basic.blue,
  },
  DiffAdd: {
    bg: bg.addedText,
  },
  DiffChange: {
    bg: modifiedLineBg,
  },
  DiffDelete: {
    bg: bg.removedText,
  },
  DiffText: {
    bg: bg.modifiedText,
  },
  ErrorMsg: {
    fg: fg.default,
    bg: bg.error,
  },
  VertSplit: {
    fg: fg.unimportant,
  },
  Folded: {
    fg: fg.foldedText,
    bg: bg.foldedText,
  },
  FoldColumn: {
    fg: fg.lineNumber,
  },
  SignColumn: {
    fg: fg.lineNumber,
  },
  LineNr: {
    fg: fg.lineNumber,
  },
  CursorLineNr: {
    fg: fg.emphasizedLineNumber,
    bg: bg.cursorLine,
  },
  CursorLineFold: {
    fg: fg.emphasizedLineNumber,
    bg: bg.cursorLine,
  },
  CursorLineSign: {
    fg: fg.emphasizedLineNumber,
    bg: bg.cursorLine,
  },
  MatchParen: {
    bg: bg.matchedToken,
  },
  ModeMsg: {
    fg: basic.darkRed,
  },
  MoreMsg: {
    fg: basic.green,
  },
  NonText: {
    fg: fg.unimportant,
  },
  Pmenu: {
    bg: menuBg,
  },
  PmenuSel: {
    bg: bg.selectedText,
  },
  PmenuSbar: {
    bg: menuBg,
  },
  PmenuThumb: {
    bg: menuHandleColor,
  },
  Question: {
    fg: basic.green,
  },
  Search: {
    fg: fg.searchMatchedText,
    bg: bg.searchMatchedText,
  },
  CurSearch: {
    fg: fg.searchMatchedText,
    bg: bg.currentSearchMatchedText,
  },
  SpecialKey: {
    fg: fg.literalConstant,
  },
  StatusLine: {
    fg: fg.default,
    bg: statusLineBg,
  },
  StatusLineNC: {
    fg: fg.lessImportant,
    bg: inactiveStatusLineBg,
  },
  StatusLineTerm: {
    fg: fg.default,
    bg: statusLineBg,
  },
  StatusLineTermNC: {
    fg: fg.lessImportant,
    bg: inactiveStatusLineBg,
  },
  TabLine: {
    fg: fg.lessImportant,
    bg: inactiveStatusLineBg,
  },
  TabLineFill: {
    bg: inactiveStatusLineBg,
  },
  TabLineSel: {
    fg: fg.default,
  },
  Title: {
    fg: fg.markupHeading,
  },
  Visual: {
    bg: bg.selectedText,
  },
  WarningMsg: {
    fg: fg.default,
    bg: bg.warning,
  },
  WildMenu: {
    fg: wildMenuFg,
    bg: wildMenuBg,
  },
  cssAtKeyword: {
    fg: fg.keyword,
  },
  cssAtRule: {
    fg: fg.keyword,
  },
  cssPseudoClassId: {
    fg: fg.keyword,
  },
  cssColor: {
    fg: fg.literalConstant,
  },
  cssImportant: {
    fg: fg.specialComment,
  },
  cssProp: {
    fg: fg.attributeKey,
  },
  cssCustomProp: {
    fg: fg.attributeKey,
  },
  cssURL: {
    fg: fg.hyperlink,
    gui: UNDERLINE,
  },
  htmlTitle: {
    fg: fg.default,
  },
  htmlH1: {
    fg: fg.default,
  },
  htmlTagN: {
    fg: fg.tag,
  },
  htmlArg: {
    fg: fg.attributeKey,
  },
  javaScriptEmbed: {
    fg: fg.stringInterpolation,
  },
  jsonKeyword: {
    fg: fg.instanceProperty,
  },
  jsonNull: {
    fg: fg.literalConstant,
  },
  markdownH1: {
    fg: fg.markupHeading,
  },
  markdownH2: {
    fg: fg.markupHeading,
  },
  markdownH3: {
    fg: fg.markupHeading,
  },
  markdownH4: {
    fg: fg.markupHeading,
  },
  markdownH5: {
    fg: fg.markupHeading,
  },
  markdownH6: {
    fg: fg.markupHeading,
  },
  markdownRule: {
    fg: fg.markupHeading,
  },
  markdownHeadingDelimiter: {
    fg: fg.markupHeading,
  },
  markdownUrl: {
    fg: fg.hyperlink,
    gui: UNDERLINE,
  },
  markdownLinkText: {
    fg: fg.string,
  },
  markdownCodeDelimiter: {
    fg: fg.string,
  },
  markdownCode: {
    fg: fg.string,
  },
  markdownCodeBlock: {
    fg: fg.string,
  },
  markdownId: {
    fg: fg.literalConstant,
  },
  markdownIdDeclaration: {
    fg: fg.literalConstant,
  },
  protoSyntax: {
    fg: fg.keyword,
  },
  pythonDecoratorName: {
    fg: fg.annotation,
  },
  rustModPath: {
    fg: fg.default,
  },
  rustSelf: {
    fg: fg.keyword,
  },
  rustQuestionMark: {
    fg: fg.keyword,
  },
  rustEnum: {
    fg: fg.structLike,
  },
  rustEnumVariant: {
    fg: fg.staticProperty,
  },
  rustLifetime: {
    fg: fg.string,
  },
  tomlKey: {
    fg: fg.instanceProperty,
  },
  tomlKeyDq: {
    fg: fg.instanceProperty,
  },
  typescriptCall: {
    fg: fg.default,
  },
  typescriptFuncCallArg: {
    fg: fg.default,
  },
  typescriptDestructureVariable: {
    fg: fg.default,
  },
  typescriptLabel: {
    fg: fg.instanceProperty,
  },
  typescriptDecorator: {
    fg: fg.annotation,
  },
  typescriptBOM: {
    fg: fg.structLike,
  },
  typescriptTemplateSB: {
    fg: fg.stringInterpolation,
  },
  typescriptEnumKeyword: {
    fg: fg.keyword,
  },
  typescriptExport: {
    fg: fg.keyword,
  },
  typescriptOperator: {
    fg: fg.keyword,
  },
  typescriptVariable: {
    fg: fg.keyword,
  },
  xmlTagName: {
    fg: fg.tag,
  },
  xmlAttrib: {
    fg: fg.attributeKey,
  },
  xmlEntity: {
    fg: fg.literalConstant,
  },
  xmlEntityPunct: {
    fg: fg.literalConstant,
  },
  yamlMappingKey: {
    fg: fg.instanceProperty,
  },
  yamlConstant: {
    fg: fg.literalConstant,
  },
  yamlAnchor: {
    fg: fg.globalVariable,
  },
  yamlAlias: {
    fg: fg.globalVariable,
  },
};
