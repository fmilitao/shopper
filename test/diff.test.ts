import { diffSheets, Diff } from '../app/diff';

describe('diff testing', () => {

    test('return undefined sheets that are equal', () => {
        const sheet1 = [[1]];
        const sheet2 = [[1]];
        const result = diffSheets(sheet1, sheet2);
        expect(result).toBeUndefined();
    });

    test('return an ADD diff when right sheet contains new element', () => {
        const sheet1 = [[1]];
        const sheet2 = [[1, 2]]
        const result = diffSheets(sheet1, sheet2);

        const expected: Diff = {
            operation: 'add',
            newPosition: {
                row: 0,
                column: 1
            },
            value: 2
        };
        expect(result).toEqual([expected]);
    });

    test('return a REMOVE diff when right sheet is missing an element', () => {
        const sheet1 = [[1, 2]]
        const sheet2 = [[1]];
        const result = diffSheets(sheet1, sheet2);

        const expected: Diff = {
            operation: 'remove',
            position: {
                row: 0,
                column: 1
            },
            value: 2
        };
        expect(result).toEqual([expected]);
    });

    test('return a MOVE diff when element moved in array', () => {
        const sheet1 = [[1, 2]]
        const sheet2 = [[2, 1]];
        const result = diffSheets(sheet1, sheet2);

        const expected: Diff = {
            operation: 'move',
            position: {
                row: 0,
                column: 1
            },
            newPosition: {
                row: 0,
                column: 0
            },
            value: 2
        };
        expect(result).toEqual([expected]);
    });

    // TODO: edit diff is never shown??
    // TODO: test move of row!
});
