import React, { Component } from 'react';
import './EditItem.css';

type EditItemStateType = {
    name: string,
    quantity: string,
    unit: string,
    comments: string,
};

class EditItem extends Component<{}, EditItemStateType> {

    constructor(props: Readonly<{}>) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            name: 'Test',
            quantity: '0',
            unit: 'unit',
            comments: 'no comments',
        };
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (event.target.value === null || event.target.value === undefined) {
            return;
        }
        const key = event.target.name as keyof EditItemStateType;
        // @ts-ignore Not TS clever enough to tell that the next line is safe
        this.setState({ [key]: event.target.value });
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        alert('The value is: ' + JSON.stringify(this.state, null, 2));
        event.preventDefault();
    }

    // FIXME: all broken follows:
    // needs Item: name, quantity, unit, comments
    render() {
        return (
            <div className='Edit'>
                <form id='usrform' onSubmit={this.handleSubmit}>
                    Name: <input type="text" name='name' value={this.state.name} onChange={this.handleChange} />
                    Quantity: <input type="number" step='any' name='quantity' value={this.state.quantity} onChange={this.handleChange} />
                    Unit: <input type="text" name='unit' value={this.state.unit} onChange={this.handleChange} />
                    Comments:
                    <textarea form='usrform' name='comments' value={this.state.comments} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default EditItem;
