import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './EditDialog';
import { DialogType } from '../../redux/state';

const mapStateToProps = (state: RootState) => {
  const { dialogState, selectedList } = state;
  if (
    selectedList !== undefined &&
    selectedList >= 0 &&
    selectedList < state.lists.length &&
    dialogState?.type === DialogType.EDIT_ITEM &&
    dialogState.index >= 0 &&
    dialogState.index < state.lists[selectedList].items.length
  ) {
    const initialValue = state.lists[selectedList].items[dialogState.index];
    return {
      isOpen: true,
      initialValue,
      listOptions: state.lists.map(({ name }) => name),
      selectedList,
    };
  }
  return {
    isOpen: false,
    initialValue: { name: '', comment: '' },
    listOptions: undefined,
    selectedList: undefined,
  };
};

const connector = connect(mapStateToProps, {
  onCommit: (value: { name: string; comment: string; listIndex?: number }) =>
    value && actions.editItem(value),
});

export default connector(Component);
