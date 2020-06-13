import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddShoppingCart';
import Dialog from './ShoppingListAddDialog';
import IconButton from '@material-ui/core/IconButton';

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

interface Props {
  isValid(value: string): boolean;
  onValue(value: string): void;
}

export default function (props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { isValid, onValue } = props;

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.button}
        title="Add list"
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
