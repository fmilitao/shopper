import { connect } from 'react-redux';
import type { RootState } from '../../redux/store';
import { actions } from '../../redux/store';
import Component from './AppBar';

export const mapStateToProps = (state: RootState) => {
  if (state.selectedList !== undefined) {
    const list = state.lists[state.selectedList!];
    const listName = list.name;
    const totalItemCount = list.items.length;
    const pendingItemCount = list.items.reduce(
      (prev, curr) => prev + Number(!!curr.enabled),
      0
    );
    return {
      selectedList: {
        totalItemCount,
        pendingItemCount,
        listName,
      },
      sortMode: state.sortMode,
      categoryMode: state.categoryMode,
    };
  }

  return {
    selectedList: undefined,
    sortMode: 'default' as const,
    categoryMode: 'text' as const,
  };
};

const connector = connect(mapStateToProps, {
  deselectList: () => actions.deselectList(),
  copyItemsToClipboard: () => actions.copyItemsToClipboard(),
  copyToClipboard: () => actions.copyToClipboard(),
  importFromClipboard: () => actions.importFromClipboard(),
  undoItemDeletion: () => actions.undoItemDeletion(),
  undoListDeletion: () => actions.undoListDeletion(),
  // sort
  setDefaultSort: () => actions.setDefaultSort(),
  setCategorySort: () => actions.setCategorySort(),
  setAlphabeticSort: () => actions.setAlphabeticSort(),
  // category
  setTextCategoryMode: () => actions.setTextCategoryMode(),
  setHiddenCategoryMode: () => actions.setHiddenCategoryMode(),
  setColorCategoryMode: () => actions.setColorCategoryMode(),
});

export default connector(Component);
