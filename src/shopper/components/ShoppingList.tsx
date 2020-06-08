import { connect } from 'react-redux';
import { actions, RootState } from '../redux/store';
import List from './List';

const mapToListState = (state: RootState) => {
  return {
    lists: state.shopper.lists.map(({ name, items }) => ({
      name,
      comment: `${items.length} items`,
    })),
  };
};

const dispatchToProps = {
  onDelete: (index: number) => actions.deleteList(index),
  onClick: (index: number) => actions.selectList(index),
};

const connector = connect(mapToListState, dispatchToProps);

export default connector(List);
