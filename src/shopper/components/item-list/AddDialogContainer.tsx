import { connect } from 'react-redux';
import { actions, RootState } from '../../redux/store';
import Component from './AddDialog';
import { DialogType } from '../../redux/state';
import { SimpleItem as Item } from '../../redux/state';

export function extractCategories(state: RootState) {
  const set: Set<string> = new Set();
  state.lists.forEach(list =>
    list.items
      .filter(item => item.category !== undefined)
      .forEach(item => set.add(item.category!))
  );
  return Array.from(set);
}

const mapStateToProps = (state: RootState) => ({
  isOpen: state.dialogState?.type === DialogType.ADD_ITEM,
  categories: extractCategories(state),
});

const connector = connect(mapStateToProps, {
  onCommit: (value: Item) => value && actions.addItem(value),
});

export default connector(Component);
