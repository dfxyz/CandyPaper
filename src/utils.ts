import xml2js from 'xml2js';

const SHORTEN_HEX_PATTERN = /^[0-9a-fA-F]+$/;
const NORMALIZED_HEX_PATTERN = /^#([0-9a-fA-F]{6})|([0-9a-fA-F]{8})$/;

const ILLEGAL_INPUT = Symbol();

/**
 * Normalize a hex string representing a color.
 * The normalized string will be in the format `#RRGGBB` or `#RRGGBBAA`.
 * @throws {Error} if the input is not a valid hex string.
 */
export function normalizeHexString(hex: string): string {
  const len = hex.length;
  try {
    if (len <= 6) {
      if (!SHORTEN_HEX_PATTERN.test(hex)) {
        throw ILLEGAL_INPUT;
      }
      return '#' + '0'.repeat(6 - len) + hex.toLowerCase();
    }
    if (!NORMALIZED_HEX_PATTERN.test(hex)) {
      throw ILLEGAL_INPUT;
    }
    return hex.toLowerCase();
  } catch (_) {
    throw new Error(`Invalid hex string: ${hex}`);
  }
}

/**
 * Convert a hex string into an RGB(A) value.
 * The RGB(A) values will be in the range `[0, 255]`.
 * The alpha value may be `null` if the hex string does not have the alpha part.
 * @param hex A hex string representing a color.
 * @throws {Error} if the input is not a valid hex string.
 */
export function hex2rgba(hex: string): [r: number, g: number, b: number, a: number | null] {
  hex = normalizeHexString(hex);
  const len = hex.length;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (len === 9) {
    const a = parseInt(hex.slice(7, 9), 16);
    return [r, g, b, a];
  }
  return [r, g, b, null];
}

/**
 * Convert a hex string into a BGR number.
 * @param hex A hex string representing a color.
 */
export function hex2bgrNumber(hex: string): number {
  const [r, g, b] = hex2rgba(hex);
  return (b << 16) + (g << 8) + r;
}

/**
 * Convert an RGB(A) value into a hex string.
 * @param r The red value, in the range `[0, 255]`.
 * @param g The green value, in the range `[0, 255]`.
 * @param b The blue value, in the range `[0, 255]`.
 * @param a The alpha value, in the range `[0, 255]`.
 * @throws {Error} if the input is not a valid RGB(A) value.
 */
export function rgba2hex(r: number, g: number, b: number, a: number | null): string {
  for (const value of [r, g, b, a]) {
    if (value === null) {
      continue;
    }
    if (value < 0 || value > 255) {
      throw new Error(`Invalid RGB(A) value: ${value}`);
    }
  }
  const hex = '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  if (a !== null) {
    return hex + a.toString(16).padStart(2, '0');
  }
  return hex;
}

/**
 * Convert an HSV value into an RGB value.
 * @param h The hue value, in the range `[0, 360)`.
 * @param s The saturation value, in the range `[0, 100]`.
 * @param v The value value, in the range `[0, 100]`.
 * @throws {Error} if the input is not a valid HSV value.
 */
