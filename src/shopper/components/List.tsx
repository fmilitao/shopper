import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
  })
);

interface Props {
  lists: { name: string; comment: string; enabled?: boolean }[];
  onClick(index: number): void;
  onDelete(index: number): void;
}

export default function SimpleList(props: Props) {
  const classes = useStyles();

  return (
    <div
      style={{
        flex: '1',
        height: '90vh',
        border: '1px solid red',
        display: 'flex',
        flexDirection: 'column',
      }}
      className={classes.root}
    >
      <List
        // component="nav"
        style={{
          overflow: 'scroll',
          border: '1px solid blue',
        }}
      >
        {props.lists.map(({ name, comment, enabled }, index) => {
          const show = enabled !== false;

          return (
            <ListItem
              // FIXME: messy with the style above, but need to override the click focus/effect
              style={{ backgroundColor: show ? 'white' : 'gray' }}
              key={index}
              // ripple effect changes the bg color!
              button
              onClick={() => props.onClick(index)}
            >
              <ListItemText primary={name} secondary={comment} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => props.onDelete(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}

// long press?
// https://stackoverflow.com/questions/48048957/react-long-press-event
