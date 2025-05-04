import ejs from 'ejs';
import path from 'node:path';

const outputDir = path.join(import.meta.dirname!, '..', '..', 'output');

const genFnMap = {
  generateForJetbrains,
  generateForVim,
  generateForVSCode,
  generateForWindowsTerminal,
  generateForTotalCmd,
};

async function generateForJetbrains() {
  const module = await import('../settings/jb.ts');
  const templatePath = path.join(import.meta.dirname!, '..', 'templates', 'jb.ejs');
  const result = await ejs.renderFile(templatePath, {
    scheme: module.default,
  });
  await Deno.writeTextFile(path.join(outputDir, 'CandyPaper.jb.icls'), result);
}

async function generateForVim() {
  const module = await import('../settings/vim.ts');
  const templatePath = path.join(import.meta.dirname!, '..', 'templates', 'vim.ejs');
  const result = await ejs.renderFile(templatePath, {
    ansiColors: module.ansiColors,
    groups: module.groups,
  });
  await Deno.writeTextFile(path.join(outputDir, 'CandyPaper.vim', 'colors', 'CandyPaper.vim'), result);
}

async function generateForVSCode() {
  const module = await import('../settings/vsc.ts');
  await Deno.writeTextFile(
    path.join(outputDir, 'CandyPaper.vsc', 'themes', 'CandyPaper.json'),
    JSON.stringify(module.default, null, 2),
  );
}

async function generateForWindowsTerminal() {
  const module = await import('../settings/wt.ts');
  await Deno.writeTextFile(
    path.join(outputDir, 'CandyPaper.wt.json'),
    JSON.stringify(module.default, null, 2),
  );
}

async function generateForTotalCmd() {
  const module = await import('../settings/tc.ts');
  await Deno.writeTextFile(
    path.join(outputDir, 'CandyPaper.tc.ini'),
    module.default,
  );
}

async function main(): Promise<number> {
  let failCount = 0;
  for (const [name, fn] of Object.entries(genFnMap)) {
    try {
      await fn();
    } catch (e) {
      failCount += 1;
      console.error(`Failed to run '${name}': ${e}`);
    }
  }
  return failCount;
}

if (import.meta.main) {
  main().then((code) => Deno.exit(code));
}
