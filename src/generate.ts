import jetbrainsGenerate from './jetbrains/generate.ts';
import vimGenerate from './vim/generate.ts';

try {
  await jetbrainsGenerate();
} catch (e) {
  console.error(`failed to generate JetBrains scheme: ${e}`);
  Deno.exit(1);
}

try {
  await vimGenerate();
} catch (e) {
  console.error(`failed to generate Vim scheme: ${e}`);
  Deno.exit(1);
}

Deno.exit(0);
