import React from 'react';
import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import List, { Props as ListProps } from '../common/List';
import { Item } from '../../redux/state';
import { extractCategories } from './AddDialogContainer';
import { COLORS } from '../common/Colors';

const defaultSorter = (a: Item, b: Item) =>
  Number(!a.enabled) - Number(!b.enabled);

const alphabeticSorter = (a: Item, b: Item) => {
  const defaultResult = defaultSorter(a, b);

  if (defaultResult !== 0) {
    return defaultResult;
  }

  const { name: aName } = a;
  const { name: bName } = b;
  if (aName === undefined || bName === undefined) {
    return Number(aName === undefined) - Number(bName === undefined);
  }
  return aName.localeCompare(bName);
};

const categorySorter = (a: Item, b: Item) => {
  const defaultResult = defaultSorter(a, b);

  if (defaultResult !== 0) {
    return defaultResult;
  }

  const { category: aCategory } = a;
  const { category: bCategory } = b;
  if (aCategory === undefined || bCategory === undefined) {
    return Number(aCategory === undefined) - Number(bCategory === undefined);
  }
  return aCategory.localeCompare(bCategory);
};

function buildMapper(state: RootState) {
  const { categoryColorMapper } = state;

  // use user-defined color mapper
  if (categoryColorMapper !== undefined) {
    return (category: string | undefined) => {
      if (category === undefined) {
        return undefined;
      }
      return categoryColorMapper[category];
    };
  }

  // use default color array
  const categories = extractCategories(state);
  return (category: string | undefined) => {
    if (category === undefined) {
      return undefined;
    }
    const index = categories.indexOf(category);
    if (index !== -1 && index < COLORS.length) {
      return COLORS[index];
    }
    return undefined;
  };
}

const mapToListState = (state: RootState) => {
  const index = state.selectedList;
  const sorter =
    state.sortMode === 'categories'
      ? categorySorter
      : state.sortMode === 'alphabetic'
      ? alphabeticSorter
      : defaultSorter;

  if (index !== undefined) {
    const extractColor =
      state.categoryMode === 'color' ? buildMapper(state) : () => undefined;

    return {
      lists: state.lists[index].items
        .map((item, index) => ({
          ...item,
          index,
        }))
        .sort(sorter),
      categoryMode: state.categoryMode,
      extractColor,
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
