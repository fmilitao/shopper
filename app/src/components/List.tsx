import React, { Component } from 'react';
import './List.css';
import { model } from 'shopper-lib';
import Item from './Item';
import { PoseGroup } from 'react-pose';

const sortFunction = (a: model.Item, b: model.Item) => {
  // sort by uuid on same done status
  if (a.done === b.done) {
    return a.uuid - b.uuid;
  }
  // not done first
  if (!a.done) {
    return -1;
  }
  // else after
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

    this.toggleItem = this.toggleItem.bind(this);
  }

  toggleItem(item: model.Item) {
    this.setState((prev) => {
      // FIXME: not ideal, how should this be done in react?
      item.done = !item.done;
      return prev;
    });
  }

  render() {
    const count = this.props.list.items.length;
    const done = this.props.list.items.filter((item) => !item.done).length;
    const items = this.props.list.items.slice().sort(sortFunction);

    return (<div className='List'>
      <div className='List-header'>{done} / {count}</div>
      <PoseGroup>
        {items.map((item) => (<Item key={item.uuid} item={item} toggle={this.toggleItem} />))}
      </PoseGroup>
    </div>);
  }
}

export default List;
