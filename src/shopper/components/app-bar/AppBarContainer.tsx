import { connect } from 'react-redux';
import type { RootState } from '../../redux/store';
import { actions, importFromClipboard } from '../../redux/store';
import Component from './AppBar';

export const mapStateToProps = (state: RootState) => {
  if (state.shopper.selectedList !== undefined) {
    const list = state.shopper.lists[state.shopper.selectedList!];
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
  importFromClipboard: () => importFromClipboard(),
});

export default connector(Component);