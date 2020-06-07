import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';
import type { Props } from './AppBarContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // flexShrink: 0,
    },
    title: {
      // flexGrow: 1,
    },
    menuButton: {
      // marginRight: theme.spacing(2),
    },
  })
);

export default function ButtonAppBar(props: Props) {
  const classes = useStyles();
  const showBackButton = props.shopper.isListSelected;

  let title = 'Shopper';
  if (props.shopper.isListSelected) {
    const list = props.shopper.lists[props.shopper.selectedList!];
    title = list.name;
    if (list.items.length > 0) {
      const done = list.items.reduce(
        (prev, curr) => prev + Number(!curr.enabled),
        0
      );

      title = `${title} (${done}/${list.items.length})`;
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {showBackButton && (
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
