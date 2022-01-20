import fs from "fs";
import path from "path";
import lodash from "lodash";

export default function genDiff(fp1, fp2) {
  const ext1 = path.extname(fp1);
  const ext2 = path.extname(fp2);
  const obj1 = extensionResolver(ext1)(fp1);
  const obj2 = extensionResolver(ext2)(fp2);
  return diffFromObjects(obj1, obj2);
}

function jsonParser(fp) {
  return JSON.parse(fs.readFileSync(fp));
}

function extensionResolver(ext) {
  return {
    '.json': jsonParser,
  }[ext];
}

function diffFromObjects(obj1, obj2) {
  const props1 = Object.keys(obj1);
  const props2 = Object.keys(obj2);
  const allProps = new Set([...props1, ...props2]);
  
  const diff = [];

  for (const prop of allProps) {
    if (props1.includes(prop) && props2.includes(prop)) {
      if (obj1[prop] == obj2[prop]) {
        diff.push(new Diff('unchanged', prop, obj1[prop]));
        continue;
      } else {
        diff.push(new Diff('updated', prop, obj1[prop], obj2[prop]));
        continue;
      }
    }
    if (!props1.includes(prop) && props2.includes(prop)) {
      diff.push(new Diff('added', prop, obj1[prop], obj2[prop]));
      continue;
    }
    if (props1.includes(prop) && !props2.includes(prop)) {
      diff.push(new Diff('deleted', prop, obj1[prop], obj2[prop]));
      continue;
    }
    throw new Error("Somethimg wrong with props!!!");
  }
  const sortedDiff = lodash.sortBy(diff, 'prop');
  return `{\n  ${sortedDiff.join('\n  ')}\n}`;
}

class Diff {
  constructor(status, prop, prev, cur) {
    const all_status = ['added', 'deleted', 'updated', 'unchanged'];
    if (!all_status.includes(status)) {
      throw new Error(`Invalid status: ${status}. Avaliable only following statuses: \n${all_status}`);
    }
    this.status = status;
    this.prop = prop;
    this.prev = prev;
    this.cur = cur;
  }
  
  toString() {
    switch (this.status) {
      case 'added':
        return `+ ${this.prop}: ${this.cur}`;
      case 'deleted':
        return `- ${this.prop}: ${this.prev}`;
      case 'unchanged':
        return `  ${this.prop}: ${this.prev}`;
      case 'updated':
        return `- ${this.prop}: ${this.prev}\n  + ${this.prop}: ${this.cur}`;      
      default:
        throw new Error(`Wrong status ${this.status}!!!`);
    }
  }
}
