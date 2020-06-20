import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

interface Props {
  position?: {
    x: number;
    y: number;
    index: number;
  };

  actions: {
    label: string;
    action: (index: number) => void;
  }[][];

  onClose: () => void;
}

export default function (props: Props) {
  const open = props.position !== undefined;
  const anchorPosition =
    props.position !== undefined
      ? { top: props.position.y, left: props.position.x }
      : undefined;

  return (
    <Menu
      keepMounted
      open={open}
      onClose={() => props.onClose()}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
    >
      {props.actions.flatMap((actionList, outerIndex) => {
        const result = actionList.map(({ label, action }, innerIndex) => (
          <MenuItem
            key={`outer=${outerIndex}-inner${innerIndex}`}
            onClick={() => {
              if (props.position) {
                // store in case of changes
                const { index } = props.position;
                props.onClose();
                if (index !== null) {
                  action(index);
                }
              }
            }}
          >
            {label}
          </MenuItem>
        ));
        // add separator if adding a new set of actions
        if (outerIndex !== 0) {
          result.unshift(<Divider key={`divider-${outerIndex}`} />);
        }
        return result;
      })}
    </Menu>
  );
}
