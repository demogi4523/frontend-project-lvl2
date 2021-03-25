import { program } from 'commander';

program.version('0.0.1');
program.description('Compares two configuration files and shows a difference.');
program.arguments('<filepath1> <filepath2>');
program.option('-f, --format [type]', 'output format');

export default program;
