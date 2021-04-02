import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import genDiff from '../src/genDiff.js';

const __dirname = dirname('');

const a = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const b = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

const filepaths = [
  {
    filepath: 'a.json',
    data: a,
  },
  {
    filepath: 'b.json',
    data: b,
  },
];

beforeAll(() => {
  filepaths.forEach(({ filepath: fp, data }) => {
    fs.writeFileSync(path.join(__dirname, '__tests__', '__fixtures__', fp), JSON.stringify(data));
  });
});

afterAll(() => {
  filepaths.forEach(({ filepath: fp }) => {
    fs.unlinkSync(path.join(__dirname, '__tests__', '__fixtures__', fp));
  });
});

const expectedDiff = [
  '- follow: false',
  '  host: hexlet.io',
  '- proxy: 123.234.53.22',
  '- timeout: 50',
  '+ timeout: 20',
  '+ verbose: true',
].toString();

test('Test gendiff for two json files', () => {
  const [fp1, fp2] = filepaths.map((item) => path.join('__tests__', '__fixtures__', item.filepath));
  expect(genDiff(fp1, fp2).toString()).toBe(expectedDiff);
});
