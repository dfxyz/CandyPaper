import path from 'node:path';
// @ts-types='@types/ejs'
import * as ejs from 'ejs';
import { colors } from '../colors.ts';

const GENERATE_PATH = path.join(
  import.meta.dirname!,
  '..',
  '..',
  'dist',
  'CandyPaper.WindowsTerminal.json',
);

function getOrThrowError(name: string): string {
  const color = colors.get(name);
  if (color === undefined) {
    throw new Error(`color '${name}' not found`);
  }
  return `#${color.hex}`;
}

export default async function () {
  const params = {
    fg: getOrThrowError('fg.默认'),
    bg: getOrThrowError('bg.默认'),
    cursor: getOrThrowError('fg.默认'),
    selectionBg: getOrThrowError('bg.选中文本'),
    black: getOrThrowError('fg.黑'),
    brightBlack: getOrThrowError('fg.黑'),
    white: getOrThrowError('fg.白'),
    brightWhite: getOrThrowError('fg.白'),
    red: getOrThrowError('fg.红'),
    brightRed: getOrThrowError('fg.红'),
    yellow: getOrThrowError('fg.黄'),
    brightYellow: getOrThrowError('fg.黄'),
    green: getOrThrowError('fg.绿'),
    brightGreen: getOrThrowError('fg.绿'),
    cyan: getOrThrowError('fg.青'),
    brightCyan: getOrThrowError('fg.青'),
    blue: getOrThrowError('fg.蓝'),
    brightBlue: getOrThrowError('fg.蓝'),
    purple: getOrThrowError('fg.桃红'),
    brightPurple: getOrThrowError('fg.桃红'),
  };
  const content = await ejs.renderFile(path.join(import.meta.dirname!, 'template.ejs'), params);
  await Deno.writeTextFile(GENERATE_PATH, content);
}
