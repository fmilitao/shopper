import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '../common/Dialog';

interface Props {
  title: string;
  okText: string;
  cancelText: string;
  anotherText?: string;
  descriptionText: string;
  // ...
  isOpen: boolean;
  value: { name: string; comment: string };
  onCommit: (value: { name: string; comment: string }) => void;
}

const isValid = (newValue: { name: string; comment: string }) => ({
  name: newValue.name.trim().length > 0,
  // comments are always valid
  comment: true,
});

export default function (props: Props) {
  const initialCheck = isValid(props.value);
  const [isValidCheck, setValidCheck] = React.useState(initialCheck);
  const [tmpValue, setTmpValue] = React.useState(props.value);

  function handleClose(commit: boolean) {
    if (commit) {
      props.onCommit(tmpValue);
    }
  }

  function handleOpen() {
    setTmpValue(props.value);
    setValidCheck(isValid(props.value));
    if (defaultFocus.current) {
      defaultFocus.current.focus();
    }
  }

  function handleNameChange(event: any) {
    const newValue = {
      name: event.target.value,
      comment: tmpValue.comment,
    };
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
  }

  function handleCommentChange(event: any) {
    const newValue = {
      name: tmpValue.name,
      comment: event.target.value,
    };
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
  }

  const defaultFocus = React.useRef<any>(null);

  return (
    <div>
      <Dialog
        isOpen={props.isOpen}
        description={props.descriptionText}
        isValid={isValidCheck.name && isValidCheck.comment}
        onOpen={handleOpen}
        onClose={handleClose}
        title={props.title}
        ok={props.okText}
        another={props.anotherText}
        cancel={props.cancelText}
      >
        <TextField
          error={!isValidCheck.name}
          inputRef={input => {
            defaultFocus.current = input;
          }}
          margin="dense"
          label="Item name"
          placeholder="What's the name of the item?"
          type="text"
          onChange={handleNameChange}
          fullWidth
          value={tmpValue.name}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          error={!isValidCheck.comment}
          margin="dense"
          label="Comment (optional)"
          placeholder="How many of this item?"
          value={tmpValue.comment}
          onChange={handleCommentChange}
          type="text"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Dialog>
    </div>
  );
}
