import React, { Component } from 'react';
import './App.css';
import List from './List';
import { greeting, model } from 'shopper-lib';

class App extends Component {
  render() {
    const sampleList: model.List = new model.List('LIDL');

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-greeter">{greeting}</div>
          <List list={sampleList} />
        </header>
      </div>
    );
  }
}

export default App;
