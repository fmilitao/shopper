import React from 'react';
import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import List, { Props as ListProps } from '../common/List';

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

type Props = Omit<ListProps, 'actions' | 'swipeRight'> & {
  onEdit: (index: number) => void;
};

function ListWithContextMenu(props: Props) {
  return (
    <List
      {...props}
      swipeRight={true}
      actions={[
        [
          {
            label: 'Edit',
            action: (index: number) => props.onEdit(index),
          },
          // TODO: add a move to another list
        ],
        [
          {
            label: 'Delete',
            action: (index: number) => props.onDelete(index),
          },
        ],
      ]}
    />
  );
}

const connector = connect(mapToListState, dispatchToProps);
export default connector(ListWithContextMenu);
