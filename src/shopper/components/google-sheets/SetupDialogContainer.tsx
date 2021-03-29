import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './SetupDialog';
import { DialogType } from '../../redux/state';

const mapStateToProps = (state: RootState) => ({
  spreadsheetId: state.googleSheets?.spreadsheetId ?? '',
  range: state.googleSheets?.range ?? '',
  clientId: state.googleSheets?.clientId ?? '',
  apiKey: state.googleSheets?.apiKey ?? '',
  isOpen: state.dialogState?.type === DialogType.SETUP_GOOGLE_SHEETS,
});

const connector = connect(mapStateToProps, {
  onCommit: (value: RootState['googleSheets']) =>
    actions.setGoogleSheetsDetails(value),
});

export default connector(Component);
