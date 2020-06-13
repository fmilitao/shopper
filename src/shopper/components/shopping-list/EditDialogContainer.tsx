import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './EditDialog';
import { DialogType } from '../../redux/state';

const mapState = (state: RootState) => {
  const { dialogState } = state.shopper;
  if (
    dialogState?.type === DialogType.EDIT_LIST &&
    dialogState.index >= 0 &&
    dialogState.index < state.shopper.lists.length
  ) {
    const initialValue = state.shopper.lists[dialogState.index].name;
    return {
      isOpen: true,
      initialValue,
    };
  }
  return {
    isOpen: false,
    initialValue: '',
  };
};

const connector = connect(mapState, {
  onClose: (value?: string) => {
    if (value) {
      return actions.editList(value);
    }
    return actions.closeDialog();
  },
});

export default connector(Component);
