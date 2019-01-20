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
    visible: {
        transition: {
            duration: 1000,
        },
        opacity: 1
    },
    hidden: {
        transition: {
            duration: 100,
        },
        opacity: 0.2
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

        return (<ItemBox className='Item'
            pose={!this.state.disabled ? 'visible' : 'hidden'}
            onClick={() => this.toggle()}>

            <div className="Item-left-block">
                <div className="Item-name">{item.name}</div>

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
