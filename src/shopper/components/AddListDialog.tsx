import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  isOpen: boolean;
  isValid: (value: string) => boolean;
  onClose: (value?: string) => void;
}

const initialValue = '';

export default function (props: Props) {
  const initialCheck = props.isValid(initialValue);
  const [isValidCheck, setValidCheck] = React.useState(initialCheck);
  const [tmpValue, setTmpValue] = React.useState(initialValue);

  function handleClose(isSet: boolean) {
    if (isSet) {
      props.onClose(tmpValue);
    } else {
      props.onClose();
    }
    setTmpValue(initialValue);
  }

  function handleChange(event: any) {
    const newValue = event.target.value;
    setTmpValue(newValue);
    setValidCheck(props.isValid(newValue));
  }

  return (
    <div>
      <Dialog open={props.isOpen} onClose={() => handleClose(false)}>
        <DialogTitle>Create List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pick the name for your new list.
          </DialogContentText>
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
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
