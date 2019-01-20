import React, { Component } from 'react';
import './List.css';
import { model } from 'shopper-lib';
import Item from './Item';

type ListPropType = {
    list: model.List,
};

type ListStateType = {
    items: model.Item[],
};

class List extends Component<ListPropType, ListStateType> {
    constructor(props: Readonly<ListPropType>) {
        super(props);
        this.state = {
            items: props.list.items,
        };
    }

    onButtonPress() {
        const sampleItem: model.Item = {
            name: 'bananas',
            quantity: {
                amount: 5,
                unit: 'banana'
            },
            comments: `i really don't know
    what else to say, rather than blah
    ok?`,
            done: false,
        };

        // TODO: or doing the atomic one?
        this.setState({
            ...this.state,
            items: [...this.state.items, { ...sampleItem }]
        });
    }

    // FIXME: horrible mess
    updateItem() {
        this.setState({
            ...this.state
        });
    }

    render() {
        const count = this.state.items.length;
        const done = this.state.items.filter((item) => !item.done).length;

        return (<div className="List">
            <div className='List-header'>{this.props.list.name}: {done} / {count}</div>
            <button className="List-btn" onClick={() => this.onButtonPress()}>Add Item</button>
            {this.state.items.map((item) => (<Item item={item} inputChange={() => this.updateItem()}/>))}
        </div>);
    }
}

export default List;
