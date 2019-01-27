import React, { Component } from 'react';
import './List.css';
import { model } from 'shopper-lib';
import Item from './Item';
import { PoseGroup } from 'react-pose';

type ListPropType = {
    list: model.List,
    add: (list: model.List) => void,
};

type ListStateType = {
    items: model.Item[],
};

const sortFunction = (a: model.Item, b: model.Item) => {
    if (a.done === b.done) {
        return a.uuid - b.uuid;
    }
    if (!a.done) {
        return -1;
    }
    return 1;
};

class List extends Component<ListPropType, ListStateType> {
    constructor(props: Readonly<ListPropType>) {
        super(props);
        this.state = {
            items: props.list.items.slice().sort(sortFunction),
        };
    }

    onButtonPress() {
        this.props.add(this.props.list);
    }

    // FIXME: horrible mess
    updateItem() {
        const sorted = this.state.items.slice();
        sorted.sort(sortFunction);
        this.setState({
            ...this.state,
            items: sorted
        });
    }

    render() {
        const count = this.state.items.length;
        const done = this.state.items.filter((item) => !item.done).length;

        // FIXME: would style 'this.handleChange = this.handleChange.bind(this);' simplify?
        return (<div className="List">
            <div className='List-header'>{this.props.list.name}: {done} / {count}</div>
            <button className="List-btn" onClick={() => this.onButtonPress()}>Add Item</button>
            <PoseGroup>
                {this.state.items.map((item) => (<Item key={item.uuid} item={item} inputChange={() => this.updateItem()} />))}
            </PoseGroup>
        </div>);
    }
}

export default List;
