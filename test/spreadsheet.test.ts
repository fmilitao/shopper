import nock from 'nock';
import { Spreadsheet } from '../app/spreadsheet';
import { sheets_v4 } from 'googleapis';
import { NestedError } from '../app/utils';

describe('spreadsheet testing', () => {

    // ensure will not try to use network
    beforeAll(() => nock.disableNetConnect());
    afterAll(() => nock.enableNetConnect());

    beforeEach(() => {
        jest.mock('googleapis');
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    function mockApi(response: any): sheets_v4.Sheets {
        // @ts-ignore
        return {
            spreadsheets: {
                get: () => response
            }
        } as sheets_v4.Sheets;
    }

    class FakeError extends Error {
        constructor(
            message: string,
            readonly response: any
        ) {
            super(message);
        }
    };

    describe('Spreadsheet.getExistingSpreadsheet', () => {
        const spreadsheetId = 'fake-id';

        test('return null if spreadsheet not found (404)', async () => {
            const api = mockApi(Promise.reject(new FakeError('fake-error', { status: 404 })));
            const result = await Spreadsheet.getExistingSpreadsheet(api, spreadsheetId);
            expect(result).toBeNull();
        });

        test('throws error if error that is not a 404', async () => {
            const mockedError = new FakeError('fake-error', { status: 500 });
            const api = mockApi(Promise.reject(mockedError));

            try {
                await Spreadsheet.getExistingSpreadsheet(api, spreadsheetId);
                fail('Expecting to throw error');
            } catch (error) {
                expect(error).toBeInstanceOf(NestedError);
                const nestedError = error as NestedError;
                expect(nestedError.error).toBe(mockedError);
            }
        });

        test('returns spreadsheet on correct result', async () => {
            const api = mockApi(Promise.resolve({ data: 'ignore-me' }));
            const spreadsheet = await Spreadsheet.getExistingSpreadsheet(api, spreadsheetId);
            expect(spreadsheet).not.toBeNull();
        });
    });
});
