import { Spreadsheet } from '../app/spreadsheet';
import { sheets_v4 } from 'googleapis';
import nock from 'nock';

describe('spreadsheet testing', () => {

    beforeAll(() => nock.disableNetConnect());
    afterAll(() => nock.enableNetConnect());

    beforeEach(() => {
        jest.mock('googleapis');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('throws error on not found', async () => {
        const spreadsheetId = 'fake-id';

        class FakeError extends Error {
            response: { status: number };
            constructor(message: string) {
                super(message);
                this.response = { status: 404 };
            }
        };

        // @ts-ignore
        const api = {
            spreadsheets: {
                get: () => Promise.reject(new FakeError('fake'))
            }
        } as sheets_v4.Sheets;

        const result = await Spreadsheet.getExistingSpreadsheet(api, spreadsheetId);
        expect(result).toBeNull();
    });

});
