import React, { ReactNode } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

interface Props {
  children: ReactNode;
  actions: {
    label: string;
    action: () => void;
    selected?: boolean;
  }[][];
}

export default function (props: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className={classes.button}
        aria-controls="simple-menu"
        edge="end"
        aria-label="menu"
        color="secondary"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {props.children}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.actions.flatMap((actionList, outerIndex) => {
          const result = actionList.map(
            ({ label, action, selected }, innerIndex) => (
              <MenuItem
                key={`outer=${outerIndex}-inner${innerIndex}`}
                onClick={() => {
                  handleClose();
                  action();
                }}
                selected={!!selected}
              >
                {label}
              </MenuItem>
            )
          );
          // add separator if adding a new set of actions
          if (outerIndex !== 0) {
            result.unshift(<Divider key={`divider-${outerIndex}`} />);
          }
          return result;
        })}
      </Menu>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: 'inherit',
    },
  })
);
