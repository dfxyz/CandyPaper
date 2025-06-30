import { hex2bgrNumber } from '../utils.ts';
import { fg, bg } from "../colors.ts";

const defaultFg = hex2bgrNumber(fg.default);
const defaultBg = hex2bgrNumber(bg.default);
const selectionBg = hex2bgrNumber(bg.selectedText);
/** RGB=[200,250,184], HSV=[105,26,98] */
const activePathBg = hex2bgrNumber('#c8fab8');
/** RGB=[242,242,242], HSV=[0,0,95] */
const inactivePathBg = hex2bgrNumber('#f2f2f2');

const content = `
[Colors]
InverseCursor=0
ThemedCursor=0
InverseSelection=1
ForeColor=${defaultFg}
CursorColor=${defaultFg}
CursorText=${defaultFg}
BackColor=${defaultBg}
BackColor2=${defaultBg}
MarkColor=${selectionBg}
ActiveTitle=${activePathBg}
InactiveTitle=${inactivePathBg}
`.trimStart();

export default content;
