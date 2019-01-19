import fs from 'fs';
import readline from 'readline';

import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { InstalledCredentials, NestedError } from './utils';

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
 * Create an OAuth2 client with the given credentials.
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

function getSheetsApiClient(auth: OAuth2Client) {
    return google.sheets({ version: 'v4', auth });
}

export {
    OAuth2Client as AuthClient,
    loadCredentialsFile,
    authorize,
    getSheetsApiClient,
    getNewToken
};
