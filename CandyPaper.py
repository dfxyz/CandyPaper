#!/usr/bin/env python

from typing import List, Tuple, Dict, Optional, Callable, Union, Iterable


def hsv2rgb(h: float, s: float, v: float, roundN: int = 4) -> Tuple[int, int, int]:
    from math import tan, pi, sqrt

    def _(h, big, small) -> float:
        t = tan(h / 180 * pi)
        return (2 * t * big - t * small + sqrt(3) * small) / (t + sqrt(3))

    def _round(n: float, roundN: int) -> int:
        n = int(round(n, 0))
        rem = n % roundN
        n -= rem
        if rem >= roundN // 2:
            n += roundN
        if n > 255:
            n = 255
        return n

    big = v / 100 * 255
    small = big * (100 - s) / 100

    r, g, b = (0, 0, 0)
    if h <= 60:
        r = big
        b = small
        g = _(h, r, b)
    elif h <= 120:
        g = big
        b = small
        r = _(120 - h, g, b)
    elif h <= 180:
        g = big
        r = small
        b = _(h - 120, g, r)
    elif h <= 240:
        b = big
        r = small
        g = _(240 - h, b, r)
    elif h <= 300:
        b = big
        g = small
        r = _(h - 240, b, g)
    else:
        r = big
        g = small
        b = _(h - 300, r, g)
    return _round(r, roundN), _round(g, roundN), _round(b, roundN)


def rgb2hex(r: int, g: int, b: int) -> str:
    hexStr = '#'
    if r < 16:
        hexStr += '0'
    hexStr += hex(r)[2:].upper()
    if g < 16:
        hexStr += '0'
    hexStr += hex(g)[2:].upper()
    if b < 16:
        hexStr += '0'
    hexStr += hex(b)[2:].upper()
    return hexStr


class Color:
    name: str
    h: float
    s: float
    v: float
    r: int
    g: int
    b: int
    hexStr: str

    def __init__(self, name: str, h: float, s: float, v: float):
        self.name = name
        self.h, self.s, self.v = h, s, v
        self.r, self.g, self.b = hsv2rgb(h, s, v)
        self.hexStr = rgb2hex(self.r, self.g, self.b)

    def __str__(self) -> str:
        name = self.name
        hexStr = self.hexStr
        h, s, v = self.h, self.s, self.v
        r, g, b = self.r, self.g, self.b
        s = f'{name}: hex={hexStr}; hsv=({h}, {s}, {v}), rgb=({r}, {g}, {b})'
        return s

    def alias(self, name) -> 'Color':
        return Color(name, self.h, self.s, self.v)

    def hex(self) -> str:
        return self.hexStr

    def hex0(self) -> str:
        return self.hexStr[1:]

    def fgStyleStr(self) -> str:
        return f'color:{self.hexStr};'

    def bgStyleStr(self) -> str:
        return f'background-color:{self.hexStr};'


class ColorGroup:
    name: str
    fg: Optional[Color]
    bg: Optional[Color]
    options: Dict[str, Union[str, int, Color]]

    def __init__(self, name: str, fg: Optional[Color] = None, bg: Optional[Color] = None, **options):
        self.name = name
        self.fg = fg
        self.bg = bg
        self.options = options

    def __str__(self) -> str:
        s = f'[{self.name}]\n'
        if self.fg:
            s += str(self.fg) + '\n'
        else:
            s += 'fg: None\n'
        if self.bg:
            s += str(self.bg)
        else:
            s += 'bg: None'
        return s

    def styleStr(self) -> str:
        s = ''
        if self.fg:
            s += self.fg.fgStyleStr()
        if self.bg:
            s += self.bg.bgStyleStr()
        return s


def html(content: Union[str, Iterable[str]]):
    from IPython.display import display, HTML
    s = content
    if type(content) is not str:
        s = ''
        for i in s:
            s += i
    display(HTML(s))


def makeHtmlElementFn(tagName: str) -> Callable:
    def f(content: Union[str, Iterable[str]] = 'Do you like what you see?',
          colorGroup: Optional[ColorGroup] = None,
          fg: Optional[Color] = None,
          bg: Optional[Color] = None,
          **styleArgs) -> str:
        style = ''
        if colorGroup:
            style += colorGroup.styleStr()
        else:
            if fg:
                style += fg.fgStyleStr()
            if bg:
                style += bg.bgStyleStr()
        for k, v in styleArgs.items():
            style += f'{k}:{v};'
        if style:
            style = f' style="{style}"'
        s = content
        if type(content) is not str:
            s = ''
            for i in content:
                s += i
        s = f'<{tagName}{style}>{s}</{tagName}>'
        return s

    return f


h1 = makeHtmlElementFn('h1')
h2 = makeHtmlElementFn('h2')
h3 = makeHtmlElementFn('h3')
h4 = makeHtmlElementFn('h4')
div = makeHtmlElementFn('div')
p = makeHtmlElementFn('p')
span = makeHtmlElementFn('span')

defaultBgLight: Color
defaultFgLight: Color
lightColors: Dict[str, Color] = dict()
lightBasicColors: List[Color] = list()
lightVimColorGroups: List[ColorGroup] = list()
lightIdeaColors: List[Union[Color, str]] = list()
lightIdeaAttributes: List[ColorGroup] = list()

defaultBgDark: Color
defaultFgDark: Color
darkColors: Dict[str, Color] = dict()
darkBasicColors: List[Color] = list()
darkVimColorGroups: List[ColorGroup] = list()
darkIdeaColors: List[Union[Color, str]] = list()
darkIdeaAttributes: List[ColorGroup] = list()

colors: Dict[str, Color]
basicColors: List[Color]
vimColorGroups: List[ColorGroup]
ideaColors: List[Union[Color, str]]
ideaAttributes: List[ColorGroup]


def defColor(name: str, h: float, s: float, v: float) -> Color:
    color = Color(name, h, s, v)
    colors[name] = color
    return color


def defBasicColor(name: str, h: float, s: float, v: float) -> Color:
    color = defColor(name, h, s, v)
    basicColors.append(color)
    return color


def defVimGroup(name: str, fg: Optional[Union[Tuple[float, float, float], str]] = None,
                bg: Optional[Union[Tuple[float, float, float], str]] = None, **options) -> ColorGroup:
    _fg = None
    if fg:
        colorName = f'vimFg{name}'
        if type(fg) is str:
            _fg = colors[fg]
            colors[colorName] = _fg
        elif type(fg) is tuple:
            h, s, v = fg
            _fg = defColor(colorName, h, s, v)
    _bg = None
    if bg:
        colorName = f'vimBg{name}'
        if type(bg) is str:
            _bg = colors[bg]
            colors[colorName] = _bg
        elif type(bg) is tuple:
            h, s, v = bg
            _bg = defColor(colorName, h, s, v)
    colorGroup = ColorGroup(name, fg=_fg, bg=_bg, **options)
    vimColorGroups.append(colorGroup)
    return colorGroup


def defIdeaColor(name: str, value: Optional[Union[Tuple[float, float, float], str]]) -> Optional[Color]:
    if value is None:
        ideaColors.append(name)
        return None
    key = f'ideaColor{name}'
    if type(value) is str:
        color = colors[value].alias(name)  # keep real name
        colors[key] = color
    elif type(value) is tuple:
        h, s, v = value
        color = Color(name, h, s, v)  # keep real name
        colors[key] = color
    else:
        return None
    ideaColors.append(color)
    return color


ideaUnderline = 1
ideaUnderwave = 2
ideaStrikeout = 3
ideaDottedLine = 5


def defIdeaOption(name: str, fg: Optional[Union[Tuple[float, float, float], str]] = None,
                  bg: Optional[Union[Tuple[float, float, float], str]] = None,
                  stripe: Optional[Union[Tuple[float, float, float], str]] = None, effect: Optional[int] = None,
                  effectColor: Optional[Union[Tuple[float, float, float], str]] = None,
                  useBase: bool = False) -> ColorGroup:
    _fg = None
    if fg:
        colorName = f'ideaFg{name}'
        if type(fg) is str:
            _fg = colors[fg]
            colors[colorName] = _fg
        elif type(fg) is tuple:
            h, s, v = fg
            _fg = defColor(colorName, h, s, v)
    _bg = None
    if bg:
        colorName = f'ideaBg{name}'
        if type(bg) is str:
            _bg = colors[bg]
            colors[colorName] = _bg
        elif type(bg) is tuple:
            h, s, v = bg
            _bg = defColor(colorName, h, s, v)
    _stripe = None
    if stripe:
        colorName = f'ideaStripe{name}'
        if type(stripe) is str:
            _stripe = colors[stripe]
            colors[colorName] = _stripe
        elif type(stripe) is tuple:
            h, s, v = stripe
            _stripe = defColor(colorName, h, s, v)
    _effectColor = None
    if effectColor:
        colorName = f'ideaStripe{name}'
        if type(effectColor) is str:
            _effectColor = colors[effectColor]
            colors[colorName] = _effectColor
        elif type(effectColor) is tuple:
            h, s, v = effectColor
            _effectColor = defColor(colorName, h, s, v)
    colorGroup = ColorGroup(name, fg=_fg, bg=_bg,
                            **{'stripe': _stripe, 'effect': effect, 'effectColor': _effectColor, 'useBase': useBase})
    ideaAttributes.append(colorGroup)
    return colorGroup


def previewLightBasicColors():
    colorList = [p(str(color), fg=color) for color in lightBasicColors]
    colorList[0] = colorList[0] + p(str(defaultBgLight), fg=defaultFgLight)
    html(div(colorList, bg=defaultBgLight))


def previewLightVimGroups():
    html(div((p(str(colorGroup).replace('\n', '<br>'), colorGroup=colorGroup)
              for colorGroup in lightVimColorGroups), fg=defaultFgLight, bg=defaultBgLight))


def previewDarkBasicColors():
    colorList = [p(str(color), fg=color) for color in darkBasicColors]
    colorList[0] = colorList[0] + p(str(defaultBgDark), fg=defaultFgDark)
    html(div(colorList, bg=defaultBgDark))


def previewDarkVimGroups():
    html(div((p(str(colorGroup).replace('\n', '<br>'), colorGroup=colorGroup)
              for colorGroup in darkVimColorGroups), fg=defaultFgDark, bg=defaultBgDark))


def vimGroupsToHiExpr(colorGroups: List[ColorGroup]) -> str:
    expr = ''
    for group in colorGroups:
        expr += f'    hi clear {group.name}\n'
        expr += f'    hi {group.name}'
        if group.fg:
            expr += f' guifg={group.fg.hex()}'
        if group.bg:
            expr += f' guibg={group.bg.hex()}'
        for k, v in group.options.items():
            expr += f' {k}={v}'
        expr += '\n'
    return expr.strip()


def outputForVim():
    with open('./CandyPaper.vim/colors/CandyPaper.vim', 'wb') as f:
        from datetime import date
        today = date.today()
        today = f'{today.year}-{today.month}-{today.day}'
        lightDef = vimGroupsToHiExpr(lightVimColorGroups)
        darkDef = vimGroupsToHiExpr(darkVimColorGroups)
        content = f'''" Color Scheme: CandyPaper
" Author: DF_XYZ <dfxyz1@gmail.com>
" License: MIT
" Source: http://github.com/dfxyz/CandyPaper.vim
" Last Change: {today}

hi clear
let g:colors_name = 'CandyPaper'

if &bg == 'light'
    {lightDef}
else
    {darkDef}
endif
'''
        f.write(bytes(content, 'utf-8'))
        print('"CandyPaper.vim" written')


def ideaColorsToXml(colors: List[Union[Color, str]]) -> str:
    s = ''
    for color in colors:
        if type(color) is str:
            name = color
            value = ''
        elif type(color) is Color:
            name = color.name
            value = color.hex0()
        else:
            continue
        s = s + f'\n    <option name="{name}" value="{value}"/>'
    return s


def ideaAttributesToXml(attributes: List[ColorGroup]) -> str:
    s = ''
    for colorGroup in attributes:
        name = colorGroup.name
        if colorGroup.options.get('useBase', False):
            s = s + f'\n    <option name="{name}" baseAttributes="1"/>'
            continue
        s = s + f'\n    <option name="{name}">'
        s = s + '\n      <value>'
        if colorGroup.fg:
            fg = colorGroup.fg.hex0()
            s = s + f'\n        <option name="FOREGROUND" value="{fg}"/>'
        if colorGroup.bg:
            bg = colorGroup.bg.hex0()
            s = s + f'\n        <option name="BACKGROUND" value="{bg}"/>'
        if colorGroup.options.get('stripe'):
            c = colorGroup.options['stripe']
            if type(c) is Color:
                value = c.hex0()
                s = s + f'\n        <option name="ERROR_STRIPE_COLOR" value="{value}"/>'
        if colorGroup.options.get('effectColor'):
            c = colorGroup.options['effectColor']
            if type(c) is Color:
                value = c.hex0()
                s = s + f'\n        <option name="EFFECT_COLOR" value="{value}"/>'
        if colorGroup.options.get('effect'):
            value = colorGroup.options['effect']
            if type(value) is int:
                s = s + f'\n        <option name="EFFECT_TYPE" value="{value}"/>'
        s = s + '\n      </value>'
        s = s + '\n    </option>'
    return s


