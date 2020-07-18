import React, { forwardRef, ReactNode } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FlipMove from 'react-flip-move';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ContextMenu from './ContextMenu';

import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import DoneIcon from '@material-ui/icons/Done';

// TODO: update SwipeableViews to remove "Legacy context API has been detected within a strict-mode tree" warning. See: https://github.com/oliviertassinari/react-swipeable-views/issues/596
import SwipeableViews from 'react-swipeable-views';
import { CategoryMode } from '../../redux/state';

export interface Props {
  lists: {
    id: string;
    name: string;
    comment: string;
    enabled?: boolean;
    category?: string;
    index: number;
  }[];
  onClick: (index: number) => void;
  onDelete: (index: number) => void;
  swipeRight: boolean;
  actions: {
    label: string;
    action: (index: number) => void;
  }[][];
  categoryMode?: CategoryMode;
  extractColor?: (category: string | undefined) => string | undefined;
}

export default function (props: Props) {
  const classes = useStyles();

  const mouse = React.useRef({ x: 0, time: 0 });

  const handleMouseDown = (e: any) => {
    mouse.current.x = e.screenX;
    mouse.current.time = Date.now();
  };

  const handleMouseClick = (index: number) => (e: React.MouseEvent) => {
    // some horizontal movement, ignore click
    const delta = Math.abs(e.screenX - mouse.current.x);
    if (delta > 10) {
      e.preventDefault();
      return;
    }

    if (e.type === 'click') {
      props.onClick(index);
      return;
    }
  };

  // on swipe index change
  const onChangeIndex = (index: number, start: number) => (i: number) => {
    if (i < start) {
      props.onClick(index);
      return;
    }
    if (i > start) {
      props.onDelete(index);
      return;
    }
  };

  const [state, setState] = React.useState<
    | {
        x: number;
        y: number;
        index: number;
      }
    | undefined
  >(undefined);

  const handleOpenContextMenu = (index: number) => (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setState({
      x: event.clientX - 4,
      y: event.clientY - 4,
      index,
    });
  };

  const handleCloseContextMenu = () => {
    setState(undefined);
  };

  const Wrapper = forwardRef<HTMLDivElement, { children: ReactNode }>(
    (props, ref) => <div ref={ref}>{props.children}</div>
  );

  const customEnterAnimation = {
    from: { transform: 'scale(0.5, 1)' },
    to: { transform: 'scale(1, 1)' },
  };

  const customLeaveAnimation = {
    from: { transform: 'scale(1, 1)' },
    to: { transform: 'scale(1, 0)' },
  };

  return (
    <div className={classes.root}>
      <ContextMenu
        position={state}
        onClose={handleCloseContextMenu}
        actions={props.actions}
      />
      <List component="nav" className={classes.list}>
        <FlipMove
          enterAnimation={customEnterAnimation}
          leaveAnimation={customLeaveAnimation}
        >
          {props.lists.map(
            ({ id, name, comment, enabled, index, category }) => {
              const panels = [
                <ListItem
                  key="middle-panel"
                  className={
                    enabled !== false
                      ? classes.enabledItem
                      : classes.disabledItem
                  }
                  style={{
                    backgroundColor:
                      props.categoryMode === 'color' && props.extractColor
                        ? props.extractColor(category)
                        : undefined,
                  }}
                  button
                  onContextMenu={handleOpenContextMenu(index)}
                  onClick={handleMouseClick(index)}
                  onMouseDown={handleMouseDown}
                >
                  <ListItemText primary={name} secondary={comment} />
                  {category && props.categoryMode === 'text' && (
                    <div>{category}</div>
                  )}
                </ListItem>,
                rightPanel,
              ];
              if (props.swipeRight) {
                panels.unshift(leftPanel);
              }
              const startIndex = props.swipeRight ? 1 : 0;
              return (
                <Wrapper key={`${id}`}>
                  <SwipeableViews
                    // hack: changes the key value to force new item on enabled/disabled
                    // since otherwise SwipeableViews will remain on swiped panel.
                    key={`${id}-${enabled}`}
                    index={startIndex}
                    enableMouseEvents
                    onChangeIndex={onChangeIndex(index, startIndex)}
                  >
                    {panels}
                  </SwipeableViews>
                </Wrapper>
              );
            }
          )}
        </FlipMove>
      </List>
    </div>
  );
}

const leftPanel = (
  <div
    key="left-panel"
    style={{
      backgroundColor: '#a9f58c',
      height: '100%',
      direction: 'rtl',
    }}
  >
    <KeyboardArrowRightIcon
      style={{ height: '100%', marginRight: '10px', color: 'gray' }}
    />
    <DoneIcon style={{ height: '100%', marginRight: '10px' }} />
  </div>
);

const rightPanel = (
  <div key="right-panel" style={{ backgroundColor: '#ed837b', height: '100%' }}>
    <KeyboardArrowLeftIcon
      style={{ height: '100%', marginLeft: '10px', color: 'gray' }}
    />
    <DeleteIcon style={{ height: '100%', marginLeft: '10px' }} />
  </div>
);

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
      backgroundColor: theme.palette.background.default,
    },
    enabledItem: {
      backgroundColor: 'white',
      // marginTop: '2px',
      // marginBottom: '2px',
      userSelect: 'none',
      textDecoration: 'none',
      opacity: '1',
    },
    disabledItem: {
      backgroundColor: 'white',
      // marginTop: '2px',
      // marginBottom: '2px',
      userSelect: 'none',
      textDecoration: 'line-through',
      opacity: '0.5',
      '&:hover': {
        textDecoration: 'line-through',
      },
    },
    menuButton: {
      color: theme.palette.grey[500],
    },
  })
);
