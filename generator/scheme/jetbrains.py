from typing import Optional

from . import *


class JetbrainsColor:
    all = list()

    name: str
    color: Optional[Color]

    def __init__(self, name: str, color: Optional[Color]):
        self.name = name
        self.color = color

    def icls_item(self) -> str:
        s = f"        <option name=\"{self.name}\""
        if self.color is not None:
            s += f" value=\"{self.color.hex0()}\""
        s += "/>\n"
        return s


class JetbrainsAttribute:
    all = list()

    name: str
    use_base: bool
    fg: Optional[Color]
    bg: Optional[Color]
    stripe: Optional[Color]
    effect_type: int
    effect_color: Optional[Color]

    def __init__(self, name: str, use_base: bool, fg: Optional[Color], bg: Optional[Color],
                 stripe: Optional[Color],
                 effect_type: int, effect_color: Optional[Color]):
        self.name = name
        self.use_base = use_base
        self.fg = fg
        self.bg = bg
        self.stripe = stripe
        self.effect_type = effect_type
        self.effect_color = effect_color

    def icls_item(self) -> str:
        s = f"        <option name=\"{self.name}\""
        if self.use_base:
            s += " baseAttributes=\"1\"/>\n"
            return s
        s += ">\n"
        s += f"            <value>\n"
        if self.fg is not None:
            s += f"                <option name=\"FOREGROUND\" value=\"{self.fg.hex0()}\"/>\n"
        if self.bg is not None:
            s += f"                <option name=\"BACKGROUND\" value=\"{self.bg.hex0()}\"/>\n"
        if self.stripe is not None:
            s += f"                <option name=\"ERROR_STRIPE_COLOR\" value=\"{self.stripe.hex0()}\"/>\n"
        if self.effect_type > 0:
            s += f"                <option name=\"EFFECT_TYPE\" value=\"{self.effect_type}\"/>\n"
        if self.effect_color is not None:
            s += f"                <option name=\"EFFECT_COLOR\" value=\"{self.effect_color.hex0()}\"/>\n"
        s += f"            </value>\n"
        s += f"        </option>\n"
        return s


underline = 1
underwave = 2
strikeout = 3


def c(name: str, color: Optional[Color] = None) -> JetbrainsColor:
    x = JetbrainsColor(name, color)
    JetbrainsColor.all.append(x)
    return x


def a(name: str, use_base: bool = False, fg: Optional[Color] = None,
      bg: Optional[Color] = None, stripe: Optional[Color] = None, effect_type: int = 0,
      effect_color: Optional[Color] = None) -> JetbrainsAttribute:
    x = JetbrainsAttribute(name, use_base, fg, bg, stripe, effect_type, effect_color)
    JetbrainsAttribute.all.append(x)
    return x


text = a("TEXT", fg=primary_fg, bg=primary_bg)
deleted_text = a("DELETED_TEXT_ATTRIBUTES", fg=secondary_fg, bg=Color(0, 0, 95), effect_type=strikeout,
                 effect_color=secondary_fg)
folded_text = a("FOLDED_TEXT_ATTRIBUTES", fg=secondary_fg, bg=Color(120, 10, 95))
folded_text_border = c("FOLDED_TEXT_BORDER_COLOR", color=Color(150, 10, 85))
soft_wrap_sign = c("SOFT_WRAP_SIGN_COLOR", color=primary_fg)
tabs = c("TABS", color=Color(210, 10, 90))
whitespaces = c("WHITESPACES", color=primary_fg)

search_result = a("SEARCH_RESULT_ATTRIBUTES", bg=Color(240, 20, 100), stripe=Color(240, 20, 70))
write_search_result = a("WRITE_SEARCH_RESULT_ATTRIBUTES", bg=Color(300, 20, 100), stripe=Color(300, 20, 70))
text_search_result = a("TEXT_SEARCH_RESULT_ATTRIBUTES", fg=Color(210, 50, 25), bg=Color(120, 30, 100),
                       stripe=Color(120, 100, 75))

