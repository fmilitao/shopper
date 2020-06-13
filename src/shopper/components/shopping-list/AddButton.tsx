import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddShoppingCart';
import IconButton from '@material-ui/core/IconButton';

interface Props {
  openDialog: () => void;
}

export default function (props: Props) {
  const classes = useStyles();

  return (
    <IconButton
      className={classes.button}
      edge="end"
      title="Add list"
      color="secondary"
      aria-label="add"
      onClick={() => props.openDialog()}
    >
      <AddIcon />
    </IconButton>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: 'inherit',
    },
  })
);
