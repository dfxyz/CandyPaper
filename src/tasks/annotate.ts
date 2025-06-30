import * as utils from '../utils.ts';

const PATTERN = /^(\s*).*'(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8})'.*$/;

async function annotate(path: string) {
  let modified = false;
  const inputLines = await Deno.readTextFile(path).then((s) => s.split('\n'));
  const outputLines: string[] = [];
  let lastLine = '';
  for (let line of inputLines) {
    line = line.trimEnd();
    const match = line.match(PATTERN);
    if (match !== null) {
      const hex = match[2];
      const [r, g, b, a] = utils.hex2rgba(hex);
      const [h, s, v] = utils.rgb2hsv(r, g, b);
      let annotateLine = `${match[1]}/** RGB=[${r},${g},${b}], HSV=[${h},${s},${v}]`;
      if (a !== null) {
        const alphaPercent = Math.round(a / 255 * 100);
        annotateLine += `, Opacity=${alphaPercent}%`;
      }
      annotateLine += ' */';
      if (lastLine.trimStart().startsWith('/**')) {
        if (lastLine !== annotateLine) {
          outputLines[outputLines.length - 1] = annotateLine;
          modified = true;
        }
      } else {
        outputLines.push(annotateLine);
        modified = true;
      }
    }
    outputLines.push(line);
    lastLine = line;
  }
  if (modified) {
    await Deno.writeTextFile(path, outputLines.join('\n'));
  }
}

async function main(): Promise<number> {
  let failCount = 0;
  for (const path of Deno.args) {
    try {
      await annotate(path);
    } catch (e) {
      console.error(`Failed to annotate '${path}': ${e}`);
      failCount += 1;
    }
  }
  return failCount;
}

if (import.meta.main) {
  main();
}
