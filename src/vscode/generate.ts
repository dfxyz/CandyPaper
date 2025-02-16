import path from 'node:path';
// @ts-types='@types/ejs'
import * as ejs from 'ejs';
import { colors } from '../colors.ts';
import {
  colorCustomizations as rawColorCustomizations,
  tokenColorScopes as rawTokenColorScopes,
  tokenScopeSettings as rawTokenScopeSettings,
  semanticTokenColorCustomizations as rawSemanticTokenColorCustomizations,
} from './settings.ts';

const GENERATE_PATH = path.join(
  import.meta.dirname!,
  '..',
  '..',
  'dist',
  'CandyPaper.VSCode.json',
);
const DEFAULT_ALPHA = 'f0';

export default async function () {
  const colorCustomizations: Record<string, string> = {};
  for (const [k, v] of Object.entries(rawColorCustomizations)) {
    let colorName = v;
    let withAlpha = false;
    if (v.endsWith('$')) {
      colorName = v.slice(0, -1);
      withAlpha = true;
    }
    const color = colors.get(colorName);
    if (color === undefined) {
      throw new Error(`color '${v}' not found`);
    }
    colorCustomizations[k] = withAlpha ? `#${color.hex}${DEFAULT_ALPHA}` : `#${color.hex}`;
  }

  const tokenColorScopes: Record<string, string[]> = {};
  for (const [k, v] of Object.entries(rawTokenColorScopes)) {
    const color = colors.get(k);
    if (color === undefined) {
      throw new Error(`color '${k}' not found`);
    }
    tokenColorScopes[`#${color.hex}`] = v;
  }

  const tokenScopeSettings: Record<string, { foreground: string; fontStyle: string }> = {};
  for (const [k, v] of Object.entries(rawTokenScopeSettings)) {
    const color = colors.get(v.foreground);
    if (color === undefined) {
      throw new Error(`color '${v.foreground}' not found`);
    }
    tokenScopeSettings[k] = {
      foreground: `#${color.hex}`,
      fontStyle: v.fontStyle,
    };
  } 

  const semanticTokenColorCustomizations: Record<string, string> = {};
  for (const [k, v] of Object.entries(rawSemanticTokenColorCustomizations)) {
    const color = colors.get(v);
    if (color === undefined) {
      throw new Error(`color '${v}' not found`);
    }
    semanticTokenColorCustomizations[k] = `#${color.hex}`;
  }

  const content = await ejs.renderFile(path.join(import.meta.dirname!, 'template.ejs'), {
    colorCustomizations,
    tokenColorScopes,
    tokenScopeSettings,
    semanticTokenColorCustomizations,
  });
  await Deno.writeTextFile(GENERATE_PATH, content);
}