def outputForJetbrains():
    from datetime import datetime
    now = datetime.now().strftime('%Y-%m-%dT%H:%M:%S')
    template = f'''<scheme name="{{name}}" version="142" parent_scheme="{{parentName}}">
  <metaInfo>
    <property name="created">{now}</property>
    <property name="ide">Idea</property>
    <property name="ideVersion">2022.2.0.0</property>
    <property name="modified">{now}</property>
  </metaInfo>
  <colors>{{colors}}
  </colors>
  <attributes>{{attributes}}
  </attributes>
</scheme>
'''
    with open('./CandyPaper.idea/CandyPaperLight.icls', 'wb') as f:
        name = 'Candy Paper Light'
        parentName = 'Default'
        colorOptions = ideaColorsToXml(lightIdeaColors)
        attributesOptions = ideaAttributesToXml(lightIdeaAttributes)
        content = template \
            .replace('{name}', name) \
            .replace('{parentName}', parentName) \
            .replace('{colors}', colorOptions) \
            .replace('{attributes}', attributesOptions)
        f.write(bytes(content, 'utf-8'))
    with open('./CandyPaper.idea/CandyPaperDark.icls', 'wb') as f:
        name = 'Candy Paper Dark'
        parentName = 'Darcula'
        colorOptions = ideaColorsToXml(darkIdeaColors)
        attributesOptions = ideaAttributesToXml(darkIdeaAttributes)
        content = template \
            .replace('{name}', name) \
            .replace('{parentName}', parentName) \
            .replace('{colors}', colorOptions) \
            .replace('{attributes}', attributesOptions)
        f.write(bytes(content, 'utf-8'))
    print('"CandyPaper.idea" written')


def outputForTotalCmd():
    def dec2bin(dec: int) -> str:
        b = bin(dec)[2:]
        zeroNum = 8 - len(b)
        s = ''
        if zeroNum > 0:
            s = '0' * zeroNum
        return s + b

    def color2number(color: Color) -> int:
        s = dec2bin(color.b)
        s = s + dec2bin(color.g)
        s = s + dec2bin(color.r)
        return int(s, 2)

    with open('./CandyPaper.tc', 'wb') as f:
        lightBg = color2number(defaultBgLight)
        lightFg = color2number(defaultFgLight)
        lightVisual = color2number(lightColors['vimBgVisual'])
        lightBlue = color2number(lightColors['blue1'])
        darkBg = color2number(defaultBgDark)
        darkFg = color2number(defaultFgDark)
        darkVisual = color2number(darkColors['vimBgVisual'])
        darkBlue = color2number(darkColors['blue1'])
        content = f'''[Colors]
InverseCursor=0
ThemedCursor=0
InverseSelection=1
BackColor={lightBg}
BackColor2={lightBg}
ForeColor={lightFg}
MarkColor={lightVisual}
CursorColor={lightFg}
CursorText={lightFg}
ColorFilter1=>Directory
ColorFilter1Color={lightBlue}
ColorFilter1ColorDark={darkBlue},{lightBlue}
[ColorsDark]
InverseCursor=0
ThemedCursor=0
InverseSelection=1
BackColor={darkBg}
BackColor2={darkBg}
ForeColor={darkFg}
MarkColor={darkVisual}
CursorColor={darkFg}
CursorText={darkFg}
'''
        f.write(bytes(content, 'utf-8'))
        print('"CandyPaper.tc" written')


def outputForWindowsTerminal():
    with open('./CandyPaper.wt', 'wb') as f:
        lightBg = defaultBgLight.hex()
        lightFg = defaultFgLight.hex()
        lightVisual = lightColors['vimBgVisual'].hex()
        lightBlack = lightColors['black'].hex()
        lightDarkGray = lightColors['darkGray'].hex()
        lightGray = lightColors['gray'].hex()
        lightWhite = lightColors['white'].hex()
        lightRed = lightColors['red'].hex()
        lightYellow = lightColors['yellow'].hex()
        lightGreen = lightColors['green'].hex()
        lightCyan = lightColors['cyan'].hex()
        lightBlue = lightColors['blue1'].hex()
        lightPurple = lightColors['purple1'].hex()
        darkBg = defaultBgDark.hex()
        darkFg = defaultFgDark.hex()
        darkVisual = darkColors['vimBgVisual'].hex()
        darkBlack = darkColors['black'].hex()
        darkDarkGray = darkColors['darkGray'].hex()
        darkGray = darkColors['gray'].hex()
        darkWhite = darkColors['white'].hex()
        darkRed = darkColors['red'].hex()
        darkYellow = darkColors['yellow'].hex()
        darkGreen = darkColors['green'].hex()
        darkCyan = darkColors['cyan'].hex()
        darkBlue = darkColors['blue1'].hex()
        darkPurple = darkColors['purple1'].hex()
        content = f'''{{
    "name": "Candy Paper Light",
    "background": "{lightBg}",
    "foreground": "{lightFg}",
    "cursorColor": "{lightFg}",
    "selectionBackground": "{lightVisual}",
    "black": "{lightBlack}",
    "brightBlack": "{lightDarkGray}",
    "white": "{lightGray}",
    "brightWhite": "{lightWhite}",
    "red": "{lightRed}",
    "brightRed": "{lightRed}",
    "yellow": "{lightYellow}",
    "brightYellow": "{lightYellow}",
    "green": "{lightGreen}",
    "brightGreen": "{lightGreen}",
    "cyan": "{lightCyan}",
    "brightCyan": "{lightCyan}",
    "blue": "{lightBlue}",
    "brightBlue": "{lightBlue}",
    "purple": "{lightPurple}",
    "brightPurple": "{lightPurple}"
}},
{{
    "name": "Candy Paper Dark",
    "background": "{darkBg}",
    "foreground": "{darkFg}",
    "cursorColor": "{darkFg}",
    "selectionBackground": "{darkVisual}",
    "black": "{darkBlack}",
    "brightBlack": "{darkDarkGray}",
    "white": "{darkGray}",
    "brightWhite": "{darkWhite}",
    "red": "{darkRed}",
    "brightRed": "{darkRed}",
    "yellow": "{darkYellow}",
    "brightYellow": "{darkYellow}",
    "green": "{darkGreen}",
    "brightGreen": "{darkGreen}",
    "cyan": "{darkCyan}",
    "brightCyan": "{darkCyan}",
    "blue": "{darkBlue}",
    "brightBlue": "{darkBlue}",
    "purple": "{darkPurple}",
    "brightPurple": "{darkPurple}"
}},
'''
        f.write(bytes(content, 'utf-8'))
        print('"CandyPaper.wt" written')


def outputForMinTTY():
    template = '''BackgroundColour={bg}
ForegroundColour={fg}
CursorColour={fg}
Black={black}
BoldBlack={darkGray}
White={gray}
BoldWhite={white}
Red={red}
BoldRed={red}
Yellow={yellow}
BoldYellow={yellow}
Green={green}
BoldGreen={green}
Cyan={cyan}
BoldCyan={cyan}
Blue={blue}
BoldBlue={blue}
Magenta={purple}
BoldMagenta={purple}
'''
    with open('./CandyPaper.mintty/CandyPaperLight', 'wb') as f:
        bg = defaultBgLight.hex()
        fg = defaultFgLight.hex()
        black = lightColors['black'].hex()
        darkGray = lightColors['darkGray'].hex()
        gray = lightColors['gray'].hex()
        white = lightColors['white'].hex()
        red = lightColors['red'].hex()
        yellow = lightColors['yellow'].hex()
        green = lightColors['green'].hex()
        cyan = lightColors['cyan'].hex()
        blue = lightColors['blue1'].hex()
        purple = lightColors['purple1'].hex()
        content = template \
            .replace('{bg}', bg) \
            .replace('{fg}', fg) \
            .replace('{black}', black) \
            .replace('{darkGray}', darkGray) \
            .replace('{gray}', gray) \
            .replace('{white}', white) \
            .replace('{red}', red) \
            .replace('{yellow}', yellow) \
            .replace('{green}', green) \
            .replace('{cyan}', cyan) \
            .replace('{blue}', blue) \
            .replace('{purple}', purple)
        f.write(bytes(content, 'utf-8'))
    with open('./CandyPaper.mintty/CandyPaperDark', 'wb') as f:
        bg = defaultBgDark.hex()
        fg = defaultFgDark.hex()
        black = darkColors['black'].hex()
        darkGray = darkColors['darkGray'].hex()
        gray = darkColors['gray'].hex()
        white = darkColors['white'].hex()
        red = darkColors['red'].hex()
        yellow = darkColors['yellow'].hex()
        green = darkColors['green'].hex()
        cyan = darkColors['cyan'].hex()
        blue = darkColors['blue1'].hex()
        purple = darkColors['purple1'].hex()
        content = template \
            .replace('{bg}', bg) \
            .replace('{fg}', fg) \
            .replace('{black}', black) \
            .replace('{darkGray}', darkGray) \
            .replace('{gray}', gray) \
            .replace('{white}', white) \
            .replace('{red}', red) \
            .replace('{yellow}', yellow) \
            .replace('{green}', green) \
            .replace('{cyan}', cyan) \
            .replace('{blue}', blue) \
            .replace('{purple}', purple)
        f.write(bytes(content, 'utf-8'))
    print('"CandyPaper.mintty" written')


def outputCSS():
    template = '''@media (prefers-color-scheme: light) {
    body { color: {lightFg}; background: {lightBg}; }
}
@media (prefers-color-scheme: dark) {
    body { color: {darkFg}; background: {darkBg}; }
}
'''
    with open('./CandyPaper.css', 'wb') as f:
        lightFg = defaultFgLight.hex()
        lightBg = defaultBgLight.hex()
        darkFg = defaultFgDark.hex()
        darkBg = defaultBgDark.hex()
        content = template \
            .replace('{lightFg}', lightFg) \
            .replace('{lightBg}', lightBg) \
            .replace('{darkFg}', darkFg) \
            .replace('{darkBg}', darkBg)
        f.write(bytes(content, 'utf-8'))
    print('"CandyPaper.css" written')


def output():
    outputForVim()
    outputForJetbrains()
    outputForTotalCmd()
    outputForWindowsTerminal()
    outputForMinTTY()
    outputCSS()


# define light scheme
colors = lightColors
basicColors = lightBasicColors
vimColorGroups = lightVimColorGroups
ideaColors = lightIdeaColors
ideaAttributes = lightIdeaAttributes

bgLight = 100
fgLight = 50

# define basic colors
defaultBgLight = defColor('defaultBg', 90, 10, bgLight)
defaultFgLight = defBasicColor('defaultFg', 210, 50, fgLight)
defBasicColor('altFg1', 210, 50, fgLight + 25)
defBasicColor('altFg2', 120, 5, fgLight + 15)
defBasicColor('red', 0, 100, fgLight + 30)
defBasicColor('orange', 30, 100, fgLight + 30)
defBasicColor('yellow', 50, 100, fgLight)
defBasicColor('oliveGreen', 75, 100, fgLight)
defBasicColor('green', 120, 100, fgLight)
defBasicColor('cyan', 180, 100, fgLight + 5)
defBasicColor('blue1', 240, 100, fgLight + 25)
defBasicColor('blue2', 240, 100, fgLight + 50)
defBasicColor('purple1', 270, 100, fgLight + 25)
defBasicColor('purple2', 300, 100, fgLight + 25)
defBasicColor('black', 210, 20, fgLight - 25)
defBasicColor('darkGray', 210, 20, fgLight)
defBasicColor('gray', 210, 20, fgLight + 25)
defBasicColor('white', 90, 10, bgLight - 10)

