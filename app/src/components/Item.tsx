import React, { Component } from 'react';
import './Item.css';

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
        let classNames = "Item";
        if (this.state.disabled) {
            classNames += " Item-disabled";
        }
            // <div className="Item-category">{this.props.category.substring(0, 3)}</div>
        return (<div className={classNames} onClick={() => this.toggle()}>

            <div className="Item-left-block">
                <div className="Item-name">{this.props.name}</div>

                <div className="Item-comment">{this.props.comment}</div>
            </div>

            <div className="Item-right-block">
                <div className="Item-count">{this.props.count}</div>
                <div className="Item-unit">{this.props.unit}</div>
            </div>
        </div>);
    }
}

export default Item;
