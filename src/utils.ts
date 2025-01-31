export function parseHsvString(hsvString: string): [h: number, s: number, v: number] {
  const [h, s, v] = hsvString.split(',').map(Number);
  if (isNaN(h) || isNaN(s) || isNaN(v)) {
    throw new Error(`invalid hsv string: ${hsvString}`);
  }
  return [h, s, v];
}

export function completeHexValueString(value: string): string {
  if (value.length > 0) {
    const prependZeroNum = 6 - value.length;
    if (prependZeroNum > 0) {
      return '0'.repeat(prependZeroNum) + value;
    }
  }
  return value;
}
