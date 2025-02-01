import path from 'node:path';
// @ts-types='@types/ejs'
import * as ejs from 'ejs';
import {
  AttributeKey,
  AttributeOption,
  ColorOption,
  GENERATE_PATH,
  INHERIT_ATTRIBUTE,
  NO_COLOR,
  REMOVE_ATTRIBUTE,
  REMOVE_COLOR,
  Scheme,
} from './common.ts';
import settings from './settings.ts';
import {colors} from "../colors.ts";

export default async function() {
  const scheme = await Scheme.fromXmlFile(path.join(import.meta.dirname!, 'baseScheme.icls'));
  for (const [key, value] of Object.entries(settings)) {
    if (value === NO_COLOR) {
      scheme.colors.set(key, new ColorOption(key, ''));
      continue;
    }
    if (value === INHERIT_ATTRIBUTE) {
      scheme.attributes.set(key, new AttributeOption(key, true));
      continue;
    }
    if (value === REMOVE_COLOR) {
      scheme.colors.delete(key);
      continue;
    }
    if (value === REMOVE_ATTRIBUTE) {
      scheme.attributes.delete(key);
      continue;
    }
    if (typeof value === 'symbol') {
      throw new Error(`unexpected symbol value of setting '${key}': ${value.toString()}`);
    }
    if (typeof value === 'string') {
      const color = colors.get(value);
      if (color === undefined) {
        throw new Error(`color '${value}' not found for setting '${key}'`);
      }
      scheme.colors.set(key, new ColorOption(key, color.hex));
      continue;
    }
    scheme.attributes.set(
      key,
      new AttributeOption(
        key,
        false,
        Object.entries(value).map(([attrKey, attrValue]) => {
          switch (attrKey) {
            case AttributeKey.FG:
            case AttributeKey.BG:
            case AttributeKey.ST:
            case AttributeKey.EC: {
              const color = colors.get(attrValue);
              if (color === undefined) {
                throw new Error(`color '${attrValue}' not found for setting '${key}.${attrKey}'`);
              }
              return [attrKey, color.hex];
            }
            default: {
              return [attrKey, attrValue];
            }
          }
        }),
      ),
    );
  }
  const content = await ejs.renderFile(path.join(import.meta.dirname!, 'template.ejs'), { scheme });
  await Deno.writeTextFile(GENERATE_PATH, content);
}
