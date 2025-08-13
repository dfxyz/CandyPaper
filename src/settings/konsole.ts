import { fg, bg } from '../colors.ts';
import {hex2rgba} from '../utils.ts';

function hex2rgb(hex: string): string {
    const [r, g, b] = hex2rgba(hex);
    return `${r},${g},${b}`;
}

export const content = `
[General]
Description=Candy Paper

[Foreground]
Color=${hex2rgb(fg.default)}

[ForegroundFaint]
Color=${hex2rgb(fg.default)}

[ForegroundIntense]
Color=${hex2rgb(fg.default)}

[Background]
Color=${hex2rgb(bg.default)}

[BackgroundFaint]
Color=${hex2rgb(bg.default)}

[BackgroundIntense]
Color=${hex2rgb(bg.default)}

[Color0]
Color=${hex2rgb(fg.ansiBlack)}

[Color0Faint]
Color=${hex2rgb(fg.ansiBlack)}

[Color0Intense]
Color=${hex2rgb(fg.ansiBlack)}

[Color1]
Color=${hex2rgb(fg.ansiRed)}

[Color1Faint]
Color=${hex2rgb(fg.ansiRed)}

[Color1Intense]
Color=${hex2rgb(fg.ansiRed)}

[Color2]
Color=${hex2rgb(fg.ansiGreen)}

[Color2Faint]
Color=${hex2rgb(fg.ansiGreen)}

[Color2Intense]
Color=${hex2rgb(fg.ansiGreen)}

[Color3]
Color=${hex2rgb(fg.ansiYellow)}

[Color3Faint]
Color=${hex2rgb(fg.ansiYellow)}

[Color3Intense]
Color=${hex2rgb(fg.ansiYellow)}

[Color4]
Color=${hex2rgb(fg.ansiBlue)}

[Color4Faint]
Color=${hex2rgb(fg.ansiBlue)}

[Color4Intense]
Color=${hex2rgb(fg.ansiBlue)}

[Color5]
Color=${hex2rgb(fg.ansiMagenta)}

[Color5Faint]
Color=${hex2rgb(fg.ansiMagenta)}

[Color5Intense]
Color=${hex2rgb(fg.ansiMagenta)}

[Color6]
Color=${hex2rgb(fg.ansiCyan)}

[Color6Faint]
Color=${hex2rgb(fg.ansiCyan)}

[Color6Intense]
Color=${hex2rgb(fg.ansiCyan)}

[Color7]
Color=${hex2rgb(fg.ansiWhite)}

[Color7Faint]
Color=${hex2rgb(fg.ansiWhite)}

[Color7Intense]
Color=${hex2rgb(fg.ansiWhite)}
`.trimStart();
