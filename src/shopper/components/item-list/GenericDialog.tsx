import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '../common/Dialog';

interface Props {
  title: string;
  okText: string;
  descriptionText: string;
  // ...
  isOpen: boolean;
  value: { name: string; comment: string };
  onClose: (value?: { name: string; comment: string }) => void;
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
      props.onClose(tmpValue);
    } else {
      props.onClose();
    }
  }

  function handleOpen() {
    setTmpValue(props.value);
    setValidCheck(isValid(props.value));
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

  return (
    <div>
      <Dialog
        isOpen={props.isOpen}
        description={props.descriptionText}
        isValid={isValidCheck.name && isValidCheck.comment}
        onOpen={handleOpen}
        onClose={handleClose}
        title={props.title}
        ok="ok"
        cancel="cancel"
      >
        <TextField
          error={!isValidCheck.name}
          autoFocus
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
