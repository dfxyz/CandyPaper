import path from 'node:path';
// @ts-types='@types/ejs'
import ejs from 'ejs';
import { colorTable } from '../colors.ts';

// noinspection JSUnusedGlobalSymbols
export default {
  async fetch(_req: Request) {
    const content = await ejs.renderFile(path.join(import.meta.dirname!, 'colorTable.ejs'), { colorTable });
    return new Response(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
};
