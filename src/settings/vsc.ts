import { basic, bg, fg, guideLine, gutter, stripe } from '../colors.ts';
import baseSettings from '../base/vsc.json' with { type: 'json' };

/** RGB=[32,32,32], HSV=[0,0,13] */
const uiDefaultFg = '#202020';
/** RGB=[64,128,0], HSV=[90,100,50] */
const uiThemeGreen = '#408000';
/** RGB=[224,242,206], HSV=[90,15,95] */
const inactiveSelectedTextBg = '#e0f2ce';
/** RGB=[180,192,172], HSV=[96,10,75] */
const secondaryStripeColor = '#b4c0ac';
/** RGB=[236,255,230], HSV=[106,10,100] */
const peekViewBg = '#ecffe6';

// deno-lint-ignore no-explicit-any
const settings: Record<string, any> = Object.assign({}, baseSettings);

Object.assign(settings.colors, {
  'activityBar.activeBorder': uiThemeGreen,
  /** RGB=[32,32,32], HSV=[0,0,13] */
  'activityBar.foreground': '#202020',
  /** RGB=[96,96,96], HSV=[0,0,38] */
  'activityBar.inactiveForeground': '#606060',
  'activityBarBadge.background': uiThemeGreen,
  /** RGB=[206,218,196], HSV=[93,10,85] */
  'badge.background': '#cedac4',
  'badge.foreground': uiDefaultFg,
  'button.background': uiThemeGreen,
  /** RGB=[82,166,0], HSV=[90,100,65] */
  'button.hoverBackground': '#52a600',
  'button.secondaryForeground': uiDefaultFg,
  'descriptionForeground': uiDefaultFg,
  'dropdown.foreground': uiDefaultFg,
  'editor.background': bg.default,
  'editor.foreground': fg.default,
  'editor.findMatchBackground': bg.currentSearchMatchedText,
  'editor.findMatchForeground': fg.searchMatchedText,
  'editor.findMatchHighlightBackground': bg.searchMatchedText,
  'editor.findMatchHighlightForeground': fg.searchMatchedText,
  'editor.foldBackground': bg.foldedText,
  'editor.foldPlaceholderForeground': fg.foldedText,
  /** RGB=[192,255,0], HSV=[75,100,100], Opacity=20% */
  'editor.hoverHighlightBackground': '#c0ff0032',
  /** RGB=[224,242,206], HSV=[90,15,95] */
  'editor.inactiveSelectionBackground': inactiveSelectedTextBg,
  'editor.lineHighlightBackground': bg.cursorLine,
  'editor.lineHighlightBorder': bg.cursorLine,
  'editor.selectionBackground': bg.selectedText,
  'editor.selectionHighlightBackground': bg.selectedText + '80',
  /** RGB=[0,64,255], HSV=[225,100,100], Opacity=10% */
  'editor.wordHighlightBackground': '#0040ff1a',
  /** RGB=[255,0,255], HSV=[300,100,100], Opacity=10% */
  'editor.wordHighlightStrongBackground': '#ff00ff1a',
  /** RGB=[64,255,0], HSV=[105,100,100], Opacity=10% */
  'editor.wordHighlightTextBackground': '#40ff001a',
  'editorBracketMatch.background': bg.matchedToken,
  'editorBracketMatch.border': bg.matchedToken,
  'editorCursor.background': bg.default,
  'editorCursor.foreground': fg.default,
  'editorError.background': bg.error,
  'editorWarning.background': bg.warning,
  'editorInfo.foreground': basic.yellow,
  'editorHint.foreground': basic.green,
  'editorGutter.addedBackground': gutter.addedText,
  'editorGutter.deletedBackground': gutter.removedText,
  'editorGutter.modifiedBackground': gutter.modifiedText,
  'editorIndentGuide.activeBackground1': guideLine.emphasizedIndent,
  'editorIndentGuide.background1': guideLine.indent,
  'editorLineNumber.activeForeground': fg.emphasizedLineNumber,
  'editorLineNumber.foreground': fg.lineNumber,
  'editorLink.activeForeground': fg.hyperlink,
  'editorOverviewRuler.selectionHighlightForeground': secondaryStripeColor,
  'editorOverviewRuler.addedForeground': stripe.addedText,
  /** RGB=[255,128,128], HSV=[0,50,100] */
  'editorOverviewRuler.deletedForeground': '#ff8080',
  'editorOverviewRuler.modifiedForeground': stripe.modifiedText,
  'editorOverviewRuler.findMatchForeground': stripe.searchMatchedText,
  'editorOverviewRuler.rangeHighlightForeground': stripe.searchMatchedText,
  'editorOverviewRuler.errorForeground': stripe.error,
  'editorOverviewRuler.warningForeground': stripe.warning,
  'editorOverviewRuler.infoForeground': stripe.weakWarning,
  'editorOverviewRuler.wordHighlightTextForeground': secondaryStripeColor,
  'editorOverviewRuler.wordHighlightForeground': stripe.cursorIndentifierRead,
  'editorOverviewRuler.wordHighlightStrongForeground': stripe.cursorIndentifierWrite,
  'editorRuler.foreground': guideLine.margin,
  'editorStickyScrollHover.background': bg.cursorLine,
  'editorWhitespace.foreground': basic.blueGrey,
  'focusBorder': uiThemeGreen,
  'foreground': uiDefaultFg,
  'gitDecoration.addedResourceForeground': basic.green,
  'gitDecoration.modifiedResourceForeground': basic.blue,
  'gitDecoration.stageModifiedResourceForeground': basic.blue,
  'gitDecoration.renamedResourceForeground': basic.lakeBlue,
  'gitDecoration.conflictingResourceForeground': basic.red,
  'gitDecoration.deletedResourceForeground': basic.red,
  'gitDecoration.stageDeletedResourceForeground': basic.red,
  'gitDecoration.untrackedResourceForeground': basic.darkRed,
  'gitDecoration.submoduleResourceForeground': basic.pink,
  'gitDecoration.ignoredResourceForeground': basic.brightBlueBlack,
  'icon.foreground': uiDefaultFg,
  'input.foreground': uiDefaultFg,
  /** RGB=[218,242,194], HSV=[90,20,95] */
  'inputOption.activeBackground': '#daf2c2',
  'inputOption.activeBorder': uiThemeGreen,
  'keybindingLabel.foreground': uiDefaultFg,
  'list.activeSelectionBackground': bg.selectedText,
  'list.focusAndSelectionOutline': uiThemeGreen,
  'list.inactiveSelectionBackground': inactiveSelectedTextBg,
  /** RGB=[236,242,230], HSV=[90,5,95] */
  'list.hoverBackground': '#ecf2e6',
  'menu.selectionBackground': uiThemeGreen,
  /** RGB=[128,255,0], HSV=[90,100,100], Opacity=25% */
  'minimap.selectionHighlight': '#80ff0040',
  'notificationCenterHeader.foreground': uiDefaultFg,
  'notifications.foreground': uiDefaultFg,
  'panelTitle.activeBorder': uiThemeGreen,
  'panelTitle.activeForeground': uiDefaultFg,
  'panelTitle.inactiveForeground': uiDefaultFg,
  'peekViewEditor.background': peekViewBg,
  'peekViewEditor.matchHighlightBackground': bg.searchMatchedText,
  'peekViewResult.matchHighlightBackground': bg.searchMatchedText,
  'peekViewResult.selectionBackground': bg.selectedText,
  'progressBar.background': uiThemeGreen,
  'quickInput.foreground': uiDefaultFg,
  'selection.background': bg.selectedText,
  'settings.modifiedItemIndicator': uiThemeGreen,
  'sideBar.foreground': uiDefaultFg,
  'sideBarSectionHeader.foreground': uiDefaultFg,
  'sideBarTitle.foreground': uiDefaultFg,
  /** RGB=[255,192,128], HSV=[30,50,100] */
  'statusBar.debuggingBackground': '#ffc080',
  'statusBar.focusBorder': uiThemeGreen,
  'statusBar.foreground': uiDefaultFg,
  'statusBarItem.focusBorder': uiThemeGreen,
  'statusBarItem.remoteBackground': uiThemeGreen,
  'tab.activeBackground': bg.default,
  'tab.activeBorderTop': uiThemeGreen,
  'tab.activeForeground': fg.default,
  'terminal.foreground': fg.default,
  'terminal.background': bg.default,
  'terminal.ansiBlack': fg.ansiBlack,
  'terminal.ansiBrightBlack': fg.ansiBlack,
  'terminal.ansiWhite': fg.ansiWhite,
  'terminal.ansiBrightWhite': fg.ansiWhite,
  'terminal.ansiRed': fg.ansiRed,
  'terminal.ansiBrightRed': fg.ansiRed,
  'terminal.ansiYellow': fg.ansiYellow,
  'terminal.ansiBrightYellow': fg.ansiYellow,
  'terminal.ansiGreen': fg.ansiGreen,
  'terminal.ansiBrightGreen': fg.ansiGreen,
  'terminal.ansiCyan': fg.ansiCyan,
  'terminal.ansiBrightCyan': fg.ansiCyan,
  'terminal.ansiBlue': fg.ansiBlue,
  'terminal.ansiBrightBlue': fg.ansiBlue,
  'terminal.ansiMagenta': fg.ansiMagenta,
  'terminal.ansiBrightMagenta': fg.ansiMagenta,
  'terminal.tab.activeBorder': uiThemeGreen,
  'terminalCursor.foreground': fg.default,
  'terminalCursor.background': bg.default,
  'textCodeBlock.background': bg.alternative,
  'textLink.activeForeground': fg.hyperlink,
  'textLink.foreground': fg.hyperlink,
  'textPreformat.foreground': uiDefaultFg,
});