template_active_segment = a("LIVE_TEMPLATE_ATTRIBUTES", effect_color=Color(120, 50, 75))
template_inactive_segment = a("LIVE_TEMPLATE_INACTIVE_SEGMENT", effect_color=Color(0, 0, 75))
template_variable = a("TEMPLATE_VARIABLE_ATTRIBUTES", fg=pink)

hyperlink = a("HYPERLINK_ATTRIBUTES", fg=blue, effect_type=underline, effect_color=blue)
followed_hyperlink = a("FOLLOWED_HYPERLINK_ATTRIBUTES", fg=purple, effect_type=underline, effect_color=purple)
inactive_hyperlink = a("INACTIVE_HYPERLINK_ATTRIBUTES", effect_type=underline, effect_color=primary_fg)
reference_link = a("CTRL_CLICKABLE", fg=blue, effect_type=underline, effect_color=blue)

error = a("ERRORS_ATTRIBUTES", bg=Color(0, 20, 100), stripe=Color(0, 100, 100))
warning = a("WARNING_ATTRIBUTES", bg=Color(45, 40, 100), stripe=Color(45, 100, 80))
weak_warning = a("INFO_ATTRIBUTES", effect_type=underwave, effect_color=yellow, stripe=Color(45, 25, 90))
deprecated_symbol = a("DEPRECATED_ATTRIBUTES", effect_type=strikeout, effect_color=primary_fg)
deprecated_marked_for_removal = a("MARKED_FOR_REMOVAL_ATTRIBUTES", effect_type=strikeout, effect_color=red)
unused_symbol = a("NOT_USED_ELEMENT_ATTRIBUTES", fg=secondary_fg)
unknown_symbol = a("WRONG_REFERENCES_ATTRIBUTES", fg=red)
typo = a("TYPO", effect_type=underwave, effect_color=green)

caret = c("CARET_COLOR", color=primary_fg)
caret_row = c("CARET_ROW_COLOR", color=Color(75, 20, 98))
selection_fg = c("SELECTION_FOREGROUND")
selection_bg = c("SELECTION_BACKGROUND", color=Color(90, 30, 95))
indent_guide = c("INDENT_GUIDE", color=Color(120, 10, 90))
selected_indent_guide = c("SELECTED_INDENT_GUIDE", color=Color(120, 10, 70))
visual_indent_guide = c("VISUAL_INDENT_GUIDE", color=indent_guide.color)
right_margin = c("RIGHT_MARGIN_COLOR", color=Color(120, 10, 80))
matched_brace_indent_guide = c("MATCHED_BRACES_INDENT_GUIDE_COLOR", color=Color(120, 50, 75))
breadcrumbs_current = a("BREADCRUMBS_CURRENT", fg=primary_fg, bg=Color(120, 20, 98))
breadcrumbs_default = a("BREADCRUMBS_DEFAULT", fg=primary_fg)
breadcrumbs_hovered = a("BREADCRUMBS_HOVERED", fg=primary_fg, bg=Color(75, 20, 95))
breadcrumbs_inactive = a("BREADCRUMBS_INACTIVE", fg=primary_fg)

line_number = c("LINE_NUMBER_COLOR", color=tertiary_fg)
line_number_on_caret_row = c("LINE_NUMBER_ON_CARET_ROW_COLOR", color=primary_fg)
todo = a("TODO_DEFAULT_ATTRIBUTES", fg=primary_fg, bg=Color(60, 60, 100), stripe=Color(210, 75, 100))
identifier_under_caret = a("IDENTIFIER_UNDER_CARET_ATTRIBUTES", bg=Color(240, 10, 100), stripe=Color(270, 60, 100))
write_identifier_under_caret = a("WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES", bg=Color(300, 10, 100),
                                 stripe=Color(300, 60, 100))
