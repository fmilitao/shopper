import { ConnectedProps, connect } from 'react-redux';
import React from 'react';
import Component from './AppBarContainer';
import AddList from './ShoppingListAddContainer';
import AddItem from './ItemAddContainer';
import List from './ShoppingList';
import ItemList from './ItemListContainer';
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
      {isListView ? <AddItem /> : <AddList />}
    </div>
  );
}

export default connector(Main);
