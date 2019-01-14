import nock from 'nock';
import { Spreadsheet, SpreadsheetError } from '../app/spreadsheet';
import { sheets_v4 } from 'googleapis';

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

    function mockApi({ get, batchUpdate }: any): sheets_v4.Sheets {
        // @ts-ignore
        return {
            spreadsheets: {
                get: () => get,
                batchUpdate: () => batchUpdate
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
            const api = mockApi({
                get: Promise.reject(new FakeError('fake-error', { status: 404 }))
            });
            const result = await Spreadsheet.getExistingSpreadsheet(api, spreadsheetId);
            expect(result).toBeNull();
        });

        test('throws error if error that is not a 404', async () => {
            const mockedError = new FakeError('fake-error', { status: 500 });
            const api = mockApi({
                get: Promise.reject(mockedError)
            });

            try {
                await Spreadsheet.getExistingSpreadsheet(api, spreadsheetId);
                fail('Expecting to throw error');
            } catch (error) {
                expect(error).toBeInstanceOf(SpreadsheetError);
                const nestedError = error as SpreadsheetError;
                expect(nestedError.error).toBe(mockedError);
            }
        });

        test('returns spreadsheet on correct result', async () => {
            const api = mockApi({
                get: Promise.resolve({ data: 'ignore-me' })
            });
            const spreadsheet = await Spreadsheet.getExistingSpreadsheet(api, spreadsheetId);
            expect(spreadsheet).not.toBeNull();
        });
    });

    describe('Spreadsheet.deleteSheet', () => {
        const sheetId = 12345;

        test('return false if invalid sheetId (400)', async () => {
            const api = mockApi({
                get: Promise.resolve({ data: 'ignore-me' }),
                batchUpdate: Promise.reject(new FakeError('fake-error', { status: 400 }))
            });
            const spreadsheet = await Spreadsheet.getExistingSpreadsheet(api, 'spreadsheetId');
            expect(spreadsheet).not.toBeNull();
            const result = await spreadsheet!.deleteSheet(sheetId);
            expect(result).toBe(false);
        });

        test('throws error if error that is not a 404', async () => {
            const mockedError = new FakeError('fake-error', { status: 500 });
            const api = mockApi({
                get: Promise.resolve({ data: 'ignore-me' }),
                batchUpdate: Promise.reject(mockedError)
            });

            try {
                const spreadsheet = await Spreadsheet.getExistingSpreadsheet(api, 'spreadsheetId');
                expect(spreadsheet).not.toBeNull();
                await spreadsheet!.deleteSheet(sheetId);
                fail('Expecting to throw error');
            } catch (error) {
                expect(error).toBeInstanceOf(SpreadsheetError);
                const nestedError = error as SpreadsheetError;
                expect(nestedError.error).toBe(mockedError);
            }
        });

        test('returns true on success', async () => {
            const api = mockApi({
                get: Promise.resolve({ data: 'ignore-me' }),
                batchUpdate: Promise.resolve()
            });
            const spreadsheet = await Spreadsheet.getExistingSpreadsheet(api, 'spreadsheetId');
            expect(spreadsheet).not.toBeNull();
            const result = await spreadsheet!.deleteSheet(sheetId);
            expect(result).toBe(true);
        });
    });
});
