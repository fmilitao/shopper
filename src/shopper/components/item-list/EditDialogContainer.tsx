import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './EditDialog';
import { DialogType } from '../../redux/state';

const mapStateToProps = (state: RootState) => {
  const { dialogState, selectedList } = state.shopper;
  if (
    selectedList !== undefined &&
    selectedList >= 0 &&
    selectedList < state.shopper.lists.length &&
    dialogState?.type === DialogType.EDIT_ITEM &&
    dialogState.index >= 0 &&
    dialogState.index < state.shopper.lists[selectedList].items.length
  ) {
    const initialValue =
      state.shopper.lists[selectedList].items[dialogState.index];
    return {
      isOpen: true,
      initialValue,
    };
  }
  return {
    isOpen: false,
    initialValue: { name: '', quantity: 1 },
  };
};

const connector = connect(mapStateToProps, {
  onClose: (value?: { name: string; quantity: number }) => {
    if (value) {
      return actions.editItem(value);
    }
    return actions.closeDialog();
  },
});

export default connector(Component);
