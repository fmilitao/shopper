import React, { Component } from 'react';
import './List.css';

type StateType = {
    list: string[],
    showOther: boolean,
};

class List extends Component<{}, StateType> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            list: ['test'],
            showOther: false,
        };
    }

    onButtonPress() {
        // TODO: or doing the atomic one?
        this.setState({
            ...this.state,
            list: [...this.state.list, `ok!${this.state.list.length}`]
        });
    }

    onButtonPress2() {
        this.setState({
            ...this.state,
            showOther: !this.state.showOther
        });
    }

    render() {
        if (this.state.showOther) {
            return (<div onClick={() => this.onButtonPress2()}>I am the other</div>);
        }
        return (<div className="List">
            <button className="List-btn" onClick={() => this.onButtonPress2()}>other</button>
            <button className="List-btn" onClick={() => this.onButtonPress()}>Test</button>
            <div>List contents:</div>
            {this.state.list.map((value, index) => (<div>{index}: {value}</div>))}
        </div>);
    }
}

export default List;
