import { diff } from 'jsondiffpatch';

function computeDiff(newSheet: any[][], oldSheet: any[][]) {
    return diff(newSheet, oldSheet);
}

const test1 = [[]];
const test2 = [[1]];

console.log(computeDiff(test1, test2));
