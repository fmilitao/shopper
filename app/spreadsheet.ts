import { sheets_v4 } from 'googleapis';

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

export {
    Sheet,
    Spreadsheet
};
