import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '../common/Dialog';
import CryptoJS from 'crypto-js';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import Ajv from 'ajv';
import configFile from './encrypted.json';
import { GoogleSheetSchema } from '../../redux/state';
import { logger } from '../common/Notifier';

type GoogleSheetState = {
  spreadsheetId: string;
  range: string;
  clientId: string;
  apiKey: string;
};

interface Props {
  // internal
  isOpen: boolean;
  //
  spreadsheetId: string;
  range: string;
  clientId: string;
  apiKey: string;
  onCommit: (value: GoogleSheetState) => void;
}

function isValid(text: string) {
  return text.trim().length > 0;
}

function decrypt(
  password: string,
  encrypted: string = configFile
): GoogleSheetState {
  const decrypted = CryptoJS.AES.decrypt(encrypted, password);
  const obj = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

  const ajv = new Ajv({ allErrors: true });
  const test = ajv.compile(GoogleSheetSchema);
  if (test(obj)) {
    return obj as GoogleSheetState;
  }
  console.error(`Decrypted object:
  ${JSON.stringify(obj, null, 2)}
  Failed validation:
  ${JSON.stringify(test.errors, null, 2)}`);

  throw Error('Invalid decrypt');
}

export default function (props: Props) {
  const [spreadsheetId, setSpreadsheetId] = React.useState(props.spreadsheetId);
  const [range, setRange] = React.useState(props.range);
  const [clientId, setClientId] = React.useState(props.clientId);
  const [apiKey, setApiKey] = React.useState(props.apiKey);

  function handleClose(commit: boolean) {
    if (commit) {
      // lazy...
      const magicPrefix = 'secret:';
      if (apiKey.startsWith(magicPrefix)) {
        const result = decrypt(apiKey.slice(magicPrefix.length));
        props.onCommit(result);
        logger.info('Decrypted. Refresh required.');
      } else {
        props.onCommit({
          spreadsheetId,
          range,
          clientId,
          apiKey,
        });
      }
    }
  }

  function handleOpen() {
    setSpreadsheetId(props.spreadsheetId);
    setRange(props.range);
    setClientId(props.clientId);
    setApiKey(props.apiKey);
    if (defaultFocus.current) {
      defaultFocus.current.focus();
    }
  }

  const defaultFocus = React.useRef<any>(null);
  const validApiKey = isValid(apiKey);
  const validClientId = isValid(clientId);
  const validRange = isValid(range);
  const validSpreadsheetId = isValid(spreadsheetId);

  const classes = useStyles();

  return (
    <Dialog
      isOpen={props.isOpen}
      isValid={validApiKey && validClientId && validRange && validSpreadsheetId}
      onOpen={handleOpen}
      onClose={handleClose}
      title={'Setup Google Sheets'}
      description={'Setup details for accessing GoogleSheets.'}
      ok={'Done'}
      cancel={'Cancel'}
    >
      <DialogContentText className={classes.helperText}>
        GoogleSheets API access details. (Require page refresh to reflect
        changes.)
      </DialogContentText>
      <TextField
        error={!validApiKey}
        inputRef={input => {
          defaultFocus.current = input;
        }}
        margin="dense"
        label="API Key"
        type="text"
        onChange={event => setApiKey(event.target.value)}
        fullWidth
        value={apiKey}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        error={!clientId}
        margin="dense"
        label="Client ID"
        type="text"
        onChange={event => setClientId(event.target.value)}
        fullWidth
        value={clientId}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <DialogContentText className={classes.helperText}>
        Target spreadsheet and sheet name ids.
      </DialogContentText>
      <TextField
        error={!validSpreadsheetId}
        margin="dense"
        label="Spreadsheet ID"
        type="text"
        onChange={event => setSpreadsheetId(event.target.value)}
        fullWidth
        value={spreadsheetId}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        error={!validRange}
        margin="dense"
        label="Sheet Name"
        type="text"
        onChange={event => setRange(event.target.value)}
        fullWidth
        value={range}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Dialog>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    helperText: {
      marginTop: 20,
      marginBottom: 0,
    },
  })
);
