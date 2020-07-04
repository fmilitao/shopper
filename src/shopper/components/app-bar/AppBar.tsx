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
import ActionsMenuIcon from '@material-ui/icons/MoreVert';
import SortMenuIcon from '@material-ui/icons/Sort';

import version from '../../../version';
import { toast } from 'react-toastify';
import { SortMode, CategoryMode } from '../../redux/state';

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
  sortMode: SortMode;
  categoryMode: CategoryMode;
  deselectList: () => void;
  copyItemsToClipboard: () => void;
  copyToClipboard: () => void;
  importFromClipboard: () => void;
  undoItemDeletion: () => void;
  undoListDeletion: () => void;
  // sort
  setDefaultSort: () => void;
  setCategorySort: () => void;
  // categories
  setTextCategoryMode: () => void;
  setHiddenCategoryMode: () => void;
  setColorCategoryMode: () => void;
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

  const itemActions = [
    {
      label: 'copy list items to clipboard',
      action: () => props.copyItemsToClipboard(),
    },
  ];

  const defaultActions = [
    {
      label: 'import state from clipboard',
      action: () => props.importFromClipboard(),
    },
    {
      label: 'copy state to clipboard',
      action: () => props.copyToClipboard(),
    },
  ];

  const contextActions = [
    {
      label: `undo ${props.selectedList ? 'item' : 'list'} deletion`,
      action: () =>
        props.selectedList
          ? props.undoItemDeletion()
          : props.undoListDeletion(),
    },
  ];

  const actions = [defaultActions, contextActions];
  if (props.selectedList) {
    actions.unshift(itemActions);
  }

  const sortActions = [
    [
      {
        label: 'default sort',
        action: () => props.setDefaultSort(),
        selected: props.sortMode === 'default',
      },
      {
        label: 'category sort',
        action: () => props.setCategorySort(),
        selected: props.sortMode === 'categories',
      },
    ],
    [
      {
        label: 'hidden category',
        action: () => props.setHiddenCategoryMode(),
        selected: props.categoryMode === 'hidden',
      },
      {
        label: 'text category',
        action: () => props.setTextCategoryMode(),
        selected: props.categoryMode === 'text',
      },
      {
        label: 'color category',
        action: () => props.setColorCategoryMode(),
        selected: props.categoryMode === 'color',
      },
    ],
  ];

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
          {props.selectedList && (
            <Menu actions={sortActions}>
              <SortMenuIcon />
            </Menu>
          )}
          <Menu actions={actions}>
            <ActionsMenuIcon />
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