injected_language_fragment = a("INJECTED_LANGUAGE_FRAGMENT", bg=secondary_bg)
method_separator = c("METHOD_SEPARATORS_COLOR", color=indent_guide.color)
matched_brace = a("MATCHED_BRACE_ATTRIBUTES", bg=Color(180, 40, 98))
unmatched_brace = a("UNMATCHED_BRACE_ATTRIBUTES", bg=error.bg)

bad_character = a("BAD_CHARACTER", bg=error.bg)
class_name = a("DEFAULT_CLASS_NAME", fg=blue)
class_reference = a("DEFAULT_CLASS_REFERENCE", fg=class_name.fg)
interface_name = a("DEFAULT_INTERFACE_NAME", fg=class_name.fg)
instance_field = a("DEFAULT_INSTANCE_FIELD", fg=purple)
static_field = a("DEFAULT_STATIC_FIELD", fg=pink)
static_method = a("DEFAULT_STATIC_METHOD", use_base=True)
line_comment = a("DEFAULT_LINE_COMMENT", fg=olive_green)
block_comment = a("DEFAULT_BLOCK_COMMENT", fg=line_comment.fg)
doc_comment = a("DEFAULT_DOC_COMMENT", fg=line_comment.fg)
doc_markup = a("DEFAULT_DOC_MARKUP", bg=secondary_bg)
doc_comment_link = c("DOC_COMMENT_LINK", color=Color(210, 100, 75))
doc_comment_tag = a("DEFAULT_DOC_COMMENT_TAG", fg=yellow)
doc_comment_tag_value = a("DEFAULT_DOC_COMMENT_TAG_VALUE", fg=primary_fg)
constant = a("DEFAULT_CONSTANT", fg=dark_red)
identifier = a("DEFAULT_IDENTIFIER", fg=primary_fg)
global_variable = a("DEFAULT_GLOBAL_VARIABLE", fg=pink)
label = a("DEFAULT_LABEL", fg=blue)
predefined_symbol = a("DEFAULT_PREDEFINED_SYMBOL", fg=green)
reassigned_local_variable = a("DEFAULT_REASSIGNED_LOCAL_VARIABLE", effect_type=underline, effect_color=primary_fg)
reassigned_parameter = a("DEFAULT_REASSIGNED_PARAMETER", effect_type=underline, effect_color=primary_fg)
inline_parameter_hint = a("INLINE_PARAMETER_HINT", fg=Color(0, 0, 50), bg=Color(0, 0, 90))
inline_parameter_hint_current = a("INLINE_PARAMETER_HINT_CURRENT", fg=Color(0, 0, 40), bg=Color(120, 30, 90))
inline_parameter_hint_highlighted = a("INLINE_PARAMETER_HINT_HIGHLIGHTED", fg=Color(0, 0, 40), bg=Color(0, 0, 80))
keyword = a("DEFAULT_KEYWORD", fg=green)
tag = a("DEFAULT_TAG", fg=green)
entity = a("DEFAULT_ENTITY", fg=dark_red)
attribute = a("DEFAULT_ATTRIBUTE", fg=purple)
metadata = a("DEFAULT_METADATA", fg=yellow)
number = a("DEFAULT_NUMBER", fg=orange)
string = a("DEFAULT_STRING", fg=cyan)
valid_string_escape = a("DEFAULT_VALID_STRING_ESCAPE", fg=blue)
invalid_string_escape = a("DEFAULT_INVALID_STRING_ESCAPE", fg=valid_string_escape.fg, bg=bad_character.bg)
highlighted_reference = a("DEFAULT_HIGHLIGHTED_REFERENCE", effect_type=underline, effect_color=secondary_fg)
template_language = a("DEFAULT_TEMPLATE_LANGUAGE_COLOR", bg=secondary_bg)

