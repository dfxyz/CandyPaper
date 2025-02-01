import path from 'node:path';
// @ts-types='@types/ejs'
import * as ejs from 'ejs';
import { colors } from '../colors.ts';
import Color from '../Color.ts';
import { ansiColors as rawAnsiColors, groups as rawGroups } from './settings.ts';

const GENERATE_PATH = path.join(
  import.meta.dirname!,
  '..',
  '..',
  'dist',
  'CandyPaper.vim',
  'colors',
  'CandyPaper.vim',
);

interface VimGroup {
  fg?: Color;
  bg?: Color;
  gui?: string;
}

export default async function() {
  const ansiColors: Color[] = [];
  for (const colorName of rawAnsiColors) {
    const color = colors.get(colorName);
    if (color === undefined) {
      throw new Error(`color '${colorName}' not found`);
    }
    ansiColors.push(color);
  }
  const lenAnsiColors = ansiColors.length;
  for (let i = 0; i < lenAnsiColors; i++) {
    ansiColors.push(ansiColors[i]);
  }

  const groups: Record<string, VimGroup> = {};
  for (const [name, raw] of Object.entries(rawGroups)) {
    const group: VimGroup = {};
    if (raw.fg !== undefined) {
      group.fg = colors.get(raw.fg);
      if (group.fg === undefined) {
        throw new Error(`color '${raw.fg}' not found for group '${name}'`);
      }
    }
    if (raw.bg !== undefined) {
      group.bg = colors.get(raw.bg);
      if (group.bg === undefined) {
        throw new Error(`color '${raw.bg}' not found for group '${name}'`);
      }
    }
    if (raw.gui !== undefined) {
      group.gui = raw.gui;
    }
    groups[name] = group;
  }

  const content = await ejs.renderFile(path.join(import.meta.dirname!, 'template.ejs'), {
    ansiColors,
    groups,
  });
  await Deno.writeTextFile(GENERATE_PATH, content);
}