# define vim (basic)
defVimGroup('Normal', fg='defaultFg', bg='defaultBg')
defVimGroup('Identifier', fg='defaultFg')
defVimGroup('Operator', fg='defaultFg')
defVimGroup('Delimiter', fg='defaultFg')
defVimGroup('Number', fg='orange')
defVimGroup('PreProc', fg='yellow')
defVimGroup('SpecialComment', fg='yellow')
defVimGroup('Comment', fg='oliveGreen')
defVimGroup('Boolean', fg='green')
defVimGroup('Statement', fg='green')
defVimGroup('Type', fg='green')
defVimGroup('Include', fg='green')
defVimGroup('String', fg='cyan')
defVimGroup('Character', fg='cyan')
defVimGroup('Special', fg='blue1')
defVimGroup('Tag', fg='blue2')
defVimGroup('Underlined', fg='blue2', gui='underline')
defVimGroup('Constant', fg='purple2')
defVimGroup('Error', bg=(0, 25, bgLight))
defVimGroup('Todo', bg=(60, 60, bgLight))
defVimGroup('Question', fg='green')
defVimGroup('Directory', fg='blue1')
defVimGroup('Title', fg='blue1')
defVimGroup('SpecialKey', fg='blue1')
defVimGroup('NonText', fg='altFg2')
defVimGroup('ModeMsg', fg='defaultFg')
defVimGroup('MoreMsg', fg='green')
defVimGroup('ErrorMsg', fg='red')
defVimGroup('WarningMsg', fg='yellow')
defVimGroup('Folded', fg='altFg1', bg=(150, 10, bgLight - 5))
defVimGroup('MatchParen', bg=(180, 35, bgLight - 5))
defVimGroup('ColorColumn', bg=(120, 10, bgLight - 20))
defVimGroup('CursorLine', bg=(75, 15, bgLight - 2.5))
defVimGroup('CursorColumn', bg='vimBgCursorLine')
defVimGroup('LineNr', fg='altFg2')
defVimGroup('CursorLineNr', fg='defaultFg', bg='vimBgCursorLine')
defVimGroup('FoldColumn', fg='altFg1')
defVimGroup('CursorLineFold', fg='defaultFg', bg='vimBgCursorLine')
defVimGroup('SignColumn', fg='altFg1')
defVimGroup('CursorLineSign', fg='defaultFg', bg='vimBgCursorLine')
defVimGroup('VertSplit', fg='altFg2')
defVimGroup('StatusLine', fg='defaultFg', bg=(120, 20, bgLight - 2.5))
defVimGroup('StatusLineNC', fg='altFg2', bg=(120, 7.5, bgLight - 10))
defVimGroup('StatusLineTerm', fg='defaultFg', bg='vimBgStatusLine')
defVimGroup('StatusLineTermNC', fg='altFg2', bg='vimBgStatusLineNC')
defVimGroup('TabLineSel', fg='defaultFg')
defVimGroup('TabLine', fg='altFg2', bg='vimBgStatusLineNC')
defVimGroup('TabLineFill', bg='vimBgStatusLineNC')
defVimGroup('Visual', bg=(90, 30, bgLight - 5))
defVimGroup('Search', fg='defaultFg', bg=(120, 35, bgLight))
defVimGroup('PmenuSel', bg='vimBgStatusLine')
defVimGroup('Pmenu', bg=(120, 5, bgLight - 5))
defVimGroup('PmenuSbar', bg='vimBgPmenu')
defVimGroup('PmenuThumb', bg=(120, 10, fgLight + 10))
defVimGroup('WildMenu', bg='vimBgTodo')
defVimGroup('DiffAdd', bg=(120, 15, bgLight - 5))
defVimGroup('DiffText', bg=(210, 15, bgLight - 5))
defVimGroup('DiffChange', bg=(210, 5, bgLight - 5))
defVimGroup('DiffDelete', fg='altFg2', bg=(120, 2.5, bgLight - 10))
defVimGroup('SpellBad', bg=(0, 10, bgLight))
defVimGroup('SpellLocal', bg=(180, 10, bgLight - 5))
defVimGroup('SpellCap', bg=(240, 10, bgLight))
defVimGroup('SpellRare', bg=(300, 10, bgLight))

# define vim (other)
defVimGroup('lspReference', bg=(240, 20, bgLight + 20))
defVimGroup('cssPseudoClassId', fg='defaultFg')
defVimGroup('cssUnitDecorators', fg='defaultFg')
defVimGroup('cssFontDescriptorAttr', fg='orange')
defVimGroup('cssAtKeyword', fg='green')
defVimGroup('cssIdentifier', fg='green')
defVimGroup('cssImportant', fg='green')
defVimGroup('cssAttr', fg='cyan')
defVimGroup('cssUrl', fg='blue1')
defVimGroup('cssProp', fg='purple1')
defVimGroup('cssAttributeSelector', fg='purple1')
defVimGroup('goBuiltins', fg='green')
defVimGroup('helpHyperTextJump', fg='blue2')
defVimGroup('htmlTitle', fg='defaultFg')
defVimGroup('htmlH1', fg='defaultFg')
defVimGroup('htmlTagN', fg='green')
defVimGroup('htmlSpecialChar', fg='blue1')
defVimGroup('htmlArg', fg='purple1')
defVimGroup('javaCommentTitle', fg='oliveGreen')
defVimGroup('javaConstant', fg='green')
defVimGroup('javaDocTags', fg='yellow')
defVimGroup('jsonNull', fg='purple2')
defVimGroup('jsonBoolean', fg='purple2')
defVimGroup('javaScriptNumber', fg='orange')
defVimGroup('javaScriptFunction', fg='green')
defVimGroup('javaScriptIdentifier', fg='green')
defVimGroup('markdownRule', fg='green')
defVimGroup('markdownHeadingRule', fg='green')
defVimGroup('markdownHeadingDelimiter', fg='green')
defVimGroup('markdownCode', fg='cyan')
defVimGroup('markdownCodeBlock', fg='cyan')
defVimGroup('markdownUrl', fg='blue1')
defVimGroup('markdownLinkText', fg='blue1')
defVimGroup('markdownId', fg='green')
defVimGroup('markdownIdDeclaration', fg='green')
defVimGroup('pythonExceptions', fg='defaultFg')
defVimGroup('pythonDecoratorName', fg='yellow')
defVimGroup('pythonBuiltin', fg='green')
defVimGroup('rustMacroRepeatDelimiters', fg='defaultFg')
defVimGroup('rustQuestionMark', fg='defaultFg')
defVimGroup('rustCommentLineDoc', fg='oliveGreen')
defVimGroup('rustSelf', fg='green')
defVimGroup('rustLabel', fg='cyan')
defVimGroup('rustLifetime', fg='cyan')
defVimGroup('rustModPath', fg='blue1')
defVimGroup('rustIdentifier', fg='blue1')
defVimGroup('rustEnum', fg='blue1')
defVimGroup('rustTrait', fg='blue1')
defVimGroup('rustMacroVariable', fg='purple2')
defVimGroup('shCommandSub', fg='defaultFg')
defVimGroup('shStatement', fg='defaultFg')
defVimGroup('shTestOpr', fg='defaultFg')
defVimGroup('shCmdSubRegion', fg='green')
defVimGroup('shFunctionKey', fg='green')
defVimGroup('shHereDoc01', fg='green')
defVimGroup('shLoop', fg='green')
defVimGroup('shFor', fg='purple2')
defVimGroup('shDeref', fg='purple2')
defVimGroup('shVariable', fg='purple2')
defVimGroup('tomlKey', fg='green')
defVimGroup('tomlKeyDq', fg='green')
defVimGroup('tomlTable', fg='green')
defVimGroup('tomlBoolean', fg='purple2')
defVimGroup('xmlCdataStart', fg='yellow')
defVimGroup('xmlCdataCdata', fg='yellow')
defVimGroup('xmlCdataEnd', fg='yellow')
defVimGroup('xmlTagName', fg='green')
defVimGroup('xmlNamespace', fg='blue1')
defVimGroup('xmlEntity', fg='blue1')
defVimGroup('xmlEntityPunct', fg='blue1')
defVimGroup('xmlAttrib', fg='purple1')
defVimGroup('yamlKeyValueDelimiter', fg='defaultFg')
defVimGroup('yamlAnchor', fg='yellow')
defVimGroup('yamlAlias', fg='yellow')
defVimGroup('yamlBlockMappingKey', fg='green')

## define jetbrains (general)
defIdeaOption('TEXT', fg='defaultFg', bg='defaultBg')
defIdeaOption('DELETED_TEXT_ATTRIBUTES', fg='altFg1', effectColor='altFg1', effect=ideaStrikeout)
defIdeaOption('FOLDED_TEXT_ATTRIBUTES', fg='vimFgFolded', bg='vimBgFolded')
defIdeaColor('FOLDED_TEXT_BORDER_COLOR', (150, 25, bgLight - 10))
defIdeaColor('SOFT_WRAP_SIGN_COLOR', 'defaultFg')
defIdeaColor('WHITESPACES', 'altFg1')

defIdeaOption('TEXT_SEARCH_RESULT_ATTRIBUTES', fg='defaultFg', bg='vimBgSearch', stripe=(120, 100, 75))
defIdeaOption('SEARCH_RESULT_ATTRIBUTES', fg='defaultFg', bg=(240, 20, bgLight), stripe=(270, 60, 100))
defIdeaOption('WRITE_SEARCH_RESULT_ATTRIBUTES', fg='defaultFg', bg=(300, 25, bgLight), stripe=(300, 60, 100))

defIdeaOption('LIVE_TEMPLATE_ATTRIBUTES', effectColor='green')  # live template: active segment
defIdeaOption('LIVE_TEMPLATE_INACTIVE_SEGMENT', effectColor='altFg2')
defIdeaOption('TEMPLATE_VARIABLE_ATTRIBUTES', fg='purple2')

defIdeaOption('HYPERLINK_ATTRIBUTES', fg='blue1', effectColor='blue1', effect=ideaUnderline)
defIdeaOption('FOLLOWED_HYPERLINK_ATTRIBUTES', fg='purple1', effectColor='purple1', effect=ideaUnderline)
defIdeaOption('INACTIVE_HYPERLINK_ATTRIBUTES', effectColor='altFg1', effect=ideaUnderline)

defIdeaOption('ERRORS_ATTRIBUTES', bg='vimBgError', stripe=(0, 80, 100))
defIdeaOption('WARNING_ATTRIBUTES', bg=(45, 40, bgLight), stripe=(45, 100, 85))
defIdeaOption('INFO_ATTRIBUTES', effectColor='yellow', effect=ideaUnderwave, stripe=(60, 30, 85))  # weak warning
defIdeaOption('DEPRECATED_ATTRIBUTES', effectColor='defaultFg', effect=ideaStrikeout)
defIdeaOption('MARKED_FOR_REMOVAL_ATTRIBUTES', effectColor='red',
              effect=ideaStrikeout)  # deprecated symbol, marked for removal
defIdeaOption('NOT_USED_ELEMENT_ATTRIBUTES', fg='altFg1')  # unused symbol
defIdeaOption('WRONG_REFERENCES_ATTRIBUTES', fg='red')  # unknown symbol
defIdeaOption('RUNTIME_ERROR', effectColor='red', effect=ideaUnderwave, stripe='ideaStripeERRORS_ATTRIBUTES')
defIdeaOption('GENERIC_SERVER_ERROR_OR_WARNING', effectColor='orange', effect=ideaUnderwave,
              stripe=(30, 60, 100))  # problem from server
defIdeaOption('DUPLICATE_FROM_SERVER', effectColor='altFg2', effect=ideaUnderwave)
defIdeaOption('TYPO', effectColor='green', effect=ideaUnderwave)
defIdeaOption('TEXT_STYLE_ERROR', effectColor='red', effect=ideaDottedLine)
defIdeaOption('TEXT_STYLE_WARNING', effectColor='orange', effect=ideaDottedLine)
defIdeaOption('TEXT_STYLE_SUGGESTION', effectColor='cyan', effect=ideaDottedLine)
defIdeaOption('GRAMMAR_ERROR', effectColor='purple2', effect=ideaDottedLine)

defIdeaColor('CARET_COLOR', 'defaultFg')
defIdeaColor('CARET_ROW_COLOR', 'vimBgCursorLine')
defIdeaColor('GUTTER_BACKGROUND', 'defaultBg')
defIdeaColor('SELECTION_FOREGROUND', None)
defIdeaColor('SELECTION_BACKGROUND', 'vimBgVisual')
defIdeaColor('INDENT_GUIDE', (120, 10, bgLight - 10))
defIdeaColor('SELECTED_INDENT_GUIDE', (120, 10, bgLight - 30))
defIdeaColor('VISUAL_INDENT_GUIDE', 'ideaColorINDENT_GUIDE')
defIdeaColor('RIGHT_MARGIN_COLOR', 'vimBgColorColumn')  # hard wrap guide
defIdeaColor('TEARLINE_COLOR', 'ideaColorRIGHT_MARGIN_COLOR')
defIdeaColor('SELECTED_TEARLINE_COLOR', (120, 10, bgLight - 40))
defIdeaOption('BREADCRUMBS_DEFAULT', fg='defaultFg')
defIdeaOption('BREADCRUMBS_INACTIVE', fg='defaultFg')
defIdeaOption('BREADCRUMBS_HOVERED', fg='defaultFg', bg='vimBgCursorLine')
defIdeaOption('BREADCRUMBS_CURRENT', fg='defaultFg', bg='vimBgStatusLine')

