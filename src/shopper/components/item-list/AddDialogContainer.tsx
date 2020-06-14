import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './AddDialog';
import { DialogType } from '../../redux/state';

const mapStateToProps = (state: RootState) => ({
  isOpen: state.dialogState?.type === DialogType.ADD_ITEM,
});

const connector = connect(mapStateToProps, {
  onClose: (value?: { name: string; quantity: number }) => {
    if (value) {
      return actions.addItem(value);
    }
    return actions.closeDialog();
  },
});

export default connector(Component);
