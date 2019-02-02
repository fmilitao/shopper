import React, { Component } from 'react';
import './List.css';
import { model } from 'shopper-lib';
import Item from './Item';
import { PoseGroup } from 'react-pose';
import AddList from './AddList';

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

    onButtonPress2(name: string) {
        console.log(name);
    }

    // FIXME: horrible mess
    updateItem() {
        this.setState((prevState) => {
            const sorted = prevState.items.slice();
            sorted.sort(sortFunction);
            return {
                ...prevState,
                items: sorted
            };
        });
    }

    render() {
        const count = this.state.items.length;
        const done = this.state.items.filter((item) => !item.done).length;

        return (<div className="List">
            <div className='List-header'>{this.props.list.name}: {done} / {count}</div>
            <PoseGroup>
                {this.state.items.map((item) => (<Item key={item.uuid} item={item} inputChange={() => this.updateItem()} />))}
            </PoseGroup>

            <AddList onCreate={(name) => this.onButtonPress2(name)}/>
        </div>);
    }
}

export default List;
