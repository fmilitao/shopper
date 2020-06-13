import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import List from '../common/List';

const mapToListState = (state: RootState) => {
  const index = state.shopper.selectedList;
  if (index !== undefined) {
    return {
      lists: state.shopper.lists[index].items.map(
        ({ name, quantity, enabled }, index) => ({
          name,
          comment: `${quantity} elements`,
          enabled,
          index,
        })
      ),
    };
  }
  return { lists: [] };
};

const dispatchToProps = {
  onDelete: (index: number) => actions.deleteItem(index),
  onEdit: (index: number) => actions.openEditItemDialog(index),
  onClick: (index: number) => actions.toggleItem(index),
};

const connector = connect(mapToListState, dispatchToProps);

export default connector(List);
