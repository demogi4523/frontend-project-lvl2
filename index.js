import { Command } from "commander";
const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'output the version number');
program.parse(process.argv);

export default function genDiff() {
  return 'asfasf';
}

// # Порядок вывода параметров не важен
// gendiff -h

//   Usage: gendiff [options]

//   Compares two configuration files and shows a difference.

//   Options:
//     -V, --version        output the version number
//     -h, --help           output usage information
