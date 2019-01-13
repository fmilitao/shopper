import { DiffPatcher, Delta } from 'jsondiffpatch';

const differ = new DiffPatcher({
    arrays: {
        detectMove: true,
        includeValueOnMove: true
    },
    // TODO: does not work:
    // textDiff: {
    //     minLength: 1
    // },
});

type Diff = {
    operation: 'move' | 'add' | 'remove' | 'edit',
    column: number,
    row: number
};

function convertDiff(changes: Delta): Diff[] {
    const result: Diff[] = [];

    // FIXME:
    // Object.keys(changes)
    //     .filter((k) => k !== '_t')
    //     .forEach((lineNumber) => {
    //         const rowChanges = changes[lineNumber];
    //         Object.keys(rowChanges)
    //             .filter((k) => k !== '_t')
    //             .forEach((columnKey) => {
    //                 if (columnKey.startsWith('_')) {
    //                     const row = parseInt(lineNumber, 10);
    //                     const column = parseInt(columnKey.substring(1), 10);
    //                     const [value, to, code] = rowChanges[columnKey];
    //                     if (code === 0) {
    //                         result.push({
    //                             value,
    //                             operation: 'remove',
    //                             column,
    //                             row
    //                         });
    //                     }
    //                     if (code === 3) {
    //                         console.log(`Moved column ${column} to ${to}`);
    //                     }
    //                 } else {
    //                     const [value] = row[columnKey];
    //                     console.log(`Added '${value}' to column ${columnKey}`);
    //                 }
    //             })
    //     });
    return result;
}

function computeDiff(newSheet: any[][], oldSheet: any[][]) {
    return differ.diff(newSheet, oldSheet);
}

const test1 = [
    [2, 1],
    ['hello worl']
];
const test2 = [
    [1, 2],
    ['hello world']
];

const changes = computeDiff(test1, test2);
console.log(changes);
