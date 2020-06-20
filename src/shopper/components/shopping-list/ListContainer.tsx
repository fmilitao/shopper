import React from 'react';
import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import List, { Props as ListProps } from '../common/List';

const mapToListState = (state: RootState) => {
  return {
    lists: state.lists.map(({ name, items }, index) => ({
      name,
      comment: `${items.length} items`,
      index,
    })),
  };
};

const dispatchToProps = {
  onDelete: (index: number) => actions.deleteList(index),
  onEdit: (index: number) => actions.openEditListDialog(index),
  onClick: (index: number) => actions.selectList(index),
};

type Props = Omit<ListProps, 'actions' | 'swipeRight'> & {
  onEdit: (index: number) => void;
};

function ListWithContextMenu(props: Props) {
  return (
    <List
      {...props}
      swipeRight={false}
      actions={[
        [
          {
            label: 'Edit',
            action: (index: number) => props.onEdit(index),
          },
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
