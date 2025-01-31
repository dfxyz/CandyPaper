import path from 'node:path';
// @ts-types='@types/ejs'
import ejs from 'ejs';
import { colorTable, ColorTableItem } from '../colors.ts';

type ColorTableEntryFilter = (hsvString: string, item: ColorTableItem) => boolean;

// noinspection JSUnusedGlobalSymbols
export default {
  async fetch(req: Request) {
    const queryParams = new URL(req.url).searchParams;
    const fgFilters = parseFilter(queryParams.get('fg'));
    const bgFilters = parseFilter(queryParams.get('bg'));
    const groupByBg = (queryParams.get('groupByBg') ?? true) == true;

    const fgColorItems = Object.entries(colorTable.fg).filter(([hsvString, item]) => {
      return filterWithFilters(hsvString, item, fgFilters);
    }).map(([_, item]) => item);
    const bgColorItems = Object.entries(colorTable.bg).filter(([hsvString, item]) => {
      return filterWithFilters(hsvString, item, bgFilters);
    }).map(([_, item]) => item);

    const content = await ejs.renderFile(path.join(import.meta.dirname!, 'fgAndBg.ejs'), {
      fgColorItems,
      bgColorItems,
      groupByBg,
    });
    return new Response(content, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
};

function parseFilter(queryValue: string | null): ColorTableEntryFilter[] {
  if (queryValue === null) {
    return [];
  }
  const filters: ColorTableEntryFilter[] = [];
  queryValue.split(';').map((x) => x.trim()).filter((x) => x.length > 0).forEach((x) => {
    if (x.includes(',')) { // HSV
      filters.push((hsvString: string, _) => {
        return hsvString.startsWith(x);
      });
      return;
    }
    filters.push((_, item: ColorTableItem) => {
      return item.aliases.includes(x);
    });
  });
  return filters;
}

function filterWithFilters(hsvString: string, item: ColorTableItem, filters: ColorTableEntryFilter[]): boolean {
  if (filters.length <= 0) {
    return true;
  }
  return filters.some((filter) => {
    if (filter(hsvString, item)) {
      return true;
    }
  });
}
