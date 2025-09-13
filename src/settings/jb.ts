import path from 'node:path';
import { JetbrainsAttributeSettingObject, JetbrainsColorSettingObject, JetbrainsScheme } from '../utils.ts';
import { basic, bg, fg, guideLine, gutter, stripe } from '../colors.ts';

/** RGB=[64,128,0], HSV=[90,100,50] */
const uiThemeGreen = '#408000';
/** RGB=[216,255,216], HSV=[120,15,100] */
const typeAutoCastBg = '#d8ffd8';
const overloadedOperator = fg.string;
const specialLabel = fg.string;
const shadowedVariable = fg.string;

const baseScheme = await JetbrainsScheme.parseFromXmlFile(path.join(
  import.meta.dirname!,
  '..',
  'base',
  'jb.xml',
));

const colors: JetbrainsColorSettingObject = {
  /** RGB=[172,216,196], HSV=[153,20,85] */
  'FOLDED_TEXT_BORDER_COLOR': '#acd8c4',
  'SOFT_WRAP_SIGN_COLOR': fg.default,
  'TABS': guideLine.indent,
  'WHITESPACES': fg.default,
  'INDENT_GUIDE': guideLine.indent,
  /** RGB=[96,192,96], HSV=[120,50,75] */
  'MATCHED_BRACES_INDENT_GUIDE_COLOR': '#60c060',
  'RIGHT_MARGIN_COLOR': guideLine.margin,
  'SELECTED_INDENT_GUIDE': guideLine.emphasizedIndent,
  'VISUAL_INDENT_GUIDE': guideLine.margin,
  'CARET_COLOR': fg.default,
  'CARET_ROW_COLOR': bg.cursorLine,
  'SELECTION_BACKGROUND': bg.selectedText,
  'LINE_NUMBERS_COLOR': fg.lineNumber,
  'LINE_NUMBER_ON_CARET_ROW_COLOR': fg.emphasizedLineNumber,
  'METHOD_SEPARATORS_COLOR': guideLine.indent,
  'TEARLINE_COLOR': guideLine.indent,
  'SELECTED_TEARLINE_COLOR': guideLine.emphasizedIndent,
  'DOC_COMMENT_LINK': fg.hyperlink,
  'DOC_COMMENT_GUIDE': guideLine.indent,
  'CONSOLE_BACKGROUND_KEY': bg.default,
  'BLOCK_TERMINAL_DEFAULT_BACKGROUND': bg.default,
  'BLOCK_TERMINAL_DEFAULT_FOREGROUND': fg.default,
  'DIFF_SEPARATOR_WAVE': guideLine.margin,
  'ANNOTATIONS_COLOR': fg.default,
  'ANNOTATIONS_LAST_COMMIT_COLOR': basic.darkBlueBlack,
  /** RGB=[160,248,160], HSV=[120,35,97] */
  'VCS_ANNOTATIONS_COLOR_1': '#a0f8a0',
  /** RGB=[200,250,200], HSV=[120,20,98] */
  'VCS_ANNOTATIONS_COLOR_2': '#c8fac8',
  /** RGB=[222,252,222], HSV=[120,12,99] */
  'VCS_ANNOTATIONS_COLOR_3': '#defcde',
  /** RGB=[237,250,237], HSV=[120,5,98] */
  'VCS_ANNOTATIONS_COLOR_4': '#edfaed',
  /** RGB=[248,250,248], HSV=[120,1,98] */
  'VCS_ANNOTATIONS_COLOR_5': '#f8faf8',
  'ADDED_LINES_COLOR': gutter.addedText,
  'IGNORED_ADDED_LINES_BORDER_COLOR': gutter.addedText,
  'MODIFIED_LINES_COLOR': gutter.modifiedText,
  'IGNORED_MODIFIED_LINES_BORDER_COLOR': gutter.modifiedText,
  'DELETED_LINES_COLOR': gutter.removedText,
  'IGNORED_DELETED_LINES_BORDER_COLOR': gutter.removedText,
  /** RGB=[255,192,0], HSV=[45,100,100] */
  'WHITESPACES_MODIFIED_LINES_COLOR': '#ffc000',
};

