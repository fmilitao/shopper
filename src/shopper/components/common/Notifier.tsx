import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { logger } from '../../redux/store';

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
}));

// from sheety-writer, only one message at a time.
// should be changed to queue up in array instead
export default function () {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('Hello!');

  function handleClick(message: string) {
    setMessage(message);
    setOpen(true);
  }

  logger.log = handleClick;

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
