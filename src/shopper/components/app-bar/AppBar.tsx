import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';
import AddList from '../shopping-list/AddButtonContainer';
import AddItem from '../item-list/AddButtonContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 0,
    },
    title: {
      flexGrow: 0,
    },
    menuButton: {
      flexGrow: 0,
    },
    rightButton: {
      // flexDirection: 'row',
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      // border: '1px solid blue',
    },
  })
);

interface Props {
  selectedList?: {
    listName: string;
    pendingItemCount: number;
    totalItemCount: number;
  };
  deselectList: () => void;
}

export default function ButtonAppBar(props: Props) {
  const classes = useStyles();

  let title = 'Shopper';
  if (props.selectedList) {
    const { listName, pendingItemCount, totalItemCount } = props.selectedList;
    title = listName!;
    if (totalItemCount! > 0) {
      title = `(${pendingItemCount}) ${title}`;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.selectedList && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => props.deselectList()}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <div className={classes.rightButton}>
            {props.selectedList ? <AddItem /> : <AddList />}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
