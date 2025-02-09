import path from 'node:path';
import { AttributeKey, EffectType, FontType, GENERATE_PATH, Scheme } from './common.ts';
import Color from '../Color.ts';
import { hex2ColorNames } from '../colors.ts';

let appData = Deno.env.get('APPDATA');
if (appData === undefined) {
  const home = Deno.env.get('HOME');
  if (home === undefined) {
    throw new Error(`environment variable 'HOME' is not set`);
  }
  appData = `${home}/.config`;
}
const ide = Deno.env.get('IDE') ?? 'rust';

const jbConfigDir = path.join(path.join(appData, 'JetBrains'));
let targetPath: string | undefined;
for await (const dir of Deno.readDir(jbConfigDir)) {
  if (dir.name.toLowerCase().includes(ide)) {
    targetPath = path.join(jbConfigDir, dir.name, 'colors', 'CandyPaper.icls');
    break;
  }
}
if (targetPath === undefined) {
  throw new Error(`cannot find current scheme file for '${ide}'`);
}

const thisScheme = await Scheme.fromXmlFile(targetPath);
const thatScheme = await Scheme.fromXmlFile(GENERATE_PATH);
const [modified, removed] = thisScheme.compare(thatScheme);

function normalizeKey(key: string): string {
  const specialChars = ['.', ' ', ':'];
  for (const char of specialChars) {
    if (key.includes(char)) {
      return `'${key}'`;
    }
  }
  return key;
}

modified.colors.forEach((colorOption) => {
  if (colorOption.value.length > 0) {
    const color = Color.fromHex(colorOption.value);
    const hex = color.hex;
    const colorNames = hex2ColorNames.get(hex) ?? [];
    if (colorNames.length <= 0) {
      console.log(`// ${normalizeKey(colorOption.name)}: '${color.hsv}',`);
    } else {
      for (const colorName of colorNames) {
        console.log(`${normalizeKey(colorOption.name)}: '${colorName}',`);
      }
    }
  } else {
    console.log(`${normalizeKey(colorOption.name)}: NO_COLOR,`);
  }
});
modified.attributes.forEach((attributeOption) => {
  if (attributeOption.inherit) {
    console.log(`${normalizeKey(attributeOption.name)}: INHERIT_ATTRIBUTE,`);
  } else {
    if (attributeOption.options.size > 0) {
      console.log(`${normalizeKey(attributeOption.name)}: {`);
      for (const [key, value] of attributeOption.options) {
        switch (key) {
          case AttributeKey.FG: {
            const color = Color.fromHex(value);
            const hex = color.hex;
            const colorNames = (hex2ColorNames.get(hex) ?? []).filter((x) => x.startsWith('fg'));
            if (colorNames.length <= 0) {
              console.log(`  ${normalizeKey(key)}: '${color.hsv}',`);
            } else {
              for (const colorName of colorNames) {
                console.log(`  ${normalizeKey(key)}: '${colorName}',`);
              }
            }
            break;
          }
          case AttributeKey.BG: {
            const color = Color.fromHex(value);
            const hex = color.hex;
            const colorNames = (hex2ColorNames.get(hex) ?? []).filter((x) => x.startsWith('bg'));
            if (colorNames.length <= 0) {
              console.log(`  ${normalizeKey(key)}: '${color.hsv}',`);
            } else {
              for (const colorName of colorNames) {
                console.log(`  ${normalizeKey(key)}: '${colorName}',`);
              }
            }
            break;
          }
          case AttributeKey.ST: {
            const color = Color.fromHex(value);
            const hex = color.hex;
            const colorNames = (hex2ColorNames.get(hex) ?? []).filter((x) => x.startsWith('stripe'));
            if (colorNames.length <= 0) {
              console.log(`  ${normalizeKey(key)}: '${color.hsv}',`);
            } else {
              for (const colorName of colorNames) {
                console.log(`  ${normalizeKey(key)}: '${colorName}',`);
              }
            }
            break;
          }
          case AttributeKey.EC: {
            const color = Color.fromHex(value);
            const hex = color.hex;
            const colorNames = hex2ColorNames.get(hex) ?? [];
            if (colorNames.length <= 0) {
              console.log(`  ${normalizeKey(key)}: '${color.hsv}',`);
            } else {
              for (const colorName of colorNames) {
                console.log(`  ${normalizeKey(key)}: '${colorName}',`);
              }
            }
            break;
          }
          case AttributeKey.ET: {
            switch (value) {
              case EffectType.UNDERLINE: {
                console.log(`  ${normalizeKey(key)}: EffectType.UNDERLINE,`);
                break;
              }
              case EffectType.UNDERWAVE: {
                console.log(`  ${normalizeKey(key)}: EffectType.UNDERWAVE,`);
                break;
              }
              case EffectType.STRIKEOUT: {
                console.log(`  ${normalizeKey(key)}: EffectType.STRIKEOUT,`);
                break;
              }
              default: {
                console.log(`  ${normalizeKey(key)}: '${value}',`);
              }
            }
            break;
          }
          case AttributeKey.FT: {
            switch (value) {
              case FontType.BOLD: {
                console.log(`  ${normalizeKey(key)}: FontType.BOLD,`);
                break;
              }
              case FontType.ITALIC: {
                console.log(`  ${normalizeKey(key)}: FontType.ITALIC,`);
                break;
              }
              default: {
                console.log(`  ${normalizeKey(key)}: '${value}',`);
              }
            }
            break;
          }
          default: {
            throw new Error(`invalid option key '${key}' of attribute '${attributeOption.name}'`);
          }
        }
      }
      console.log(`},`);
    } else {
      console.log(`${normalizeKey(attributeOption.name)}: {},`);
    }
  }
});
removed.colors.keys().forEach((key) => {
  console.log(`${normalizeKey(key)}: REMOVE_COLOR,`);
});
removed.attributes.keys().forEach((key) => {
  console.log(`${normalizeKey(key)}: REMOVE_ATTRIBUTE,`);
});
