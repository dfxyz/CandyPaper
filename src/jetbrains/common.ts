import path from 'node:path';
import * as utils from '../utils.ts';
// @ts-types='@types/xml2js'
import * as xml2js from 'xml2js';

export const GENERATE_PATH =  path.join(import.meta.dirname!, '..', '..', 'dist', 'CandyPaper.icls');

export class ColorOption {
  readonly name: string;
  readonly value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }

  // deno-lint-ignore no-explicit-any
  static fromXmlNode(node: Record<string, any>): ColorOption {
    const name = node.$.name as string | undefined;
    if (name === undefined) {
      throw new Error(`invalid xml node: missing 'name' attribute`);
    }
    const value = node.$.value as string | undefined;
    if (value === undefined) {
      throw new Error(`invalid xml node: missing 'value' attribute`);
    }
    return new ColorOption(name, utils.completeHexValueString(value));
  }

  equals(that: ColorOption): boolean {
    return this.value === that.value;
  }
}

export enum AttributeKey {
  FG = 'FOREGROUND',
  BG = 'BACKGROUND',
  ST = 'ERROR_STRIPE_COLOR',
  EC = 'EFFECT_COLOR',
  ET = 'EFFECT_TYPE',
  FT = 'FONT_TYPE',
}

export class AttributeOption {
  readonly name: string;
  readonly inherit: boolean;
  readonly options: Map<string, string> = new Map();

  constructor(name: string, inherit: boolean, options?: Iterable<[k: string, v: string]>) {
    this.name = name;
    this.inherit = inherit;
    if (options !== undefined) {
      for (const [k, v] of options) {
        this.options.set(k, v);
      }
      if (this.options.has(AttributeKey.ET) && !this.options.has(AttributeKey.EC)) {
        this.options.delete(AttributeKey.ET);
      }
    }
  }

  // deno-lint-ignore no-explicit-any
  static fromXmlNode(node: Record<string, any>): AttributeOption {
    const name = node.$.name as string | undefined;
    if (name === undefined) {
      throw new Error(`invalid xml node: missing 'name' attribute`);
    }
    const inherit = node.$.baseAttributes !== undefined;
    const options: [string, string][] = [];
    const optionNodes = node.value?.[0]?.option;
    if (Array.isArray(optionNodes)) {
      for (const optionNode of optionNodes) {
        const key = optionNode.$.name as string | undefined;
        if (key === undefined) {
          throw new Error(`invalid xml node: option missing 'name' attribute`);
        }
        const value = optionNode.$.value as string | undefined;
        if (value === undefined) {
          throw new Error(`invalid xml node: option missing 'value' attribute`);
        }
        switch (key) {
          case AttributeKey.FG:
          case AttributeKey.BG:
          case AttributeKey.ST:
          case AttributeKey.EC: {
            options.push([key, utils.completeHexValueString(value)]);
            break;
          }
          case AttributeKey.ET:
          case AttributeKey.FT: {
            options.push([key, value]);
            break;
          }
          default: {
            throw new Error(`invalid xml node: unknown option key '${key}'`);
          }
        }
      }
    }
    return new AttributeOption(name, inherit, options);
  }

  equals(that: AttributeOption): boolean {
    if (this.inherit !== that.inherit) {
      return false;
    }
    if (this.options.size !== that.options.size) {
      return false;
    }
    for (const [k, v] of this.options) {
      if (that.options.get(k) !== v) {
        return false;
      }
    }
    return true;
  }
}

export class Scheme {
  readonly colors: Map<string, ColorOption> = new Map();
  readonly attributes: Map<string, AttributeOption> = new Map();

  static async fromXmlFile(path: string): Promise<Scheme> {
    const content = await Deno.readTextFile(path);
    const xml = await xml2js.parseStringPromise(content);
    // deno-lint-ignore no-explicit-any
    const node = xml['scheme'] as Record<string, any> | undefined;
    if (node === undefined) {
      throw new Error(`invalid xml file: missing 'scheme' node`);
    }
    return Scheme.fromXmlNode(node);
  }

  // deno-lint-ignore no-explicit-any
  static fromXmlNode(node: Record<string, any>): Scheme {
    const scheme = new Scheme();
    const colors = node.colors?.[0]?.option;
    if (Array.isArray(colors)) {
      for (const node of colors) {
        const color = ColorOption.fromXmlNode(node);
        scheme.colors.set(color.name, color);
      }
    }
    const attributes = node.attributes?.[0]?.option;
    if (Array.isArray(attributes)) {
      for (const node of attributes) {
        const attribute = AttributeOption.fromXmlNode(node);
        scheme.attributes.set(attribute.name, attribute);
      }
    }
    return scheme;
  }

  compare(that: Scheme): [modified: Scheme, removed: Scheme] {
    const modified = new Scheme();
    const removed = new Scheme();

    for (const [name, color] of this.colors) {
      const thatColor = that.colors.get(name) as ColorOption | undefined;
      if (thatColor === undefined) {
        modified.colors.set(name, color);
        continue;
      }
      if (!color.equals(thatColor)) {
        modified.colors.set(name, color);
      }
    }
    for (const [name, attribute] of this.attributes) {
      const thatAttribute = that.attributes.get(name) as AttributeOption | undefined;
      if (thatAttribute === undefined) {
        modified.attributes.set(name, attribute);
        continue;
      }
      if (!attribute.equals(thatAttribute)) {
        modified.attributes.set(name, attribute);
      }
    }

    for (const [name, color] of that.colors) {
      if (!this.colors.has(name)) {
        removed.colors.set(name, color);
      }
    }
    for (const [name, attribute] of that.attributes) {
      if (!this.attributes.has(name)) {
        removed.attributes.set(name, attribute);
      }
    }
    return [modified, removed];
  }
}

export type SettingValue = symbol | string | Record<string, string>;

export const NO_COLOR = Symbol('NO_COLOR');
export const INHERIT_ATTRIBUTE = Symbol('INHERIT_ATTRIBUTE');
export const REMOVE_COLOR = Symbol('REMOVE_COLOR');
export const REMOVE_ATTRIBUTE = Symbol('REMOVE_ATTRIBUTE');

export enum EffectType {
  UNDERLINE = "1",
  UNDERWAVE = "2",
  STRIKEOUT = "3",
}

export enum FontType {
  BOLD = "1",
  ITALIC = "2",
}
