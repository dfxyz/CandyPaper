// noinspection JSUnusedGlobalSymbols
export default class Color {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly h: number;
  readonly s: number;
  readonly v: number;
  readonly hex: string;

  /**
   * Construct a Color object by RGB values.
   * @param r Red value. Must in the range of `[0, 255]`
   * @param g Green value. Must in the range of `[0, 255]`
   * @param b Blue value. Must in the range of `[0, 255]`
   * @throws {Error} If any of the RGB values is out of valid range
   */
  constructor(r: number, g: number, b: number) {
    checkRange('Red value', r, 0, 255);
    checkRange('Green value', g, 0, 255);
    checkRange('Blue value', b, 0, 255);
    this.r = r;
    this.g = g;
    this.b = b;
    this.hex = [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
    [this.h, this.s, this.v] = rgb2hsv(r, g, b);
  }

  /**
   * Construct a Color object by hex string.
   * @param hex {string} A string representing a color in hex format.
   * @returns {Color}
   * @throws {Error} If the hex string is invalid
   */
  static fromHex(hex: string): Color {
    if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
      throw new Error('Invalid hex string');
    }
    if (hex[0] === '#') {
      hex = hex.slice(1);
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return new Color(r, g, b);
  }

  /**
   * Construct a Color object by HSV values.
   * @param h
   * @param s
   * @param v
   */
  static fromHSV(h: number, s: number, v: number): Color {
    checkRange('Hue', h, 0, 359);
    checkRange('Saturation', s, 0, 100);
    checkRange('Value', v, 0, 100);

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

    return new Color(r, g, b);
  }

  get rgb(): [number, number, number] {
    return [this.r, this.g, this.b];
  }

  get hsv(): [number, number, number] {
    return [this.h, this.s, this.v];
  }

  get bgrNumber(): number {
    return this.r + (this.g << 8) + (this.b << 16);
  }

  get #luminance(): number {
    const toSRGB = (value: number): number => {
      value /= 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * toSRGB(this.r) + 0.7152 * toSRGB(this.g) + 0.0722 * toSRGB(this.b);
  }

  contrastRatio(that: Color): number {
    const l1 = this.#luminance;
    const l2 = that.#luminance;
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }
}

function checkRange(valueName: string, value: number, minInclusive: number, maxInclusive: number) {
  if (value < minInclusive || value > maxInclusive) {
    throw new Error(`${valueName} must be in the range of [${minInclusive}, ${maxInclusive}]`);
  }
}

function rgb2hsv(r: number, g: number, b: number): [h: number, s: number, v: number] {
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
