import path from 'node:path';
// @ts-types='@types/ejs'
import * as ejs from 'ejs';
import { colors } from '../colors.ts';

const GENERATE_PATH = path.join(
  import.meta.dirname!,
  '..',
  '..',
  'dist',
  'CandyPaper.TotalCMD.ini',
);

function getOrThrowError(name: string): number {
  const color = colors.get(name);
  if (color === undefined) {
    throw new Error(`color '${name}' not found`);
  }
  return color.bgrNumber;
}
export default async function () {
  const params = {
    fg: getOrThrowError('fg.默认'),
    bg: getOrThrowError('bg.默认'),
    selectionBg: getOrThrowError('bg.选中文本'),
  };
  const content = await ejs.renderFile(path.join(import.meta.dirname!, 'template.ejs'), params);
  await Deno.writeTextFile(GENERATE_PATH, content);
}