export function hsv2rgb(h: number, s: number, v: number): [r: number, g: number, b: number] {
  try {
    if (h < 0 || h >= 360) {
      throw ILLEGAL_INPUT;
    }
    if (s < 0 || s > 100) {
      throw ILLEGAL_INPUT;
    }
    if (v < 0 || v > 100) {
      throw ILLEGAL_INPUT;
    }
  } catch (_) {
    throw new Error(`Invalid HSV value: ${h}, ${s}, ${v}`);
  }

  s /= 100;
  v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;

  let r, g, b;
  if (h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

/**
 * Convert an RGB value into an HSV value.
 * @param r The red value, in the range `[0, 255]`.
 * @param g The green value, in the range `[0, 255]`.
 * @param b The blue value, in the range `[0, 255]`.
 * @throws {Error} if the input is not a valid RGB value.
 */
export function rgb2hsv(r: number, g: number, b: number): [h: number, s: number, v: number] {
  for (const value of [r, g, b]) {
    if (value < 0 || value > 255) {
      throw new Error(`Invalid RGB value: ${value}`);
    }
  }

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h;
  if (delta === 0) {
    h = 0;
  } else if (max === r) {
    h = 60 * (((g - b) / delta) % 6);
  } else if (max === g) {
    h = 60 * ((b - r) / delta + 2);
  } else {
    h = 60 * ((r - g) / delta + 4);
  }

  h = Math.round(h < 0 ? h + 360 : h);
  const s = Math.round(max === 0 ? 0 : (delta / max) * 100);
  const v = Math.round((max / 255) * 100);
  return [h, s, v];
}

type XmlNode = { $?: Record<string, string> } & { [key: string]: XmlNode[] };

export type JetbrainsColorSettingObject = { [name: string]: string };
export type JetbrainsAttributeSettingObject = {
  [name: string]: {
    inherit?: boolean;
    foreground?: string;
    background?: string;
    effectColor?: string;
    effectType?: string;
    errorStripeColor?: string;
    fontType?: string;
  };
};

/**
 * Class representing a JetBrains color scheme.
 */
export class JetbrainsScheme {
  readonly colors: Map<string, JetbrainsColorSetting>;
  readonly attributes: Map<string, JetbrainsAttributeSetting>;

  private constructor(colors: Map<string, JetbrainsColorSetting>, attributes: Map<string, JetbrainsAttributeSetting>) {
    this.colors = colors;
    this.attributes = attributes;
  }

  static async parseFromXmlFile(path: string): Promise<JetbrainsScheme> {
    const fileContent = await Deno.readTextFile(path);
    const parser = new xml2js.Parser({});
    const result = await parser.parseStringPromise(fileContent);
    const root = result.scheme as XmlNode;

    const colors: Map<string, JetbrainsColorSetting> = new Map();
    for (const colorNode of root?.colors?.[0]?.option ?? []) {
      const color = JetbrainsColorSetting.parseFromXmlNode(colorNode);
      colors.set(color.name, color);
    }
    const attributes: Map<string, JetbrainsAttributeSetting> = new Map();
    for (const attributeNode of root?.attributes?.[0]?.option ?? []) {
      const attribute = JetbrainsAttributeSetting.parseFromXmlNode(attributeNode);
      attributes.set(attribute.name, attribute);
    }

    return new JetbrainsScheme(colors, attributes);
  }

  mergeSettingObject(
    colors: JetbrainsColorSettingObject,
    attributes: JetbrainsAttributeSettingObject,
  ): JetbrainsScheme {
    const colorMap = new Map<string, JetbrainsColorSetting>();
    for (const [name, value] of this.colors) {
      colorMap.set(name, value);
    }
    for (const [name, value] of Object.entries(colors)) {
      colorMap.set(name, new JetbrainsColorSetting(name, value));
    }
    const attributeMap = new Map<string, JetbrainsAttributeSetting>();
    for (const [name, value] of this.attributes) {
      attributeMap.set(name, value);
    }
    for (const [name, settings] of Object.entries(attributes)) {
      if (settings.inherit === true) {
        attributeMap.set(name, new JetbrainsAttributeSetting(name, true));
      } else {
        attributeMap.set(
          name,
          new JetbrainsAttributeSetting(
            name,
            false,
            settings.foreground,
            settings.background,
            settings.effectColor,
            settings.effectType,
            settings.errorStripeColor,
            settings.fontType,
          ),
        );
      }
    }
    return new JetbrainsScheme(colorMap, attributeMap);
  }
}

/**
 * Class representing a color setting in a JetBrains color scheme.
 */
export class JetbrainsColorSetting {
  /** Option name. */
  readonly name: string;
  /** The hex string representing of the color. May be empty. */
  readonly value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  static parseFromXmlNode(node: XmlNode): JetbrainsColorSetting {
    const name = node.$!.name;
    let value = node.$!.value;
    if (value.length > 0) {
      value = normalizeHexString(value);
    }
    return new JetbrainsColorSetting(name, value);
  }
}

/**
 * Class representing an attribute setting in a JetBrains color scheme.
 */
export class JetbrainsAttributeSetting {
  /** Option name */
  readonly name: string;
  /** Whether the attribute is inheriting the base attribute */
  readonly inherit: boolean;
  /** The hex string representing the foreground color. May be undefined */
  readonly foreground?: string;
  /** The hex string representing the background color. May be undefined */
  readonly background?: string;
  /** The hex string representing the effect color. May be undefined */
  readonly effectColor?: string;
  /** The effect type; may be undefined */
  readonly effectType?: string;
  /** The hex string representing the stripe color. May be undefined */
  readonly errorStripeColor?: string;
  /** The font type; may be undefined */
  readonly fontType?: string;

  constructor(
    name: string,
    inherit: boolean,
    foreground?: string,
    background?: string,
    effectColor?: string,
    effectType?: string,
    errorStripeColor?: string,
    fontType?: string,
  ) {
    this.name = name;
    this.inherit = inherit;
    this.foreground = foreground;
    this.background = background;
    this.effectColor = effectColor;
    this.effectType = effectType;
    this.errorStripeColor = errorStripeColor;
    this.fontType = fontType;
  }

  static parseFromXmlNode(node: XmlNode): JetbrainsAttributeSetting {
    const name = node.$!.name;
    const inherit = node.$!.baseAttributes !== undefined;
    if (inherit) {
      return new JetbrainsAttributeSetting(name, true);
    }
    const valueNode = node.value?.[0];
    let foreground: string | undefined;
    let background: string | undefined;
    let effectColor: string | undefined;
    let effectType: string | undefined;
    let errorStripeColor: string | undefined;
    let fontType: string | undefined;
    if (valueNode) {
      for (const optionNode of valueNode.option) {
        const optionName = optionNode.$!.name;
        const optionValue = optionNode.$!.value;
        switch (optionName) {
          case 'FOREGROUND':
            foreground = normalizeHexString(optionValue);
            break;
          case 'BACKGROUND':
            background = normalizeHexString(optionValue);
            break;
          case 'EFFECT_COLOR':
            effectColor = normalizeHexString(optionValue);
            break;
          case 'EFFECT_TYPE':
            effectType = optionValue;
            break;
          case 'ERROR_STRIPE_COLOR':
            errorStripeColor = normalizeHexString(optionValue);
            break;
          case 'FONT_TYPE':
            fontType = optionValue;
            break;
        }
      }
    }
    if (effectColor === undefined) {
      effectType = undefined;
    }
    return new JetbrainsAttributeSetting(
      name,
      false,
      foreground,
      background,
      effectColor,
      effectType,
      errorStripeColor,
      fontType,
    );
  }

  toOptionMap(): Map<string, string> {
    const map = new Map();
    if (this.foreground !== undefined) {
      map.set('FOREGROUND', this.foreground);
    }
    if (this.background !== undefined) {
      map.set('BACKGROUND', this.background);
    }
    if (this.effectColor !== undefined) {
      map.set('EFFECT_COLOR', this.effectColor);
    }
    if (this.effectType !== undefined) {
      map.set('EFFECT_TYPE', this.effectType);
    }
    if (this.errorStripeColor !== undefined) {
      map.set('ERROR_STRIPE_COLOR', this.errorStripeColor);
    }
    if (this.fontType !== undefined) {
      map.set('FONT_TYPE', this.fontType);
    }
    return map;
  }

  compareValue(that: JetbrainsAttributeSetting): boolean {
    if (this.inherit !== that.inherit) {
      return false;
    }
    if (this.foreground !== that.foreground) {
      return false;
    }
    if (this.background !== that.background) {
      return false;
    }
    if (this.effectColor !== that.effectColor) {
      return false;
    }
    if (this.effectType !== that.effectType) {
      return false;
    }
    if (this.errorStripeColor !== that.errorStripeColor) {
      return false;
    }
    if (this.fontType !== that.fontType) {
      return false;
    }
    return true;
  }

  toJsonString(): string {
    const obj: JetbrainsAttributeSettingObject = {
      [this.name]: {},
    };
    if (this.inherit) {
      obj[this.name].inherit = true;
    } else {
      if (this.foreground !== undefined) {
        obj[this.name].foreground = this.foreground;
      }
      if (this.background !== undefined) {
        obj[this.name].background = this.background;
      }
      if (this.effectColor !== undefined) {
        obj[this.name].effectColor = this.effectColor;
      }
      if (this.effectType !== undefined) {
        obj[this.name].effectType = this.effectType;
      }
      if (this.errorStripeColor !== undefined) {
        obj[this.name].errorStripeColor = this.errorStripeColor;
      }
      if (this.fontType !== undefined) {
        obj[this.name].fontType = this.fontType;
      }
    }
    return JSON.stringify(obj[this.name], null, 2);
  }
}
