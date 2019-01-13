import { DiffPatcher, Delta } from 'jsondiffpatch';

const differ = new DiffPatcher({
    arrays: {
        detectMove: true,
        includeValueOnMove: true
    },
    // TODO: does not work yet
    // textDiff: {
    //     minLength: 1
    // },
});

type DiffRemoveEdit<T> = {
    value: T,
    operation: 'remove' | 'edit',
    position: {
        row: number,
        column: number
    }
};
type DiffAdd<T> = {
    value: T,
    operation: 'add',
    newPosition: {
        row: number,
        column: number
    }
};
type DiffMove<T> = {
    value: T,
    operation: 'move',
    position: {
        row: number,
        column: number
    }
    newPosition: { row: number, column: number }
};
type Diff<T = any> = DiffRemoveEdit<T> | DiffAdd<T> | DiffMove<T>;

function convertDiff(lineChanges: Delta): Diff[] {
    const result: Diff[] = [];
    const filterOutTypeField = (k: string) => k !== '_t';

    Object.keys(lineChanges)
        .filter(filterOutTypeField)
        .forEach((lineProperty) => {
            const rowChanges = lineChanges[lineProperty];
            Object.keys(rowChanges)
                .filter(filterOutTypeField)
                .forEach((columnProperty) => {
                    const row = parseInt(lineProperty, 10);
                    const [value, to, code] = rowChanges[columnProperty];
                    const isAddition = !columnProperty.startsWith('_');
                    const column = parseInt(columnProperty.startsWith('_') ? columnProperty.substring(1) : columnProperty, 10);

                    if (isAddition) {
                        result.push({
                            value,
                            operation: 'add',
                            newPosition: { row, column }
                        });
                    } else {
                        if (code === 0) {
                            result.push({
                                value,
                                operation: 'remove',
                                position: { row, column }
                            });
                        }
                        if (code === 3) {
                            result.push({
                                value,
                                operation: 'move',
                                position: { row, column },
                                newPosition: {
                                    row,
                                    column: to
                                }
                            });
                        }
                    }
                })
        });
    return result;
}

function diffSheets(newSheet: any[][], oldSheet: any[][]) {
    const diff = differ.diff(newSheet, oldSheet);
    if (diff) {
        return convertDiff(diff);
    } else {
        return diff;
    }
}

export {
    diffSheets,
    Diff
};
