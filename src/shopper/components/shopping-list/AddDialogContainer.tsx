import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './AddDialog';
import { DialogType } from '../../redux/state';

const mapStateToProps = (state: RootState) => ({
  isOpen: state.dialogState?.type === DialogType.ADD_LIST,
});

const connector = connect(mapStateToProps, {
  onCommit: (value: {
    name: string;
    items: { name: string; comment: string, enabled: boolean }[];
  }) => value && actions.addList(value),
});

export default connector(Component);