const attributes: JetbrainsAttributeSettingObject = {
  'TEXT': {
    'foreground': fg.default,
    'background': bg.default,
  },
  'FOLDED_TEXT_ATTRIBUTES': {
    'foreground': fg.foldedText,
    'background': bg.foldedText,
  },
  'TEXT_SEARCH_RESULT_ATTRIBUTES': {
    'foreground': fg.searchMatchedText,
    'background': bg.searchMatchedText,
    'errorStripeColor': stripe.searchMatchedText,
  },
  'LIVE_TEMPLATE_ATTRIBUTES': {
    'effectColor': uiThemeGreen,
  },
  'LIVE_TEMPLATE_INACTIVE_SEGMENT': {
    /** RGB=[192,192,192], HSV=[0,0,75] */
    'effectColor': '#c0c0c0',
  },
  'TEMPLATE_VARIABLE_ATTRIBUTES': {
    'foreground': fg.globalVariable,
  },
  'CTRL_CLICKABLE': {
    'foreground': fg.hyperlink,
    'effectColor': fg.hyperlink,
    'effectType': '1',
  },
  'FOLLOWED_HYPERLINK_ATTRIBUTES': {
    'foreground': basic.purple,
    'effectColor': basic.purple,
    'effectType': '1',
  },
  'HYPERLINK_ATTRIBUTES': {
    'foreground': fg.hyperlink,
    'effectColor': fg.hyperlink,
    'effectType': '1',
  },
  'DEPRECATED_ATTRIBUTES': {
    'effectColor': fg.default,
    'effectType': '3',
  },
  'MARKED_FOR_REMOVAL_ATTRIBUTES': {
    'effectColor': basic.red,
    'effectType': '3',
  },
  'ERRORS_ATTRIBUTES': {
    'background': bg.error,
    'errorStripeColor': stripe.error,
  },
  'WARNING_ATTRIBUTES': {
    'background': bg.warning,
    'errorStripeColor': stripe.warning,
  },
  'INFO_ATTRIBUTES': {
    'effectColor': basic.yellow,
    'effectType': '2',
    'errorStripeColor': stripe.weakWarning,
  },
  'TYPO': {
    'effectColor': basic.green,
    'effectType': '2',
  },
  'WRONG_REFERENCES_ATTRIBUTES': {
    'foreground': basic.red,
  },
  'NOT_USED_ELEMENT_ATTRIBUTES': {
    'foreground': fg.lessImportant,
    'errorStripeColor': stripe.weakWarning,
  },
  'BREADCRUMBS_CURRENT': {
    'foreground': fg.searchMatchedText,
    'background': bg.searchMatchedText,
  },
  'BREADCRUMBS_DEFAULT': {
    'foreground': fg.default,
  },
  'BREADCRUMBS_HOVERED': {
    'foreground': fg.default,
    'background': bg.selectedText,
  },
  'BREADCRUMBS_INACTIVE': {
    'foreground': fg.default,
  },
  'IDENTIFIER_UNDER_CARET_ATTRIBUTES': {
    /** RGB=[230,230,255], HSV=[240,10,100] */
    'background': '#e6e6ff',
    'errorStripeColor': stripe.cursorIndentifierRead,
  },
  'WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES': {
    /** RGB=[255,230,242], HSV=[331,10,100] */
    'background': '#ffe6f2',
    'errorStripeColor': stripe.cursorIndentifierWrite,
  },
  'INJECTED_LANGUAGE_FRAGMENT': {
    'background': bg.alternative,
  },
  'TODO_DEFAULT_ATTRIBUTES': {
    'foreground': fg.default,
    'background': bg.todo,
    /** RGB=[64,160,255], HSV=[210,75,100] */
    'errorStripeColor': '#40a0ff',
  },
  'MATCHED_BRACE_ATTRIBUTES': {
    'background': bg.matchedToken,
  },
  'UNMATCHED_BRACE_ATTRIBUTES': {
    'background': bg.error,
  },
  'DEFAULT_CLASS_NAME': {
    'foreground': fg.structLike,
  },
  'DEFAULT_CLASS_REFERENCE': {
    'foreground': fg.structLike,
  },
  'DEFAULT_INTERFACE_NAME': {
    'foreground': fg.structLike,
  },
  'DEFAULT_FUNCTION_DECLARATION': {},
  'DEFAULT_STATIC_METHOD': {
    'inherit': true,
  },
  'DEFAULT_INSTANCE_FIELD': {
    'foreground': fg.instanceProperty,
  },
  'DEFAULT_STATIC_FIELD': {
    'foreground': fg.staticProperty,
  },
  'DEFAULT_BLOCK_COMMENT': {
    'foreground': fg.comment,
  },
  'DEFAULT_LINE_COMMENT': {
    'foreground': fg.comment,
  },
  'DEFAULT_DOC_COMMENT': {
    'foreground': fg.comment,
  },
  'DEFAULT_DOC_COMMENT_TAG': {
    'foreground': fg.specialComment,
  },
  'DEFAULT_DOC_COMMENT_TAG_VALUE': {
    'foreground': fg.default,
  },
  'DEFAULT_DOC_MARKUP': {
    'background': bg.alternative,
  },
  'DOC_CODE_BLOCK': {
    'foreground': fg.default,
    'background': bg.alternative,
    'effectColor': fg.unimportant,
  },
  'DOC_CODE_INLINE': {
    'foreground': fg.default,
    'background': bg.alternative,
  },
  'DOC_TIPS_SHORTCUT': {
    'foreground': fg.default,
    'effectColor': fg.unimportant,
  },
  'DEFAULT_CONSTANT': {
    'foreground': fg.constant,
  },
  'DEFAULT_GLOBAL_VARIABLE': {
    'foreground': fg.globalVariable,
  },
  'DEFAULT_IDENTIFIER': {},
  'DEFAULT_LABEL': {
    'foreground': fg.label,
  },
  'DEFAULT_PREDEFINED_SYMBOL': {},
  'DEFAULT_REASSIGNED_LOCAL_VARIABLE': {
    'effectColor': fg.default,
    'effectType': '1',
  },
  'DEFAULT_REASSIGNED_PARAMETER': {
    'effectColor': fg.default,
    'effectType': '1',
  },
  'DEFAULT_KEYWORD': {
    'foreground': fg.keyword,
  },
  'DEFAULT_ATTRIBUTE': {
    'foreground': fg.attributeKey,
  },
  'DEFAULT_ENTITY': {
    'foreground': fg.literalConstant,
  },
  'DEFAULT_TAG': {
    'foreground': fg.tag,
  },
  'DEFAULT_METADATA': {
    'foreground': fg.annotation,
  },
  'DEFAULT_NUMBER': {
    'foreground': fg.literalConstant,
  },
  'DEFAULT_STRING': {
    'foreground': fg.string,
  },
  'DEFAULT_VALID_STRING_ESCAPE': {
    'foreground': fg.literalConstant,
  },
  'DEFAULT_INVALID_STRING_ESCAPE': {
    'background': bg.error,
  },
  'DEFAULT_TEMPLATE_LANGUAGE_COLOR': {
    'background': bg.alternative,
  },
  'CONSOLE_ERROR_OUTPUT': {
    'foreground': basic.red,
  },
  'CONSOLE_NORMAL_OUTPUT': {
    'foreground': fg.default,
  },
  'CONSOLE_SYSTEM_OUTPUT': {
    'foreground': fg.default,
  },
  'CONSOLE_USER_INPUT': {
    'foreground': fg.string,
  },
  'BLOCK_TERMINAL_BLACK': {
    'foreground': basic.blueBlack,
  },
  'BLOCK_TERMINAL_BLACK_BRIGHT': {
    'foreground': basic.blueBlack,
    'fontType': '1',
  },
  'BLOCK_TERMINAL_BLUE': {
    'foreground': basic.blue,
  },
  'BLOCK_TERMINAL_BLUE_BRIGHT': {
    'foreground': basic.blue,
    'fontType': '1',
  },
  'BLOCK_TERMINAL_COMMAND': {
    'foreground': basic.blueBlack,
    'fontType': '1',
  },
  'BLOCK_TERMINAL_CYAN': {
    'foreground': basic.cyan,
  },
  'BLOCK_TERMINAL_CYAN_BRIGHT': {
    'foreground': basic.cyan,
    'fontType': '1',
  },
  'BLOCK_TERMINAL_GREEN': {
    'foreground': basic.green,
  },
  'BLOCK_TERMINAL_GREEN_BRIGHT': {
    'foreground': basic.green,
    'fontType': '1',
  },
  'BLOCK_TERMINAL_MAGENTA': {
    'foreground': basic.pink,
  },
  'BLOCK_TERMINAL_MAGENTA_BRIGHT': {
    'foreground': basic.pink,
    'fontType': '1',
  },
  'BLOCK_TERMINAL_RED': {
    'foreground': basic.red,
  },
  'BLOCK_TERMINAL_RED_BRIGHT': {
    'foreground': basic.red,
    'fontType': '1',
  },
  'BLOCK_TERMINAL_WHITE': {
    'foreground': basic.brightBlueBlack,
  },
  'BLOCK_TERMINAL_WHITE_BRIGHT': {
    'foreground': basic.brightBlueBlack,
    'fontType': '1',
  },
  'BLOCK_TERMINAL_YELLOW': {
    'foreground': basic.yellow,
  },
  'BLOCK_TERMINAL_YELLOW_BRIGHT': {
    'foreground': basic.yellow,
    'fontType': '1',
  },
  'TERMINAL_COMMAND_TO_RUN_USING_IDE': {
    /** RGB=[200,250,200], HSV=[120,20,98] */
    'background': '#c8fac8',
  },
  'LOG_ERROR_OUTPUT': {
    'foreground': basic.red,
  },
  'LOG_WARNING_OUTPUT': {
    'foreground': basic.yellow,
  },
  'LOG_INFO_OUTPUT': {
    'foreground': basic.green,
  },
  'LOG_DEBUG_OUTPUT': {
    'foreground': basic.cyan,
  },
  'LOG_VERBOSE_OUTPUT': {
    'foreground': basic.blue,
  },
  'LOG_EXPIRED_ENTRY': {
    'foreground': fg.lessImportant,
  },
  'CONSOLE_BLACK_OUTPUT': {
    'foreground': fg.ansiBlack,
  },
  'CONSOLE_DARKGRAY_OUTPUT': {
    'foreground': fg.ansiBlack,
    'fontType': '1',
  },
  'CONSOLE_GRAY_OUTPUT': {
    'foreground': fg.ansiWhite,
  },
  'CONSOLE_WHITE_OUTPUT': {
    'foreground': fg.ansiWhite,
    'fontType': '1',
  },
  'CONSOLE_RED_OUTPUT': {
    'foreground': fg.ansiRed,
  },
  'CONSOLE_RED_BRIGHT_OUTPUT': {
    'foreground': fg.ansiRed,
    'fontType': '1',
  },
  'CONSOLE_YELLOW_OUTPUT': {
    'foreground': fg.ansiYellow,
  },
  'CONSOLE_YELLOW_BRIGHT_OUTPUT': {
    'foreground': fg.ansiYellow,
    'fontType': '1',
  },
  'CONSOLE_GREEN_OUTPUT': {
    'foreground': fg.ansiGreen,
  },
  'CONSOLE_GREEN_BRIGHT_OUTPUT': {
    'foreground': fg.ansiGreen,
    'fontType': '1',
  },
  'CONSOLE_CYAN_OUTPUT': {
    'foreground': fg.ansiCyan,
  },
  'CONSOLE_CYAN_BRIGHT_OUTPUT': {
    'foreground': fg.ansiCyan,
    'fontType': '1',
  },
  'CONSOLE_BLUE_OUTPUT': {
    'foreground': fg.ansiBlue,
  },
  'CONSOLE_BLUE_BRIGHT_OUTPUT': {
    'foreground': fg.ansiBlue,
    'fontType': '1',
  },
  'CONSOLE_MAGENTA_OUTPUT': {
    'foreground': fg.ansiMagenta,
  },
  'CONSOLE_MAGENTA_BRIGHT_OUTPUT': {
    'foreground': fg.ansiMagenta,
    'fontType': '1',
  },
  'DIFF_CONFLICT': {
    /** RGB=[242,216,206], HSV=[17,15,95] */
    'background': '#f2d8ce',
    /** RGB=[255,160,128], HSV=[15,50,100] */
    'errorStripeColor': '#ffa080',
  },
  'DIFF_DELETED': {
    'background': bg.removedText,
    /** RGB=[192,192,192], HSV=[0,0,75] */
    'errorStripeColor': '#c0c0c0',
  },
  'DIFF_INSERTED': {
    'background': bg.addedText,
    'errorStripeColor': stripe.addedText,
  },
  'DIFF_MODIFIED': {
    'background': bg.modifiedText,
    'errorStripeColor': stripe.modifiedText,
  },
  'CUSTOM_LINE_COMMENT_ATTRIBUTES': {
    'inherit': true,
  },
  'CUSTOM_MULTI_LINE_COMMENT_ATTRIBUTES': {
    'inherit': true,
  },
  'CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES': {
    'inherit': true,
  },
  'CUSTOM_INVALID_STRING_ESCAPE_ATTRIBUTES': {
    'inherit': true,
  },
  'CUSTOM_KEYWORD2_ATTRIBUTES': {
    'foreground': basic.purple,
  },
  'CUSTOM_KEYWORD3_ATTRIBUTES': {
    'foreground': basic.pink,
  },
  'CUSTOM_KEYWORD4_ATTRIBUTES': {
    'foreground': basic.darkRed,
  },
  'ANNOTATION_ATTRIBUTE_NAME_ATTRIBUTES': {
    'foreground': fg.attributeKey,
  },
  'CONSTRUCTOR_CALL_ATTRIBUTES': {
    'foreground': fg.structLike,
  },
  'CONSTRUCTOR_DECLARATION_ATTRIBUTES': {
    'foreground': fg.structLike,
  },
  'IMPLICIT_ANONYMOUS_CLASS_PARAMETER_ATTRIBUTES': {},
  'TYPE_PARAMETER_NAME_ATTRIBUTES': {
    'foreground': fg.structLike,
  },
  'LOGCAT_V2_MESSAGE_ASSERT': {
    'foreground': basic.darkRed,
  },
  'LOGCAT_V2_MESSAGE_DEBUG': {
    'foreground': basic.cyan,
  },
  'LOGCAT_V2_MESSAGE_ERROR': {
    'foreground': basic.red,
  },
  'LOGCAT_V2_MESSAGE_INFO': {
    'foreground': basic.green,
  },
  'LOGCAT_V2_MESSAGE_VERBOSE': {
    'foreground': fg.default,
  },
  'LOGCAT_V2_MESSAGE_WARNING': {
    'foreground': basic.yellow,
  },
  'CSS.ATTRIBUTE_NAME': {
    'foreground': fg.attributeKey,
  },
  'CSS.CLASS_NAME': {
    'foreground': fg.structLike,
  },
  'CSS.COLOR': {
    'foreground': fg.literalConstant,
  },
  'CSS.FUNCTION': {},
  'CSS.IMPORTANT': {
    'foreground': fg.specialComment,
  },
  'CSS.PROPERTY_VALUE': {},
  'CSS.UNICODE.RANGE': {
    'foreground': fg.literalConstant,
  },
  'CSS.URL': {
    'foreground': fg.hyperlink,
    'effectColor': fg.hyperlink,
    'effectType': '1',
  },
  'DART_CONSTRUCTOR': {
    'inherit': true,
  },
  'DART_ENUM_CONSTANT': {
    'foreground': fg.staticProperty,
  },
  'CONSOLE_RANGE_TO_EXECUTE': {
    'effectColor': uiThemeGreen,
  },
  'EDITORCONFIG_PROPERTY_VALUE': {},
  'Closure braces': {},
  'Instance property reference ID': {
    'inherit': true,
  },
  'List/map to object conversion': {
    'foreground': fg.structLike,
  },
  'Map key': {
    'foreground': fg.instanceProperty,
  },
  'Static property reference ID': {
    'inherit': true,
  },
  'Unresolved reference access': {
    'inherit': true,
  },
  'HTTP_REQUEST_MULTIPART_BOUNDARY': {
    'foreground': fg.specialComment,
  },
  'HTTP_REQUEST_PARAMETER_NAME': {
    'foreground': fg.attributeKey,
  },
  'HTTP_REQUEST_PARAMETER_VALUE': {},
  'JS.GLOBAL_FUNCTION': {
    'inherit': true,
  },
  'JS.GLOBAL_VARIABLE': {
    'inherit': true,
  },
  'JS.INSTANCE_MEMBER_FUNCTION': {
    'inherit': true,
  },
  'JS.JSX_CLIENT_COMPONENT': {
    'foreground': fg.structLike,
  },
  'JS.LOCAL_VARIABLE': {
    'inherit': true,
  },
  'JS.PARAMETER': {
    'inherit': true,
  },
  'JS.REGEXP': {
    'foreground': fg.literalConstant,
  },
  'JS.TEMPLATE_LITERAL_PLACEHOLDER_DELIMITERS': {
    'foreground': fg.stringInterpolation,
  },
  'JavaScript:INJECTED_LANGUAGE_FRAGMENT': {
    'inherit': true,
  },
  'JSON.KEYWORD': {
    'foreground': fg.literalConstant,
  },
  'KOTLIN_BACKING_FIELD_VARIABLE': {},
  'KOTLIN_CLOSURE_DEFAULT_PARAMETER': {
    'foreground': fg.keyword,
  },
  'KOTLIN_CONSTRUCTOR': {
    'foreground': fg.structLike,
  },
  'KOTLIN_DYNAMIC_FUNCTION_CALL': {},
  'KOTLIN_DYNAMIC_PROPERTY_CALL': {},
  'KOTLIN_FUNCTION_LITERAL_BRACES_AND_ARROW': {},
  'KOTLIN_LABEL': {
    'inherit': true,
  },
  'KOTLIN_MUTABLE_VARIABLE': {
    'effectColor': fg.default,
    'effectType': '1',
  },
  'KOTLIN_NAMED_ARGUMENT': {
    'foreground': fg.attributeKey,
  },
  'KOTLIN_SMART_CAST_RECEIVER': {
    'background': typeAutoCastBg,
  },
  'KOTLIN_SMART_CAST_VALUE': {
    'background': typeAutoCastBg,
  },
  'KOTLIN_SMART_CONSTANT': {
    'background': typeAutoCastBg,
  },
  'KOTLIN_WRAPPED_INTO_REF': {},
  'com.intellij.kubernetes.boolean': {
    'foreground': fg.literalConstant,
  },
  'LESS_VARIABLE': {
    'foreground': fg.globalVariable,
  },
  'LOMBOK_KEY': {
    'foreground': fg.attributeKey,
  },
  'LOMBOK_VALUE': {},
  'MARKDOWN_HEADER_LEVEL_1': {
    'foreground': fg.markupHeading,
  },
  'MARKDOWN_HEADER_LEVEL_2': {
    'foreground': fg.markupHeading,
  },
  'MARKDOWN_HEADER_LEVEL_3': {
    'foreground': fg.markupHeading,
  },
  'MARKDOWN_HEADER_LEVEL_4': {
    'foreground': fg.markupHeading,
  },
  'MARKDOWN_HEADER_LEVEL_5': {
    'foreground': fg.markupHeading,
  },
  'MARKDOWN_HEADER_LEVEL_6': {
    'foreground': fg.markupHeading,
  },
  'MARKDOWN_HTML_BLOCK': {
    'background': bg.alternative,
  },
  'MARKDOWN_INLINE_HTML': {
    'background': bg.alternative,
  },
  'MARKDOWN_LINK_DESTINATION': {
    'foreground': fg.hyperlink,
    'effectColor': fg.hyperlink,
    'effectType': '1',
  },
  'MARKDOWN_LINK_LABEL': {
    'foreground': fg.literalConstant,
  },
  'MARKDOWN_LINK_TEXT': {
    'foreground': fg.string,
  },
  'MONGODB.JSON.KEYWORD': {
    'foreground': fg.literalConstant,
  },
  'PROPERTIES.KEY': {
    'foreground': fg.attributeKey,
  },
  'PROPERTIES.VALUE': {},
  'PROTOTEXT_ENUM_VALUE': {
    'foreground': fg.staticProperty,
  },
  'PROTO_ENUM_VALUE': {
    'foreground': fg.staticProperty,
  },
  'org.rust.ASSOC_FUNCTION': {
    'inherit': true,
  },
  'org.rust.ASSOC_FUNCTION_CALL': {
    'inherit': true,
  },
  'org.rust.ASSOC_TRAIT_FUNCTION': {
    'inherit': true,
  },
  'org.rust.ASSOC_TRAIT_FUNCTION_CALL': {
    'inherit': true,
  },
  'org.rust.CFG_DISABLED_CODE': {
    'foreground': fg.lessImportant,
  },
  'org.rust.CRATE': {
    'inherit': true,
  },
  'org.rust.DOC_CODE': {
    'foreground': fg.default,
    'background': bg.alternative,
  },
  'org.rust.ENUM': {
    'inherit': true,
  },
  'org.rust.ENUM_VARIANT': {
    'inherit': true,
  },
  'org.rust.FORMAT_PARAMETER': {
    'foreground': fg.stringInterpolation,
  },
  'org.rust.FUNCTION': {
    'inherit': true,
  },
  'org.rust.FUNCTION_CALL': {
    'inherit': true,
  },
  'org.rust.LIFETIME': {
    'foreground': specialLabel,
  },
  'org.rust.MACRO': {
    'foreground': fg.macro,
  },
  'org.rust.MACRO_BINDING_IDENTIFIER': {
    'foreground': fg.keyword,
  },
  'org.rust.METHOD': {
    'inherit': true,
  },
  'org.rust.METHOD_CALL': {
    'inherit': true,
  },
  'org.rust.MUT_BINDING': {
    'effectColor': fg.default,
    'effectType': '1',
  },
  'org.rust.MUT_SELF_PARAMETER': {
    'foreground': fg.keyword,
    'effectColor': fg.default,
    'effectType': '1',
  },
  'org.rust.Q_OPERATOR': {
    'inherit': true,
  },
  'org.rust.SELF_EXPRESSION': {
    'inherit': true,
  },
  'org.rust.SELF_PARAMETER': {
    'inherit': true,
  },
  'org.rust.STRUCT': {
    'inherit': true,
  },
  'org.rust.TRAIT': {
    'inherit': true,
  },
  'org.rust.TRAIT_METHOD': {
    'inherit': true,
  },
  'org.rust.TRAIT_METHOD_CALL': {
    'inherit': true,
  },
  'org.rust.STATIC': {
    'foreground': fg.globalVariable,
  },
  'org.rust.TYPE_ALIAS': {
    'inherit': true,
  },
  'org.rust.TYPE_PARAMETER': {
    'foreground': fg.structLike,
  },
  'org.rust.UNION': {
    'inherit': true,
  },
  'org.rust.UNSAFE_CODE': {
    /** RGB=[255,236,216], HSV=[31,15,100] */
    'background': '#ffecd8',
  },
  'SASS_VARIABLE': {
    'foreground': fg.globalVariable,
  },
  'BASH.CONDITIONAL': {},
  'BASH.EXTERNAL_COMMAND': {
    'foreground': fg.keyword,
  },
  'BASH.FUNCTION_DEF_NAME': {
    'inherit': true,
  },
  'BASH.SHEBANG': {
    'foreground': fg.specialComment,
  },
  'org.toml.BOOLEAN': {
    'foreground': fg.literalConstant,
  },
  'org.toml.KEY': {
    'foreground': fg.attributeKey,
  },
  'TS.TYPE_GUARD': {
    'background': typeAutoCastBg,
  },
  'TS.TYPE_PARAMETER': {
    'foreground': fg.structLike,
  },
  'XML_PROLOGUE': {
    'foreground': fg.keyword,
  },
  'YAML_ANCHOR': {
    'foreground': fg.globalVariable,
  },
  'YAML_SCALAR_KEY': {
    'foreground': fg.attributeKey,
  },
  'com.jetbrains.cmake.ARGUMENT_KEYWORD': {
    'foreground': fg.staticProperty,
  },
  'com.jetbrains.cmake.ARGUMENT_PROPERTY': {
    'foreground': fg.instanceProperty,
  },
  'com.jetbrains.cmake.COMMAND': {
    'foreground': fg.keyword,
  },
  'Doxygen Parameter': {
    'inherit': true,
  },
  'OC.CONDITIONALLY_NOT_COMPILED': {
    'foreground': fg.lessImportant,
  },
  'OC.ENUM_CONST': {
    'foreground': fg.staticProperty,
  },
  'OC.MACRONAME': {
    'foreground': fg.default,
  },
  'OC.MACRO_PARAMETER': {
    'foreground': fg.globalVariable,
  },
  'OC.NAMESPACE_LIKE': {},
  'OC.OVERLOADED_OPERATOR': {
    'foreground': overloadedOperator,
  },
  'OC.STRUCT_FIELD': {
    'foreground': fg.instanceProperty,
  },
  'OC.STRUCT_LIKE': {
    'foreground': fg.structLike,
  },
  'OC.TEMPLATE_VALUE': {
    'foreground': fg.constant,
  },
  'OC.TYPEDEF': {
    'foreground': fg.structLike,
  },
  'GO_BUILTIN_CONSTANT': {
    'foreground': fg.literalConstant,
  },
  'GO_BUILTIN_TYPE_REFERENCE': {
    'foreground': fg.keyword,
  },
  'GO_BUILTIN_VARIABLE': {
    'foreground': fg.literalConstant,
  },
  'GO_COMMENT_REFERENCE': {
    'foreground': fg.default,
  },
  'GO_LOCAL_CONSTANT': {},
  'GO_PACKAGE_EXPORTED_VARIABLE_CALL': {
    'foreground': fg.globalVariable,
  },
  'GO_PACKAGE_LOCAL_VARIABLE': {
    'foreground': fg.globalVariable,
  },
  'GO_PACKAGE_LOCAL_VARIABLE_CALL': {
    'foreground': fg.globalVariable,
  },
  'GO_SHADOWING_VARIABLE': {
    'foreground': shadowedVariable,
  },
  'GO_STRUCT_EXPORTED_MEMBER': {
    'foreground': fg.instanceProperty,
  },
  'GO_STRUCT_EXPORTED_MEMBER_CALL': {
    'foreground': fg.instanceProperty,
  },
  'GO_STRUCT_LOCAL_MEMBER': {
    'foreground': fg.instanceProperty,
  },
  'GO_STRUCT_LOCAL_MEMBER_CALL': {
    'foreground': fg.instanceProperty,
  },
  'GO_TAG_KEY': {
    'foreground': fg.attributeKey,
  },
  'com.plan9.INSTRUCTION': {
    'foreground': fg.keyword,
  },
  'com.plan9.LABEL': {
    'inherit': true,
  },
  'com.plan9.REGISTER': {
    'foreground': fg.globalVariable,
  },
  'DOC_TEMPLATE_PARAMETER': {
    'foreground': fg.default,
  },
  'DQL_EXPR': {
    'background': bg.alternative,
  },
  'DQL_PLACEHOLDER': {
    'foreground': fg.default,
    'effectColor': fg.default,
    'effectType': '1',
  },
  'PHP_ALIAS_REFERENCE': {
    'inherit': true,
  },
  'PHP_EXEC_COMMAND_ID': {
    'foreground': fg.keyword,
    'background': bg.alternative,
  },
  'PHP_HEREDOC_ID': {
    'foreground': fg.specialComment,
  },
  'PHP_NAMED_ARGUMENT': {
    'foreground': fg.attributeKey,
  },
  'PHP_PARAMETER': {
    'inherit': true,
  },
  'PHP_THIS_VAR': {
    'foreground': fg.keyword,
  },
  'PHP_VAR': {
    'inherit': true,
  },
  'PY.ANNOTATION': {
    'foreground': fg.structLike,
  },
  'PY.BUILTIN_NAME': {
    'foreground': fg.keyword,
  },
  'PY.FSTRING_FRAGMENT_BRACES': {
    'foreground': fg.stringInterpolation,
  },
  'PY.FSTRING_FRAGMENT_COLON': {
    'foreground': fg.stringInterpolation,
  },
  'PY.FSTRING_FRAGMENT_TYPE_CONVERSION': {
    'foreground': fg.stringInterpolation,
  },
  'PY.KEYWORD_ARGUMENT': {
    'foreground': fg.attributeKey,
  },
  'PY.PREDEFINED_DEFINITION': {
    'foreground': fg.constant,
  },
  'PY.PREDEFINED_USAGE': {
    'foreground': fg.constant,
  },
  'PY.SELF_PARAMETER': {
    'foreground': fg.keyword,
  },
  'PY.STRING.B': {
    'inherit': true,
  },
  'PY.TYPE_PARAMETER': {
    'foreground': fg.structLike,
  },
  'ReSharper.CSHARP_OVERLOADED_OPERATOR': {
    'foreground': overloadedOperator,
  },
  'ReSharper.CSHARP_PREPROCESSOR_KEYWORD': {
    'foreground': fg.macro,
  },
  'ReSharper.CSHARP_STATIC_PROPERTY_IDENTIFIER': {
    'foreground': fg.staticProperty,
  },
  'ReSharper.STRING_ESCAPE_CHARACTER_2': {
    'foreground': fg.literalConstant,
  },
  'RUBY_EXPR_IN_STRING': {
    'foreground': fg.stringInterpolation,
  },
  'RUBY_GVAR': {
    'inherit': true,
  },
  'RUBY_HASH_ASSOC': {},
  'RUBY_HEREDOC_CONTENT': {
    'foreground': fg.string,
  },
  'RUBY_HEREDOC_ID': {
    'foreground': fg.specialComment,
  },
  'RUBY_LINE_CONTINUATION': {
    /** RGB=[240,240,240], HSV=[0,0,94] */
    'background': '#f0f0f0',
  },
  'RUBY_LOCAL_VAR_ID': {
    'inherit': true,
  },
  'RUBY_METHOD_NAME': {
    'inherit': true,
  },
  'RUBY_NTH_REF': {
    'inherit': true,
  },
  'RUBY_PARAMETER_ID': {
    'inherit': true,
  },
  'RUBY_REGEXP': {
    'foreground': fg.literalConstant,
  },
  'COFFEESCRIPT.BOOLEAN': {
    'foreground': fg.literalConstant,
  },
  'COFFEESCRIPT.CLASS_NAME': {
    'foreground': fg.structLike,
  },
  'COFFEESCRIPT.EXPRESSIONS_SUBSTITUTION_MARK': {
    'foreground': fg.stringInterpolation,
  },
  'COFFEESCRIPT.FUNCTION_BINDING': {},
  'COFFEESCRIPT.FUNCTION_NAME': {
    'inherit': true,
  },
  'COFFEESCRIPT.REGULAR_EXPRESSION_CONTENT': {
    'foreground': fg.literalConstant,
  },
  'COFFEESCRIPT.REGULAR_EXPRESSION_FLAG': {
    'foreground': fg.literalConstant,
  },
  'COFFEESCRIPT.REGULAR_EXPRESSION_ID': {
    'foreground': fg.literalConstant,
  },
};

export default baseScheme.mergeSettingObject(colors, attributes);
