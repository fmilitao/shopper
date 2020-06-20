import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './EditDialog';
import { DialogType } from '../../redux/state';

const mapStateToProps = (state: RootState) => {
  const { dialogState } = state;
  if (
    dialogState?.type === DialogType.EDIT_LIST &&
    dialogState.index >= 0 &&
    dialogState.index < state.lists.length
  ) {
    const initialValue = state.lists[dialogState.index].name;
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

const connector = connect(mapStateToProps, {
  onCommit: (value: string) => actions.editList(value),
});

export default connector(Component);
