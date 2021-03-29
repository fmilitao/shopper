/* global gapi */

import { deserialize } from './gsheets-serde';

// Array of API discovery doc URLs for APIs
const discoveryDocs = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
// https://developers.google.com/sheets/api/guides/authorizing
const scope = 'https://www.googleapis.com/auth/spreadsheets';

export function init(
  apiKey: string | undefined,
  clientId: string | undefined,
  setSignIn: (isSignedIn: boolean) => void
) {
  if (apiKey !== undefined && clientId !== undefined && !init.loaded) {
    init.loaded = true;
    loadGApi(apiKey, clientId, setSignIn);
  }
}
init.loaded = false;

export function loadGApi(
  apiKey: string,
  clientId: string,
  setSignInStatus: (status: boolean) => void
) {
  function handleClientLoad() {
    gapi.load('client:auth2', initClient);
  }

  async function initClient() {
    try {
      await gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs,
        scope,
      });

      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(setSignInStatus);

      // Handle the initial sign-in state.
      setSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      setSignInStatus(false);
    }
  }

  const script = document.createElement('script');
  script.src = 'https://apis.google.com/js/client.js';
  script.onload = () => handleClientLoad();
  document.body.appendChild(script);
}

export function handleSignIn() {
  gapi.auth2.getAuthInstance().signIn();
}

export function handleSignOut() {
  gapi.auth2.getAuthInstance().signOut();
}

export async function getSpreadsheetTitle(spreadsheetId: string) {
  const response = await gapi.client.sheets.spreadsheets.get({
    spreadsheetId,
  });
  return String(response.result.properties.title);
}

export async function batchUpdate(
  spreadsheetId: string,
  range: string,
  values: string[][]
) {
  try {
    return await gapi.client.sheets.spreadsheets.values.batchUpdate(
      {
        spreadsheetId,
      },
      {
        // valueInputOption: 'USER_ENTERED',
        valueInputOption: 'RAW',
        data: {
          range,
          values,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchClear
export async function batchClear(spreadsheetId: string, range: string) {
  return await gapi.client.sheets.spreadsheets.values.batchClear(
    {
      spreadsheetId,
    },
    {
      ranges: range,
    }
  );
}

export async function getValues(spreadsheetId: string, range: string) {
  const response = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return deserialize(response.result.values);
}
