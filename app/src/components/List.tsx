import React, { Component } from 'react';
import './List.css';
import { model } from 'shopper-lib';
import Item from './Item';
import { PoseGroup } from 'react-pose';

const sortFunction = (a: model.Item, b: model.Item) => {
  if (a.done === b.done) {
    return a.uuid - b.uuid;
  }
  if (!a.done) {
    return -1;
  }
  return 1;
};


type Props = {
  list: model.List,
};

type State = {
  list: model.List,
};

class List extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      list: props.list,
    };
  }

  // FIXME: horrible mess
  updateItem() {
    // this.setState((prevState) => {
    //   const sorted = prevState.items.slice();
    //   sorted.sort(sortFunction);
    //   return {
    //     ...prevState,
    //     items: sorted
    //   };
    // });
  }

  render() {
    const count = this.props.list.items.length;
    const done = this.props.list.items.filter((item) => !item.done).length;
    const items = this.props.list.items.slice().sort(sortFunction);

    return (<div className="List">
      <div className='List-header'>{this.props.list.name}: {done} / {count}</div>
      <PoseGroup>
        {items.map((item) => (<Item key={item.uuid} item={item} inputChange={() => this.updateItem()} />))}
      </PoseGroup>
    </div>);
  }
}

export default List;
