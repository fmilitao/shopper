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
    };
  }

  return {
    selectedList: undefined,
  };
};

const connector = connect(mapStateToProps, {
  deselectList: () => actions.deselectList(),
  copyToClipboard: () => actions.copyToClipboard(),
  importFromClipboard: () => actions.importFromClipboard(),
  undoItemDeletion: () => actions.undoItemDeletion(),
  undoListDeletion: () => actions.undoListDeletion(),
});

export default connector(Component);
