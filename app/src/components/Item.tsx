import React, { Component } from 'react';
import posed from 'react-pose';
import './Item.css';
import { model } from 'shopper-lib';

const ItemBox = posed.div({
  // FIXME: issue with not being able to scroll!
  // see: https://github.com/Popmotion/popmotion/pull/628
  // draggable: 'x',
  visible: {
    transition: {
      duration: 300,
    },
    // x: 0,
    opacity: 1,
    scale: 1,
  },
  hidden: {
    transition: {
      duration: 100,
    },
    // x: 0,
    opacity: 0.2,
    scale: 1,
  },
  initial: {
    transition: {
      duration: 500,
    },
    // x: -200,
    opacity: 0.2,
    scale: 0.95
  }
});

type State = {
};

type Props = {
  item: model.Item,
  toggle: (item: model.Item) => void,
};

class Item extends Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.props.toggle(this.props.item);
  }

  render() {
    const item = this.props.item;

    return (<ItemBox {...this.props} className='Item'
      pose={!item.done ? 'visible' : 'hidden'}
      initialPose='initial'
      onClick={this.toggle} >

      <div className='Item-left-block'>
        <div className='Item-name'>{item.name} {item.uuid}</div>

        {item.comments && <div className='Item-comment'>{item.comments}</div>}
      </div>

      <div className='Item-right-block'>
        <div className='Item-count'>{item.quantity.amount}</div>
        <div className='Item-unit'>{item.quantity.unit}</div>
      </div>
    </ItemBox>);
  }
}

export default Item;
