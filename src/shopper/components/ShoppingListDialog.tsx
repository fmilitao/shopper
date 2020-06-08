import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  value: string;
  title: string;
  okText: string;
  descriptionText: string;
  // internal
  isOpen: boolean;
  isValid: (value: string) => boolean;
  onClose: (value?: string) => void;
}

export default function (props: Props) {
  const initialCheck = props.isValid(props.value);
  const [isValidCheck, setValidCheck] = React.useState(initialCheck);
  const [tmpValue, setTmpValue] = React.useState(props.value);

  function handleClose(isSet: boolean) {
    if (isSet) {
      props.onClose(tmpValue);
    } else {
      props.onClose();
    }
    setTmpValue(props.value);
  }

  function handleChange(event: any) {
    const newValue = event.target.value;
    setTmpValue(newValue);
    setValidCheck(props.isValid(newValue));
  }

  return (
    <div>
      <Dialog open={props.isOpen} onClose={() => handleClose(false)}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.descriptionText}</DialogContentText>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleClose(true)}
            color="primary"
            disabled={!isValidCheck}
          >
            {props.okText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
