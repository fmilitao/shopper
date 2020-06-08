import { connect } from 'react-redux';
import { actions, RootState } from '../redux/store';
import List from './List';

const mapToListState = (state: RootState) => {
  const index = state.shopper.selectedList;
  if (index !== undefined) {
    return {
      lists: state.shopper.lists[index].items.map(
        ({ name, quantity, enabled }) => ({
          name,
          comment: `${quantity} elements`,
          enabled,
        })
      ),
    };
  }
  return { lists: [] };
};

const dispatchToProps = {
  onDelete: (index: number) => actions.deleteItem(index),
  onClick: (index: number) => actions.toggleItem(index),
};

const connector = connect(mapToListState, dispatchToProps);

export default connector(List);
