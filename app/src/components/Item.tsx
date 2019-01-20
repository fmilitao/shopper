import React, { Component } from 'react';
import './Item.css';
import posed from 'react-pose';

type ItemPropType = {
    name: string,
    count: number,
    unit: string,
    comment: string,
    category: string,
};

type ItemStateType = {
    disabled: boolean;
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

class Item extends Component<ItemPropType, ItemStateType> {
    constructor(props: Readonly<ItemPropType>) {
        super(props);

        this.state = {
            disabled: false
        };
    }

    toggle() {
        this.setState({
            disabled: !this.state.disabled
        });
    }

    render() {
        return (<ItemBox className='Item'
            pose={!this.state.disabled ? 'visible' : 'hidden'}
            onClick={() => this.toggle()}>

            <div className="Item-left-block">
                <div className="Item-name">{this.props.name}</div>

                <div className="Item-comment">{this.props.comment}</div>
            </div>

            <div className="Item-right-block">
                <div className="Item-count">{this.props.count}</div>
                <div className="Item-unit">{this.props.unit}</div>
            </div>
        </ItemBox>);
    }
}

export default Item;
