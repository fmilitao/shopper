import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

interface NotifierProps {
  logger: { log: (message: string) => void };
}

// from sheety-writer, only one message at a time.
export default function Notifier(props: NotifierProps) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('Hello!');

  function handleClick(message: string) {
    setMessage(message);
    setOpen(true);
  }

  props.logger.log = handleClick;

  function handleClose(_event: unknown, reason?: string) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      message={message}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  );
}
