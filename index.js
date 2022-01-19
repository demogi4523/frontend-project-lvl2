import { Command } from "commander";

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
    console.log('filepath1:', filepath1);
    console.log('filepath2:', filepath2);
  })
  .option('-f', '--format [type]', 'output format')
  .action((filepath1, filepath2) => {
    console.log('filepath1:', filepath1);
    console.log('filepath2:', filepath2);
  });

program.parse(process.argv);

export default program;

// # Порядок вывода параметров не важен
// gendiff -h

//   Usage: gendiff [options]

//   Compares two configuration files and shows a difference.

//   Options:
//     -V, --version        output the version number
//     -h, --help           output usage information
