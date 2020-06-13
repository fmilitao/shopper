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
  isValid: (value: { name: string; quantity: number }) => boolean;
  onClose: (value?: { name: string; quantity: number }) => void;
}

const initialValue = { name: '', quantity: 1 };

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

  function handleNameChange(event: any) {
    const newValue = { name: event.target.value, quantity: tmpValue.quantity };
    setTmpValue(newValue);
    setValidCheck(props.isValid(newValue));
  }

  function handleQuantityChange(event: any) {
    const newValue = {
      name: tmpValue.name,
      quantity: Number(event.target.value),
    };
    setTmpValue(newValue);
    setValidCheck(props.isValid(newValue));
  }

  return (
    <div>
      <Dialog open={props.isOpen} onClose={() => handleClose(false)}>
        <DialogTitle>Create Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pick the name for your new item.
          </DialogContentText>
          <TextField
            error={!isValidCheck}
            autoFocus
            margin="dense"
            label="Item name"
            type="text"
            onChange={handleNameChange}
            fullWidth
            value={tmpValue.name}
          />
          <TextField
            // FIXME: validation should be by each field!
            error={!isValidCheck}
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
            disabled={!isValidCheck}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
