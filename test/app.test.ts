
import fs from 'fs';
import * as app from '../app/app';

describe('app testing', () => {
    const oldReadFileSync = fs.readFileSync;

    function mockReadFileSyncPath(testPath: string, result: Buffer | Error) {
        // @ts-ignore
        fs.readFileSync = (path, options) => {
            if (path === testPath) {
                if (result instanceof Error) {
                    throw result;
                } else {
                    return result;
                }
            } else {
                return oldReadFileSync(path, options);
            }
        };
    }

    beforeEach(() => {
        jest.mock('fs');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('loads credentials from given path file', async () => {
        const magicPath = 'test-path-not-used-elsewhere';
        mockReadFileSyncPath(magicPath, Buffer.from('{}'));

        const result = await app.loadCredentialsFile(magicPath);
        expect(result).toStrictEqual({});
    });

    test('handle errors when reading file throws error', async () => {
        const magicPath = 'test-path-for-error';
        mockReadFileSyncPath(magicPath, new Error('File not found'));

        try {
            await app.loadCredentialsFile(magicPath);
            fail('Expected call to throw error');
        } catch (error) {
            expect(error).toBeInstanceOf(app.NestedError);
        }
    });
});
