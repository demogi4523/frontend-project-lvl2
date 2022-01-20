import { Command } from "commander";

import genDiff from './src/index.js';

const program = new Command();
const version = '1.0.0';

program
  .description('Compares two configuration files and shows a difference.')
  .version(version)
  .action(() => {
    console.log(version);
  })
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(diff);
  })
  .option('-f', '--format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const diff = genDiff(filepath1, filepath2);
    console.log(`\n${diff}`);
  });

program.parse(process.argv);

export default program;

export const genDiff;
