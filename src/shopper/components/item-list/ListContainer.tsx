import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import List from '../common/List';

const mapToListState = (state: RootState) => {
  const index = state.selectedList;
  if (index !== undefined) {
    return {
      lists: state.lists[index].items.map(
        ({ name, comment, enabled }, index) => ({
          name,
          comment,
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
