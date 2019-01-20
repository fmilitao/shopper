import React, { Component } from 'react';
import posed from 'react-pose';
import './Item.css';
import { model } from 'shopper-lib';

// FIXME: how to manage the state?
type ItemStateType = {
    disabled: boolean,
};

type ItemPropsType = {
    item: model.Item,
    inputChange: () => void,
};

const ItemBox = posed.div({
    // FIXME: issue with not being able to scroll!
    // see: https://github.com/Popmotion/popmotion/pull/628
    // draggable: 'x',
    visible: {
        transition: {
            duration: 300,
        },
        x: 0,
        opacity: 1,
        scale: 1,
    },
    hidden: {
        transition: {
            duration: 100,
        },
        opacity: 0.2,
        // scale: 0.95
    },
    initial: {
        transition: {
            duration: 500,
        },
        x: -200,
        opacity: 0.2,
        scale: 0.95
    }
});

class Item extends Component<ItemPropsType, ItemStateType> {
    private item: model.Item;

    constructor(props: Readonly<ItemPropsType>) {
        super(props);

        this.item = props.item;
        this.state = {
            disabled: this.item.done
        };
    }

    toggle() {
        this.item.done = !this.item.done;
        this.setState({
            disabled: this.item.done
        });
        this.props.inputChange();
    }

    render() {
        const item = this.item;

        return (<ItemBox {...this.props} className='Item'
            pose={!this.state.disabled ? 'visible' : 'hidden'}
            initialPose='initial'
            onClick={() => this.toggle()} >

            <div className="Item-left-block">
                <div className="Item-name">{item.name} {item.uuid}</div>

                {item.comments && <div className="Item-comment">{item.comments}</div>}
            </div>

            <div className="Item-right-block">
                <div className="Item-count">{item.quantity.amount}</div>
                <div className="Item-unit">{item.quantity.unit}</div>
            </div>
        </ItemBox>);
    }
}

export default Item;