console_background = c("CONSOLE_BACKGROUND_KEY", color=primary_bg)
console_normal_output = a("CONSOLE_NORMAL_OUTPUT", fg=primary_fg)
console_system_output = a("CONSOLE_SYSTEM_OUTPUT", fg=primary_fg)
console_error_output = a("CONSOLE_ERROR_OUTPUT", fg=red)
console_user_input = a("CONSOLE_USER_INPUT", fg=cyan)
console_red = a("CONSOLE_RED_OUTPUT", fg=red)
console_bright_red = a("CONSOLE_RED_BRIGHT_OUTPUT", fg=bright_red)
console_yellow = a("CONSOLE_YELLOW_OUTPUT", fg=yellow)
console_bright_yellow = a("CONSOLE_YELLOW_BRIGHT_OUTPUT", fg=bright_yellow)
console_green = a("CONSOLE_GREEN_OUTPUT", fg=green)
console_bright_green = a("CONSOLE_GREEN_BRIGHT_OUTPUT", fg=bright_green)
console_cyan = a("CONSOLE_CYAN_OUTPUT", fg=cyan)
console_bright_cyan = a("CONSOLE_CYAN_BRIGHT_OUTPUT", fg=bright_cyan)
console_blue = a("CONSOLE_BLUE_OUTPUT", fg=blue)
console_bright_blue = a("CONSOLE_BLUE_BRIGHT_OUTPUT", fg=bright_blue)
console_magenta = a("CONSOLE_MAGENTA_OUTPUT", fg=pink)
console_bright_magenta = a("CONSOLE_MAGENTA_BRIGHT_OUTPUT", fg=bright_pink)
console_black = a("CONSOLE_BLACK_OUTPUT", fg=black)
console_dark_gray = a("CONSOLE_DARKGRAY_OUTPUT", fg=bright_black)
console_gray = a("CONSOLE_GRAY_OUTPUT", fg=white)
console_white = a("CONSOLE_WHITE_OUTPUT", fg=bright_white)
log_verbose = a("LOG_VERBOSE_OUTPUT", fg=blue)
log_debug = a("LOG_DEBUG_OUTPUT", fg=cyan)
log_info = a("LOG_INFO_OUTPUT", fg=green)
log_warning = a("LOG_WARNING_OUTPUT", fg=yellow)
log_error = a("LOG_ERROR_OUTPUT", fg=red)
log_expired_entry = a("LOG_EXPIRED_ENTRY", fg=tertiary_fg)
terminal_command_to_run_using_ide = a("TERMINAL_COMMAND_TO_RUN_USING_IDE", bg=Color(120, 20, 100))

diff_modified = a("DIFF_MODIFIED", bg=Color(210, 15, 95), stripe=Color(210, 50, 90))
diff_inserted = a("DIFF_INSERTED", bg=Color(120, 15, 95), stripe=Color(120, 50, 80))
diff_conflict = a("DIFF_CONFLICT", bg=Color(15, 15, 95), stripe=Color(15, 50, 90))
diff_deleted = a("DIFF_DELETED", bg=Color(120, 3, 90), stripe=Color(0, 0, 70))
diff_separator_wave = c("DIFF_SEPARATOR_WAVE", color=right_margin.color)

custom_line_comment = a("CUSTOM_LINE_COMMENT_ATTRIBUTES", use_base=True)
custom_block_comment = a("CUSTOM_MULTI_LINE_COMMENT_ATTRIBUTES", use_base=True)
custom_string = a("CUSTOM_STRING_ATTRIBUTES", use_base=True)
custom_valid_string_escape = a("CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES", use_base=True)
custom_invalid_string_escape = a("CUSTOM_INVALID_STRING_ESCAPE_ATTRIBUTES", use_base=True)
custom_keyword1 = a("CUSTOM_KEYWORD1_ATTRIBUTES", fg=blue)
custom_keyword2 = a("CUSTOM_KEYWORD2_ATTRIBUTES", fg=pink)
custom_keyword3 = a("CUSTOM_KEYWORD3_ATTRIBUTES", fg=green)
custom_keyword4 = a("CUSTOM_KEYWORD4_ATTRIBUTES", fg=dark_red)

