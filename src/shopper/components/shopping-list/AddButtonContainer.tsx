import { connect } from 'react-redux';
import { actions, mapState } from '../../redux/store';
import Component from './AddButton';

const connector = connect(mapState, {
  openDialog: () => actions.openAddListDialog(),
});

export default connector(Component);
