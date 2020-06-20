import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './AddDialog';
import { DialogType } from '../../redux/state';

const mapStateToProps = (state: RootState) => ({
  isOpen: state.dialogState?.type === DialogType.ADD_ITEM,
});

const connector = connect(mapStateToProps, {
  onCommit: (value: { name: string; comment: string }) =>
    value && actions.addItem(value),
});

export default connector(Component);
