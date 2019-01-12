import { loadCredentialsFile, authorize, getSheetsApiClient, AuthClient } from './auth';
import { Spreadsheet } from './spreadsheet'

// test spreadsheet
const SPREAD_SHEET_ID = '1QmnGVdEWAcD15DBAySn0-o7W1p3LW_LucyCkYMUHwSo';

async function useSheets(auth: AuthClient) {
    const api = getSheetsApiClient(auth);
    let spreadsheet: Spreadsheet;

    spreadsheet = await Spreadsheet.getExistingSpreadsheet(api, SPREAD_SHEET_ID);
    console.log(spreadsheet.getTitle());
    console.log(spreadsheet.getSheetsTitles());

    // console.log(await spreadsheet.newSheet('I shit you not'));

    // console.log(await spreadsheet.getValues('Shopping List', 'A1:B6'));
    // console.log(await spreadsheet.setValues('Shopping List', 'A8', [[1234567]]));

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
