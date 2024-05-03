use crate::{macros::*, Color, ColorScheme};

pub fn define() -> ColorScheme {
    let default_fg_hsv = hsv!(210, 50, 50);
    let default_fg = Color::new("defaultFg", default_fg_hsv);
    let default_bg_hsv = hsv!(90, 10, 100);
    let default_bg = Color::new("defaultBg", default_bg_hsv);
    let mut scheme = ColorScheme::new(default_fg, default_bg);

    define_basic_colors!(scheme => {
        ("altFg1", (210, 50, fg + 25))
        ("altFg2", (120, 5, fg + 15))
        ("red", (0, 100, fg + 30))
        ("orange", (30, 100, fg + 30))
        ("yellow", (50, 100, fg))
        ("oliveGreen", (75, 100, fg))
        ("green", (120, 100, fg))
        ("cyan", (180, 100, fg + 5))
        ("blue1", (240, 100, fg + 25))
        ("blue2", (240, 100, fg + 50))
        ("purple1", (270, 100, fg + 25))
        ("purple2", (300, 100, fg + 25))
        ("black", (210, 20, fg - 25))
        ("darkGray", (210, 20, fg))
        ("gray", (210, 20, fg + 25))
        ("white", (90, 10, bg - 10))
    });

    define_vim_groups!(scheme => {
        // basic groups
        ("Normal", fg="defaultFg", bg="defaultBg")
        ("Identifier", fg="defaultFg")
        ("Operator", fg="defaultFg")
        ("Delimiter", fg="defaultFg")
        ("Number", fg="orange")
        ("PreProc", fg="yellow")
        ("SpecialComment", fg="yellow")
        ("Comment", fg="oliveGreen")
        ("Boolean", fg="green")
        ("Statement", fg="green")
        ("Type", fg="green")
        ("Include", fg="green")
        ("String", fg="cyan")
        ("Character", fg="cyan")
        ("Special", fg="blue1")
        ("Tag", fg="blue2")
        ("Underlined", fg="blue2", gui="underline")
        ("Constant", fg="purple2")
        ("Error", bg=(0, 25, bg))
        ("Todo", bg=(60, 60, bg))
        ("Question", fg="green")
        ("Directory", fg="blue1")
        ("Title", fg="blue1")
        ("SpecialKey", fg="blue1")
        ("NonText", fg="altFg2")
        ("ModeMsg", fg="defaultFg")
        ("MoreMsg", fg="green")
        ("ErrorMsg", fg="red")
        ("WarningMsg", fg="yellow")
        ("Folded", fg="altFg1", bg=(150, 10, bg - 5))
        ("MatchParen", bg=(180, 35, bg - 5))
        ("ColorColumn", bg=(120, 10, bg - 20))
        ("CursorLine", bg=(75, 15, bg - 2.5))
        ("CursorColumn", bg="vimBgCursorLine")
        ("LineNr", fg="altFg2")
        ("CursorLineNr", fg="defaultFg", bg="vimBgCursorLine")
        ("FoldColumn", fg="altFg1")
        ("CursorLineFold", fg="defaultFg", bg="vimBgCursorLine")
        ("SignColumn", fg="altFg1")
        ("CursorLineSign", fg="defaultFg", bg="vimBgCursorLine")
        ("VertSplit", fg="altFg2")
        ("StatusLine", fg="defaultFg", bg=(120, 20, bg - 2.5))
        ("StatusLineNC", fg="altFg2", bg=(120, 7.5, bg - 10))
        ("StatusLineTerm", fg="defaultFg", bg="vimBgStatusLine")
        ("StatusLineTermNC", fg="altFg2", bg="vimBgStatusLineNC")
        ("TabLineSel", fg="defaultFg")
        ("TabLine", fg="altFg2", bg="vimBgStatusLineNC")
        ("TabLineFill", bg="vimBgStatusLineNC")
        ("Visual", bg=(90, 30, bg - 5))
        ("Search", fg="defaultFg", bg=(120, 35, bg))
        ("PmenuSel", bg="vimBgStatusLine")
        ("Pmenu", bg=(120, 5, bg - 5))
        ("PmenuSbar", bg="vimBgPmenu")
        ("PmenuThumb", bg=(120, 10, fg + 10))
        ("WildMenu", bg="vimBgTodo")
        ("DiffAdd", bg=(120, 15, bg - 5))
        ("DiffText", bg=(210, 15, bg - 5))
        ("DiffChange", bg=(210, 5, bg - 5))
        ("DiffDelete", fg="altFg2", bg=(120, 2.5, bg - 10))
        ("SpellBad", bg=(0, 10, bg))
        ("SpellLocal", bg=(180, 10, bg - 5))
        ("SpellCap", bg=(240, 10, bg))
        ("SpellRare", bg=(300, 10, bg))

        // other groups
        ("lspReference", bg=(240, 20, bg + 20))
        ("cssPseudoClassId", fg="defaultFg")
        ("cssUnitDecorators", fg="defaultFg")
        ("cssFontDescriptorAttr", fg="orange")
        ("cssAtKeyword", fg="green")
        ("cssIdentifier", fg="green")
        ("cssImportant", fg="green")
        ("cssAttr", fg="cyan")
        ("cssUrl", fg="blue1")
        ("cssProp", fg="purple1")
        ("cssAttributeSelector", fg="purple1")
        ("goBuiltins", fg="green")
        ("helpHyperTextJump", fg="blue2")
        ("htmlTitle", fg="defaultFg")
        ("htmlH1", fg="defaultFg")
        ("htmlTagN", fg="green")
        ("htmlSpecialChar", fg="blue1")
        ("htmlArg", fg="purple1")
        ("javaCommentTitle", fg="oliveGreen")
        ("javaConstant", fg="green")
        ("javaDocTags", fg="yellow")
        ("jsonNull", fg="purple2")
        ("jsonBoolean", fg="purple2")
        ("javaScriptNumber", fg="orange")
        ("javaScriptFunction", fg="green")
        ("javaScriptIdentifier", fg="green")
        ("markdownRule", fg="green")
        ("markdownHeadingRule", fg="green")
        ("markdownHeadingDelimiter", fg="green")
        ("markdownCode", fg="cyan")
        ("markdownCodeBlock", fg="cyan")
        ("markdownUrl", fg="blue1")
        ("markdownLinkText", fg="blue1")
        ("markdownId", fg="green")
        ("markdownIdDeclaration", fg="green")
        ("pythonExceptions", fg="defaultFg")
        ("pythonDecoratorName", fg="yellow")
        ("pythonBuiltin", fg="green")
        ("rustMacroRepeatDelimiters", fg="defaultFg")
        ("rustQuestionMark", fg="defaultFg")
        ("rustCommentLineDoc", fg="oliveGreen")
        ("rustSelf", fg="green")
        ("rustLabel", fg="cyan")
        ("rustLifetime", fg="cyan")
        ("rustModPath", fg="blue1")
        ("rustIdentifier", fg="blue1")
        ("rustEnum", fg="blue1")
        ("rustTrait", fg="blue1")
        ("rustMacroVariable", fg="purple2")
        ("shCommandSub", fg="defaultFg")
        ("shStatement", fg="defaultFg")
        ("shTestOpr", fg="defaultFg")
        ("shCmdSubRegion", fg="green")
        ("shFunctionKey", fg="green")
        ("shHereDoc01", fg="green")
        ("shLoop", fg="green")
        ("shFor", fg="purple2")
        ("shDeref", fg="purple2")
        ("shVariable", fg="purple2")
        ("tomlKey", fg="green")
        ("tomlKeyDq", fg="green")
        ("tomlTable", fg="green")
        ("tomlBoolean", fg="purple2")
        ("xmlCdataStart", fg="yellow")
        ("xmlCdataCdata", fg="yellow")
        ("xmlCdataEnd", fg="yellow")
        ("xmlTagName", fg="green")
        ("xmlNamespace", fg="blue1")
        ("xmlEntity", fg="blue1")
        ("xmlEntityPunct", fg="blue1")
        ("xmlAttrib", fg="purple1")
        ("yamlKeyValueDelimiter", fg="defaultFg")
        ("yamlAnchor", fg="yellow")
        ("yamlAlias", fg="yellow")
        ("yamlBlockMappingKey", fg="green")
    });

    define_idea_scheme!(scheme => {
        // begin: general
        a: ("TEXT", fg="defaultFg", bg="defaultBg")
        a: ("DELETED_TEXT_ATTRIBUTES", fg="altFg1", effectColor="altFg1", effectType=strikeout)
        a: ("FOLDED_TEXT_ATTRIBUTES", fg="vimFgFolded", bg="vimBgFolded")
        c: ("FOLDED_TEXT_BORDER_COLOR", (150, 25, bg - 10))
        c: ("SOFT_WRAP_SIGN_COLOR", "defaultFg")
        c: ("WHITESPACES", "altFg1")

        a: ("TEXT_SEARCH_RESULT_ATTRIBUTES", fg="defaultFg", bg="vimBgSearch", stripe=(120, 100, 75))
        a: ("SEARCH_RESULT_ATTRIBUTES", fg="defaultFg", bg=(240, 20, bg), stripe=(270, 60, 100))
        a: ("WRITE_SEARCH_RESULT_ATTRIBUTES", fg="defaultFg", bg=(300, 25, bg), stripe=(300, 60, 100))

        a: ("LIVE_TEMPLATE_ATTRIBUTES", effectColor="green") // live template: active segment
        a: ("LIVE_TEMPLATE_INACTIVE_SEGMENT", effectColor="altFg2")
        a: ("TEMPLATE_VARIABLE_ATTRIBUTES", fg="purple2")

        a: ("HYPERLINK_ATTRIBUTES", fg="blue1", effectColor="blue1", effectType=underline)
        a: ("FOLLOWED_HYPERLINK_ATTRIBUTES", fg="purple1", effectColor="purple1", effectType=underline)
        a: ("INACTIVE_HYPERLINK_ATTRIBUTES", effectColor="altFg1", effectType=underline)

        a: ("ERRORS_ATTRIBUTES", bg="vimBgError", stripe=(0, 80, 100))
        a: ("WARNING_ATTRIBUTES", bg=(45, 40, bg), stripe=(45, 100, 85))
        a: ("INFO_ATTRIBUTES", effectColor="yellow", effectType=underwave, stripe=(60, 30, 85)) // weak warning
        a: ("DEPRECATED_ATTRIBUTES", effectColor="defaultFg", effectType=strikeout)
        a: ("MARKED_FOR_REMOVAL_ATTRIBUTES", effectColor="red", effectType=strikeout) // deprecated symbol, marked for removal
        a: ("NOT_USED_ELEMENT_ATTRIBUTES", fg="altFg1") // unused symbol
        a: ("WRONG_REFERENCES_ATTRIBUTES", fg="red") // unknown symbol
        a: ("RUNTIME_ERROR", effectColor="red", effectType=underwave, stripe="ideaStripeERRORS_ATTRIBUTES")
        a: ("GENERIC_SERVER_ERROR_OR_WARNING", effectColor="orange", effectType=underwave, stripe=(30, 60, 100)) // problem from server
        a: ("DUPLICATE_FROM_SERVER", effectColor="altFg2", effectType=underwave)
        a: ("TYPO", effectColor="green", effectType=underwave)
        a: ("TEXT_STYLE_ERROR", effectColor="red", effectType=dottedline)
        a: ("TEXT_STYLE_WARNING", effectColor="orange", effectType=dottedline)
        a: ("TEXT_STYLE_SUGGESTION", effectColor="cyan", effectType=dottedline)
        a: ("GRAMMAR_ERROR", effectColor="purple2", effectType=dottedline)

        c: ("CARET_COLOR", "defaultFg")
        c: ("CARET_ROW_COLOR", "vimBgCursorLine")
        c: ("GUTTER_BACKGROUND", "defaultBg")
        c: ("SELECTION_FOREGROUND")
        c: ("SELECTION_BACKGROUND", "vimBgVisual")
        c: ("INDENT_GUIDE", (120, 10, bg - 10))
        c: ("SELECTED_INDENT_GUIDE", (120, 10, bg - 30))
        c: ("VISUAL_INDENT_GUIDE", "ideaColorINDENT_GUIDE")
        c: ("RIGHT_MARGIN_COLOR", "vimBgColorColumn") // hard wrap guide
        c: ("TEARLINE_COLOR", "ideaColorRIGHT_MARGIN_COLOR")
        c: ("SELECTED_TEARLINE_COLOR", (120, 10, bg - 40))
        a: ("BREADCRUMBS_DEFAULT", fg="defaultFg")
        a: ("BREADCRUMBS_INACTIVE", fg="defaultFg")
        a: ("BREADCRUMBS_HOVERED", fg="defaultFg", bg="vimBgCursorLine")
        a: ("BREADCRUMBS_CURRENT", fg="defaultFg", bg="vimBgStatusLine")

        a: ("TODO_DEFAULT_ATTRIBUTES", fg="defaultFg", bg="vimBgTodo", stripe=(210, 75, 100))
        c: ("METHOD_SEPARATORS_COLOR", "ideaColorVISUAL_INDENT_GUIDE")
        a: ("IDENTIFIER_UNDER_CARET_ATTRIBUTES", bg="vimBglspReference", stripe="ideaStripeSEARCH_RESULT_ATTRIBUTES")
        a: ("WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES", bg=(300, 10, bg), stripe="ideaStripeWRITE_SEARCH_RESULT_ATTRIBUTES")
        a: ("INJECTED_LANGUAGE_FRAGMENT", bg=(150, 10, 100))
        c: ("LINE_NUMBERS_COLOR", "altFg2")
        c: ("LINE_NUMBER_ON_CARET_ROW_COLOR", "defaultFg")
        a: ("MATCHED_BRACE_ATTRIBUTES", bg="vimBgMatchParen")
        a: ("UNMATCHED_BRACE_ATTRIBUTES", bg=(0, 20, bg))
        // end: general

        // begin: language defaults
        a: ("DEFAULT_CLASS_NAME", fg="blue1")
        a: ("DEFAULT_CLASS_REFERENCE", fg="blue1")
        a: ("DEFAULT_INTERFACE_NAME", fg="blue1")
        a: ("DEFAULT_INSTANCE_FIELD", fg="purple1")
        a: ("DEFAULT_INSTANCE_METHOD", fg="defaultFg")
        a: ("DEFAULT_STATIC_FIELD", fg="purple2")
        a: ("DEFAULT_STATIC_METHOD", fg="defaultFg")

        a: ("DEFAULT_LINE_COMMENT", fg="oliveGreen")
        a: ("DEFAULT_BLOCK_COMMENT", fg="oliveGreen")
        a: ("DEFAULT_DOC_COMMENT", fg="oliveGreen")
        a: ("DEFAULT_DOC_MARKUP")
        a: ("DEFAULT_DOC_COMMENT_TAG", fg="yellow")
        a: ("DEFAULT_DOC_COMMENT_TAG_VALUE", fg="defaultFg")
        c: ("DOC_COMMENT_LINK", "blue1")
        c: ("DOC_COMMENT_GUIDE", "ideaColorINDENT_GUIDE")

        a: ("DEFAULT_IDENTIFIER", fg="defaultFg")
        a: ("DEFAULT_CONSTANT", fg="purple2")
        a: ("DEFAULT_GLOBAL_VARIABLE", fg="purple2")
        a: ("DEFAULT_LABEL", fg="blue1")
        a: ("DEFAULT_PREDEFINED_SYMBOL", fg="green")
        a: ("DEFAULT_REASSIGNED_LOCAL_VARIABLE", fg="defaultFg", effectColor="altFg1", effectType=underline)
        a: ("DEFAULT_REASSIGNED_PARAMETER", fg="defaultFg", effectColor="altFg1", effectType=underline)

        a: ("INLINE_PARAMETER_HINT", fg=(120, 10, 50), bg=(90, 10, 90))
        a: ("INLINE_PARAMETER_HINT_CURRENT", fg="ideaFgINLINE_PARAMETER_HINT", bg=(120, 30, 90))
        a: ("INLINE_PARAMETER_HINT_HIGHLIGHTED", fg="ideaFgINLINE_PARAMETER_HINT", bg=(90, 10, 80))

        a: ("DEFAULT_KEYWORD", fg="green")
        a: ("DEFAULT_TAG", fg="green") // markup: tag
        a: ("DEFAULT_ATTRIBUTE", fg="purple1") // markup: attribute
        a: ("DEFAULT_ENTITY", fg="blue1") // markup: entity
        a: ("DEFAULT_METADATA", fg="yellow")
        a: ("DEFAULT_NUMBER", fg="orange")
        a: ("DEFAULT_STRING", fg="cyan")
        a: ("DEFAULT_VALID_STRING_ESCAPE", fg="blue1")
        a: ("DEFAULT_INVALID_STRING_ESCAPE", fg="cyan", bg="ideaBgUNMATCHED_BRACE_ATTRIBUTES")
        a: ("DEFAULT_HIGHLIGHTED_REFERENCE", effectColor="altFg1", effectType=underline) // string: highlighted reference
        a: ("DEFAULT_TEMPLATE_LANGUAGE_COLOR", bg="ideaBgINJECTED_LANGUAGE_FRAGMENT")
        // end: language defaults

        // begin: console colors
        a: ("CONSOLE_BLACK_OUTPUT", fg="black")
        a: ("CONSOLE_DARKGRAY_OUTPUT", fg="darkGray")
        a: ("CONSOLE_GRAY_OUTPUT", fg="gray")
        a: ("CONSOLE_WHITE_OUTPUT", fg="white")
        a: ("CONSOLE_RED_OUTPUT", fg="red")
        a: ("CONSOLE_RED_BRIGHT_OUTPUT", fg="red")
        a: ("CONSOLE_YELLOW_OUTPUT", fg="yellow")
        a: ("CONSOLE_YELLOW_BRIGHT_OUTPUT", fg="yellow")
        a: ("CONSOLE_GREEN_OUTPUT", fg="green")
        a: ("CONSOLE_GREEN_BRIGHT_OUTPUT", fg="green")
        a: ("CONSOLE_CYAN_OUTPUT", fg="cyan")
        a: ("CONSOLE_CYAN_BRIGHT_OUTPUT", fg="cyan")
        a: ("CONSOLE_BLUE_OUTPUT", fg="blue1")
        a: ("CONSOLE_BLUE_BRIGHT_OUTPUT", fg="blue1")
        a: ("CONSOLE_MAGENTA_OUTPUT", fg="purple1")
        a: ("CONSOLE_MAGENTA_BRIGHT_OUTPUT", fg="purple1")

        c: ("CONSOLE_BACKGROUND_KEY", "defaultBg")
        a: ("CONSOLE_NORMAL_OUTPUT", fg="defaultFg")
        a: ("CONSOLE_SYSTEM_OUTPUT", fg="defaultFg")
        a: ("CONSOLE_ERROR_OUTPUT", fg="red")
        a: ("CONSOLE_USER_INPUT", fg="cyan")
        a: ("CONSOLE_RANGE_TO_EXECUTE", effectColor="green") // database console: statement to execute
        a: ("TERMINAL_COMMAND_TO_RUN_USING_IDE", bg="ideaBgINJECTED_LANGUAGE_FRAGMENT")

        a: ("LOG_ERROR_OUTPUT", fg="red")
        a: ("LOG_WARNING_OUTPUT", fg="yellow")
        a: ("LOG_INFO_OUTPUT", fg="green")
        a: ("LOG_DEBUG_OUTPUT", fg="cyan")
        a: ("LOG_VERBOSE_OUTPUT", fg="blue1")
        a: ("LOG_EXPIRED_ENTRY", fg="altFg2")
        // end: console colors

        // begin: diff & merge
        a: ("DIFF_INSERTED", bg="vimBgDiffAdd", stripe=(120, 50, 80))
        a: ("DIFF_MODIFIED", fg="vimBgDiffChange", bg="vimBgDiffText", stripe=(210, 50, 90))
        a: ("DIFF_CONFLICT", bg=(15, 15, bg - 5), stripe=(15, 50, 90))
        a: ("DIFF_DELETED", bg="vimBgDiffDelete", stripe=(0, 0, 70))
        c: ("DIFF_SEPARATORS_BACKGROUND", (150, 5, 90)) // folded unchanged fragments
        // end: diff & merge

        // begin: user-defined file types
        a: ("CUSTOM_LINE_COMMENT_ATTRIBUTES", useBase=true)
        a: ("CUSTOM_MULTI_LINE_COMMENT_ATTRIBUTES", useBase=true)
        a: ("CUSTOM_NUMBER_ATTRIBUTES", useBase=true)
        a: ("CUSTOM_STRING_ATTRIBUTES", useBase=true)
        a: ("CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES", useBase=true)
        a: ("CUSTOM_INVALID_STRING_ESCAPE_ATTRIBUTES", useBase=true)
        a: ("CUSTOM_KEYWORD1_ATTRIBUTES", fg="blue1")
        a: ("CUSTOM_KEYWORD2_ATTRIBUTES", fg="purple1")
        a: ("CUSTOM_KEYWORD3_ATTRIBUTES", fg="green")
        a: ("CUSTOM_KEYWORD4_ATTRIBUTES", fg="purple2")
        // end: user-defined file types

        // begin: vcs
        c: ("ADDED_LINES_COLOR", (120, 20, 80))
        c: ("MODIFIED_LINES_COLOR", (210, 30, 85))
        c: ("WHITESPACES_MODIFIED_LINES_COLOR", (45, 40, 85))
        c: ("DELETED_LINES_COLOR", (0, 40, 80))
        c: ("IGNORED_ADDED_LINES_BORDER_COLOR", (120, 100, 50))
        c: ("IGNORED_MODIFIED_LINES_BORDER_COLOR", (210, 100, 75))
        c: ("IGNORED_DELETED_LINES_BORDER_COLOR", (0, 60, 80))
        // end: vcs

        // begin: c/c++
        a: ("OC.STD_INITIALIZER_LIST")
        a: ("OC.OVERLOADED_OPERATOR", fg="cyan")
        a: ("OC.STRUCT_LIKE", fg="blue1")
        a: ("OC.CONDITIONALLY_NOT_COMPILED", fg="altFg1")
        a: ("OC.MACRONAME", fg="yellow")
        a: ("OC.MACRO_PARAMETER")
        a: ("OC.STRUCT_FIELD", fg="purple1")
        a: ("OC.TYPEDEF", fg="blue1")
        // end: c/c++

        // begin: java
        a: ("ANNOTATION_NAME_ATTRIBUTES", useBase=true)
        a: ("STATIC_FINAL_FIELD_ATTRIBUTES", useBase=true)
        a: ("STATIC_FIELD_ATTRIBUTES", useBase=true)
        a: ("INSTANCE_FIELD_ATTRIBUTES", useBase=true)
        a: ("CONSTRUCTOR_CALL_ATTRIBUTES", fg="blue1")
        a: ("CONSTRUCTOR_DECLARATION_ATTRIBUTES", fg="blue1")
        a: ("IMPLICIT_ANONYMOUS_CLASS_PARAMETER_ATTRIBUTES")
        a: ("TYPE_PARAMETER_NAME_ATTRIBUTES", fg="blue1")
        // end: java

        // begin: kotlin
        a: ("KOTLIN_FUNCTION_LITERAL_BRACES_AND_ARROW")
        a: ("KOTLIN_CONSTRUCTOR", fg="blue1")
        a: ("KOTLIN_DYNAMIC_FUNCTION_CALL", fg="cyan")
        a: ("KOTLIN_LABEL", useBase=true)
        a: ("KOTLIN_NAMED_ARGUMENT")
        a: ("KOTLIN_CLOSURE_DEFAULT_PARAMETER", fg="green")
        a: ("KOTLIN_ANDROID_EXTENSIONS_PROPERTY_CALL", fg="purple1")
        a: ("KOTLIN_BACKING_FIELD_VARIABLE")
        a: ("KOTLIN_DYNAMIC_PROPERTY_CALL", fg="cyan")
        a: ("KOTLIN_EXTENSION_PROPERTY", fg="purple1")
        a: ("KOTLIN_MUTABLE_VARIABLE", effectColor="altFg1", effectType=underline)
        a: ("KOTLIN_WRAPPED_INTO_REF")
        a: ("KOTLIN_SMART_CONSTANT", bg="ideaBgINJECTED_LANGUAGE_FRAGMENT")
        a: ("KOTLIN_SMART_CAST_VALUE", bg="ideaBgINJECTED_LANGUAGE_FRAGMENT")
        a: ("KOTLIN_SMART_CAST_RECEIVER", bg="ideaBgINJECTED_LANGUAGE_FRAGMENT")
        // end: kotlin

        // begin: groovy
        a: ("Closure braces") // closure expression braces and arrow
        a: ("GROOVY_KEYWORD", useBase=true)
        a: ("List/map to object conversion")
        a: ("Instance property reference ID", useBase=true)
        a: ("Static property reference ID", useBase=true)
        a: ("Unresolved reference access", fg="altFg1", effectColor="altFg1", effectType=dottedline)
        // end: groovy

        // begin: python
        a: ("PY.BUILTIN_NAME", useBase=true)
        a: ("PY.KEYWORD_ARGUMENT", useBase=true)
        a: ("PY.SELF_PARAMETER", fg="green")
        a: ("PY.PREDEFINED_DEFINITION", fg="yellow") // special names: definition
        a: ("PY.PREDEFINED_USAGE", fg="yellow") // special names: usage
        a: ("PY.STRING.B", useBase=true)
        a: ("PY.ANNOTATION", fg="ideaFgDEFAULT_CLASS_NAME") // type annotation
        // end: python

        // begin: rust
        a: ("org.rust.CFG_DISABLED_CODE", fg="altFg1")
        a: ("org.rust.MACRO", fg="yellow")
        a: ("org.rust.GENERATED_ITEM", fg="yellow")
        a: ("org.rust.LIFETIME", fg="cyan")
        a: ("org.rust.MUT_PARAMETER", effectColor="altFg1", effectType=underline)
        a: ("org.rust.TYPE_PARAMETER", fg="blue1")
        a: ("org.rust.DOC_CODE", fg="defaultFg")
        a: ("org.rust.DOC_EMPHASIS")
        a: ("org.rust.DOC_STRONG")
        a: ("org.rust.CRATE", fg="blue1")
        a: ("org.rust.MODULE", fg="blue1")
        a: ("org.rust.MUT_BINDING", effectColor="altFg1", effectType=underline)
        a: ("org.rust.UNSAFE_CODE", bg=(15, 10, bg))
        // end: rust

        // begin: go
        a: ("GO_COMMENT_REFERENCE", fg="yellow")
        a: ("GO_BUILTIN_CONSTANT", fg="green")
        a: ("GO_PACKAGE", fg="blue1")
        a: ("GO_BUILTIN_VARIABLE", fg="green")
        a: ("GO_PACKAGE_LOCAL_VARIABLE", fg="purple2")
        a: ("GO_SHADOWING_VARIABLE", fg="cyan")
        a: ("GO_STRUCT_EXPORTED_MEMBER", fg="purple1")
        a: ("GO_STRUCT_LOCAL_MEMBER", fg="purple1")
        a: ("GO_BUILTIN_FUNCTION_CALL", fg="green")
        a: ("GO_BUILTIN_TYPE_REFERENCE", fg="green")
        a: ("GO_PACKAGE_EXPORTED_VARIABLE_CALL", fg="purple2")
        a: ("GO_PACKAGE_LOCAL_VARIABLE_CALL", fg="purple2")
        a: ("GO_STRUCT_EXPORTED_MEMBER_CALL", fg="purple1")
        a: ("GO_STRUCT_LOCAL_MEMBER_CALL", fg="purple1")
        // end: go

        // begin: dart
        a: ("DART_CONSTRUCTOR", useBase=true)
        a: ("DART_ENUM_CONSTANT", fg="purple2")
        a: ("DART_IMPORT_PREFIX", fg="blue1")
        a: ("DART_LIBRARY_NAME", fg="blue1")
        a: ("DART_SYMBOL_LITERAL", fg="cyan")
        a: ("DART_UNRESOLVED_INSTANCE_MEMBER_REFERENCE", fg="altFg1", effectColor="altFg1", effectType=dottedline)
        // end: dart

        // begin: javascript
        a: ("JS.GLOBAL_FUNCTION", useBase=true)
        a: ("JS.GLOBAL_VARIABLE", useBase=true)
        a: ("JS.INSTANCE_MEMBER_FUNCTION", useBase=true)
        a: ("JS.LOCAL_VARIABLE", useBase=true)
        a: ("JS.MODULE_NAME", fg="blue1")
        a: ("JS.PARAMETER", fg="blue1")
        a: ("JS.REGEXP", useBase=true)
        a: ("JavaScript:INJECTED_LANGUAGE_FRAGMENT", useBase=true)
        // end: javascript

        // begin: typescript
        a: ("TS.MODULE_NAME", fg="blue1")
        a: ("TS.TYPE_PARAMETER", fg="blue1")
        a: ("TS.TYPE_GUARD", bg="ideaBgINJECTED_LANGUAGE_FRAGMENT")
        // end: typescript

        // begin: shell
        a: ("BASH.EXTERNAL_COMMAND", useBase=true)
        a: ("BASH.SUBSHELL_COMMAND", fg="green")
        a: ("BASH.FUNCTION_DEF_NAME", useBase=true)
        a: ("BASH.REDIRECTION", fg="green")
        a: ("BASH.SHEBANG", useBase=true)
        // end: shell

        // begin: sql
        a: ("SQL_DATABASE_OBJECT", fg="yellow")
        a: ("SQL_OUTER_QUERY_COLUMN", useBase=true)
        a: ("SQL_SYNTHETIC_ENTITY")
        // end: sql

        // begin: http request
        a: ("HTTP_HEADER_FIELD_NAME", fg="green")
        a: ("HTTP_REQUEST_INPUT_SIGN", fg="green")
        a: ("HTTP_REQUEST_INPUT_FILE", fg="blue1")
        a: ("HTTP_REQUEST_DIFFERENCE_SIGN", fg="green")
        a: ("HTTP_REQUEST_DIFFERENCE_FILE", fg="blue1")
        a: ("HTTP_REQUEST_MULTIPART_BOUNDARY", fg="oliveGreen")
        a: ("HTTP_REQUEST_VARIABLE_BRACES", fg="purple2")
        a: ("HTTP_REQUEST_PARAMETER_NAME", fg="purple1")
        a: ("HTTP_REQUEST_PARAMETER_VALUE", fg="cyan")
        // end: http request

        // begin: css
        a: ("CSS.ATTRIBUTE_NAME", fg="purple1")
        a: ("CSS.FUNCTION")
        a: ("CSS.COLOR", fg="orange")
        a: ("CSS.HASH", fg="green")
        a: ("CSS.IDENT")
        a: ("CSS.UNICODE.RANGE", fg="orange")
        a: ("CSS.URL", fg="blue1")
        // end: css

        // begin: markdown
        a: ("MARKDOWN_BLOCK_QUOTE_MARKER", fg="cyan")
        a: ("MARKDOWN_CODE_SPAN_MARKER", fg="cyan")
        a: ("MARKDOWN_HEADER_LEVEL_1")
        a: ("MARKDOWN_HEADER_LEVEL_2")
        a: ("MARKDOWN_HEADER_LEVEL_3")
        a: ("MARKDOWN_HEADER_LEVEL_4")
        a: ("MARKDOWN_HEADER_LEVEL_5")
        a: ("MARKDOWN_HEADER_LEVEL_6")
        a: ("MARKDOWN_EXPLICIT_LINK", fg="blue1")
        a: ("MARKDOWN_LINK_DESTINATION", fg="blue1")
        a: ("MARKDOWN_REFERENCE_LINK")
        a: ("MARKDOWN_BOLD")
        a: ("MARKDOWN_ITALIC")
        // end: markdown

        // begin: editor config
        a: ("EDITORCONFIG_PROPERTY_KEY", fg="green")
        // end: editor config

        // begin: json
        a: ("JSON.KEYWORD", fg="purple2")
        a: ("JSON.PROPERTY_KEY", fg="green")
        a: ("JSONPATH.BOOLEAN", fg="green")
        // end: json

        // begin: toml
        a: ("org.toml.DATE", fg="purple2")
        a: ("org.toml.BOOLEAN", fg="purple2")
        // end: toml

        // begin: yaml
        a: ("YAML_ANCHOR", fg="yellow")
        // end: yaml

        // begin: xml
        a: ("XML_PROLOGUE", fg="green")
        a: ("XML_NS_PREFIX", fg="blue1")
        a: ("XPATH.FUNCTION", useBase=true)
        a: ("XPATH.KEYWORD", useBase=true)
        a: ("XPATH.XPATH_NAME", fg="green")
        a: ("XPATH.XPATH_VARIABLE", fg="purple2")
        // end: xml

        // begin: logcat
        a: ("LOGCAT_VERBOSE_OUTPUT", fg="blue1")
        a: ("LOGCAT_DEBUG_OUTPUT", fg="cyan")
        a: ("LOGCAT_INFO_OUTPUT", fg="green")
        a: ("LOGCAT_WARNING_OUTPUT", fg="orange")
        a: ("LOGCAT_FILTER_KVALUE", fg="cyan")
        a: ("LOGCAT_FILTER_REGEX_KVALUE", fg="cyan")
        a: ("LOGCAT_FILTER_STRING_KVALUE", fg="cyan")
        // end: logcat

        // begin: plan9
        a: ("com.plan9.FLAG")
        a: ("com.plan9.INSTRUCTION", useBase=true)
        a: ("com.plan9.LABEL", useBase=true)
        a: ("com.plan9.REGISTER", fg="purple2")
        // end: plan9
        
        // begin: compose
        a: ("ComposableCallTextAttributes", fg="yellow")
        a: ("LiveLiteralsHighlightAttribute", effectColor="altFg2")
        // end: compose
    });

    scheme
}
