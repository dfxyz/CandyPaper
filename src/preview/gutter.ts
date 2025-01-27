import path from 'node:path';
// @ts-types='@types/ejs'
import ejs from 'ejs';
import { colors, colorTable } from '../colors.ts';

// noinspection JSUnusedGlobalSymbols
export default {
  async fetch(_req: Request) {
    const defaultFg = colors.get('fg.默认');
    const defaultBg = colors.get('bg.默认');
    const content = await ejs.renderFile(path.join(import.meta.dirname!, 'gutter.ejs'), {
      gutters: Object.values(colorTable.gutter),
      defaultFg,
      defaultBg,
    });
    return new Response(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
};
