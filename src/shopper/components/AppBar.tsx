import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';

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
      title = `${title} (${pendingItemCount}/${totalItemCount})`;
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
        </Toolbar>
      </AppBar>
    </div>
  );
}
