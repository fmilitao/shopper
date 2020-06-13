import { connect } from 'react-redux';
import { actions, mapState } from '../../redux/store';
import Component from './AddButton';

const connector = connect(mapState, {
  openDialog: () => actions.openAddItemDialog(),
});

export default connector(Component);
