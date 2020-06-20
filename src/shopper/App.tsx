import React from 'react';
import Main from './components/Main';
import {
  // TODO: update version once warning is fixed, see: https://github.com/mui-org/material-ui/issues/13394
  unstable_createMuiStrictModeTheme as createMuiTheme,
  Theme,
  makeStyles,
  createStyles,
  ThemeProvider,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  transitions: {
    // Disable transitions since they make UI feel slow
    create: () => 'none',
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    app: {
      minHeight: '100vh',
      height: '100%',
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
    },
  })
);

export default function () {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <Main />
      </div>
    </ThemeProvider>
  );
}
