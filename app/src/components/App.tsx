import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List';
import * as test from 'shopper-lib';
import Item from './Item';

class App extends Component {
  render() {
    const longComment = `i really don't know
    what else to say, rather than blah
    ok?`;
    return (
      <div className="App">
        <header className="App-header">
          <div>{test.test}</div>
          <Item name={'item-name1'} comment={'no comment1'} count={12} unit={'packages'} category={'category'}/>
          <Item name={'item-name2'} comment={longComment} count={1} unit={'unidades'} category={'peixe'}/>
        </header>
      </div>
    );
    // return (
    //   <div className="App">
    //     <div>{test.test}</div>
    //     <header className="App-header">
    //       {/* <img src={logo} className="App-logo" alt="logo" /> */}
    //       <p>
    //         Edit <code>src/App.tsx</code> and save to reload.
    //       </p>
    //       <Item name={'item-name'} comment={'no comment'} count={12} category={'category'}/>
    //       <List/>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
  }
}

export default App;
