import jetbrainsGenerate from './jetbrains/generate.ts';
import vimGenerate from './vim/generate.ts';
import windowsTerminalGenerate from './windowsTerminal/generate.ts';
import totalcmdGenerate from './totalcmd/generate.ts';

async function generate(fn: () => Promise<void>, name: string) {
  try {
    await fn();
  } catch (e) {
    console.error(`failed to generate ${name} scheme: ${e}`);
    Deno.exit(1);
  }
}

await generate(jetbrainsGenerate, 'JetBrains');
await generate(vimGenerate, 'Vim');
await generate(windowsTerminalGenerate, 'Windows Terminal');
await generate(totalcmdGenerate, 'TotalCMD')
Deno.exit(0);