gutter_added_line = c("ADDED_LINES_COLOR", color=Color(120, 20, 80))
gutter_ignored_added_line = c("IGNORED_ADDED_LINES_BORDER_COLOR", color=Color(120, 100, 50))
gutter_modified_line = c("MODIFIED_LINES_COLOR", color=Color(210, 30, 85))
gutter_ignored_modified_line = c("IGNORED_MODIFIED_LINES_BORDER_COLOR", color=Color(210, 100, 75))
gutter_deleted_line = c("DELETED_LINES_COLOR", color=Color(0, 40, 80))
gutter_ignored_deleted_line = c("IGNORED_DELETED_LINES_BORDER_COLOR", color=Color(0, 60, 80))
gutter_whitespace_modified_line = c("WHITESPACES_MODIFIED_LINES_COLOR", color=Color(45, 40, 85))

cmake_argument_property = a("com.jetbrains.cmake.ARGUMENT_PROPERTY", fg=attribute.fg)
cmake_command = a("com.jetbrains.cmake.COMMAND", fg=keyword.fg)

compose_function_call = a("ComposableCallTextAttributes", fg=metadata.fg)

cpp_initializer_list = a("OC.STD_INITIALIZER_LIST")
cpp_overloaded_operator = a("OC.OVERLOADED_OPERATOR", fg=string.fg)
cpp_class = a("OC.STRUCT_LIKE", fg=class_name.fg)
cpp_conditionally_not_compiled = a("OC.CONDITIONALLY_NOT_COMPILED", fg=secondary_fg)
cpp_enum = a("OC.ENUM_CONST", fg=static_field.fg)
cpp_label = a("OC.LABEL", fg=label.fg)
cpp_namespace = a("OC.NAMESPACE_LIKE")
cpp_macro = a("OC.MACRONAME", fg=metadata.fg)
cpp_macro_parameter = a("OC.MACRO_PARAMETER")
cpp_struct_field = a("OC.STRUCT_FIELD", fg=instance_field.fg)
cpp_template_value = a("OC.TEMPLATE_VALUE", fg=constant.fg)
cpp_typedef = a("OC.TYPEDEF", fg=class_name.fg)

css_attribute_name = a("CSS.ATTRIBUTE_NAME", fg=attribute.fg)
css_class_name = a("CSS.CLASS_NAME", fg=class_name.fg)
css_function = a("CSS.FUNCTION")
css_hex_color = a("CSS.COLOR", fg=constant.fg)
css_property_value = a("CSS.PROPERTY_VALUE")
css_unicode_range = a("CSS.UNICODE.RANGE", fg=constant.fg)
css_url = a("CSS.URL", fg=hyperlink.fg)

docker_variable = a("DOCKER_VARIABLE", fg=global_variable.fg)

editorconfig_property_key = a("EDITORCONFIG_PROPERTY_KEY", fg=keyword.fg)
editorconfig_property_value = a("EDITORCONFIG_PROPERTY_VALUE")

go_comment_reference = a("GO_COMMENT_REFERENCE")
go_builtin_constant = a("GO_BUILTIN_CONSTANT", fg=predefined_symbol.fg)
go_builtin_function = a("GO_BUILTIN_FUNCTION", fg=predefined_symbol.fg)
go_builtin_variable = a("GO_BUILTIN_VARIABLE", fg=predefined_symbol.fg)
go_builtin_function_call = a("GO_BUILTIN_FUNCTION_CALL", fg=predefined_symbol.fg)
go_builtin_type_reference = a("GO_BUILTIN_TYPE_REFERENCE", fg=predefined_symbol.fg)
go_package_local_variable = a("GO_PACKAGE_LOCAL_VARIABLE", fg=static_field.fg)
go_struct_exported_member = a("GO_STRUCT_EXPORTED_MEMBER", fg=instance_field.fg)
go_struct_local_member = a("GO_STRUCT_LOCAL_MEMBER", fg=instance_field.fg)
go_template_variable = a("GO_TEMPLATE_VARIABLE", fg=global_variable.fg)

