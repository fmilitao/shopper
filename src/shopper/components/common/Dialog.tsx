import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  isOpen: boolean;
  children: ReactNode | ReactNode[];

  title: string;
  ok: string;
  cancel: string;
  description: string;
  isValid: boolean;

  onClose: (commit: boolean) => void;
  onOpen: () => void;
}

export default function (props: Props) {
  function handleClose(commit: boolean) {
    if (commit) {
      props.onClose(true);
    } else {
      props.onClose(false);
    }
  }

  function handleOpen() {
    props.onOpen();
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
          <DialogContentText>{props.description}</DialogContentText>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            {props.cancel}
          </Button>
          <Button
            onClick={() => handleClose(true)}
            color="primary"
            disabled={!props.isValid}
          >
            {props.ok}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
