import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux/slice';

interface Props {
  isOpen: boolean;
  children: ReactNode | ReactNode[];

  title: string;
  ok: string;
  cancel: string;
  another?: string;

  description: string;
  isValid: boolean;

  onClose: (commit: boolean) => void;
  onOpen: () => void;
}

export default function (props: Props) {
  const dispatch = useDispatch();

  function handleClose(commit: boolean, closeDialog: boolean = true) {
    if (commit) {
      props.onClose(true);
    } else {
      props.onClose(false);
    }
    if (closeDialog) {
      dispatch(actions.closeDialog());
    } else {
      props.onOpen();
    }
  }

  function handleOpen() {
    props.onOpen();
  }

  return (
    <div>
      <Dialog
        // full screen dialog works best on mobile
        fullScreen
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
          {props.another !== undefined && (
            <Button
              onClick={() => handleClose(true, false)}
              color="primary"
              disabled={!props.isValid}
            >
              {props.another}
            </Button>
          )}
          {props.another !== undefined && <div style={{ flex: '1 0 0' }} />}
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