groovy_closure_brace = a("Closure braces", use_base=True)
groovy_keyword = a("GROOVY_KEYWORD", use_base=True)
groovy_list_map_conversion = a("List/map to object conversion")
groovy_instance_property = a("Instance property reference ID", use_base=True)
groovy_static_property = a("Static property reference ID", use_base=True)
groovy_unresolved_reference = a("Unresolved reference access", fg=red)

http_req_header_key = a("HTTP_HEADER_FIELD_NAME", fg=keyword.fg)
http_req_input_file_path = a("HTTP_REQUEST_INPUT_FILE", fg=hyperlink.fg)
http_req_multipart_boundary = a("HTTP_REQUEST_MULTIPART_BOUNDARY", fg=secondary_fg)
http_req_parameter_name = a("HTTP_REQUEST_PARAMETER_NAME", fg=attribute.fg)
http_req_rsp_history_path = a("HTTP_REQUEST_DIFFERENCE_FILE", fg=hyperlink.fg)

java_annotation = a("ANNOTATION_NAME_ATTRIBUTES", fg=metadata.fg)
java_annotation_attribute = a("ANNOTATION_ATTRIBUTE_NAME_ATTRIBUTES", fg=attribute.fg)
java_static_final_field = a("STATIC_FINAL_FIELD_ATTRIBUTES", use_base=True)
java_static_field = a("STATIC_FIELD_ATTRIBUTES", use_base=True)
java_instance_field = a("INSTANCE_FIELD_ATTRIBUTES", use_base=True)
java_constructor_declaration = a("CONSTRUCTOR_DECLARATION_ATTRIBUTES", fg=class_name.fg)
java_constructor_call = a("CONSTRUCTOR_CALL_ATTRIBUTES", fg=class_name.fg)
java_implicit_anonymous_class_parameter = a("IMPLICIT_ANONYMOUS_CLASS_PARAMETER_ATTRIBUTES")
java_type_parameter = a("TYPE_PARAMETER_NAME_ATTRIBUTES", fg=class_name.fg)

js_global_function = a("JS.GLOBAL_FUNCTION", use_base=True)
js_global_variable = a("JS.GLOBAL_VARIABLE", use_base=True)
js_local_variable = a("JS.LOCAL_VARIABLE", use_base=True)
js_parameter = a("JS.PARAMETER", use_base=True)
js_method = a("JS.INSTANCE_MEMBER_FUNCTION", use_base=True)
js_regex = a("JS.REGEXP", fg=string.fg)
js_injected_language_fragment = a("JavaScript:INJECTED_LANGUAGE_FRAGMENT", use_base=True)

json_property_key = a("JSON.PROPERTY_KEY", fg=keyword.fg)

kotlin_lambda_brace = a("KOTLIN_FUNCTION_LITERAL_BRACES_AND_ARROW")
kotlin_constructor_call = a("KOTLIN_CONSTRUCTOR", fg=class_name.fg)
kotlin_dynamic_function_call = a("KOTLIN_DYNAMIC_FUNCTION_CALL")
kotlin_label = a("KOTLIN_LABEL", use_base=True)
kotlin_named_argument = a("KOTLIN_NAMED_ARGUMENT", fg=text.fg)
kotlin_closure_default_parameter = a("KOTLIN_CLOSURE_DEFAULT_PARAMETER", fg=keyword.fg)
kotlin_backing_field_variable = a("KOTLIN_BACKING_FIELD_VARIABLE")
kotlin_dynamic_property = a("KOTLIN_DYNAMIC_PROPERTY_CALL")
kotlin_mutable_variable = a("KOTLIN_MUTABLE_VARIABLE", effect_type=underline, effect_color=primary_fg)
kotlin_closure_captured_reference = a("KOTLIN_WRAPPED_INTO_REF")
kotlin_smart_cast_value = a("KOTLIN_SMART_CAST_VALUE", bg=Color(120, 10, 100))
kotlin_smart_cast_receiver = a("KOTLIN_SMART_CAST_RECEIVER", bg=kotlin_smart_cast_value.bg)
kotlin_smart_constant = a("KOTLIN_SMART_CONSTANT", bg=kotlin_smart_cast_value.bg)

