import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  title: string;
  okText: string;
  descriptionText: string;
  // ...
  isOpen: boolean;
  value: { name: string; quantity: number };
  onClose: (value?: { name: string; quantity: number }) => void;
}

// FIXME: validation should be by each field!
const isValid = (newValue: { name: string; quantity: number }) => ({
  name: newValue.name.trim().length > 0,
  quantity: newValue.quantity > 0,
});

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
    setTmpValue(props.value);
  }

  function handleNameChange(event: any) {
    const newValue = { name: event.target.value, quantity: tmpValue.quantity };
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
  }

  function handleOpen() {
    setTmpValue(props.value);
    setValidCheck(isValid(props.value));
  }

  function handleQuantityChange(event: any) {
    const newValue = {
      name: tmpValue.name,
      quantity: Number(event.target.value),
    };
    setTmpValue(newValue);
    setValidCheck(isValid(newValue));
  }

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onEnter={() => handleOpen()}
        onClose={() => handleClose(false)}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.descriptionText}</DialogContentText>
          <TextField
            error={!isValidCheck.name}
            autoFocus
            margin="dense"
            label="Item name"
            type="text"
            onChange={handleNameChange}
            fullWidth
            value={tmpValue.name}
          />
          <TextField
            error={!isValidCheck.quantity}
            id="standard-number"
            label="Quantity"
            placeholder="How many of this item"
            value={tmpValue.quantity}
            onChange={handleQuantityChange}
            type="number"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleClose(true)}
            color="primary"
            disabled={!isValidCheck.name || !isValidCheck.quantity}
          >
            {props.okText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
