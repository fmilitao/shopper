import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './AddDialog';
import { DialogType } from '../../redux/state';

const mapState = (state: RootState) => ({
  isOpen: state.shopper.dialogState?.type === DialogType.ADD_ITEM,
});

const connector = connect(mapState, {
  onClose: (value?: { name: string; quantity: number }) => {
    if (value) {
      return actions.addItem(value);
    }
    return actions.closeDialog();
  },
});

export default connector(Component);
