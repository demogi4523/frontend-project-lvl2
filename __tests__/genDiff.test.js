import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __dirname = dirname('');

const expectedDiff = [
  '- follow: false',
  '  host: hexlet.io',
  '- proxy: 123.234.53.22',
  '- timeout: 50',
  '+ timeout: 20',
  '+ verbose: true',
].toString();

const filepaths = ['a.json', 'b.json'];

test('Test gendiff for two json files', () => {
  const [fp1, fp2] = filepaths.map((fp) => path.join('__tests__', '__fixtures__', fp));
  expect(genDiff(fp1, fp2).toString()).toBe(expectedDiff);
});
