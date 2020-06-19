import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '../common/Dialog';

interface Props {
  value: string;
  title: string;
  okText: string;
  descriptionText: string;
  // internal
  isOpen: boolean;
  onClose: (value?: string) => void;
}

const isValid = (newValue: string) => newValue.trim().length > 0;

export default function (props: Props) {
  const initialCheck = isValid(props.value);
  const [isValidCheck, setValidCheck] = React.useState(initialCheck);
  const [tmpValue, setTmpValue] = React.useState(props.value);

  function handleClose(isSet: boolean) {
    if (isSet) {
      props.onClose(tmpValue);
    } else {
      props.onClose();
    }
  }

  function handleOpen() {
    setTmpValue(props.value);
    setValidCheck(isValid(props.value));
  }

  function handleChange(event: any) {
    const newValue = event.target.value;
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
  }

  return (
    <Dialog
      isOpen={props.isOpen}
      isValid={isValidCheck}
      onOpen={() => handleOpen()}
      onClose={() => handleClose(false)}
      title={props.title}
      description={props.descriptionText}
      ok={'ok'}
      cancel={'cancel'}
    >
      <TextField
        error={!isValidCheck}
        autoFocus
        margin="dense"
        label="List name"
        type="text"
        onChange={handleChange}
        fullWidth
        value={tmpValue}
      />
    </Dialog>
  );
}
