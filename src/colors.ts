export const basic = {
  /** RGB=[64,96,128], HSV=[210,50,50] */
  blueBlack: '#406080',
  /** RGB=[32,48,64], HSV=[210,50,25] */
  darkBlueBlack: '#203040',
  /** RGB=[96,144,192], HSV=[210,50,75] */
  brightBlueBlack: '#6090c0',
  /** RGB=[172,182,192], HSV=[210,10,75] */
  blueGrey: '#acb6c0',
  /** RGB=[154,46,46], HSV=[0,70,60] */
  darkRed: '#9a2e2e',
  /** RGB=[230,24,24], HSV=[0,90,90] */
  red: '#e61818',
  /** RGB=[192,84,48], HSV=[15,75,75] */
  orange: '#c05430',
  /** RGB=[128,96,0], HSV=[45,100,50] */
  yellow: '#806000',
  /** RGB=[86,114,0], HSV=[75,100,45] */
  oliveGreen: '#567200',
  /** RGB=[0,128,32], HSV=[135,100,50] */
  green: '#008020',
  /** RGB=[0,114,114], HSV=[180,100,45] */
  cyan: '#007272',
  /** RGB=[0,102,204], HSV=[210,100,80] */
  lakeBlue: '#0066cc',
  /** RGB=[40,40,204], HSV=[240,80,80] */
  blue: '#2828cc',
  /** RGB=[122,40,204], HSV=[270,80,80] */
  purple: '#7a28cc',
  /** RGB=[192,48,192], HSV=[300,75,75] */
  pink: '#c030c0',
};

export const fg = {
  default: basic.blueBlack,
  lessImportant: basic.brightBlueBlack,
  unimportant: basic.blueGrey,
  searchMatchedText: basic.darkBlueBlack,
  lineNumber: basic.blueGrey,
  emphasizedLineNumber: basic.blueBlack,
  foldedText: basic.brightBlueBlack,

  globalVariable: basic.darkRed,
  constant: basic.darkRed,
  literalConstant: basic.orange,
  annotation: basic.yellow,
  macro: basic.yellow,
  specialComment: basic.yellow,
  comment: basic.oliveGreen,
  keyword: basic.green,
  string: basic.cyan,
  stringInterpolation: basic.blue,
  hyperlink: basic.lakeBlue,
  structLike: basic.blue,
  label: basic.blue,
  instanceProperty: basic.purple,
  staticProperty: basic.pink,
  tag: basic.green,
  attributeKey: basic.purple,
  markupHeading: basic.green,

  ansiBlack: basic.blueBlack,
  ansiWhite: basic.brightBlueBlack,
  ansiRed: basic.red,
  ansiYellow: basic.yellow,
  ansiGreen: basic.green,
  ansiCyan: basic.cyan,
  ansiBlue: basic.blue,
  ansiMagenta: basic.pink,
};

export const bg = {
  /** RGB=[242,255,230], HSV=[91,10,100] */
  default: '#f2ffe6',
  /** RGB=[230,255,236], HSV=[134,10,100] */
  alternative: '#e6ffec',
  /** RGB=[236,250,200], HSV=[77,20,98] */
  cursorLine: '#ecfac8',
  /** RGB=[180,255,180], HSV=[120,29,100] */
  searchMatchedText: '#b4ffb4',
  /** RGB=[255,184,112], HSV=[30,56,100] */
  currentSearchMatchedText: '#ffb870',
  /** RGB=[206,242,170], HSV=[90,30,95] */
  selectedText: '#cef2aa',
  /** RGB=[218,242,218], HSV=[120,10,95] */
  foldedText: '#daf2da',
  /** RGB=[170,242,242], HSV=[180,30,95] */
  matchedToken: '#aaf2f2',
  /** RGB=[255,204,204], HSV=[0,20,100] */
  error: '#ffcccc',
  /** RGB=[255,230,154], HSV=[45,40,100] */
  warning: '#ffe69a',
  /** RGB=[255,255,102], HSV=[60,60,100] */
  todo: '#ffff66',
  /** RGB=[206,242,206], HSV=[120,15,95] */
  addedText: '#cef2ce',
  /** RGB=[206,224,242], HSV=[210,15,95] */
  modifiedText: '#cee0f2',
  /** RGB=[224,230,218], HSV=[90,5,90] */
  removedText: '#e0e6da',
};

export const gutter = {
  /** RGB=[102,204,102], HSV=[120,50,80] */
  addedText: '#66cc66',
  /** RGB=[128,192,255], HSV=[210,50,100] */
  modifiedText: '#80c0ff',
  /** RGB=[255,154,154], HSV=[0,40,100] */
  removedText: '#ff9a9a',
};

export const stripe = {
  /** RGB=[0,204,0], HSV=[120,100,80] */
  searchMatchedText: '#00cc00',
  /** RGB=[255,64,64], HSV=[0,75,100] */
  error: '#ff4040',
  /** RGB=[255,160,64], HSV=[30,75,100] */
  warning: '#ffa040',
  /** RGB=[255,224,128], HSV=[45,50,100] */
  weakWarning: '#ffe080',
  /** RGB=[134,192,148], HSV=[134,30,75] */
  addedText: '#86c094',
  /** RGB=[128,192,255], HSV=[210,50,100] */
  modifiedText: '#80c0ff',
  /** RGB=[180,128,255], HSV=[265,50,100] */
  cursorIndentifierRead: '#b480ff',
  /** RGB=[255,128,224], HSV=[315,50,100] */
  cursorIndentifierWrite: '#ff80e0',
}

export const guideLine = {
  /** RGB=[184,204,184], HSV=[120,10,80] */
  margin: '#b8ccb8',
  /** RGB=[208,230,208], HSV=[120,10,90] */
  indent: '#d0e6d0',
  /** RGB=[160,180,160], HSV=[120,11,71] */
  emphasizedIndent: '#a0b4a0',
};
