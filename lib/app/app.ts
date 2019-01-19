import { loadCredentialsFile, authorize, getSheetsApiClient, AuthClient } from './auth';
import { Spreadsheet } from './spreadsheet'

// test spreadsheet
const SPREAD_SHEET_ID = '1QmnGVdEWAcD15DBAySn0-o7W1p3LW_LucyCkYMUHwSo';

async function useSheets(auth: AuthClient) {
    const api = getSheetsApiClient(auth);
    let spreadsheet: Spreadsheet;

    const id = 'fake-id';
    const nullableSpreadsheet = await Spreadsheet.getExistingSpreadsheet(api, SPREAD_SHEET_ID);

    if (nullableSpreadsheet === null) {
        console.log(`Id: ${id} not found`);
        return;
    }
    spreadsheet = nullableSpreadsheet;

    console.log(spreadsheet.getTitle());
    console.log(spreadsheet.getSheetsTitles());

    const mainSheet = spreadsheet.getSheet('Shopping List')!;
    await spreadsheet.formatCellAsDate(
        {
            sheetId: mainSheet.sheetId,
            startRowIndex: 4,
            endRowIndex: 13,
            startColumnIndex: 1,
            endColumnIndex: 2
        });

    // const newSheet = await spreadsheet.newSheet('I shit you not');
    // console.log(newSheet);
    // const newSheet = await spreadsheet.getSheet('I shit you not');
    // console.log(await newSheet!.delete());

    // const response = await spreadsheet.deleteSheet(1076876425);
    // console.log(response);

    // console.log(await spreadsheet.getValues('Shopping List', 'A1:B6'));
    // console.log(await spreadsheet.setValues('Shopping List', 'A10', [[101.123]]));

    // const sheet = spreadsheet.getSheet('Shopping List')!;
    // console.log(await sheet.getValues('A8'));
    // console.log(await sheet.setValues('A9', [['LEROY JENKINS!']]));
}

async function main() {
    try {
        const credentials = await loadCredentialsFile();
        const client = await authorize(credentials);
        await useSheets(client);
    } catch (error) {
        console.error(error);
    }
}

if (!module.parent) {
    console.log('Loaded as main command.');
    main();
} else {
    // console.log('As test');
}

export const test = 'hello!';
