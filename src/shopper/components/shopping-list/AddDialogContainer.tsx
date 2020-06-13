import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './AddDialog';
import { DialogType } from '../../redux/state';

const mapState = (state: RootState) => ({
  isOpen: state.shopper.dialogState?.type === DialogType.ADD_LIST,
});

const connector = connect(mapState, {
  onClose: (value?: string) => {
    if (value) {
      return actions.addList(value);
    }
    return actions.closeDialog();
  },
});

export default connector(Component);
