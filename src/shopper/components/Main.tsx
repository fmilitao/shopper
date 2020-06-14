import { ConnectedProps, connect } from 'react-redux';
import React from 'react';
import AppBar from './app-bar/AppBarContainer';
import List from './shopping-list/ListContainer';
import AddListDialog from './shopping-list/AddDialogContainer';
import AddItemDialog from './item-list/AddDialogContainer';
import EditListDialog from './shopping-list/EditDialogContainer';
import EditItemDialog from './item-list/EditDialogContainer';
import ItemList from './item-list/ListContainer';
import { RootState } from '../redux/store';
import Notifier from './common/Notifier';

const connector = connect((state: RootState) => ({
  isListSelected: state.shopper.selectedList !== undefined,
}));

type Props = ConnectedProps<typeof connector>;

function Main(props: Props) {
  const isItemView = props.isListSelected;
  return (
    <div
      style={{
        flex: 1,
        // border: '1px solid blue',
        display: 'flex',
        flexFlow: 'column',
        height: '100%',
      }}
    >
      <AppBar />
      {isItemView ? <ItemList /> : <List />}
      {isItemView ? <AddItemDialog /> : <AddListDialog />}
      {isItemView ? <EditItemDialog /> : <EditListDialog />}
      <Notifier />
    </div>
  );
}

export default connector(Main);
