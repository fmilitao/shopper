import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';
import AddList from '../shopping-list/AddButtonContainer';
import AddItem from '../item-list/AddButtonContainer';
import Menu from '../common/Menu';

import version from '../../../version';
import { toast } from 'react-toastify';

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
  copyToClipboard: () => void;
  importFromClipboard: () => void;
  undoItemDeletion: () => void;
  undoListDeletion: () => void;
}

const shopperTitle = 'Shopper';

export default function ButtonAppBar(props: Props) {
  const classes = useStyles();

  let title = shopperTitle;
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
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => {
              if (title === shopperTitle) {
                toast.info(version);
              }
            }}
          >
            {title}
          </Typography>
          <div className={classes.rightButton}>
            {props.selectedList ? <AddItem /> : <AddList />}
          </div>
          <Menu
            actions={[
              {
                label: 'import state from clipboard',
                action: () => props.importFromClipboard(),
              },
              {
                label: 'copy state to clipboard',
                action: () => props.copyToClipboard(),
              },
              {
                label: `undo ${props.selectedList ? 'item' : 'list'} deletion`,
                action: () =>
                  props.selectedList
                    ? props.undoItemDeletion()
                    : props.undoListDeletion(),
              },
            ]}
          ></Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
