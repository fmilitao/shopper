import { ConnectedProps, connect } from 'react-redux';
import React from 'react';
import AppBar from './app-bar/AppBarContainer';
import List from './shopping-list/ListContainer';
import AddListDialog from './shopping-list/AddDialogContainer';
import AddItemDialog from './item-list/AddDialogContainer';
import EditListDialog from './shopping-list/EditDialogContainer';
import EditItemDialog from './item-list/EditDialogContainer';
import SetupGoogleSheetsDialog from './google-sheets/SetupDialogContainer';
import ItemList from './item-list/ListContainer';
import { RootState } from '../redux/store';
import Notifier from './common/Notifier';

const connector = connect((state: RootState) => ({
  isListSelected: state.selectedList !== undefined,
}));

type Props = ConnectedProps<typeof connector>;

function Main(props: Props) {
  const children: JSX.Element[] = [];
  const isItemView = props.isListSelected;
  if (isItemView) {
    children.push(<ItemList key="item-list" />);
    children.push(<AddItemDialog key="item-add-dialog" />);
    children.push(<EditItemDialog key="item-edit-dialog" />);
    children.push(<SetupGoogleSheetsDialog key="setup-google-sheets-dialog" />);
  } else {
    children.push(<List key="list" />);
    children.push(<AddListDialog key="list-add-dialog" />);
    children.push(<EditListDialog key="list-edit-dialog" />);
    children.push(<SetupGoogleSheetsDialog key="setup-google-sheets-dialog" />);
  }

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
      <Notifier />
      {children}
    </div>
  );
}

export default connector(Main);