defIdeaOption('TODO_DEFAULT_ATTRIBUTES', fg='defaultFg', bg='vimBgTodo', stripe=(210, 75, 100))
defIdeaColor('METHOD_SEPARATORS_COLOR', 'ideaColorVISUAL_INDENT_GUIDE')
defIdeaOption('IDENTIFIER_UNDER_CARET_ATTRIBUTES', bg='vimBglspReference', stripe='ideaStripeSEARCH_RESULT_ATTRIBUTES')
defIdeaOption('WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES', bg=(300, 10, bgLight),
              stripe='ideaStripeWRITE_SEARCH_RESULT_ATTRIBUTES')
defIdeaOption('INJECTED_LANGUAGE_FRAGMENT', bg=(150, 10, 100))
defIdeaColor('LINE_NUMBERS_COLOR', 'altFg2')
defIdeaColor('LINE_NUMBER_ON_CARET_ROW_COLOR', 'defaultFg')
defIdeaOption('MATCHED_BRACE_ATTRIBUTES', bg='vimBgMatchParen')
defIdeaOption('UNMATCHED_BRACE_ATTRIBUTES', bg=(0, 20, bgLight))

# define jetbrains (language defaults)
defIdeaOption('DEFAULT_CLASS_NAME', fg='blue1')
defIdeaOption('DEFAULT_CLASS_REFERENCE', fg='blue1')
defIdeaOption('DEFAULT_INTERFACE_NAME', fg='blue1')
defIdeaOption('DEFAULT_INSTANCE_FIELD', fg='purple1')
defIdeaOption('DEFAULT_INSTANCE_METHOD', fg='defaultFg')
defIdeaOption('DEFAULT_STATIC_FIELD', fg='purple2')
defIdeaOption('DEFAULT_STATIC_METHOD', fg='defaultFg')

defIdeaOption('DEFAULT_LINE_COMMENT', fg='oliveGreen')
defIdeaOption('DEFAULT_BLOCK_COMMENT', fg='oliveGreen')
defIdeaOption('DEFAULT_DOC_COMMENT', fg='oliveGreen')
defIdeaOption('DEFAULT_DOC_MARKUP')
defIdeaOption('DEFAULT_DOC_COMMENT_TAG', fg='yellow')
defIdeaOption('DEFAULT_DOC_COMMENT_TAG_VALUE', fg='defaultFg')
defIdeaColor('DOC_COMMENT_LINK', 'blue1')
defIdeaColor('DOC_COMMENT_GUIDE', 'ideaColorINDENT_GUIDE')

defIdeaOption('DEFAULT_IDENTIFIER', fg='defaultFg')
defIdeaOption('DEFAULT_CONSTANT', fg='purple2')
defIdeaOption('DEFAULT_GLOBAL_VARIABLE', fg='purple2')
defIdeaOption('DEFAULT_LABEL', fg='blue1')
defIdeaOption('DEFAULT_PREDEFINED_SYMBOL', fg='green')
defIdeaOption('DEFAULT_REASSIGNED_LOCAL_VARIABLE', fg='defaultFg', effectColor='altFg1', effect=ideaUnderline)
defIdeaOption('DEFAULT_REASSIGNED_PARAMETER', fg='defaultFg', effectColor='altFg1', effect=ideaUnderline)

defIdeaOption('INLINE_PARAMETER_HINT', fg=(120, 10, 50), bg=(90, 10, 90))
defIdeaOption('INLINE_PARAMETER_HINT_CURRENT', fg='ideaFgINLINE_PARAMETER_HINT', bg=(120, 30, 90))
defIdeaOption('INLINE_PARAMETER_HINT_HIGHLIGHTED', fg='ideaFgINLINE_PARAMETER_HINT', bg=(90, 10, 80))

defIdeaOption('DEFAULT_KEYWORD', fg='green')
defIdeaOption('DEFAULT_TAG', fg='green')  # markup: tag
defIdeaOption('DEFAULT_ATTRIBUTE', fg='purple1')  # markup: attribute
defIdeaOption('DEFAULT_ENTITY', fg='blue1')  # markup: entity
defIdeaOption('DEFAULT_METADATA', fg='yellow')
defIdeaOption('DEFAULT_NUMBER', fg='orange')
defIdeaOption('DEFAULT_STRING', fg='cyan')
defIdeaOption('DEFAULT_VALID_STRING_ESCAPE', fg='blue1')
defIdeaOption('DEFAULT_INVALID_STRING_ESCAPE', fg='cyan', bg='ideaBgUNMATCHED_BRACE_ATTRIBUTES')
defIdeaOption('DEFAULT_HIGHLIGHTED_REFERENCE', effectColor='altFg1',
              effect=ideaUnderline)  # string: highlighted reference
