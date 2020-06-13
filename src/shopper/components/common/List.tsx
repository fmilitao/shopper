import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Menu from './Menu';

interface Props {
  lists: { name: string; comment: string; enabled?: boolean }[];
  onClick(index: number): void;
  onEdit(index: number): void;
  onDelete(index: number): void;
}

export default function SimpleList(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" className={classes.list}>
        {props.lists.map(({ name, comment, enabled }, index) => (
          <ListItem
            // style override here so that ripple effect does not take priority
            // enabled is true or undefined: white, else: gray
            style={{ backgroundColor: enabled !== false ? 'white' : 'gray' }}
            key={index}
            button
            onClick={() => props.onClick(index)}
          >
            <ListItemText primary={name} secondary={comment} />
            <ListItemSecondaryAction className={classes.menuButton}>
              <Menu
                actions={[
                  { label: 'edit', action: () => props.onEdit(index) },
                  { label: 'delete', action: () => props.onDelete(index) },
                ]}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      flex: '1',
      height: '90vh',
      // border: '1px solid red',
      display: 'flex',
      flexDirection: 'column',
    },
    list: {
      overflow: 'scroll',
      // border: '1px solid blue',
    },
    menuButton: {
      color: theme.palette.grey[500],
    },
  })
);
