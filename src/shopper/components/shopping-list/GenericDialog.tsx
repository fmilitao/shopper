import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '../common/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { importText } from '../../importer';

interface Props {
  value: string;
  title: string;
  okText: string;
  cancelText: string;
  anotherText?: string;
  descriptionText: string;
  // internal
  isOpen: boolean;
  isEdit: boolean;
  onCommit: (value: {
    name: string;
    items: { name: string; comment: string }[];
  }) => void;
}

const isValid = (newValue: string) => newValue.trim().length > 0;

export default function (props: Props) {
  const initialCheck = isValid(props.value);
  const [isValidCheck, setValidCheck] = React.useState(initialCheck);
  const [tmpValue, setTmpValue] = React.useState(props.value);
  const [includeClipboard, setIncludeClipboard] = React.useState<{
    includeClipboard: boolean;
    items: { name: string; comment: string }[];
  }>({
    includeClipboard: false,
    items: [],
  });

  function handleClose(commit: boolean) {
    if (commit) {
      props.onCommit({
        name: tmpValue,
        items: includeClipboard.includeClipboard ? includeClipboard.items : [],
      });
    }
  }

  function handleOpen() {
    setTmpValue(props.value);
    setValidCheck(isValid(props.value));
    setIncludeClipboard({ includeClipboard: false, items: [] });
    if (defaultFocus.current) {
      defaultFocus.current.focus();
    }
  }

  function handleChange(event: any) {
    const newValue = event.target.value;
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
  }

  async function importFromClipboard() {
    try {
      const txt = await navigator.clipboard.readText();
      return importText(txt);
    } catch (error) {
      console.log(`Error importing from clipboard: ${error}`);
      return [];
    }
  }

  async function handleIncludeClipboard(event: any) {
    const includeClipboard = event.target.checked;
    const items = includeClipboard ? await importFromClipboard() : [];

    setIncludeClipboard({
      includeClipboard,
      items,
    });
  }

  const count = includeClipboard.includeClipboard
    ? `${includeClipboard.items.length} `
    : ' ';
  const label = `Include ${count}items from clipboard`;
  const allowedImport = navigator?.clipboard?.readText !== undefined;

  const defaultFocus = React.useRef<any>(null);

  return (
    <Dialog
      isOpen={props.isOpen}
      isValid={isValidCheck}
      onOpen={handleOpen}
      onClose={handleClose}
      title={props.title}
      description={props.descriptionText}
      ok={props.okText}
      another={props.anotherText}
      cancel={props.cancelText}
    >
      <TextField
        error={!isValidCheck}
        inputRef={input => {
          defaultFocus.current = input;
        }}
        margin="dense"
        label="List name"
        type="text"
        onChange={handleChange}
        fullWidth
        value={tmpValue}
        InputLabelProps={{
          shrink: true,
        }}
      />
      {!props.isEdit && allowedImport && (
        <FormControlLabel
          control={
            <Checkbox
              checked={includeClipboard.includeClipboard}
              onChange={handleIncludeClipboard}
              color="primary"
            />
          }
          label={label}
        />
      )}
    </Dialog>
  );
}
