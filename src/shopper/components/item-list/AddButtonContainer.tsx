import { connect } from 'react-redux';
import { actions } from '../../redux/store';
import Component from './AddButton';

const connector = connect(() => ({}), {
  openDialog: () => actions.openAddItemDialog(),
});

export default connector(Component);