logcat_assert_indicator = a("LOGCAT_V2_LEVEL_ASSERT", fg=Color(0, 0, 100), bg=Color(0, 50, 60))
logcat_error_indicator = a("LOGCAT_V2_LEVEL_ERROR", fg=Color(0, 0, 100), bg=Color(0, 50, 90))
logcat_warning_indicator = a("LOGCAT_V2_LEVEL_WARNING", fg=Color(0, 0, 0), bg=Color(50, 50, 90))
logcat_info_indicator = a("LOGCAT_V2_LEVEL_INFO", fg=Color(0, 0, 0), bg=Color(120, 50, 90))
logcat_debug_indicator = a("LOGCAT_V2_LEVEL_DEBUG", fg=Color(0, 0, 0), bg=Color(180, 50, 90))
logcat_verbose_indicator = a("LOGCAT_V2_LEVEL_VERBOSE", fg=Color(0, 0, 100), bg=Color(240, 50, 100))
logcat_assert_message = a("LOGCAT_V2_MESSAGE_ASSERT", fg=red)
logcat_error_message = a("LOGCAT_V2_MESSAGE_ERROR", fg=red)
logcat_warning_message = a("LOGCAT_V2_MESSAGE_WARNING", fg=yellow)
logcat_info_message = a("LOGCAT_V2_MESSAGE_INFO", fg=green)
logcat_debug_message = a("LOGCAT_V2_MESSAGE_DEBUG", fg=cyan)
logcat_verbose_message = a("LOGCAT_V2_MESSAGE_VERBOSE", fg=blue)
logcat_filter_key = a("LOGCAT_FILTER_KEY", bg=Color(120, 5, 95))
logcat_filter_kvalue = a("LOGCAT_FILTER_KVALUE", bg=Color(120, 5, 95))
logcat_filter_regex_kvalue = a("LOGCAT_FILTER_REGEX_KVALUE", bg=Color(120, 5, 95))
logcat_filter_string_kvalue = a("LOGCAT_FILTER_STRING_KVALUE", bg=Color(120, 5, 95))

markdown_block_quote = a("MARKDOWN_BLOCK_QUOTE", fg=string.fg, bg=Color(120, 5, 95))
markdown_block_quote_marker = a("MARKDOWN_BLOCK_QUOTE_MARKER", fg=string.fg)
markdown_code_block = a("MARKDOWN_CODE_BLOCK", fg=text.fg, bg=injected_language_fragment.bg)
markdown_code_fence = a("MARKDOWN_CODE_FENCE", fg=text.fg, bg=injected_language_fragment.bg)
markdown_code_span_marker = a("MARKDOWN_CODE_SPAN_MAKRER", fg=string.fg)
markdown_header_level_1 = a("MARKDOWN_HEADER_LEVEL_1", fg=keyword.fg)
markdown_header_level_2 = a("MARKDOWN_HEADER_LEVEL_2", fg=keyword.fg)
markdown_header_level_3 = a("MARKDOWN_HEADER_LEVEL_3", fg=keyword.fg)
markdown_header_level_4 = a("MARKDOWN_HEADER_LEVEL_4", fg=keyword.fg)
markdown_header_level_5 = a("MARKDOWN_HEADER_LEVEL_5", fg=keyword.fg)
markdown_header_level_6 = a("MARKDOWN_HEADER_LEVEL_6", fg=keyword.fg)
markdown_bold_marker = a("MARKDOWN_BOLD_MARKER")
markdown_italic_marker = a("MARKDOWN_ITALIC_MARKER")

