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
  list: model.List;
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
    this.setState((prev) => {
      // TODO: not ideal mutating state...
      prev.list.items.push(item);
      return prev;
    });
  }

  render() {
    const total = this.state.list.items.length;
    const done = this.state.list.items.filter((item) => !item.done).length;
    // FIXME: tight coupling and does not update on click!

    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' color='inherit' style={{ flexGrow: 1 }}>
              {greeting}
            </Typography>
            {this.state.list.name}: {done} / {total}
          </Toolbar>
        </AppBar>

        <List list={this.state.list} />
        <AddItem onCreate={this.onCreateNewItem} />
      </div>
    );
  }
}

export default App;
