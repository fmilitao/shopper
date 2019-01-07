
import fs from 'fs';
import * as app from '../app/app';

describe('app testing', () => {

    beforeEach(() => {
        jest.mock('fs');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    // FIXME: broken!
    test('something', async () => {
        //@ts-ignore
        fs.readFile = (_, callback) => callback('error');

        const consoleSpy = jest.spyOn(console, 'error');
        const fakeCallBack = jest.fn();

        await app.loadCredentialsFile();
        expect(consoleSpy).toHaveBeenCalledTimes(1);
        expect(fakeCallBack).not.toHaveBeenCalled();
    });
});