plan9_instruction = a("com.plan9.INSTRUCTION", use_base=True)
plan9_label = a("com.plan9.LABEL", use_base=True)
plan9_register = a("com.plan9.REGISTER", fg=predefined_symbol.fg)

properties_value = a("PROPERTIES.VALUE")

proto_enum_value = a("PROTO_ENUM_VALUE", fg=static_field.fg)
prototext_enum_value = a("PROTOTEXT_ENUM_VALUE", fg=static_field.fg)

python_builtin_name = a("PY.BUILTIN_NAME", use_base=True)
python_keyword_argument = a("PY.KEYWORD_ARGUMENT", fg=text.fg)
python_self_parameter = a("PY.SELF_PARAMETER", fg=keyword.fg)
python_byte_string = a("PY.STRING.B", use_base=True)
python_type_annotation = a("PY.ANNOTATION")
python_type_parameter = a("PY.TYPE_PARAMETER", fg=class_name.fg)
python_predefined_definition = a("PY.PREDEFINED_DEFINITION")
python_predefined_usage = a("PY.PREDEFINED_USAGE")

rst_inline_literal = a("REST.INLINE", bg=injected_language_fragment.bg)
rst_interpreted_text = a("REST.INTERPRETED", bg=Color(120, 5, 95))
rst_literal_block = a("REST.FIXED", bg=injected_language_fragment.bg)
rst_ref_name = a("REST.REF_NAME", fg=reference_link.fg)
rst_section_header = a("REST.SECTION.HEADER", fg=keyword.fg)

rust_cfg_disabled_code = a("org.rust.CFG_DISABLED_CODE", fg=secondary_fg)
rust_macro = a("org.rust.MACRO", fg=metadata.fg)
rust_lifetime = a("org.rust.LIFETIME", fg=string.fg)
rust_type_parameter = a("org.rust.TYPE_PARAMETER", fg=class_name.fg)
rust_doc_code = a("org.rust.DOC_CODE", fg=text.fg, bg=injected_language_fragment.bg)
rust_unsafe_code = a("org.rust.UNSAFE_CODE", bg=Color(30, 10, 100))
rust_static = a("org.rust.STATIC", fg=static_field.fg)
rust_static_mut = a("org.rust.MUT_STATIC", fg=static_field.fg, effect_type=underline, effect_color=static_field.fg)

shell_generic_command = a("BASH.EXTERNAL_COMMAND", use_base=True)
shell_conditional_operator = a("BASH.CONDITIONAL")
shell_function_name = a("BASH.FUNCTION_DEF_NAME", use_base=True)
shell_shebang = a("BASH.SHEBANG", fg=metadata.fg)

ts_module_name = a("TS.MODULE_NAME", fg=class_name.fg)
ts_type_guard = a("TS.TYPE_GUARD", bg=Color(120, 10, 100))
ts_type_parameter = a("TS.TYPE_PARAMETER", fg=class_name.fg)

toml_date = a("org.toml.date", fg=constant.fg)

xml_prologue = a("XML_PROLOGUE", fg=keyword.fg)
xml_ns_prefix = a("XML_NS_PREFIX", fg=class_name.fg)

xpath_keyword = a("XPATH.KEYWORD", use_base=True)
xpath_function = a("XPATH.FUNCTION", use_base=True)
xpath_name = a("XPATH.XPATH_NAME", use_base=True)
xpath_variable = a("XPATH.XPATH_VARIABLE", fg=global_variable.fg)

yaml_anchor = a("YAML_ANCHOR", fg=label.fg)
