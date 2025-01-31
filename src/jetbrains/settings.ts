import { EffectType, FontType, INHERIT_ATTRIBUTE, NO_COLOR, REMOVE_ATTRIBUTE, SettingValue } from './common.ts';

const settings: Record<string, SettingValue> = {
  //#region General
  TEXT: {
    FOREGROUND: 'fg.默认',
    BACKGROUND: 'bg.默认',
  },
  FOLDED_TEXT_ATTRIBUTES: {
    FOREGROUND: 'fg.折叠文本',
    BACKGROUND: 'bg.折叠文本',
    EFFECT_TYPE: EffectType.UNDERLINE,
  },
  FOLDED_TEXT_BORDER_COLOR: 'bg.带高亮的折叠文本',
  SOFT_WRAP_SIGN_COLOR: 'fg.默认',
  TABS: 'line.缩进对齐线',
  WHITESPACES: 'fg.默认',

  TEXT_SEARCH_RESULT_ATTRIBUTES: {
    FOREGROUND: 'fg.文本搜索结果',
    BACKGROUND: 'bg.文本搜索结果',
    ERROR_STRIPE_COLOR: 'stripe.文本搜索结果',
  },
  SEARCH_RESULT_ATTRIBUTES: {
    BACKGROUND: 'bg.标识符搜索结果_读',
  },
  WRITE_SEARCH_RESULT_ATTRIBUTES: {
    BACKGROUND: 'bg.标识符搜索结果_写',
  },

  LIVE_TEMPLATE_ATTRIBUTES: {
    EFFECT_COLOR: 'fg.默认',
  },
  LIVE_TEMPLATE_INACTIVE_SEGMENT: {
    EFFECT_COLOR: 'fg.次要文本',
  },
  TEMPLATE_VARIABLE_ATTRIBUTES: {
    FOREGROUND: 'fg.全局变量',
  },

  CTRL_CLICKABLE: {
    FOREGROUND: 'fg.链接',
    EFFECT_COLOR: 'fg.链接',
    EFFECT_TYPE: EffectType.UNDERLINE,
  },
  HYPERLINK_ATTRIBUTES: {
    FOREGROUND: 'fg.链接',
    EFFECT_COLOR: 'fg.链接',
    EFFECT_TYPE: EffectType.UNDERLINE,
  },
  FOLLOWED_HYPERLINK_ATTRIBUTES: {
    FOREGROUND: 'fg.已跟踪链接',
    EFFECT_COLOR: 'fg.已跟踪链接',
    EFFECT_TYPE: EffectType.UNDERLINE,
  },
  INACTIVE_HYPERLINK_ATTRIBUTES: {
    EFFECT_COLOR: 'fg.默认',
    EFFECT_TYPE: EffectType.UNDERLINE,
  },

  ERRORS_ATTRIBUTES: {
    BACKGROUND: 'bg.错误',
    ERROR_STRIPE_COLOR: 'stripe.错误',
    EFFECT_TYPE: EffectType.UNDERWAVE,
  },
  WARNING_ATTRIBUTES: {
    BACKGROUND: 'bg.警告',
    ERROR_STRIPE_COLOR: 'stripe.警告',
    EFFECT_TYPE: EffectType.UNDERLINE,
  },
  INFO_ATTRIBUTES: {
    EFFECT_COLOR: 'fg.弱警告',
    ERROR_STRIPE_COLOR: 'stripe.弱警告',
    EFFECT_TYPE: EffectType.UNDERWAVE,
  },
  NOT_USED_ELEMENT_ATTRIBUTES: {
    FOREGROUND: 'fg.未使用代码',
    ERROR_STRIPE_COLOR: 'stripe.弱警告',
  },
  WRONG_REFERENCES_ATTRIBUTES: {
    FOREGROUND: 'fg.未知符号',
  },
  TYPO: {
    EFFECT_COLOR: 'fg.拼写错误',
    EFFECT_TYPE: EffectType.UNDERWAVE,
  },

  CARET_COLOR: 'fg.黑',
  CARET_ROW_COLOR: 'bg.当前行',
  SELECTION_BACKGROUND: 'bg.选中文本',
  BOOKMARKS_ATTRIBUTES: {
    ERROR_STRIPE_COLOR: 'stripe.书签',
  },
  INDENT_GUIDE: 'line.缩进对齐线',
  VISUAL_INDENT_GUIDE: 'line.缩进对齐线',
  SELECTED_INDENT_GUIDE: 'line.光标下缩进对齐线',
  MATCHED_BRACES_INDENT_GUIDE_COLOR: 'line.光标下括号对应的缩进对齐线',
  RIGHT_MARGIN_COLOR: 'line.行宽对齐线',
  BREADCRUMBS_DEFAULT: {
    FOREGROUND: 'fg.默认',
  },
  BREADCRUMBS_INACTIVE: {
    FOREGROUND: 'fg.默认',
  },
  BREADCRUMBS_HOVERED: {
    FOREGROUND: 'fg.默认',
    BACKGROUND: 'bg.光标下面包屑标签',
  },
  BREADCRUMBS_CURRENT: {
    FOREGROUND: 'fg.默认',
    BACKGROUND: 'bg.已选中面包屑标签',
  },

  LINE_NUMBERS_COLOR: 'fg.次要文本',
  LINE_NUMBER_ON_CARET_ROW_COLOR: 'fg.默认',
  METHOD_SEPARATORS_COLOR: 'line.函数分隔线',
  IDENTIFIER_UNDER_CARET_ATTRIBUTES: {
    BACKGROUND: 'bg.光标下标识符_读',
    ERROR_STRIPE_COLOR: 'stripe.光标下标识符_读',
  },
  WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES: {
    BACKGROUND: 'bg.光标下标识符_写',
    ERROR_STRIPE_COLOR: 'stripe.光标下标识符_写',
  },
  INJECTED_LANGUAGE_FRAGMENT: {
    BACKGROUND: 'bg.嵌入代码',
  },
  MATCHED_BRACE_ATTRIBUTES: {
    BACKGROUND: 'bg.成对括号',
  },
  UNMATCHED_BRACE_ATTRIBUTES: {
    BACKGROUND: 'bg.非成对括号',
  },
  TODO_DEFAULT_ATTRIBUTES: {
    FOREGROUND: 'fg.黑',
    BACKGROUND: 'bg.待办事项',
    ERROR_STRIPE_COLOR: 'stripe.待办事项',
  },
  //#endregion

  //#region Language Defaults
  DEFAULT_KEYWORD: {
    FOREGROUND: 'fg.关键字',
  },
  DEFAULT_IDENTIFIER: {
    FOREGROUND: 'fg.标识符',
  },
  DEFAULT_STRING: {
    FOREGROUND: 'fg.字符串',
  },
  DEFAULT_VALID_STRING_ESCAPE: {
    FOREGROUND: 'fg.转义字符',
  },
  DEFAULT_INVALID_STRING_ESCAPE: {
    FOREGROUND: 'fg.转义字符',
    BACKGROUND: 'bg.无效转义字符',
  },
  DEFAULT_NUMBER: {
    FOREGROUND: 'fg.数字',
  },
  DEFAULT_LINE_COMMENT: {
    FOREGROUND: 'fg.注释',
  },
  DEFAULT_BLOCK_COMMENT: {
    FOREGROUND: 'fg.注释',
  },
  DEFAULT_DOC_COMMENT: {
    FOREGROUND: 'fg.注释',
  },
  DEFAULT_DOC_COMMENT_TAG: {
    FOREGROUND: 'fg.特殊注释',
  },
  DEFAULT_DOC_COMMENT_TAG_VALUE: {
    FOREGROUND: 'fg.默认',
  },
  DEFAULT_DOC_MARKUP: {
    BACKGROUND: 'bg.嵌入代码',
  },
  DOC_COMMENT_GUIDE: 'line.缩进对齐线',
  DOC_COMMENT_LINK: 'fg.链接',
  DOC_CODE_BLOCK: {
    FOREGROUND: 'fg.默认',
    BACKGROUND: 'bg.嵌入代码',
    EFFECT_COLOR: 'fg.次要文本',
  },
  DOC_CODE_INLINE: {
    FOREGROUND: 'fg.默认',
    BACKGROUND: 'bg.嵌入代码',
  },
  DOC_TIPS_SHORTCUT: {
    FOREGROUND: 'fg.默认',
    EFFECT_COLOR: 'fg.次要文本',
  },
  DEFAULT_CLASS_NAME: {
    FOREGROUND: 'fg.类名',
  },
  DEFAULT_CLASS_REFERENCE: {
    FOREGROUND: 'fg.类名',
  },
  DEFAULT_INTERFACE_NAME: {
    FOREGROUND: 'fg.类名',
  },
  DEFAULT_INSTANCE_FIELD: {
    FOREGROUND: 'fg.成员属性',
  },
  DEFAULT_STATIC_FIELD: {
    FOREGROUND: 'fg.静态属性',
  },
  DEFAULT_STATIC_METHOD: INHERIT_ATTRIBUTE,
  DEFAULT_FUNCTION_CALL: REMOVE_ATTRIBUTE,
  DEFAULT_FUNCTION_DECLARATION: REMOVE_ATTRIBUTE,
  DEFAULT_CONSTANT: {
    FOREGROUND: 'fg.常量',
  },
  DEFAULT_GLOBAL_VARIABLE: {
    FOREGROUND: 'fg.全局变量',
  },
  DEFAULT_LABEL: {
    FOREGROUND: 'fg.跳转标签',
  },
  DEFAULT_PREDEFINED_SYMBOL: INHERIT_ATTRIBUTE,
  DEFAULT_REASSIGNED_LOCAL_VARIABLE: {
    EFFECT_COLOR: 'fg.标识符',
    EFFECT_TYPE: EffectType.UNDERLINE,
  },
  DEFAULT_REASSIGNED_PARAMETER: {
    EFFECT_COLOR: 'fg.标识符',
    EFFECT_TYPE: EffectType.UNDERLINE,
  },
  DEFAULT_ATTRIBUTE: {
    FOREGROUND: 'fg.标记语言属性',
  },
  DEFAULT_ENTITY: {
    FOREGROUND: 'fg.标记语言实体',
  },
  DEFAULT_METADATA: {
    FOREGROUND: 'fg.注解',
  },
  DEFAULT_TEMPLATE_LANGUAGE_COLOR: {
    BACKGROUND: 'bg.模板语言',
  },
  //#endregion

  //#region Console Colors
  CONSOLE_BACKGROUND_KEY: NO_COLOR,
  CONSOLE_NORMAL_OUTPUT: {},
  CONSOLE_SYSTEM_OUTPUT: {},
  CONSOLE_ERROR_OUTPUT: {
    FOREGROUND: 'fg.终端错误输出',
  },
  CONSOLE_USER_INPUT: {
    FOREGROUND: 'fg.终端用户输入',
  },
  CONSOLE_BLACK_OUTPUT: {
    FOREGROUND: 'fg.黑',
  },
  CONSOLE_DARKGRAY_OUTPUT: {
    FOREGROUND: 'fg.黑',
    FONT_TYPE: FontType.BOLD,
  },
  CONSOLE_GRAY_OUTPUT: {
    FOREGROUND: 'fg.白',
  },
  CONSOLE_WHITE_OUTPUT: {
    FOREGROUND: 'fg.白',
    FONT_TYPE: FontType.BOLD,
  },
  CONSOLE_RED_BRIGHT_OUTPUT: {
    FOREGROUND: 'fg.红',
    FONT_TYPE: FontType.BOLD,
  },
  CONSOLE_RED_OUTPUT: {
    FOREGROUND: 'fg.红',
  },
  CONSOLE_YELLOW_BRIGHT_OUTPUT: {
    FOREGROUND: 'fg.黄',
    FONT_TYPE: FontType.BOLD,
  },
  CONSOLE_YELLOW_OUTPUT: {
    FOREGROUND: 'fg.黄',
  },
  CONSOLE_GREEN_BRIGHT_OUTPUT: {
    FOREGROUND: 'fg.绿',
    FONT_TYPE: FontType.BOLD,
  },
  CONSOLE_GREEN_OUTPUT: {
    FOREGROUND: 'fg.绿',
  },
  CONSOLE_CYAN_BRIGHT_OUTPUT: {
    FOREGROUND: 'fg.青',
    FONT_TYPE: FontType.BOLD,
  },
  CONSOLE_CYAN_OUTPUT: {
    FOREGROUND: 'fg.青',
  },
  CONSOLE_BLUE_BRIGHT_OUTPUT: {
    FOREGROUND: 'fg.蓝',
    FONT_TYPE: FontType.BOLD,
  },
  CONSOLE_BLUE_OUTPUT: {
    FOREGROUND: 'fg.蓝',
  },
  CONSOLE_MAGENTA_BRIGHT_OUTPUT: {
    FOREGROUND: 'fg.桃红',
    FONT_TYPE: FontType.BOLD,
  },
  CONSOLE_MAGENTA_OUTPUT: {
    FOREGROUND: 'fg.桃红',
  },
  LOG_ERROR_OUTPUT: {
    FOREGROUND: 'fg.日志_错误',
  },
  LOG_WARNING_OUTPUT: {
    FOREGROUND: 'fg.日志_警告',
  },
  LOG_INFO_OUTPUT: {
    FOREGROUND: 'fg.日志_信息',
  },
  LOG_DEBUG_OUTPUT: {
    FOREGROUND: 'fg.日志_调试',
  },
  LOG_VERBOSE_OUTPUT: {
    FOREGROUND: 'fg.日志_冗余',
  },
  LOG_EXPIRED_ENTRY: {
    FOREGROUND: 'fg.过期日志',
  },
  TERMINAL_COMMAND_TO_RUN_USING_IDE: {
    BACKGROUND: 'bg.用IDE执行的命令',
  },
  //#endregion

  //#region Diff & Merge
  DIFF_SEPARATOR_WAVE: 'line.DIFF_不变片段折叠线',
  DIFF_INSERTED: {
    BACKGROUND: 'bg.DIFF_新增文本',
    ERROR_STRIPE_COLOR: 'stripe.DIFF_新增文本',
  },
  DIFF_MODIFIED: {
    BACKGROUND: 'bg.DIFF_改动文本',
    ERROR_STRIPE_COLOR: 'stripe.DIFF_改动文本',
  },
  DIFF_DELETED: {
    BACKGROUND: 'bg.DIFF_移除文本',
    ERROR_STRIPE_COLOR: 'stripe.DIFF_移除文本',
  },
  DIFF_CONFLICT: {
    BACKGROUND: 'bg.DIFF_冲突文本',
    ERROR_STRIPE_COLOR: 'stripe.DIFF_冲突文本',
  },
  //#endregion

  //#region User-Defined File Types
  CUSTOM_LINE_COMMENT_ATTRIBUTES: INHERIT_ATTRIBUTE,
  CUSTOM_MULTI_LINE_COMMENT_ATTRIBUTES: INHERIT_ATTRIBUTE,
  CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES: INHERIT_ATTRIBUTE,
  CUSTOM_INVALID_STRING_ESCAPE_ATTRIBUTES: INHERIT_ATTRIBUTE,
  CUSTOM_KEYWORD1_ATTRIBUTES: {
    FOREGROUND: 'fg.自定义关键字1',
  },
  CUSTOM_KEYWORD2_ATTRIBUTES: {
    FOREGROUND: 'fg.自定义关键字2',
  },
  CUSTOM_KEYWORD3_ATTRIBUTES: {
    FOREGROUND: 'fg.自定义关键字3',
  },
  CUSTOM_KEYWORD4_ATTRIBUTES: {
    FOREGROUND: 'fg.自定义关键字4',
  },
  //#endregion

  //#region VCS
  ANNOTATIONS_COLOR: 'fg.默认',
  ADDED_LINES_COLOR: 'gutter.新增文本',
  DELETED_LINES_COLOR: 'gutter.移除文本',
  IGNORED_ADDED_LINES_BORDER_COLOR: 'gutter.新增文本',
  IGNORED_DELETED_LINES_BORDER_COLOR: 'gutter.移除文本',
  IGNORED_MODIFIED_LINES_BORDER_COLOR: 'gutter.改动文本',
  MODIFIED_LINES_COLOR: 'gutter.改动文本',
  WHITESPACES_MODIFIED_LINES_COLOR: 'gutter.空白字符改动',
  VCS_ANNOTATIONS_COLOR_1: 'bg.VCS注释背景1',
  VCS_ANNOTATIONS_COLOR_2: 'bg.VCS注释背景2',
  VCS_ANNOTATIONS_COLOR_3: 'bg.VCS注释背景3',
  VCS_ANNOTATIONS_COLOR_4: 'bg.VCS注释背景4',
  VCS_ANNOTATIONS_COLOR_5: 'bg.VCS注释背景5',
  //#endregion

  //#region C/C++
  'Doxygen Parameter': INHERIT_ATTRIBUTE,
  'OC.CONDITIONALLY_NOT_COMPILED': {
    FOREGROUND: 'fg.未使用代码',
  },
  'OC.ENUM_CONST': {
    FOREGROUND: 'fg.静态属性',
  },
  'OC.MACRONAME': {
    FOREGROUND: 'fg.宏',
  },
  'OC.MACRO_PARAMETER': {
    FOREGROUND: 'fg.宏参数',
  },
  'OC.NAMESPACE_LIKE': {},
  'OC.OVERLOADED_OPERATOR': {
    FOREGROUND: 'fg.重载操作符',
  },
  'OC.STRUCT_FIELD': {
    FOREGROUND: 'fg.成员属性',
  },
  'OC.STRUCT_LIKE': {
    FOREGROUND: 'fg.类名',
  },
  'OC.TEMPLATE_VALUE': {
    FOREGROUND: 'fg.常量',
  },
  'OC.TYPEDEF': {
    FOREGROUND: 'fg.类名',
  },
  //#endregion

  //#region CMake
  'com.jetbrains.cmake.COMMAND': {
    FOREGROUND: 'fg.关键字',
  },
  //#endregion

  //#region CoffeeScript
  'COFFEESCRIPT.CLASS_NAME': {
    FOREGROUND: 'fg.类名',
  },
  'COFFEESCRIPT.FUNCTION_BINDING': {},
  'COFFEESCRIPT.FUNCTION_NAME': INHERIT_ATTRIBUTE,
  'COFFEESCRIPT.REGULAR_EXPRESSION_FLAG': {
    FOREGROUND: 'fg.正则表达式',
  },
  'COFFEESCRIPT.REGULAR_EXPRESSION_ID': {
    FOREGROUND: 'fg.正则表达式',
  },
  //#endregion

  //#region C#/F#
  'ReSharper.CSHARP_ATTRIBUTE_IDENTIFIER': {
    FOREGROUND: 'fg.注解',
  },
  'ReSharper.CSHARP_OVERLOADED_OPERATOR': {
    FOREGROUND: 'fg.重载操作符',
  },
  'ReSharper.CSHARP_STATIC_PROPERTY_IDENTIFIER': {
    FOREGROUND: 'fg.静态属性',
  },
  'ReSharper.PREPROCESSOR_KEYWORD': {
    FOREGROUND: 'fg.宏',
  },
  'ReSharper.STRING_ESCAPE_CHARACTER_2': {
    FOREGROUND: 'fg.转义字符',
  },
  //#endregion

  //#region CSS
  'CSS.ATTRIBUTE_NAME': {
    FOREGROUND: 'fg.标记语言属性',
  },
  'CSS.CLASS_NAME': {
    FOREGROUND: 'fg.类名',
  },
  'CSS.COLOR': {
    FOREGROUND: 'fg.数字',
  },
  'CSS.FUNCTION': {},
  'CSS.IMPORTANT': {
    FOREGROUND: 'fg.特殊注释',
  },
  'CSS.PROPERTY_VALUE': {},
  'CSS.UNICODE.RANGE': {
    FOREGROUND: 'fg.数字',
  },
  'CSS.URL': {
    FOREGROUND: 'fg.链接',
  },
  //#endregion

  //#region Dart
  DART_ENUM_CONSTANT: {
    FOREGROUND: 'fg.静态属性',
  },
  //#endregion

  //#region Database
  CONSOLE_RANGE_TO_EXECUTE: {
    EFFECT_COLOR: 'fg.默认',
  },
  //#endregion

  //#region Go
  GO_BUILTIN_CONSTANT: {
    FOREGROUND: 'fg.关键字',
  },
  GO_BUILTIN_FUNCTION: {
    FOREGROUND: 'fg.内置函数名',
  },
  GO_BUILTIN_FUNCTION_CALL: {
    FOREGROUND: 'fg.内置函数名',
  },
  GO_BUILTIN_TYPE_REFERENCE: {
    FOREGROUND: 'fg.关键字',
  },
  GO_BUILTIN_VARIABLE: {
    FOREGROUND: 'fg.关键字',
  },
  GO_COMMENT_REFERENCE: {
    FOREGROUND: 'fg.特殊注释',
  },
  GO_LOCAL_CONSTANT: {},
  GO_PACKAGE_EXPORTED_CONSTANT: {
    FOREGROUND: 'fg.全局变量',
  },
  GO_PACKAGE_EXPORTED_VARIABLE_CALL: {
    FOREGROUND: 'fg.全局变量',
  },
  GO_PACKAGE_LOCAL_CONSTANT: {
    FOREGROUND: 'fg.常量',
  },
  GO_PACKAGE_LOCAL_VARIABLE: {
    FOREGROUND: 'fg.全局变量',
  },
  GO_PACKAGE_LOCAL_VARIABLE_CALL: {
    FOREGROUND: 'fg.全局变量',
  },
  GO_STRUCT_EXPORTED_MEMBER: {
    FOREGROUND: 'fg.成员属性',
  },
  GO_STRUCT_EXPORTED_MEMBER_CALL: {
    FOREGROUND: 'fg.成员属性',
  },
  GO_STRUCT_LOCAL_MEMBER: {
    FOREGROUND: 'fg.成员属性',
  },
  GO_STRUCT_LOCAL_MEMBER_CALL: {
    FOREGROUND: 'fg.成员属性',
  },
  GO_TYPE_REFERENCE: {
    FOREGROUND: 'fg.类名',
  },
  GO_EXPORTED_FUNCTION: REMOVE_ATTRIBUTE,
  GO_EXPORTED_FUNCTION_CALL: REMOVE_ATTRIBUTE,
  GO_LOCAL_FUNCTION: REMOVE_ATTRIBUTE,
  GO_LOCAL_FUNCTION_CALL: REMOVE_ATTRIBUTE,
  GO_METHOD_RECEIVER: REMOVE_ATTRIBUTE,
  GO_PACKAGE: REMOVE_ATTRIBUTE,
  GO_SHADOWING_VARIABLE: REMOVE_ATTRIBUTE,
  //#endregion

  //#region Groovy
  'Closure braces': {},
  GROOVY_KEYWORD: INHERIT_ATTRIBUTE,
  'Instance property reference ID': INHERIT_ATTRIBUTE,
  'Lambda braces': {},
  'List/map to object conversion': {},
  'Map key': {
    FOREGROUND: 'fg.成员属性',
  },
  'Static property reference ID': INHERIT_ATTRIBUTE,
  'Unresolved reference access': INHERIT_ATTRIBUTE,
  //#endregion

  //#region HTTP Request
  HTTP_REQUEST_MULTIPART_BOUNDARY: {
    FOREGROUND: 'fg.特殊注释',
  },
  HTTP_REQUEST_PARAMETER_NAME: {
    FOREGROUND: 'fg.参数名',
  },
  HTTP_REQUEST_PARAMETER_VALUE: {
    FOREGROUND: 'fg.字符串',
  },
  //#endregion

  //#region Java
  ANNOTATION_ATTRIBUTE_NAME_ATTRIBUTES: {
    FOREGROUND: 'fg.参数名',
  },
  CONSTRUCTOR_CALL_ATTRIBUTES: {
    FOREGROUND: 'fg.类名',
  },
  CONSTRUCTOR_DECLARATION_ATTRIBUTES: {
    FOREGROUND: 'fg.类名',
  },
  IMPLICIT_ANONYMOUS_CLASS_PARAMETER_ATTRIBUTES: {},
  TYPE_PARAMETER_NAME_ATTRIBUTES: {
    FOREGROUND: 'fg.泛型参数',
  },
  STATIC_METHOD_ATTRIBUTES: REMOVE_ATTRIBUTE,
  //#endregion

  //#region JavaScript
  'JS.GLOBAL_FUNCTION': INHERIT_ATTRIBUTE,
  'JS.GLOBAL_VARIABLE': INHERIT_ATTRIBUTE,
  'JS.INSTANCE_MEMBER_FUNCTION': INHERIT_ATTRIBUTE,
  'JS.LOCAL_VARIABLE': INHERIT_ATTRIBUTE,
  'JS.PARAMETER': INHERIT_ATTRIBUTE,
  'JS.REGEXP': {
    FOREGROUND: 'fg.正则表达式',
  },
  'JS.TEMPLATE_LITERAL_PLACEHOLDER_DELIMITERS': {
    FOREGROUND: 'fg.转义字符',
  },
  'JavaScript:INJECTED_LANGUAGE_FRAGMENT': INHERIT_ATTRIBUTE,
  'JS.JSX_CLIENT_COMPONENT': REMOVE_ATTRIBUTE,
  //#endregion

  //#region JSONPath
  'JSONPATH.BOOLEAN': {
    FOREGROUND: 'fg.关键字',
  },
  //#endregion

  //#region Kotlin
  KOTLIN_BACKING_FIELD_VARIABLE: {},
  KOTLIN_CLOSURE_DEFAULT_PARAMETER: {
    FOREGROUND: 'fg.关键字',
  },
  KOTLIN_CONSTRUCTOR: {
    FOREGROUND: 'fg.类名',
  },
  KOTLIN_DYNAMIC_FUNCTION_CALL: {},
  KOTLIN_DYNAMIC_PROPERTY_CALL: {
    FOREGROUND: 'fg.成员属性',
  },
  KOTLIN_FUNCTION_LITERAL_BRACES_AND_ARROW: {},
  KOTLIN_LABEL: INHERIT_ATTRIBUTE,
  KOTLIN_MUTABLE_VARIABLE: {
    EFFECT_COLOR: 'fg.默认',
    EFFECT_TYPE: EffectType.UNDERLINE,
  },
  KOTLIN_NAMED_ARGUMENT: {
    FOREGROUND: 'fg.参数名',
  },
  KOTLIN_PACKAGE_PROPERTY: {
    FOREGROUND: 'fg.全局变量',
  },
  KOTLIN_SMART_CAST_RECEIVER: {
    BACKGROUND: 'bg.自动类型转换',
  },
  KOTLIN_SMART_CAST_VALUE: {
    BACKGROUND: 'bg.自动类型转换',
  },
  KOTLIN_SMART_CONSTANT: {
    BACKGROUND: 'bg.自动类型转换',
  },
  KOTLIN_WRAPPED_INTO_REF: {},
  //#endregion

  //#region Markdown
  MARKDOWN_HEADER_LEVEL_1: {
    FOREGROUND: 'fg.MARKDOWN标题',
  },
  MARKDOWN_HEADER_LEVEL_2: {
    FOREGROUND: 'fg.MARKDOWN标题',
  },
  MARKDOWN_HEADER_LEVEL_3: {
    FOREGROUND: 'fg.MARKDOWN标题',
  },
  MARKDOWN_HEADER_LEVEL_4: {
    FOREGROUND: 'fg.MARKDOWN标题',
  },
  MARKDOWN_HEADER_LEVEL_5: {
    FOREGROUND: 'fg.MARKDOWN标题',
  },
  MARKDOWN_HEADER_LEVEL_6: {
    FOREGROUND: 'fg.MARKDOWN标题',
  },
  MARKDOWN_HTML_BLOCK: {
    BACKGROUND: 'bg.嵌入代码',
  },
  MARKDOWN_INLINE_HTML: {
    BACKGROUND: 'bg.嵌入代码',
  },
  //#endregion

  //#region PHP
  DOC_TEMPLATE_PARAMETER: INHERIT_ATTRIBUTE,
  DQL_EXPR: {
    BACKGROUND: 'bg.嵌入代码',
  },
  DQL_PLACEHOLDER: INHERIT_ATTRIBUTE,
  MAGIC_MEMBER_ACCESS: {},
  PHP_ALIAS_REFERENCE: INHERIT_ATTRIBUTE,
  PHP_EXEC_COMMAND_ID: {
    FOREGROUND: 'fg.SHELL命令',
    BACKGROUND: 'bg.嵌入代码',
  },
  PHP_HEREDOC_ID: {
    FOREGROUND: 'fg.特殊注释',
  },
  PHP_NAMED_ARGUMENT: {
    FOREGROUND: 'fg.参数名',
  },
  PHP_PARAMETER: INHERIT_ATTRIBUTE,
  PHP_THIS_VAR: {
    FOREGROUND: 'fg.关键字',
  },
  PHP_VAR: INHERIT_ATTRIBUTE,
  PHP_VAR_VAR: {
    FOREGROUND: 'fg.关键字',
  },
  //#endregion

  //#region plan9_x86
  'com.plan9.INSTRUCTION': {
    FOREGROUND: 'fg.关键字',
  },
  'com.plan9.LABEL': INHERIT_ATTRIBUTE,
  'com.plan9.REGISTER': {
    FOREGROUND: 'fg.全局变量',
  },
  //#endregion

  //#region Properties
  'PROPERTIES.KEY': {
    FOREGROUND: 'fg.成员属性',
  },
  //#endregion

  //#region Python
  'PY.ANNOTATION': {
    FOREGROUND: 'fg.类名',
  },
  'PY.BUILTIN_NAME': {
    FOREGROUND: 'fg.内置函数名',
  },
  'PY.KEYWORD_ARGUMENT': {
    FOREGROUND: 'fg.参数名',
  },
  'PY.PREDEFINED_DEFINITION': INHERIT_ATTRIBUTE,
  'PY.PREDEFINED_USAGE': INHERIT_ATTRIBUTE,
  'PY.SELF_PARAMETER': {
    FOREGROUND: 'fg.关键字',
  },
  'PY.STRING.B': INHERIT_ATTRIBUTE,
  'PY.TYPE_PARAMETER': {
    FOREGROUND: 'fg.泛型参数',
  },
  //#endregion

  //#region Ruby
  RUBY_EXPR_IN_STRING: {},
  RUBY_GVAR: INHERIT_ATTRIBUTE,
  RUBY_HASH_ASSOC: {},
  RUBY_HEREDOC_CONTENT: {
    FOREGROUND: 'fg.字符串',
  },
  RUBY_HEREDOC_ID: {
    FOREGROUND: 'fg.特殊注释',
  },
  RUBY_LOCAL_VAR_ID: INHERIT_ATTRIBUTE,
  RUBY_METHOD_NAME: INHERIT_ATTRIBUTE,
  RUBY_NTH_REF: INHERIT_ATTRIBUTE,
  RUBY_PARAMDEF_CALL: {
    FOREGROUND: 'fg.内置函数名',
  },
  RUBY_PARAMETER_ID: INHERIT_ATTRIBUTE,
  RUBY_REGEXP: {
    FOREGROUND: 'fg.正则表达式',
  },
  RUBY_SPECIFIC_CALL: {
    FOREGROUND: 'fg.内置函数名',
  },
  //#endregion

  //#region Rust
  'org.rust.CFG_DISABLED_CODE': {
    FOREGROUND: 'fg.未使用代码',
  },
  'org.rust.DOC_CODE': INHERIT_ATTRIBUTE,
  'org.rust.LIFETIME': {
    FOREGROUND: 'fg.RUST生命周期',
  },
  'org.rust.MACRO': {
    FOREGROUND: 'fg.宏',
  },
  'org.rust.STATIC': {
    FOREGROUND: 'fg.全局变量',
  },
  'org.rust.TYPE_PARAMETER': {
    FOREGROUND: 'fg.泛型参数',
  },
  'org.rust.UNSAFE_CODE': {
    BACKGROUND: 'bg.RUST_UNSAFE',
  },
  //#endregion

  //#region Shell Script
  'BASH.EXTERNAL_COMMAND': {
    FOREGROUND: 'fg.SHELL命令',
  },
  'BASH.FUNCTION_DEF_NAME': INHERIT_ATTRIBUTE,
  'BASH.HERE_DOC_END': {
    FOREGROUND: 'fg.特殊注释',
  },
  'BASH.HERE_DOC_START': {
    FOREGROUND: 'fg.特殊注释',
  },
  'BASH.SHEBANG': {
    FOREGROUND: 'fg.特殊注释',
  },
  //#endregion

  //#region TypeScript
  'TS.MODULE_NAME': {
    FOREGROUND: 'fg.类名',
  },
  'TS.TYPE_GUARD': {
    BACKGROUND: 'bg.自动类型转换',
  },
  'TS.TYPE_PARAMETER': {
    FOREGROUND: 'fg.泛型参数',
  },
  //#endregion

  //#region XML
  MATCHED_TAG_NAME: {
    BACKGROUND: 'bg.成对标记',
  },
  XML_PROLOGUE: {},
  XML_CUSTOM_TAG_NAME: REMOVE_ATTRIBUTE,
  //#endregion

  //#region XPath
  'XPATH.FUNCTION': INHERIT_ATTRIBUTE,
  'XPATH.KEYWORD': INHERIT_ATTRIBUTE,
  'XPATH.XPATH_NAME': INHERIT_ATTRIBUTE,
  //#endregion

  //#region YAML
  YAML_ANCHOR: {
    FOREGROUND: 'fg.全局变量',
  },
  //#endregion
};
export default settings;
