import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

interface Props {
  actions: {
    label: string;
    action: () => void;
  }[];
}

export default function (props: Props) {
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
        aria-controls="simple-menu"
        edge="end"
        aria-label="menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.actions.map(({ label, action }, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              handleClose();
              action();
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
