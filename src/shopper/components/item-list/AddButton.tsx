import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from './AddDialog';

interface Props {
  isValid(value: { name: string; quantity: number }): boolean;
  onValue(value: { name: string; quantity: number }): void;
}

export default function (props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { isValid, onValue } = props;

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.button}
        edge="end"
        title="Add item"
        color="secondary"
        aria-label="add"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </IconButton>
      <Dialog
        isOpen={open}
        isValid={isValid}
        onClose={v => {
          setOpen(false);
          if (v !== undefined) {
            onValue(v);
          }
        }}
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // margin: theme.spacing(1),
      // position: 'absolute',
      // bottom: theme.spacing(2),
      // right: theme.spacing(2),
      // zIndex: 1,
    },
    button: {
      color: 'inherit',
    },
  })
);
