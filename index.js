import { program } from 'commander';
import genDiff from './src/genDiff.js';

program.version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log(`${filepath1}-${filepath2}`);
    const diff = genDiff(filepath1, filepath2);
    console.log(`\n{\n  ${diff.join('\n  ')}\n}`);
  });

export default program;
