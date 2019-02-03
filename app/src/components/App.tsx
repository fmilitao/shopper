import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './App.css';
import List from './List';
import { greeting, model } from 'shopper-lib';
import AddItem from './AddItem';


type AppPropType = {};
type AppStateType = {
  list: model.List,
};

class App extends Component<AppPropType, AppStateType> {
  constructor(props: Readonly<AppPropType>) {
    super(props);

    this.onCreateNewItem = this.onCreateNewItem.bind(this);

    this.state = {
      list: new model.List('LIDL'),
    };

    const sample = new model.Item(
      'test item',
      new model.Quantity(123.123, 'packs'),
      'this is a test'
    );
    this.state.list.items.push(sample);
  }

  onCreateNewItem(item: model.Item) {
    console.log(item);
    this.setState((prev) => {
      const newList = new model.List('test list');
      newList.items.push(item, ...prev.list.items);

      console.log(newList);
      return { list: newList };
    });
  }

  render() {
    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit'>
              {greeting} ▶ {this.state.list.name}
            </Typography>
          </Toolbar>
        </AppBar>

        <List list={this.state.list} />
        <AddItem onCreate={this.onCreateNewItem} />
      </div>
    );
  }
}

export default App;
