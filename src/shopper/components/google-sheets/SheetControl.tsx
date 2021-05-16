import React from 'react';
import { connect } from 'react-redux';
import type { RootState } from '../../redux/store';
import { actions } from '../../redux/store';
import { init } from './spreadsheet';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// status icons
import NotAvailable from '@material-ui/icons/CloudOff';
import Available from '@material-ui/icons/CloudDone';
import Pending from '@material-ui/core/CircularProgress';

type SheetControlProps = {
  clientId?: string;
  apiKey?: string;
  // login status
  status?: boolean;
  setLoginStatus: (status: boolean) => void;
  openDialog: () => void;
  isOnline: boolean;
};

function SheetControl(props: SheetControlProps) {
  const classes = useStyles();

  React.useEffect(
    () =>
      init(props.apiKey, props.clientId, props.isOnline, props.setLoginStatus),
    [props.apiKey, props.clientId, props.setLoginStatus, props.isOnline]
  );

  const icon =
    props.apiKey === undefined ||
    props.clientId === undefined ||
    props.status === false ||
    props.isOnline === false ? (
      <NotAvailable />
    ) : props.status === true ? (
      <Available />
    ) : (
      <Pending color="inherit" size={30} />
    );

  return (
    <IconButton
      className={classes.button}
      edge="end"
      title="Google Sheets API Access Status"
      color="secondary"
      aria-label="google-sheets"
      onClick={() => props.openDialog()}
    >
      {icon}
    </IconButton>
  );
}

export const mapStateToProps = (state: RootState) => {
  return {
    clientId: state.googleSheets?.clientId,
    apiKey: state.googleSheets?.apiKey,
    status: state.googleSheetsLoggedIn,
  };
};

export default connect(mapStateToProps, {
  setLoginStatus: (status: boolean) => actions.setGoogleSheetsLoggedIn(status),
  openDialog: () => actions.openSetupGoogleSheetsDialog(),
})(SheetControl);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: 'inherit',
    },
  })
);
