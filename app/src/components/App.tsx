import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import './App.css';
import List from './List';
import { greeting, model } from 'shopper-lib';
import EditItem from './EditItem';


const styles = {
  root: {
    flexGrow: 1,
  },
};

type AppPropType = {};
type AppStateType = {
  view: ListViewType | ItemViewType,
};

type ListViewType = {
  kind: 'list-view',
  list: model.List,
};

type ItemViewType = {
  kind: 'item-view',
  item: model.Item | null,
  list: model.List,
};

class App extends Component<AppPropType, AppStateType> {
  constructor(props: Readonly<AppPropType>) {
    super(props);

    this.onAddNewItem = this.onAddNewItem.bind(this);
    this.onSubmitNewItem = this.onSubmitNewItem.bind(this);

    this.state = {
      view: {
        kind: 'list-view',
        list: new model.List('LIDL'),
      }
    };
  }

  onAddNewItem(list: model.List) {
    this.setState({
      view: {
        kind: 'item-view',
        item: null,
        list
      }
    });
  }

  onSubmitNewItem(item: model.Item) {
    if (this.state.view.kind === 'item-view') {
      this.state.view.list.items.push(item);

      this.setState({
        view: {
          kind: 'list-view',
          list: this.state.view.list
        }
      });
    } else {
      alert('unexpected app state!');
    }
  }

  render() {
    const node = this.state.view.kind === 'list-view' ?
      <List list={this.state.view.list} add={this.onAddNewItem}/> :
      <EditItem item={this.state.view.item} submit={this.onSubmitNewItem}/>;

    return (
      <div>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h5' color='inherit'>
              {greeting}
            </Typography>
          </Toolbar>
        </AppBar>

      {/* <div className="App">
        <header className="App-header">
          <div className="App-greeter"></div> */}
          {node}
        {/* </header>
      </div> */}
      </div>
    );
  }
}

export default App;
