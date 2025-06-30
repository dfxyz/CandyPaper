import { JetbrainsScheme } from '../utils.ts';

async function main(): Promise<number> {
  const path = Deno.args[0];
  if (path === undefined) {
    console.error('Path is required');
    return 1;
  }

  const scheme0 = (await import('../settings/jb.ts')).default;
  const scheme1 = await JetbrainsScheme.parseFromXmlFile(path);

  for (const name of scheme0.colors.keys()) {
    if (!scheme1.colors.has(name)) {
      console.log(`REMOVED: '${name}'`);
    }
  }
  for (const [name, obj] of scheme1.colors) {
    const value0 = scheme0.colors.get(name);
    if (value0 === undefined) {
      console.log(`'${name}': '${obj.value}',`);
    } else if (value0.value !== obj.value) {
      console.log(`'${name}': '${obj.value}',`);
    }
  }

  for (const name of scheme0.attributes.keys()) {
    if (!scheme1.attributes.has(name)) {
      console.log(`REMOVED: '${name}'`);
    }
  }
  for (const [name, obj] of scheme1.attributes) {
    const value0 = scheme0.attributes.get(name);
    if (value0 === undefined) {
      console.log(`'${name}': ${obj.toJsonString()},`);
    } else if (!value0.compareValue(obj)) {
      console.log(`'${name}': ${obj.toJsonString()},`);
    }
  }

  return 0;
}

if (import.meta.main) {
  main().then((code) => Deno.exit(code));
}
