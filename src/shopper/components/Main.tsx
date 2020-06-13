import { ConnectedProps, connect } from 'react-redux';
import React from 'react';
import Component from './app-bar/AppBarContainer';
import List from './shopping-list/ListContainer';
import AddListDialog from './shopping-list/AddDialogContainer';
import AddItemDialog from './item-list/AddDialogContainer';
import EditListDialog from './shopping-list/EditDialogContainer';
import EditItemDialog from './item-list/EditDialogContainer';
import ItemList from './item-list/ListContainer';
import { mapState } from '../redux/store';

const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

function Main(props: Props) {
  const isListView = props.shopper.isListSelected;
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
      <Component />
      {isListView ? <ItemList /> : <List />}
      <AddListDialog />
      <AddItemDialog />
      <EditListDialog />
      <EditItemDialog />
    </div>
  );
}

export default connector(Main);
