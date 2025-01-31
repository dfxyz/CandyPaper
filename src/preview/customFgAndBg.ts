import path from 'node:path';
// @ts-types='@types/ejs'
import ejs from 'ejs';
import Color from '../Color.ts';
import { colors } from '../colors.ts';

// noinspection JSUnusedGlobalSymbols
export default {
  async fetch(req: Request) {
    const queryParams = new URL(req.url).searchParams;
    const fgHSV = queryParams.get('fg');
    const fgColor = fgHSV === null ? colors.get('fg.默认')! : (() => {
      const [h, s, v] = fgHSV.split(',').map(Number);
      return Color.fromHSV(h, s, v);
    })();
    const bgHSV = queryParams.get('bg');
    const bgColor = bgHSV === null ? colors.get('bg.默认')! : (() => {
      const [h, s, v] = bgHSV.split(',').map(Number);
      return Color.fromHSV(h, s, v);
    })();
    const content = await ejs.renderFile(path.join(import.meta.dirname!, 'customFgAndBg.ejs'), {
      fgColor,
      bgColor,
    });
    return new Response(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
};