settings.semanticHighlighting = true;
settings.semanticTokenColors = {
  'class': fg.structLike,
  'enum': fg.structLike,
  'interface': fg.structLike,
  'struct': fg.structLike,
  'typeParameter': fg.structLike,
  'type': fg.structLike,
  'property': fg.instanceProperty,
  'property.static': fg.staticProperty,
  'enumMember': fg.staticProperty,
  'decorator': fg.annotation,
  'event': fg.instanceProperty,
  'macro': fg.macro,
  'label': fg.label,
  'comment': fg.comment,
  'string': fg.string,
  'keyword': fg.keyword,
  'number': fg.literalConstant,
  'regexp': fg.string,
  '*.deprecated': { 'fontStyle': 'strikethrough' },
};

settings.tokenColors = [
  {
    name: 'Comments',
    scope: [
      'comment',
      'string.quoted.docstring.multi',
    ],
    settings: { foreground: fg.comment },
  },
  {
    name: 'Comment Tags and Other Special Items',
    scope: [
      'comment storage',
      'keyword.other.documentation',
      'keyword.other.important',
      'meta.shebang',
      'punctuation.definition.string.heredoc.delimiter',
    ],
    settings: { foreground: fg.specialComment },
  },
  {
    name: 'Comment Tag Values',
    scope: [
      'comment entity.name.type',
      'comment variable',
      'comment source',
    ],
    settings: { foreground: fg.default },
  },
  {
    name: 'Literal Constants',
    scope: [
      'constant.numeric',
      'constant.character',
      'constant.language',
      'constant.other.color',
    ],
    settings: { foreground: fg.literalConstant },
  },
  {
    name: 'Constants',
    scope: [
      'support.constant',
      'constant.other.caps',
    ],
    settings: { foreground: fg.constant },
  },
  {
    name: 'Structure Like Items (Class, Interface, Enum, etc.)',
    scope: [
      'entity.name.type',
      'entity.other.inherited-class',
      'support.class',
    ],
    settings: { foreground: fg.structLike },
  },
  {
    name: 'Instance Properties',
    scope: [
      'support.type.property-name',
      'variable.other.object.property',
      'variable.other.property',
      'meta.record.identifier',
    ],
    settings: { foreground: fg.instanceProperty },
  },
  {
    name: 'Enum Members',
    scope: [
      'variable.other.enummember',
    ],
    settings: { foreground: fg.staticProperty },
  },
  {
    name: 'Annotations',
    scope: [
      'punctuation.definition.annotation',
      'storage.type.annotation',
      'entity.name.function.decorator',
    ],
    settings: { foreground: fg.annotation },
  },
  {
    name: 'Macros',
    scope: [
      'keyword.control.directive',
      'punctuation.definition.attribute',
      'punctuation.brackets.attribute',
    ],
    settings: { foreground: fg.macro },
  },
  {
    name: 'Labels',
    scope: [
      'entity.name.label',
      'variable.other.label',
    ],
    settings: { foreground: fg.label },
  },
  {
    name: 'Tags',
    scope: [
      'entity.name.tag',
      'entity.other.attribute-name.pseudo-class',
    ],
    settings: { foreground: fg.tag },
  },
  {
    name: 'Attribute Names',
    scope: [
      'entity.other.attribute-name',
      'entity.name.tag.yaml',
    ],
    settings: { foreground: fg.attributeKey },
  },
  {
    name: 'Invalid Items',
    scope: [
      'invalid',
    ],
    settings: { foreground: basic.red },
  },
  {
    name: 'Keywords',
    scope: [
      'keyword',
      'storage',
      'entity.name.command',
      'keyword.operator.new',
    ],
    settings: { foreground: fg.keyword },
  },
  {
    name: 'Primitive Types',
    scope: [
      'storage.type.primitive',
      'support.type.primitive',
      'entity.name.type.numeric',
    ],
    settings: { foreground: fg.keyword },
  },
  {
    name: 'Reserved Variables',
    scope: [
      'variable.language',
    ],
    settings: { foreground: fg.keyword },
  },
  {
    name: 'Global Variables',
    scope: [
      'variable.other.global',
      'variable.other.anchor',
      'variable.other.alias',
    ],
    settings: { foreground: fg.globalVariable },
  },
  {
    name: 'Operators',
    scope: [
      'keyword.operator',
    ],
    settings: { foreground: fg.default },
  },
  {
    name: 'Strings',
    scope: [
      'string',
    ],
    settings: { foreground: fg.string },
  },
  {
    name: 'String: Interpolation Punctuations',
    scope: [
      'punctuation.definition.template-expression',
      'punctuation.definition.interpolation',
    ],
    settings: { foreground: fg.stringInterpolation },
  },
  {
    name: 'String: Interpolation Items',
    scope: [
      'string variable',
    ],
    settings: { foreground: fg.default },
  },
  {
    name: 'String: Unquoted',
    scope: [
      'string.unquoted',
    ],
    settings: { foreground: fg.default },
  },
  {
    name: 'Hyperlinks',
    scope: [
      'variable.parameter.url',
      'markup.underline.link',
    ],
    settings: { foreground: fg.hyperlink },
  },
  {
    name: 'Markup: Bold Text',
    scope: [
      'markup.bold',
    ],
    settings: { fontStyle: 'bold' },
  },
  {
    name: 'Markup: Italic Text',
    scope: [
      'markup.italic',
    ],
    settings: { fontStyle: 'italic' },
  },
  {
    name: 'Markup: Bold and Italic Text',
    scope: [
      'markup.bold markup.italic',
      'markup.italic markup.bold',
    ],
    settings: { fontStyle: 'bold italic' },
  },
  {
    name: 'Markup: Strikethrough Text',
    scope: [
      'markup.strikethrough',
    ],
    settings: { fontStyle: 'strikethrough' },
  },
  {
    name: 'Markup: Underline Text',
    scope: [
      'markup.underline',
    ],
    settings: { fontStyle: 'underline' },
  },
  {
    name: 'Markup: Headings',
    scope: [
      'punctuation.definition.heading',
      'markup.heading',
    ],
    settings: { foreground: fg.markupHeading },
  },
  {
    name: 'Markup: List Punctuations',
    scope: [
      'punctuation.definition.list',
    ],
    settings: { foreground: fg.keyword },
  },
  {
    name: 'Markup: Raw Blocks, Code Blocks and Quote Blocks',
    scope: [
      'markup.inline.raw',
      'markup.fenced_code',
      'markup.raw',
      'markup.quote',
    ],
    settings: { foreground: fg.string },
  },
  {
    name: 'Markup: Link Titles and Descriptions',
    scope: [
      'string.other.link.title',
      'string.other.link.description',
    ],
    settings: { foreground: fg.string },
  },
];

export default settings;
