import * as utils from '../utils.ts';

enum ColorFormat {
  HEX,
  RGB,
  HSV,
}

class ColorConverter {
  #colorFormat = ColorFormat.HEX;
  #encoder = new TextEncoder();
  #decoder = new TextDecoder();
  #inputBuffer = new Uint8Array(1024);

  run() {
    while (true) {
      this.#showPrompt();

      const len = Deno.stdin.readSync(this.#inputBuffer);
      if (len === null) {
        return;
      }
      const input = this.#decoder.decode(this.#inputBuffer.slice(0, len)).trim();

      if (input.startsWith('/')) {
        this.#switchColorFormat(input.slice(1));
        continue;
      }

      this.#convertColor(input);
    }
  }

  #showPrompt() {
    let prompt: string;
    switch (this.#colorFormat) {
      case ColorFormat.HEX:
        prompt = 'HEX> ';
        break;
      case ColorFormat.RGB:
        prompt = 'RGB> ';
        break;
      case ColorFormat.HSV:
        prompt = 'HSV> ';
        break;
    }
    Deno.stdout.writeSync(this.#encoder.encode(prompt));
  }

  #switchColorFormat(input: string) {
    switch (input) {
      case 'hex': {
        this.#colorFormat = ColorFormat.HEX;
        return;
      }
      case 'rgb': {
        this.#colorFormat = ColorFormat.RGB;
        return;
      }
      case 'hsv': {
        this.#colorFormat = ColorFormat.HSV;
        return;
      }
    }
    console.error(`Invalid color format '${input}'`);
  }

  #convertColor(input: string) {
    switch (this.#colorFormat) {
      case ColorFormat.HEX: {
        this.#convertHex(input);
        return;
      }
      case ColorFormat.RGB: {
        this.#convertRgb(input);
        return;
      }
      case ColorFormat.HSV: {
        this.#convertHsv(input);
        return;
      }
    }
  }

  #convertHex(input: string) {
    try {
      const [r, g, b, a] = utils.hex2rgba(input);
      const [h, s, v] = utils.rgb2hsv(r, g, b);
      const alphaPercent = a === null ? 100 : Math.round(a / 255 * 100);
      let output = `RGB=[${r},${g},${b}], HSV=[${h},${s},${v}]`;
      if (a !== null) {
        output += `, Opacity=${alphaPercent}%`;
      }
      console.log(output);
    } catch (_) {
      console.error('Input is invalid!');
    }
  }

  #convertRgb(input: string) {
    try {
      const [r, g, b, a] = input.split(',').map(Number);
      if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) || Number.isNaN(a)) {
        console.error('Input is invalid!');
        return;
      }
      const hex = utils.rgba2hex(r, g, b, a === undefined ? null : Math.round(a / 100 * 255));
      const [h, s, v] = utils.rgb2hsv(r, g, b);
      let output = `HEX=${hex}, HSV=[${h},${s},${v}]`;
      if (a !== undefined) {
        output += `, Opacity=${a}%`;
      }
      console.log(output);
    } catch (_) {
      console.error('Input is invalid!');
    }
  }

  #convertHsv(input: string) {
    try {
      const [h, s, v, a] = input.split(',').map(Number);
      if (Number.isNaN(h) || Number.isNaN(s) || Number.isNaN(v) || Number.isNaN(a)) {
        console.error('Input is invalid!');
        return;
      }
      const [r, g, b] = utils.hsv2rgb(h, s, v);
      const hex = utils.rgba2hex(r, g, b, a === undefined ? null : Math.round(a / 100 * 255));
      let output = `HEX=${hex}, RGB=[${r},${g},${b}]`;
      if (a !== undefined) {
        output += `, Opacity=${a}%`;
      }
      console.log(output);
    } catch (_) {
      console.error('Input is invalid!');
    }
  }
}

function main() {
  new ColorConverter().run();
}

if (import.meta.main) {
  main();
}
