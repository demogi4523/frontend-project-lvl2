import fs from 'fs';
import path from 'path';
import _ from 'lodash';

export default function genDiff(filepath1, filepath2) {
  const fp1 = path.join(path.dirname(''), filepath1);
  const fp2 = path.join(path.dirname(''), filepath2);
  const file1 = fs.readFileSync(fp1);
  const file2 = fs.readFileSync(fp2);

  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const deletedKeys = _.difference(keys1, keys2);
  const addedKeys = _.difference(keys2, keys1);
  const sharedKeys = _.intersection(keys2, keys1);
  // console.log(`addedKeys: ${addedKeys}`);
  // console.log(`deletedKeys: ${deletedKeys}`);
  // console.log(`sharedKeys: ${sharedKeys}`);
  const addInfo = (arr, status) => arr.map((item) => ({ item, status }));
  const changedKeys = [];
  const unchangedKeys = [];
  for (const key of sharedKeys) {
    if (data1[key] === data2[key]) {
      unchangedKeys.push(key);
    } else {
      changedKeys.push(key);
    }
  }
  const diff = [
    ...addInfo(addedKeys, 'added'),
    ...addInfo(deletedKeys, 'deleted'),
    ...addInfo(changedKeys, 'changed'),
    ...addInfo(unchangedKeys, 'unchanged'),
  ];
  const sortedDiff = _.sortBy(diff, ['item']);
  const data = [];
  for (const { item, status } of sortedDiff) {
    switch (status) {
      case 'added':
        data.push(`+ ${item}: ${data2[item]}`);
        break;
      case 'deleted':
        data.push(`- ${item}: ${data1[item]}`);
        break;
      case 'unchanged':
        data.push(`  ${item}: ${data2[item]}`);
        break;
      case 'changed':
        data.push(`- ${item}: ${data1[item]}`);
        data.push(`+ ${item}: ${data2[item]}`);
        break;
      default:
        throw new Error('Something wrong in diff function!');
    }
  }
  return data;
}

// const { log } = console;
// log(genDiff('tests/file2.json'), 'tests/file1.json');
// addedKeys: verbose
// deletedKeys: proxy,follow
// sharedKeys: host,timeout