defIdeaOption('DEFAULT_TEMPLATE_LANGUAGE_COLOR', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')

# define jetbrains (console colors)
defIdeaOption('CONSOLE_BLACK_OUTPUT', fg='black')
defIdeaOption('CONSOLE_DARKGRAY_OUTPUT', fg='darkGray')
defIdeaOption('CONSOLE_GRAY_OUTPUT', fg='gray')
defIdeaOption('CONSOLE_WHITE_OUTPUT', fg='white')
defIdeaOption('CONSOLE_RED_OUTPUT', fg='red')
defIdeaOption('CONSOLE_RED_BRIGHT_OUTPUT', fg='red')
defIdeaOption('CONSOLE_YELLOW_OUTPUT', fg='yellow')
defIdeaOption('CONSOLE_YELLOW_BRIGHT_OUTPUT', fg='yellow')
defIdeaOption('CONSOLE_GREEN_OUTPUT', fg='green')
defIdeaOption('CONSOLE_GREEN_BRIGHT_OUTPUT', fg='green')
defIdeaOption('CONSOLE_CYAN_OUTPUT', fg='cyan')
defIdeaOption('CONSOLE_CYAN_BRIGHT_OUTPUT', fg='cyan')
defIdeaOption('CONSOLE_BLUE_OUTPUT', fg='blue1')
defIdeaOption('CONSOLE_BLUE_BRIGHT_OUTPUT', fg='blue1')
defIdeaOption('CONSOLE_MAGENTA_OUTPUT', fg='purple1')
defIdeaOption('CONSOLE_MAGENTA_BRIGHT_OUTPUT', fg='purple1')

defIdeaColor('CONSOLE_BACKGROUND_KEY', 'defaultBg')
defIdeaOption('CONSOLE_NORMAL_OUTPUT', fg='defaultFg')
defIdeaOption('CONSOLE_SYSTEM_OUTPUT', fg='defaultFg')
defIdeaOption('CONSOLE_ERROR_OUTPUT', fg='red')
defIdeaOption('CONSOLE_USER_INPUT', fg='cyan')
defIdeaOption('CONSOLE_RANGE_TO_EXECUTE', effectColor='green')  # database console: statement to execute
defIdeaOption('TERMINAL_COMMAND_TO_RUN_USING_IDE', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')

defIdeaOption('LOG_ERROR_OUTPUT', fg='red')
defIdeaOption('LOG_WARNING_OUTPUT', fg='yellow')
defIdeaOption('LOG_INFO_OUTPUT', fg='green')
defIdeaOption('LOG_DEBUG_OUTPUT', fg='cyan')
defIdeaOption('LOG_VERBOSE_OUTPUT', fg='blue1')
defIdeaOption('LOG_EXPIRED_ENTRY', fg='altFg2')

# define jetbrains (diff & merge)
defIdeaOption('DIFF_INSERTED', bg='vimBgDiffAdd', stripe=(120, 50, 80))
defIdeaOption('DIFF_MODIFIED', fg='vimBgDiffChange', bg='vimBgDiffText', stripe=(210, 50, 90))
defIdeaOption('DIFF_CONFLICT', bg=(15, 15, bgLight - 5), stripe=(15, 50, 90))
defIdeaOption('DIFF_DELETED', bg='vimBgDiffDelete', stripe=(0, 0, 70))
defIdeaColor('DIFF_SEPARATORS_BACKGROUND', (150, 5, 90))  # folded unchanged fragments

# define jetbrains (user-defined file types)
defIdeaOption('CUSTOM_LINE_COMMENT_ATTRIBUTES', useBase=True)
defIdeaOption('CUSTOM_MULTI_LINE_COMMENT_ATTRIBUTES', useBase=True)
defIdeaOption('CUSTOM_NUMBER_ATTRIBUTES', useBase=True)
defIdeaOption('CUSTOM_STRING_ATTRIBUTES', useBase=True)
defIdeaOption('CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES', useBase=True)
defIdeaOption('CUSTOM_INVALID_STRING_ESCAPE_ATTRIBUTES', useBase=True)
defIdeaOption('CUSTOM_KEYWORD1_ATTRIBUTES', fg='blue1')
defIdeaOption('CUSTOM_KEYWORD2_ATTRIBUTES', fg='purple1')
defIdeaOption('CUSTOM_KEYWORD3_ATTRIBUTES', fg='green')
defIdeaOption('CUSTOM_KEYWORD4_ATTRIBUTES', fg='purple2')

# define jetbrains (vcs)
defIdeaColor('ADDED_LINES_COLOR', (120, 20, 80))
defIdeaColor('MODIFIED_LINES_COLOR', (210, 30, 85))
defIdeaColor('WHITESPACES_MODIFIED_LINES_COLOR', (45, 40, 85))
defIdeaColor('DELETED_LINES_COLOR', (0, 40, 80))
defIdeaColor('IGNORED_ADDED_LINES_BORDER_COLOR', (120, 100, 50))
defIdeaColor('IGNORED_MODIFIED_LINES_BORDER_COLOR', (210, 100, 75))
defIdeaColor('IGNORED_DELETED_LINES_BORDER_COLOR', (0, 60, 80))

# define jetbrains (c/c++)
defIdeaOption('OC.STD_INITIALIZER_LIST')
defIdeaOption('OC.OVERLOADED_OPERATOR', fg='cyan')
defIdeaOption('OC.STRUCT_LIKE', fg='blue1')
defIdeaOption('OC.CONDITIONALLY_NOT_COMPILED', fg='altFg1')
defIdeaOption('OC.MACRONAME', fg='yellow')
defIdeaOption('OC.MACRO_PARAMETER')
defIdeaOption('OC.STRUCT_FIELD', fg='purple1')
defIdeaOption('OC.TYPEDEF', fg='blue1')

# define jetbrains (java)
defIdeaOption('ANNOTATION_NAME_ATTRIBUTES', useBase=True)
defIdeaOption('STATIC_FINAL_FIELD_ATTRIBUTES', useBase=True)
defIdeaOption('STATIC_FIELD_ATTRIBUTES', useBase=True)
defIdeaOption('INSTANCE_FIELD_ATTRIBUTES', useBase=True)
defIdeaOption('CONSTRUCTOR_CALL_ATTRIBUTES', fg='blue1')
defIdeaOption('CONSTRUCTOR_DECLARATION_ATTRIBUTES', fg='blue1')
defIdeaOption('IMPLICIT_ANONYMOUS_CLASS_PARAMETER_ATTRIBUTES')
defIdeaOption('TYPE_PARAMETER_NAME_ATTRIBUTES', fg='blue1')

# define jetbrains (kotlin)
defIdeaOption('KOTLIN_FUNCTION_LITERAL_BRACES_AND_ARROW')
defIdeaOption('KOTLIN_CONSTRUCTOR', fg='blue1')
defIdeaOption('KOTLIN_DYNAMIC_FUNCTION_CALL', fg='cyan')
defIdeaOption('KOTLIN_LABEL', useBase=True)
defIdeaOption('KOTLIN_NAMED_ARGUMENT')
defIdeaOption('KOTLIN_CLOSURE_DEFAULT_PARAMETER', fg='green')
defIdeaOption('KOTLIN_ANDROID_EXTENSIONS_PROPERTY_CALL', fg='purple1')
defIdeaOption('KOTLIN_BACKING_FIELD_VARIABLE')
defIdeaOption('KOTLIN_DYNAMIC_PROPERTY_CALL', fg='cyan')
defIdeaOption('KOTLIN_EXTENSION_PROPERTY', fg='purple1')
defIdeaOption('KOTLIN_MUTABLE_VARIABLE', effectColor='altFg1', effect=ideaUnderline)
defIdeaOption('KOTLIN_WRAPPED_INTO_REF')
defIdeaOption('KOTLIN_SMART_CONSTANT', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')
defIdeaOption('KOTLIN_SMART_CAST_VALUE', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')
defIdeaOption('KOTLIN_SMART_CAST_RECEIVER', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')

# define jetbrains (groovy)
defIdeaOption('Closure braces')  # closure expression braces and arrow
defIdeaOption('GROOVY_KEYWORD', useBase=True)
defIdeaOption('List/map to object conversion')
defIdeaOption('Instance property reference ID', useBase=True)
defIdeaOption('Static property reference ID', useBase=True)
defIdeaOption('Unresolved reference access', fg='altFg1', effectColor='altFg1', effect=ideaDottedLine)

# define jetbrains (python)
defIdeaOption('PY.BUILTIN_NAME', useBase=True)
defIdeaOption('PY.KEYWORD_ARGUMENT', useBase=True)
defIdeaOption('PY.SELF_PARAMETER', fg='green')
defIdeaOption('PY.PREDEFINED_DEFINITION', fg='yellow')  # special names: definition
defIdeaOption('PY.PREDEFINED_USAGE', fg='yellow')  # special names: usage
defIdeaOption('PY.STRING.B', useBase=True)
defIdeaOption('PY.ANNOTATION', fg='ideaFgDEFAULT_CLASS_NAME')  # type annotation

# define jetbrains (rust)
defIdeaOption('org.rust.CFG_DISABLED_CODE', fg='altFg1')
defIdeaOption('org.rust.MACRO', fg='yellow')
defIdeaOption('org.rust.GENERATED_ITEM', fg='yellow')
defIdeaOption('org.rust.LIFETIME', fg='cyan')
defIdeaOption('org.rust.MUT_PARAMETER', effectColor='altFg1', effect=ideaUnderline)
defIdeaOption('org.rust.TYPE_PARAMETER', fg='blue1')
defIdeaOption('org.rust.DOC_CODE', fg='defaultFg')
defIdeaOption('org.rust.DOC_EMPHASIS')
defIdeaOption('org.rust.DOC_STRONG')
defIdeaOption('org.rust.CRATE', fg='blue1')
defIdeaOption('org.rust.MODULE', fg='blue1')
defIdeaOption('org.rust.MUT_BINDING', effectColor='altFg1', effect=ideaUnderline)
defIdeaOption('org.rust.UNSAFE_CODE', bg=(15, 10, bgLight))

# define jetbrains (go)
defIdeaOption('GO_COMMENT_REFERENCE', fg='yellow')
defIdeaOption('GO_BUILTIN_CONSTANT', fg='green')
defIdeaOption('GO_PACKAGE', fg='blue1')
defIdeaOption('GO_BUILTIN_VARIABLE', fg='green')
defIdeaOption('GO_PACKAGE_LOCAL_VARIABLE', fg='purple2')
defIdeaOption('GO_SHADOWING_VARIABLE', fg='cyan')
defIdeaOption('GO_STRUCT_EXPORTED_MEMBER', fg='purple1')
defIdeaOption('GO_STRUCT_LOCAL_MEMBER', fg='purple1')
defIdeaOption('GO_BUILTIN_FUNCTION_CALL', fg='green')
defIdeaOption('GO_BUILTIN_TYPE_REFERENCE', fg='green')
defIdeaOption('GO_PACKAGE_EXPORTED_VARIABLE_CALL', fg='purple2')
defIdeaOption('GO_PACKAGE_LOCAL_VARIABLE_CALL', fg='purple2')
defIdeaOption('GO_STRUCT_EXPORTED_MEMBER_CALL', fg='purple1')
defIdeaOption('GO_STRUCT_LOCAL_MEMBER_CALL', fg='purple1')

# define jetbrains (dart)
defIdeaOption('DART_CONSTRUCTOR', useBase=True)
defIdeaOption('DART_ENUM_CONSTANT', fg='purple2')
defIdeaOption('DART_IMPORT_PREFIX', fg='blue1')
defIdeaOption('DART_LIBRARY_NAME', fg='blue1')
defIdeaOption('DART_SYMBOL_LITERAL', fg='cyan')
defIdeaOption('DART_UNRESOLVED_INSTANCE_MEMBER_REFERENCE', fg='altFg1', effectColor='altFg1', effect=ideaDottedLine)

# define jetbrains (javascript)
defIdeaOption('JS.GLOBAL_FUNCTION', useBase=True)
defIdeaOption('JS.GLOBAL_VARIABLE', useBase=True)
defIdeaOption('JS.INSTANCE_MEMBER_FUNCTION', useBase=True)
defIdeaOption('JS.LOCAL_VARIABLE', useBase=True)
defIdeaOption('JS.MODULE_NAME', fg='blue1')
defIdeaOption('JS.PARAMETER', fg='blue1')
defIdeaOption('JS.REGEXP', useBase=True)
defIdeaOption('JavaScript:INJECTED_LANGUAGE_FRAGMENT', useBase=True)

# define jetbrains (typescript)
defIdeaOption('TS.MODULE_NAME', fg='blue1')
defIdeaOption('TS.TYPE_PARAMETER', fg='blue1')
defIdeaOption('TS.TYPE_GUARD', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')

# define jetbrains (shell)
defIdeaOption('BASH.EXTERNAL_COMMAND', useBase=True)
defIdeaOption('BASH.SUBSHELL_COMMAND', fg='green')
defIdeaOption('BASH.FUNCTION_DEF_NAME', useBase=True)
defIdeaOption('BASH.REDIRECTION', fg='green')
defIdeaOption('BASH.SHEBANG', useBase=True)

# define jetbrains (sql)
defIdeaOption('SQL_DATABASE_OBJECT', fg='yellow')
defIdeaOption('SQL_OUTER_QUERY_COLUMN', useBase=True)
defIdeaOption('SQL_SYNTHETIC_ENTITY')

# define jetbrains (http request)
defIdeaOption('HTTP_HEADER_FIELD_NAME', fg='green')
defIdeaOption('HTTP_REQUEST_INPUT_SIGN', fg='green')
defIdeaOption('HTTP_REQUEST_INPUT_FILE', fg='blue1')
defIdeaOption('HTTP_REQUEST_DIFFERENCE_SIGN', fg='green')
defIdeaOption('HTTP_REQUEST_DIFFERENCE_FILE', fg='blue1')
defIdeaOption('HTTP_REQUEST_MULTIPART_BOUNDARY', fg='oliveGreen')
defIdeaOption('HTTP_REQUEST_VARIABLE_BRACES', fg='purple2')
defIdeaOption('HTTP_REQUEST_PARAMETER_NAME', fg='purple1')
defIdeaOption('HTTP_REQUEST_PARAMETER_VALUE', fg='cyan')

# define jetbrains (css)
defIdeaOption('CSS.ATTRIBUTE_NAME', fg='purple1')
defIdeaOption('CSS.FUNCTION')
defIdeaOption('CSS.COLOR', fg='orange')
defIdeaOption('CSS.HASH', fg='green')
defIdeaOption('CSS.IDENT')
defIdeaOption('CSS.UNICODE.RANGE', fg='orange')
defIdeaOption('CSS.URL', fg='blue1')

# define jetbrains (markdown)
defIdeaOption('MARKDOWN_BLOCK_QUOTE_MARKER', fg='cyan')
defIdeaOption('MARKDOWN_CODE_SPAN_MARKER', fg='cyan')
defIdeaOption('MARKDOWN_HEADER_LEVEL_1')
defIdeaOption('MARKDOWN_HEADER_LEVEL_2')
defIdeaOption('MARKDOWN_HEADER_LEVEL_3')
defIdeaOption('MARKDOWN_HEADER_LEVEL_4')
defIdeaOption('MARKDOWN_HEADER_LEVEL_5')
defIdeaOption('MARKDOWN_HEADER_LEVEL_6')
defIdeaOption('MARKDOWN_EXPLICIT_LINK', fg='blue1')
defIdeaOption('MARKDOWN_LINK_DESTINATION', fg='blue1')
defIdeaOption('MARKDOWN_REFERENCE_LINK')
defIdeaOption('MARKDOWN_BOLD')
defIdeaOption('MARKDOWN_ITALIC')

# define jetbrains (editor config)
defIdeaOption('EDITORCONFIG_PROPERTY_KEY', fg='green')

# define jetbrains (json)
defIdeaOption('JSON.KEYWORD', fg='purple2')
defIdeaOption('JSON.PROPERTY_KEY', fg='green')
defIdeaOption('JSONPATH.BOOLEAN', fg='green')

# define jetbrains (toml)
defIdeaOption('org.toml.DATE', fg='purple2')
defIdeaOption('org.toml.BOOLEAN', fg='purple2')

# define jetbrains (yaml)
defIdeaOption('YAML_ANCHOR', fg='yellow')

# define jetbrains (xml)
defIdeaOption('XML_PROLOGUE', fg='green')
defIdeaOption('XML_NS_PREFIX', fg='blue1')
defIdeaOption('XPATH.FUNCTION', useBase=True)
defIdeaOption('XPATH.KEYWORD', useBase=True)
defIdeaOption('XPATH.XPATH_NAME', fg='green')
defIdeaOption('XPATH.XPATH_VARIABLE', fg='purple2')

# define jetbrains (logcat)
defIdeaOption('LOGCAT_VERBOSE_OUTPUT', fg='blue1')
defIdeaOption('LOGCAT_DEBUG_OUTPUT', fg='cyan')
defIdeaOption('LOGCAT_INFO_OUTPUT', fg='green')
defIdeaOption('LOGCAT_WARNING_OUTPUT', fg='orange')
defIdeaOption('LOGCAT_FILTER_KVALUE', fg='cyan')
defIdeaOption('LOGCAT_FILTER_REGEX_KVALUE', fg='cyan')
defIdeaOption('LOGCAT_FILTER_STRING_KVALUE', fg='cyan')

# define jetbrains (plan9)
defIdeaOption('com.plan9.FLAG')
defIdeaOption('com.plan9.INSTRUCTION', useBase=True)
defIdeaOption('com.plan9.LABEL', useBase=True)
defIdeaOption('com.plan9.REGISTER', fg='purple2')

# define jetbrains (compose)
defIdeaOption('ComposableCallTextAttributes', fg='yellow')
defIdeaOption('LiveLiteralsHighlightAttribute', effectColor='altFg2')

# define dark scheme
colors = darkColors
basicColors = darkBasicColors
vimColorGroups = darkVimColorGroups
ideaColors = darkIdeaColors
ideaAttributes = darkIdeaAttributes

bgLight = 15
fgLight = 65

# define basic colors
defaultBgDark = defColor('defaultBg', 120, 20, bgLight)
defaultFgDark = defBasicColor('defaultFg', 180, 10, fgLight)
defBasicColor('altFg1', 180, 20, fgLight - 15)
defBasicColor('altFg2', 120, 5, fgLight - 25)
defBasicColor('red', 0, 60, fgLight + 25)
defBasicColor('orange', 40, 60, fgLight + 15)
defBasicColor('yellow', 60, 60, fgLight)
defBasicColor('oliveGreen', 75, 60, fgLight)
defBasicColor('green', 120, 60, fgLight)
defBasicColor('cyan', 180, 80, fgLight)
defBasicColor('blue1', 210, 80, fgLight + 35)
defBasicColor('blue2', 210, 60, fgLight + 25)
defBasicColor('purple1', 255, 50, fgLight + 35)
defBasicColor('purple2', 300, 40, fgLight + 10)
defBasicColor('black', 120, 20, bgLight + 10)
defBasicColor('darkGray', 180, 5, fgLight - 25)
defBasicColor('gray', 180, 5, fgLight)
defBasicColor('white', 180, 5, fgLight + 25)

# define vim (basic)
defVimGroup('Normal', fg='defaultFg', bg='defaultBg')
defVimGroup('Identifier', fg='defaultFg')
defVimGroup('Operator', fg='defaultFg')
defVimGroup('Delimiter', fg='defaultFg')
defVimGroup('Number', fg='orange')
defVimGroup('PreProc', fg='yellow')
defVimGroup('SpecialComment', fg='yellow')
defVimGroup('Comment', fg='oliveGreen')
defVimGroup('Boolean', fg='green')
defVimGroup('Statement', fg='green')
defVimGroup('Type', fg='green')
defVimGroup('Include', fg='green')
defVimGroup('String', fg='cyan')
defVimGroup('Character', fg='cyan')
defVimGroup('Special', fg='blue1')
defVimGroup('Tag', fg='blue2')
defVimGroup('Underlined', fg='blue2', gui='underline')
defVimGroup('Constant', fg='purple2')
defVimGroup('Error', bg=(15, 100, bgLight + 15))
defVimGroup('Todo', bg=(65, 100, bgLight + 15))
defVimGroup('Question', fg='green')
defVimGroup('Directory', fg='blue1')
defVimGroup('Title', fg='blue1')
defVimGroup('SpecialKey', fg='blue1')
defVimGroup('NonText', fg='altFg2')
defVimGroup('ModeMsg', fg='defaultFg')
defVimGroup('MoreMsg', fg='green')
defVimGroup('ErrorMsg', fg='red')
defVimGroup('WarningMsg', fg='yellow')
defVimGroup('Folded', fg='altFg1', bg=(150, 20, bgLight + 5))
defVimGroup('MatchParen', bg=(180, 80, bgLight + 20))
defVimGroup('ColorColumn', bg=(120, 20, bgLight + 20))
defVimGroup('CursorLine', bg=(90, 30, bgLight + 5))
defVimGroup('CursorColumn', bg='vimBgCursorLine')
defVimGroup('LineNr', fg='altFg2')
defVimGroup('CursorLineNr', fg='defaultFg', bg='vimBgCursorLine')
defVimGroup('FoldColumn', fg='altFg1')
defVimGroup('CursorLineFold', fg='defaultFg', bg='vimBgCursorLine')
defVimGroup('SignColumn', fg='altFg1')
defVimGroup('CursorLineSign', fg='defaultFg', bg='vimBgCursorLine')
defVimGroup('VertSplit', fg='altFg2')
defVimGroup('StatusLine', fg='defaultFg', bg=(120, 40, bgLight + 10))
defVimGroup('StatusLineNC', fg='altFg1', bg=(120, 20, bgLight + 5))
defVimGroup('StatusLineTerm', fg='defaultFg', bg='vimBgStatusLine')
defVimGroup('StatusLineTermNC', fg='altFg1', bg='vimBgStatusLineNC')
defVimGroup('TabLineSel', fg='defaultFg')
defVimGroup('TabLine', fg='altFg1', bg='vimBgStatusLineNC')
defVimGroup('TabLineFill', bg='vimBgStatusLineNC')
defVimGroup('Visual', bg=(90, 50, bgLight + 20))
defVimGroup('Search', fg='defaultFg', bg=(120, 100, bgLight + 20))
defVimGroup('PmenuSel', bg='vimBgStatusLine')
defVimGroup('Pmenu', bg=(120, 10, bgLight + 5))
defVimGroup('PmenuSbar', bg='vimBgPmenu')
defVimGroup('PmenuThumb', bg=(120, 20, fgLight - 10))
defVimGroup('WildMenu', bg='vimBgTodo')
defVimGroup('DiffAdd', bg=(120, 50, bgLight + 5))
defVimGroup('DiffText', bg=(210, 50, bgLight + 10))
defVimGroup('DiffChange', bg=(195, 25, bgLight + 5))
defVimGroup('DiffDelete', fg='altFg2', bg=(120, 5, bgLight + 5))
defVimGroup('SpellBad', bg=(15, 50, bgLight + 10))
defVimGroup('SpellLocal', bg=(180, 50, bgLight + 5))
defVimGroup('SpellCap', bg=(240, 50, bgLight + 15))
defVimGroup('SpellRare', bg=(300, 50, bgLight + 10))

# define vim (other)
defVimGroup('lspReference', bg=(225, 25, bgLight + 20))
defVimGroup('cssPseudoClassId', fg='defaultFg')
defVimGroup('cssUnitDecorators', fg='defaultFg')
defVimGroup('cssFontDescriptorAttr', fg='orange')
defVimGroup('cssAtKeyword', fg='green')
defVimGroup('cssIdentifier', fg='green')
defVimGroup('cssImportant', fg='green')
defVimGroup('cssAttr', fg='cyan')
defVimGroup('cssUrl', fg='blue1')
defVimGroup('cssProp', fg='purple1')
defVimGroup('cssAttributeSelector', fg='purple1')
defVimGroup('goBuiltins', fg='green')
defVimGroup('helpHyperTextJump', fg='blue2')
defVimGroup('htmlTitle', fg='defaultFg')
defVimGroup('htmlH1', fg='defaultFg')
defVimGroup('htmlTagN', fg='green')
defVimGroup('htmlSpecialChar', fg='blue1')
defVimGroup('htmlArg', fg='purple1')
defVimGroup('javaCommentTitle', fg='oliveGreen')
defVimGroup('javaConstant', fg='green')
defVimGroup('javaDocTags', fg='yellow')
defVimGroup('jsonNull', fg='purple2')
defVimGroup('jsonBoolean', fg='purple2')
defVimGroup('javaScriptNumber', fg='orange')
defVimGroup('javaScriptFunction', fg='green')
defVimGroup('javaScriptIdentifier', fg='green')
defVimGroup('markdownRule', fg='green')
defVimGroup('markdownHeadingRule', fg='green')
defVimGroup('markdownHeadingDelimiter', fg='green')
defVimGroup('markdownCode', fg='cyan')
defVimGroup('markdownCodeBlock', fg='cyan')
defVimGroup('markdownUrl', fg='blue1')
defVimGroup('markdownLinkText', fg='blue1')
defVimGroup('markdownId', fg='green')
defVimGroup('markdownIdDeclaration', fg='green')
defVimGroup('pythonExceptions', fg='defaultFg')
defVimGroup('pythonDecoratorName', fg='yellow')
defVimGroup('pythonBuiltin', fg='green')
defVimGroup('rustMacroRepeatDelimiters', fg='defaultFg')
defVimGroup('rustQuestionMark', fg='defaultFg')
defVimGroup('rustCommentLineDoc', fg='oliveGreen')
defVimGroup('rustSelf', fg='green')
defVimGroup('rustLabel', fg='cyan')
defVimGroup('rustLifetime', fg='cyan')
defVimGroup('rustModPath', fg='blue1')
defVimGroup('rustIdentifier', fg='blue1')
defVimGroup('rustEnum', fg='blue1')
defVimGroup('rustTrait', fg='blue1')
defVimGroup('rustMacroVariable', fg='purple2')
defVimGroup('shCommandSub', fg='defaultFg')
defVimGroup('shStatement', fg='defaultFg')
defVimGroup('shTestOpr', fg='defaultFg')
defVimGroup('shCmdSubRegion', fg='green')
defVimGroup('shFunctionKey', fg='green')
defVimGroup('shHereDoc01', fg='green')
defVimGroup('shLoop', fg='green')
defVimGroup('shFor', fg='purple2')
defVimGroup('shDeref', fg='purple2')
defVimGroup('shVariable', fg='purple2')
defVimGroup('tomlKey', fg='green')
defVimGroup('tomlKeyDq', fg='green')
defVimGroup('tomlTable', fg='green')
defVimGroup('tomlBoolean', fg='purple2')
defVimGroup('xmlCdataStart', fg='yellow')
defVimGroup('xmlCdataCdata', fg='yellow')
defVimGroup('xmlCdataEnd', fg='yellow')
defVimGroup('xmlTagName', fg='green')
defVimGroup('xmlNamespace', fg='blue1')
defVimGroup('xmlEntity', fg='blue1')
defVimGroup('xmlEntityPunct', fg='blue1')
defVimGroup('xmlAttrib', fg='purple1')
defVimGroup('yamlKeyValueDelimiter', fg='defaultFg')
defVimGroup('yamlAnchor', fg='yellow')
defVimGroup('yamlAlias', fg='yellow')
defVimGroup('yamlBlockMappingKey', fg='green')

# define jetbrains (general)
defIdeaOption('TEXT', fg='defaultFg', bg='defaultBg')
defIdeaOption('DELETED_TEXT_ATTRIBUTES', fg='altFg1', effectColor='altFg1', effect=ideaStrikeout)
defIdeaOption('FOLDED_TEXT_ATTRIBUTES', fg='vimFgFolded', bg='vimBgFolded')
defIdeaColor('FOLDED_TEXT_BORDER_COLOR', (150, 20, bgLight + 20))
defIdeaColor('SOFT_WRAP_SIGN_COLOR', 'defaultFg')
defIdeaColor('WHITESPACES', 'altFg1')

defIdeaOption('TEXT_SEARCH_RESULT_ATTRIBUTES', fg='defaultFg', bg='vimBgSearch', stripe=(120, 100, 60))
defIdeaOption('SEARCH_RESULT_ATTRIBUTES', fg='defaultFg', bg=(255, 50, bgLight + 30), stripe=(255, 60, 100))
defIdeaOption('WRITE_SEARCH_RESULT_ATTRIBUTES', fg='defaultFg', bg=(300, 50, bgLight + 30), stripe=(300, 60, 75))

defIdeaOption('LIVE_TEMPLATE_ATTRIBUTES', effectColor='green')  # live template: active segment
defIdeaOption('LIVE_TEMPLATE_INACTIVE_SEGMENT', effectColor='altFg2')
defIdeaOption('TEMPLATE_VARIABLE_ATTRIBUTES', fg='purple2')

defIdeaOption('HYPERLINK_ATTRIBUTES', fg='blue1', effectColor='blue1', effect=ideaUnderline)
defIdeaOption('FOLLOWED_HYPERLINK_ATTRIBUTES', fg='purple1', effectColor='purple1', effect=ideaUnderline)
defIdeaOption('INACTIVE_HYPERLINK_ATTRIBUTES', effectColor='altFg1', effect=ideaUnderline)

defIdeaOption('ERRORS_ATTRIBUTES', bg='vimBgError', stripe=(0, 80, 80))
defIdeaOption('WARNING_ATTRIBUTES', bg=(50, 60, bgLight + 15), stripe=(50, 100, 65))
defIdeaOption('INFO_ATTRIBUTES', effectColor='yellow', effect=ideaUnderwave, stripe=(60, 10, 35))  # weak warning
defIdeaOption('DEPRECATED_ATTRIBUTES', effectColor='defaultFg', effect=ideaStrikeout)
defIdeaOption('MARKED_FOR_REMOVAL_ATTRIBUTES', effectColor='red',
              effect=ideaStrikeout)  # deprecated symbol, marked for removal
defIdeaOption('NOT_USED_ELEMENT_ATTRIBUTES', fg='altFg1')  # unused symbol
defIdeaOption('WRONG_REFERENCES_ATTRIBUTES', fg='red')  # unknown symbol
defIdeaOption('RUNTIME_ERROR', effectColor='red', effect=ideaUnderwave, stripe='ideaStripeERRORS_ATTRIBUTES')
defIdeaOption('GENERIC_SERVER_ERROR_OR_WARNING', effectColor='orange', effect=ideaUnderwave,
              stripe=(30, 100, 70))  # problem from server
defIdeaOption('DUPLICATE_FROM_SERVER', effectColor='altFg2', effect=ideaUnderwave)
defIdeaOption('TYPO', effectColor='green', effect=ideaUnderwave)
defIdeaOption('TEXT_STYLE_ERROR', effectColor='red', effect=ideaDottedLine)
defIdeaOption('TEXT_STYLE_WARNING', effectColor='orange', effect=ideaDottedLine)
defIdeaOption('TEXT_STYLE_SUGGESTION', effectColor='cyan', effect=ideaDottedLine)
defIdeaOption('GRAMMAR_ERROR', effectColor='purple2', effect=ideaDottedLine)

defIdeaColor('CARET_COLOR', 'defaultFg')
defIdeaColor('CARET_ROW_COLOR', 'vimBgCursorLine')
defIdeaColor('GUTTER_BACKGROUND', 'defaultBg')
defIdeaColor('SELECTION_BACKGROUND', 'vimBgVisual')
defIdeaColor('INDENT_GUIDE', (120, 20, bgLight + 10))
defIdeaColor('SELECTED_INDENT_GUIDE', (120, 20, bgLight + 30))
defIdeaColor('VISUAL_INDENT_GUIDE', 'ideaColorINDENT_GUIDE')
defIdeaColor('RIGHT_MARGIN_COLOR', 'vimBgColorColumn')  # hard wrap guide
defIdeaColor('TEARLINE_COLOR', 'ideaColorRIGHT_MARGIN_COLOR')
defIdeaColor('SELECTED_TEARLINE_COLOR', (120, 20, bgLight + 40))
defIdeaOption('BREADCRUMBS_DEFAULT', fg='defaultFg')
defIdeaOption('BREADCRUMBS_INACTIVE', fg='defaultFg')
defIdeaOption('BREADCRUMBS_HOVERED', fg='defaultFg', bg='vimBgCursorLine')
defIdeaOption('BREADCRUMBS_CURRENT', fg='defaultFg', bg='vimBgStatusLine')

defIdeaOption('TODO_DEFAULT_ATTRIBUTES', fg='defaultFg', bg='vimBgTodo', stripe=(210, 75, 80))
defIdeaColor('METHOD_SEPARATORS_COLOR', 'ideaColorINDENT_GUIDE')
defIdeaOption('IDENTIFIER_UNDER_CARET_ATTRIBUTES', bg='vimBglspReference', stripe='ideaStripeSEARCH_RESULT_ATTRIBUTES')
defIdeaOption('WRITE_IDENTIFIER_UNDER_CARET_ATTRIBUTES', bg=(330, 25, bgLight + 20),
              stripe='ideaStripeWRITE_SEARCH_RESULT_ATTRIBUTES')
defIdeaOption('INJECTED_LANGUAGE_FRAGMENT', bg=(150, 100, 20))
defIdeaColor('LINE_NUMBERS_COLOR', 'altFg2')
defIdeaColor('LINE_NUMBER_ON_CARET_ROW_COLOR', 'defaultFg')
defIdeaOption('MATCHED_BRACE_ATTRIBUTES', bg='vimBgMatchParen')
defIdeaOption('UNMATCHED_BRACE_ATTRIBUTES', bg=(0, 30, 30))

# define jetbrains (language defaults)
defIdeaOption('BAD_CHARACTER', bg='ideaBgUNMATCHED_BRACE_ATTRIBUTES')

defIdeaOption('DEFAULT_COMMA')
defIdeaOption('DEFAULT_SEMICOLON')

defIdeaOption('DEFAULT_CLASS_NAME', fg='blue1')
defIdeaOption('DEFAULT_CLASS_REFERENCE', fg='blue1')
defIdeaOption('DEFAULT_INTERFACE_NAME', fg='blue1')
defIdeaOption('DEFAULT_INSTANCE_FIELD', fg='purple1')
defIdeaOption('DEFAULT_INSTANCE_METHOD', fg='defaultFg')
defIdeaOption('DEFAULT_STATIC_FIELD', fg='purple2')
defIdeaOption('DEFAULT_STATIC_METHOD', fg='defaultFg')

defIdeaOption('DEFAULT_LINE_COMMENT', fg='oliveGreen')
defIdeaOption('DEFAULT_BLOCK_COMMENT', fg='oliveGreen')
defIdeaOption('DEFAULT_DOC_COMMENT', fg='oliveGreen')
defIdeaOption('DEFAULT_DOC_MARKUP')
defIdeaOption('DEFAULT_DOC_COMMENT_TAG', fg='yellow')
defIdeaOption('DEFAULT_DOC_COMMENT_TAG_VALUE', fg='defaultFg')
defIdeaColor('DOC_COMMENT_LINK', 'blue1')
defIdeaColor('DOC_COMMENT_GUIDE', 'ideaColorINDENT_GUIDE')

defIdeaOption('DEFAULT_IDENTIFIER', fg='defaultFg')
defIdeaOption('DEFAULT_CONSTANT', fg='purple2')
defIdeaOption('DEFAULT_FUNCTION_CALL', useBase=True)
defIdeaOption('DEFAULT_FUNCTION_DECLARATION', useBase=True)
defIdeaOption('DEFAULT_GLOBAL_VARIABLE', fg='purple2')
defIdeaOption('DEFAULT_LABEL', fg='blue1')
defIdeaOption('DEFAULT_PREDEFINED_SYMBOL', fg='green')
defIdeaOption('DEFAULT_REASSIGNED_LOCAL_VARIABLE', fg='defaultFg', effectColor='altFg1', effect=ideaUnderline)
defIdeaOption('DEFAULT_REASSIGNED_PARAMETER', fg='defaultFg', effectColor='altFg1', effect=ideaUnderline)

defIdeaOption('INLINE_PARAMETER_HINT', fg=(120, 10, 55), bg=(90, 10, 25))
defIdeaOption('INLINE_PARAMETER_HINT_CURRENT', fg='ideaFgINLINE_PARAMETER_HINT', bg=(120, 50, 35))
defIdeaOption('INLINE_PARAMETER_HINT_HIGHLIGHTED', fg='ideaFgINLINE_PARAMETER_HINT', bg=(90, 10, 35))

defIdeaOption('DEFAULT_KEYWORD', fg='green')
defIdeaOption('DEFAULT_TAG', fg='green')  # markup: tag
defIdeaOption('DEFAULT_ATTRIBUTE', fg='purple1')  # markup: attribute
defIdeaOption('DEFAULT_ENTITY', fg='blue1')  # markup: entity
defIdeaOption('DEFAULT_METADATA', fg='yellow')
defIdeaOption('DEFAULT_NUMBER', fg='orange')
defIdeaOption('DEFAULT_STRING', fg='cyan')
defIdeaOption('DEFAULT_VALID_STRING_ESCAPE', fg='blue1')
defIdeaOption('DEFAULT_INVALID_STRING_ESCAPE', fg='cyan', bg='ideaBgUNMATCHED_BRACE_ATTRIBUTES')
defIdeaOption('DEFAULT_HIGHLIGHTED_REFERENCE', effectColor='altFg1',
              effect=ideaUnderline)  # string: highlighted reference
defIdeaOption('DEFAULT_TEMPLATE_LANGUAGE_COLOR', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')

# define jetbrains (console colors)
defIdeaOption('CONSOLE_BLACK_OUTPUT', fg='black')
defIdeaOption('CONSOLE_DARKGRAY_OUTPUT', fg='darkGray')
defIdeaOption('CONSOLE_GRAY_OUTPUT', fg='gray')
defIdeaOption('CONSOLE_WHITE_OUTPUT', fg='white')
defIdeaOption('CONSOLE_RED_OUTPUT', fg='red')
defIdeaOption('CONSOLE_RED_BRIGHT_OUTPUT', fg='red')
defIdeaOption('CONSOLE_YELLOW_OUTPUT', fg='yellow')
defIdeaOption('CONSOLE_YELLOW_BRIGHT_OUTPUT', fg='yellow')
defIdeaOption('CONSOLE_GREEN_OUTPUT', fg='green')
defIdeaOption('CONSOLE_GREEN_BRIGHT_OUTPUT', fg='green')
defIdeaOption('CONSOLE_CYAN_OUTPUT', fg='cyan')
defIdeaOption('CONSOLE_CYAN_BRIGHT_OUTPUT', fg='cyan')
defIdeaOption('CONSOLE_BLUE_OUTPUT', fg='blue1')
defIdeaOption('CONSOLE_BLUE_BRIGHT_OUTPUT', fg='blue1')
defIdeaOption('CONSOLE_MAGENTA_OUTPUT', fg='purple1')
defIdeaOption('CONSOLE_MAGENTA_BRIGHT_OUTPUT', fg='purple1')

defIdeaColor('CONSOLE_BACKGROUND_KEY', 'defaultBg')
defIdeaOption('CONSOLE_NORMAL_OUTPUT', fg='defaultFg')
defIdeaOption('CONSOLE_SYSTEM_OUTPUT', fg='defaultFg')
defIdeaOption('CONSOLE_ERROR_OUTPUT', fg='red')
defIdeaOption('CONSOLE_USER_INPUT', fg='cyan')
defIdeaOption('CONSOLE_RANGE_TO_EXECUTE', effectColor='green')  # database console: statement to execute
defIdeaOption('TERMINAL_COMMAND_TO_RUN_USING_IDE', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')

defIdeaOption('LOG_ERROR_OUTPUT', fg='red')
defIdeaOption('LOG_WARNING_OUTPUT', fg='yellow')
defIdeaOption('LOG_INFO_OUTPUT', fg='green')
defIdeaOption('LOG_DEBUG_OUTPUT', fg='cyan')
defIdeaOption('LOG_VERBOSE_OUTPUT', fg='blue1')
defIdeaOption('LOG_EXPIRED_ENTRY', fg='altFg2')

# define jetbrains (diff & merge)
defIdeaOption('DIFF_INSERTED', bg='vimBgDiffAdd', stripe=(120, 50, 40))
defIdeaOption('DIFF_MODIFIED', fg='vimBgDiffChange', bg='vimBgDiffText', stripe=(210, 50, 50))
defIdeaOption('DIFF_CONFLICT', bg=(15, 40, bgLight + 10), stripe=(15, 50, 50))
defIdeaOption('DIFF_DELETED', bg='vimBgDiffDelete', stripe=(0, 0, 40))
defIdeaColor('DIFF_SEPARATORS_BACKGROUND', 'vimBgFolded')  # folded unchanged fragments

# define jetbrains (user-defined file types)
defIdeaOption('CUSTOM_STRING_ATTRIBUTES', useBase=True)
defIdeaOption('CUSTOM_VALID_STRING_ESCAPE_ATTRIBUTES', useBase=True)
defIdeaOption('CUSTOM_KEYWORD1_ATTRIBUTES', fg='blue1')
defIdeaOption('CUSTOM_KEYWORD2_ATTRIBUTES', fg='purple1')
defIdeaOption('CUSTOM_KEYWORD3_ATTRIBUTES', fg='green')
defIdeaOption('CUSTOM_KEYWORD4_ATTRIBUTES', fg='purple2')

# define jetbrains (vcs)
defIdeaColor('ADDED_LINES_COLOR', (120, 40, 50))
defIdeaColor('MODIFIED_LINES_COLOR', (210, 50, 60))
defIdeaColor('WHITESPACES_MODIFIED_LINES_COLOR', (45, 60, 50))
defIdeaColor('DELETED_LINES_COLOR', (0, 50, 60))
defIdeaColor('IGNORED_ADDED_LINES_BORDER_COLOR', (120, 80, 50))
defIdeaColor('IGNORED_MODIFIED_LINES_BORDER_COLOR', (210, 80, 70))
defIdeaColor('IGNORED_DELETED_LINES_BORDER_COLOR', (0, 50, 60))

# define jetbrains (regex)
defIdeaOption('REGEXP.BRACES', useBase=True)
defIdeaOption('REGEXP.BRACKETS', useBase=True)
defIdeaOption('REGEXP.PARENTHS', useBase=True)
defIdeaOption('REGEXP.META', useBase=True)
defIdeaOption('REGEXP.CHAR_CLASS', useBase=True)
defIdeaOption('REGEXP.ESC_CHARACTER', useBase=True)
defIdeaOption('REGEXP.QUOTE_CHARACTER', useBase=True)
defIdeaOption('REGEXP.REDUNDANT_ESCAPE')

# define jetbrains (c/c++)
defIdeaOption('OC.STD_INITIALIZER_LIST')
defIdeaOption('OC.OVERLOADED_OPERATOR', fg='cyan')
defIdeaOption('OC.STRUCT_LIKE', fg='blue1')
defIdeaOption('OC.CONDITIONALLY_NOT_COMPILED', fg='altFg1')
defIdeaOption('OC.MACRONAME', fg='yellow')
defIdeaOption('OC.MACRO_PARAMETER')
defIdeaOption('OC.STRUCT_FIELD', fg='purple1')
defIdeaOption('OC.TYPEDEF', fg='blue1')

# define jetbrains (java)
defIdeaOption('ANNOTATION_NAME_ATTRIBUTES', useBase=True)
defIdeaOption('ANNOTATION_ATTRIBUTE_NAME_ATTRIBUTES')
defIdeaOption('CONSTRUCTOR_CALL_ATTRIBUTES', fg='blue1')
defIdeaOption('CONSTRUCTOR_DECLARATION_ATTRIBUTES', fg='blue1')
defIdeaOption('STATIC_METHOD_ATTRIBUTES', useBase=True)
defIdeaOption('IMPLICIT_ANONYMOUS_CLASS_PARAMETER_ATTRIBUTES')
defIdeaOption('TYPE_PARAMETER_NAME_ATTRIBUTES', fg='blue1')

# define jetbrains (kotlin)
defIdeaOption('KOTLIN_FUNCTION_LITERAL_BRACES_AND_ARROW')
defIdeaOption('KOTLIN_CONSTRUCTOR', fg='blue1')
defIdeaOption('KOTLIN_DYNAMIC_FUNCTION_CALL', fg='cyan')
defIdeaOption('KOTLIN_PACKAGE_FUNCTION_CALL', useBase=True)
defIdeaOption('KOTLIN_LABEL', useBase=True)
defIdeaOption('KOTLIN_NAMED_ARGUMENT')
defIdeaOption('KOTLIN_CLOSURE_DEFAULT_PARAMETER', fg='green')
defIdeaOption('KOTLIN_TYPE_PARAMETER', fg='blue1')
defIdeaOption('KOTLIN_ANDROID_EXTENSIONS_PROPERTY_CALL', fg='purple1')
defIdeaOption('KOTLIN_BACKING_FIELD_VARIABLE')
defIdeaOption('KOTLIN_DYNAMIC_PROPERTY_CALL', fg='cyan')
defIdeaOption('KOTLIN_EXTENSION_PROPERTY', fg='purple1')
defIdeaOption('KOTLIN_MUTABLE_VARIABLE', effectColor='altFg1', effect=ideaUnderline)
defIdeaOption('KOTLIN_WRAPPED_INTO_REF')
defIdeaOption('KOTLIN_SMART_CONSTANT', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')
defIdeaOption('KOTLIN_SMART_CAST_VALUE', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')
defIdeaOption('KOTLIN_SMART_CAST_RECEIVER', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')

# define jetbrains (groovy)
defIdeaOption('Closure braces', useBase=True)  # closure expression braces and arrow
defIdeaOption('Class', useBase=True)
defIdeaOption('List/map to object conversion')
defIdeaOption('Static method access', useBase=True)
defIdeaOption('Static property reference ID', useBase=True)
defIdeaOption('Unresolved reference access', fg='altFg1', effectColor='altFg1', effect=ideaDottedLine)

# define jetbrains (python)
defIdeaOption('PY.BUILTIN_NAME', useBase=True)
defIdeaOption('PY.KEYWORD_ARGUMENT', useBase=True)
defIdeaOption('PY.SELF_PARAMETER', fg='green')
defIdeaOption('PY.PREDEFINED_DEFINITION', fg='yellow')  # special names: definition
defIdeaOption('PY.PREDEFINED_USAGE', fg='yellow')  # special names: usage
defIdeaOption('PY.STRING.B', useBase=True)
defIdeaOption('PY.ANNOTATION', fg='ideaFgDEFAULT_CLASS_NAME')  # type annotation

# define jetbrains (rust)
defIdeaOption('org.rust.CFG_DISABLED_CODE', fg='altFg1')
defIdeaOption('org.rust.FUNCTION_CALL', useBase=True)
defIdeaOption('org.rust.METHOD_CALL', useBase=True)
defIdeaOption('org.rust.MACRO', fg='yellow')
defIdeaOption('org.rust.GENERATED_ITEM', fg='yellow')
defIdeaOption('org.rust.LIFETIME', fg='cyan')
defIdeaOption('org.rust.MUT_PARAMETER', effectColor='altFg1', effect=ideaUnderline)
defIdeaOption('org.rust.TYPE_PARAMETER', fg='blue1')
defIdeaOption('org.rust.DOC_CODE', fg='defaultFg')
defIdeaOption('org.rust.DOC_EMPHASIS')
defIdeaOption('org.rust.DOC_STRONG')
defIdeaOption('org.rust.CRATE', fg='blue1')
defIdeaOption('org.rust.MODULE', fg='blue1')
defIdeaOption('org.rust.MUT_BINDING', effectColor='altFg1', effect=ideaUnderline)
defIdeaOption('org.rust.UNSAFE_CODE', bg=(0, 20, bgLight + 10))

# define jetbrains (go)
defIdeaOption('GO_COMMENT_REFERENCE', fg='yellow')
defIdeaOption('GO_BUILTIN_CONSTANT', fg='green')
defIdeaOption('GO_METHOD_RECEIVER', useBase=True)
defIdeaOption('GO_PACKAGE', fg='blue1')
defIdeaOption('GO_BUILTIN_VARIABLE', fg='green')
defIdeaOption('GO_PACKAGE_LOCAL_VARIABLE', fg='purple2')
defIdeaOption('GO_SHADOWING_VARIABLE', fg='cyan')
defIdeaOption('GO_STRUCT_EXPORTED_MEMBER', fg='purple1')
defIdeaOption('GO_STRUCT_LOCAL_MEMBER', fg='purple1')
defIdeaOption('GO_BUILTIN_FUNCTION_CALL', fg='green')
defIdeaOption('GO_EXPORTED_FUNCTION_CALL', useBase=True)
defIdeaOption('GO_LOCAL_FUNCTION_CALL', useBase=True)
defIdeaOption('GO_BUILTIN_TYPE_REFERENCE', fg='green')
defIdeaOption('GO_TYPE_REFERENCE', useBase=True)
defIdeaOption('GO_PACKAGE_EXPORTED_VARIABLE_CALL', fg='purple2')
defIdeaOption('GO_PACKAGE_LOCAL_VARIABLE_CALL', fg='purple2')
defIdeaOption('GO_STRUCT_EXPORTED_MEMBER_CALL', fg='purple1')
defIdeaOption('GO_STRUCT_LOCAL_MEMBER_CALL', fg='purple1')

# define jetbrains (dart)
defIdeaOption('DART_ENUM_CONSTANT', fg='purple2')
defIdeaOption('DART_IMPORT_PREFIX', fg='blue1')
defIdeaOption('DART_LIBRARY_NAME', fg='blue1')
defIdeaOption('DART_SYMBOL_LITERAL', fg='cyan')
defIdeaOption('DART_UNRESOLVED_INSTANCE_MEMBER_REFERENCE', fg='altFg1', effectColor='altFg1', effect=ideaDottedLine)

# define jetbrains (javascript)
defIdeaOption('JS.GLOBAL_FUNCTION', useBase=True)
defIdeaOption('JS.GLOBAL_VARIABLE', useBase=True)
defIdeaOption('JS.INSTANCE_MEMBER_FUNCTION', useBase=True)
defIdeaOption('JS.LOCAL_VARIABLE', useBase=True)
defIdeaOption('JS.MODULE_NAME', fg='blue1')
defIdeaOption('JS.REGEXP', useBase=True)
defIdeaOption('JavaScript:INJECTED_LANGUAGE_FRAGMENT', useBase=True)

# define jetbrains (typescript)
defIdeaOption('TS.MODULE_NAME', fg='blue1')
defIdeaOption('TS.TYPE_PARAMETER', fg='blue1')
defIdeaOption('TS.TYPE_GUARD', bg='ideaBgINJECTED_LANGUAGE_FRAGMENT')

# define jetbrains (shell)
defIdeaOption('BASH.EXTERNAL_COMMAND', useBase=True)
defIdeaOption('BASH.SUBSHELL_COMMAND', fg='green')
defIdeaOption('BASH.HERE_DOC_START', useBase=True)
defIdeaOption('BASH.HERE_DOC_END', useBase=True)
defIdeaOption('BASH.REDIRECTION', fg='green')
defIdeaOption('BASH.SHEBANG', useBase=True)

# define jetbrains (sql)
defIdeaOption('SQL_DATABASE_OBJECT', fg='yellow')
defIdeaOption('SQL_OUTER_QUERY_COLUMN', useBase=True)
defIdeaOption('SQL_SYNTHETIC_ENTITY')

# define jetbrains (http request)
defIdeaOption('HTTP_HEADER_FIELD_NAME', fg='green')
defIdeaOption('HTTP_REQUEST_INPUT_SIGN', fg='green')
defIdeaOption('HTTP_REQUEST_INPUT_FILE', fg='blue1')
defIdeaOption('HTTP_REQUEST_DIFFERENCE_SIGN', fg='green')
defIdeaOption('HTTP_REQUEST_DIFFERENCE_FILE', fg='blue1')
defIdeaOption('HTTP_REQUEST_MULTIPART_BOUNDARY', fg='oliveGreen')
defIdeaOption('HTTP_REQUEST_VARIABLE_BRACES', fg='purple2')
defIdeaOption('HTTP_REQUEST_PARAMETER_NAME', fg='purple1')
defIdeaOption('HTTP_REQUEST_PARAMETER_VALUE', fg='cyan')

# define jetbrains (css)
defIdeaOption('CSS.ATTRIBUTE_NAME', fg='purple1')
defIdeaOption('CSS.FUNCTION')
defIdeaOption('CSS.COLOR', fg='orange')
defIdeaOption('CSS.HASH', fg='green')
defIdeaOption('CSS.IDENT')
defIdeaOption('CSS.IMPORTANT', useBase=True)
defIdeaOption('CSS.UNICODE.RANGE', fg='orange')
defIdeaOption('CSS.URL', fg='blue1')

# define jetbrains (html)
defIdeaOption('HTML_ATTRIBUTE_NAME', useBase=True)
defIdeaOption('HTML_ATTRIBUTE_VALUE', useBase=True)
defIdeaOption('HTML_ENTITY_REFERENCE', useBase=True)
defIdeaOption('HTML_TAG', useBase=True)
defIdeaOption('HTML_TAG_NAME', useBase=True)

# define jetbrains (markdown)
defIdeaOption('MARKDOWN_BLOCK_QUOTE_MARKER', fg='cyan')
defIdeaOption('MARKDOWN_CODE_SPAN_MARKER', fg='cyan')
defIdeaOption('MARKDOWN_HEADER_LEVEL_1')
defIdeaOption('MARKDOWN_HEADER_LEVEL_2')
defIdeaOption('MARKDOWN_HEADER_LEVEL_3')
defIdeaOption('MARKDOWN_HEADER_LEVEL_4')
defIdeaOption('MARKDOWN_HEADER_LEVEL_5')
defIdeaOption('MARKDOWN_HEADER_LEVEL_6')
defIdeaOption('MARKDOWN_EXPLICIT_LINK', fg='blue1')
defIdeaOption('MARKDOWN_LINK_DESTINATION', fg='blue1')
defIdeaOption('MARKDOWN_REFERENCE_LINK')
defIdeaOption('MARKDOWN_BOLD')
defIdeaOption('MARKDOWN_ITALIC')

# define jetbrains (editor config)
defIdeaOption('EDITORCONFIG_PROPERTY_KEY', fg='green')

# define jetbrains (properties)
defIdeaOption('PROPERTIES.KEY', useBase=True)
defIdeaOption('PROPERTIES.KEY_VALUE_SEPARATOR', useBase=True)
defIdeaOption('PROPERTIES.VALID_STRING_ESCAPE', useBase=True)
defIdeaOption('PROPERTIES.INVALID_STRING_ESCAPE', useBase=True)

# define jetbrains (json)
defIdeaOption('JSON.KEYWORD', fg='purple2')
defIdeaOption('JSON.PROPERTY_KEY', fg='green')
defIdeaOption('JSONPATH.BOOLEAN', fg='green')

# define jetbrains (toml)
defIdeaOption('org.toml.DATE', fg='purple2')
defIdeaOption('org.toml.BOOLEAN', fg='purple2')

# define jetbrains (yaml)
defIdeaOption('YAML_ANCHOR', fg='yellow')

# define jetbrains (xml)
defIdeaOption('XML_ATTRIBUTE_NAME', useBase=True)
defIdeaOption('XML_ENTITY_REFERENCE', useBase=True)
defIdeaOption('XML_TAG', useBase=True)
defIdeaOption('XML_TAG_NAME', useBase=True)
defIdeaOption('XML_PROLOGUE', fg='green')
defIdeaOption('XML_NS_PREFIX', fg='blue1')
defIdeaOption('XPATH.FUNCTION', useBase=True)
defIdeaOption('XPATH.KEYWORD', useBase=True)
defIdeaOption('XPATH.XPATH_NAME', fg='green')
defIdeaOption('XPATH.XPATH_VARIABLE', fg='purple2')

# define jetbrains (logcat)
defIdeaOption('LOGCAT_VERBOSE_OUTPUT', fg='blue1')
defIdeaOption('LOGCAT_DEBUG_OUTPUT', fg='cyan')
defIdeaOption('LOGCAT_INFO_OUTPUT', fg='green')
defIdeaOption('LOGCAT_WARNING_OUTPUT', fg='orange')
defIdeaOption('LOGCAT_FILTER_KVALUE', fg='cyan')
defIdeaOption('LOGCAT_FILTER_REGEX_KVALUE', fg='cyan')
defIdeaOption('LOGCAT_FILTER_STRING_KVALUE', fg='cyan')

# define jetbrains (plan9)
defIdeaOption('com.plan9.FLAG')
defIdeaOption('com.plan9.IDENTIFIER', useBase=True)
defIdeaOption('com.plan9.INSTRUCTION', useBase=True)
defIdeaOption('com.plan9.PSEUDO_INSTRUCTION', useBase=True)
defIdeaOption('com.plan9.LABEL', useBase=True)
defIdeaOption('com.plan9.REGISTER', fg='purple2')

# define jetbrains (compose)
defIdeaOption('ComposableCallTextAttributes', fg='yellow')
defIdeaOption('LiveLiteralsHighlightAttribute', effectColor='altFg2')

if __name__ == '__main__':
    output()
