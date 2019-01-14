import { sheets_v4 } from 'googleapis';
import { get } from 'lodash';

class SpreadsheetError extends Error {
    constructor(
        public where: string,
        public error: any
    ) {
        super(where);
    }
}

class Sheet {
    constructor(
        readonly spreadsheet: Spreadsheet,
        readonly sheetTitle: string,
        readonly sheetId: number
    ) {
        // intentionally empty
    }

    async delete() {
        return await this.spreadsheet.deleteSheet(this.sheetId);
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
        readonly api: sheets_v4.Sheets,
        readonly data: sheets_v4.Schema$Spreadsheet,
        readonly spreadsheetId: string
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
        return this.data.sheets!.map((sheet) => {
            const title = sheet!.properties!.title!;
            const id = sheet!.properties!.sheetId!;
            return new Sheet(this, title, id);
        });
    }

    getSheet(title: string): Sheet | null {
        const sheet = this.getSheets().filter((sheet) => sheet.sheetTitle === title);
        return sheet.length > 0 ? sheet[0] : null;
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

    async newSheet(title: string): Promise<Sheet> {
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

        // FIXME: needs to update main SpreadSheet, if successful! else throw error or return null?
        const { title: sheetTitle, sheetId } = data.replies![0]!.addSheet!.properties!;
        return new Sheet(this, sheetTitle!, sheetId!);
    }

    async deleteSheet(
        sheetId: number
    ): Promise<boolean> {
        try {
            await this.api.spreadsheets.batchUpdate({
                spreadsheetId: this.spreadsheetId,
                requestBody: {
                    requests: [{
                        deleteSheet: {
                            sheetId
                        }
                    }]
                }
            });
            // FIXME: needs to update main SpreadSheet!
            return true;
        } catch (error) {
            const status = get(error, 'response.status', null);
            if (status === 400) {
                return false;
            }
            // some unexpected error
            throw new SpreadsheetError(`Attempting to delete sheet with id ${sheetId}`, error);
        }
    }

    // FIXME: what about get by name? do I need DriveAPI permissions?

    /**
     * Gets an existing spreadsheet by id, or null if it does not exist.
     * @param api - the Google API object
     * @param spreadsheetId - the id to look for
     */
    static async getExistingSpreadsheet(
        api: sheets_v4.Sheets,
        spreadsheetId: string
    ): Promise<Spreadsheet | null> {
        try {
            const { data } = await api.spreadsheets.get({ spreadsheetId });
            return new Spreadsheet(api, data, spreadsheetId);
        } catch (error) {
            const status = get(error, 'response.status', null);
            if (status === 404) {
                return null;
            }
            // some unexpected error
            throw new SpreadsheetError(`Attempting to get existing spreadsheet with id ${spreadsheetId}`, error);
        }
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

    // FIXME: missing error handling (use SpreadsheetError to capture context)
}

export {
    Sheet,
    Spreadsheet,
    SpreadsheetError
};
