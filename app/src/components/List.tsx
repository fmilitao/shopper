import React, { Component } from 'react';
import './List.css';
import { model } from 'shopper-lib';
import Item from './Item';
import posed, { PoseGroup } from 'react-pose';

type ListPropType = {
    list: model.List,
};

type ListStateType = {
    items: model.Item[],
};

const PosedDiv = posed.div();

class List extends Component<ListPropType, ListStateType> {
    constructor(props: Readonly<ListPropType>) {
        super(props);
        this.state = {
            items: props.list.items,
        };
    }

    onButtonPress() {
        const sampleItem: model.Item = new model.Item(
            'bananas',
            {
                amount: 5,
                unit: 'banana'
            },
            false,
            `i really don't know
    what else to say, rather than blah
    ok?`
        );

        // TODO: or doing the atomic one?
        this.setState({
            ...this.state,
            items: [...this.state.items, { ...sampleItem }]
        });
    }

    // FIXME: horrible mess
    updateItem() {
        const sorted = this.state.items.slice();
        sorted.sort((a, b) => {
            if (a.done === b.done) {
                return a.uuid - b.uuid;
            }
            if (!a.done) {
                return -1;
            }
            return 1;
        });
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
