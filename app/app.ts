import fs from 'fs';
import readline from 'readline';

import { OAuth2Client } from 'google-auth-library';
import { google, sheets_v4 } from 'googleapis';

// see other scopes at:
// https://developers.google.com/sheets/api/guides/authorizing
// each token is issues for a specific scope, if this changes you
// must delete the old token to generate a new one
const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets'
];

// from the developer
const CREDENTIALS_PATH = 'resources/credentials.json';
// user-specific
const TOKEN_PATH = 'resources/token.json';

// test spreadsheet
const SPREAD_SHEET_ID = '1QmnGVdEWAcD15DBAySn0-o7W1p3LW_LucyCkYMUHwSo';

type InstalledCredentials = {
    installed: {
        client_secret: string,
        client_id: string,
        redirect_uris: string[]
    }
};

class NestedError extends Error {
    constructor(
        public where: string,
        public error: any
    ) {
        super(where);
    }
}

//
// FUNCTIONS
//

// Load client secrets from a local file.
async function loadCredentialsFile(path = CREDENTIALS_PATH): Promise<InstalledCredentials> {
    try {
        const content = fs.readFileSync(path);
        return JSON.parse(content.toString()) as InstalledCredentials;
    } catch (error) {
        throw new NestedError(`Loading credentials from ${path}`, error);
    }
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
async function authorize(credentials: InstalledCredentials): Promise<OAuth2Client> {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    try {
        const token = await fs.readFileSync(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token.toString()));
        return oAuth2Client;
    } catch {
        // when fails to load or if file does not exist, request new token
        return await getNewToken(oAuth2Client);
    }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getNewToken(oAuth2Client: OAuth2Client): Promise<OAuth2Client> {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    const input = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve, reject) => {
        input.question('Enter the code from that page here: ', async (code) => {
            input.close();
            try {
                const { tokens } = await oAuth2Client.getToken({ code });
                oAuth2Client.setCredentials(tokens);
                // Store the token to disk for later program executions
                fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
                return resolve(oAuth2Client);
            } catch (error) {
                return reject(new NestedError('Trying to retrieve access token', error));
            }
        });
    });
}

/**
 * Spreadsheet playground.
 */

class Sheet {
    constructor(
        private readonly spreadsheet: Spreadsheet,
        private readonly sheetTitle: string
    ) {
        // intentionally empty
    }

    async getValues(rangeOption?: string) {
        return await this.spreadsheet.getValues(this.sheetTitle, rangeOption);
    }

    async setValues(rangeOption: string, values: any[][]) {
        return await this.spreadsheet.setValues(this.sheetTitle, rangeOption, values);
    }
}

class Spreadsheet {

    constructor(
        private readonly api: sheets_v4.Sheets,
        private readonly data: sheets_v4.Schema$Spreadsheet,
        private readonly spreadsheetId: string
    ) {
        // intentionally empty
    }

    getTitle(): string | null {
        const properties = this.data.properties;
        if (properties && properties.title) {
            return properties.title;
        } else {
            return null;
        }
    }

    getSheetsTitles(): string[] {
        const sheets = this.data.sheets;
        if (sheets) {
            return sheets.map((sheet) => sheet!.properties!.title!);
        } else {
            return [];
        }
    }

    getSheets(): Sheet[] {
        const titles = this.getSheetsTitles();
        return titles.map((title) => new Sheet(this, title));
    }

    getSheet(title: string): Sheet | null {
        const sheetTitle = this.getSheetsTitles().filter((sheetTitle) => sheetTitle === title);
        return sheetTitle.length > 0 ? new Sheet(this, sheetTitle[0]) : null;
    }

    async getValues(
        sheet: string,
        rangeOption?: string
    ): Promise<any[][] | undefined> {
        const range = rangeOption ? `${sheet}!${rangeOption}` : sheet;
        const { data: { values } } = await this.api.spreadsheets.values.get({
            spreadsheetId: this.spreadsheetId,
            range,
            valueRenderOption: 'FORMULA',
        });
        return values;
    }

    // https://developers.google.com/sheets/api/reference/rest/v4/ValueInputOption
    async setValues(
        sheet: string,
        rangeOption: string,
        values: any[][]
    ): Promise<sheets_v4.Schema$UpdateValuesResponse> {
        const range = `${sheet}!${rangeOption}`;
        const { data } = await this.api.spreadsheets.values.update({
            spreadsheetId: this.spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values
            }
        });
        return data;
    }

    async newSheet(
        title: string
    ): Promise<sheets_v4.Schema$BatchUpdateSpreadsheetResponse> {
        const { data } = await this.api.spreadsheets.batchUpdate({
            spreadsheetId: this.spreadsheetId,
            requestBody: {
                requests: [{
                    addSheet: {
                        properties: { title }
                    }
                }]
            }
        });
        return data;
    }

    static async getExistingSpreadsheet(
        api: sheets_v4.Sheets,
        spreadsheetId: string
    ): Promise<Spreadsheet> {
        const { data } = await api.spreadsheets.get({ spreadsheetId });
        return new Spreadsheet(api, data, spreadsheetId);
    }

    static async newSheet(
        api: sheets_v4.Sheets,
        title: string
    ): Promise<Spreadsheet> {
        const { data } = await api.spreadsheets.create({
            requestBody: { properties: { title } }
        });
        return new Spreadsheet(api, data, data.spreadsheetId!);
    }
}

async function useSheets(auth: OAuth2Client) {
    try {
        const api = google.sheets({ version: 'v4', auth });
        let spreadsheet: Spreadsheet;

        spreadsheet = await Spreadsheet.getExistingSpreadsheet(api, SPREAD_SHEET_ID);
        console.log(spreadsheet.getTitle());
        console.log(spreadsheet.getSheetsTitles());

        console.log(await spreadsheet.newSheet('I shit you not'));

        // console.log(await spreadsheet.getValues('Shopping List', 'A1:B6'));
        // console.log(await spreadsheet.setValues('Shopping List', 'A8', [[1234567]]));

        // const sheet = spreadsheet.getSheet('Shopping List')!;
        // console.log(await sheet.getValues('A8'));
        // console.log(await sheet.setValues('A9', [['LEROY JENKINS!']]));

    } catch (error) {
        console.log('The API returned an error', error);
    }
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

export {
    NestedError,
    loadCredentialsFile,
    authorize,
    useSheets,
    getNewToken
};
