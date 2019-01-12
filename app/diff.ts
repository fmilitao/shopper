import { diff } from 'jsondiffpatch';

function computeDiff(newSheet: any[][], oldSheet: any[][]) {
    return diff(newSheet, oldSheet);
}

const test1 = [
    [2, 1],
    ['hello']
];
const test2 = [
    [1, 2],
    ['hello world']
];

const changes = computeDiff(test1, test2);
console.log(changes);

if (changes) {
    const lineNumbers = Object.keys(changes).filter((k) => k !== '_t');
    lineNumbers.forEach((lineNumber) => {
        const line = changes[lineNumber];
        console.log(`On line ${lineNumber}:`);
        const columnNumbers = Object.keys(line).filter((k) => k !== '_t');
        columnNumbers.forEach((column) => {
            if (column.startsWith('_')) {
                const cleanedColumn = column.substring(1);
                const [value, to, code] = line[column];
                if (code === 0) {
                    console.log(`Deleted '${value}' from column ${cleanedColumn}`);
                }
                if (code === 3) {
                    console.log(`Moved column ${cleanedColumn} to ${to}`);
                }
            } else {
                const [value] = line[column];
                console.log(`Added '${value}' to column ${column}`);
            }
        })
    })
}
