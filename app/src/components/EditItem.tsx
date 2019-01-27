import React, { Component } from 'react';
import './EditItem.css';
import { model } from 'shopper-lib';

type EditItemPropType = {
    item: model.Item | null,
    submit: (newItem: model.Item) => void,
};

type EditItemStateType = {
    name: string,
    quantity: string,
    unit: string,
    comments: string,
};

class EditItem extends Component<EditItemPropType, EditItemStateType> {

    constructor(props: Readonly<EditItemPropType>) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        const item = props.item;
        if (item) {
            this.state = {
                name: item.name,
                quantity: item.quantity.amount.toString(),
                unit: item.quantity.unit,
                comments: item.comments || '',
            };
        } else {
            this.state = {
                name: 'Test',
                quantity: '0',
                unit: 'unit',
                comments: 'no comments',
            };
        }
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
        event.preventDefault();
        const item = new model.Item(
            this.state.name,
            new model.Quantity(parseFloat(this.state.quantity), this.state.unit),
            this.state.comments
        );
        this.props.submit(item);
    }

    render() {
        return (
            <div className='Edit'>
                <form onSubmit={this.handleSubmit}>
                    Name: <input type="text" name='name' value={this.state.name} onChange={this.handleChange} />
                    Quantity: <input type="number" step='any' name='quantity' value={this.state.quantity} onChange={this.handleChange} />
                    Unit: <input type="text" name='unit' value={this.state.unit} onChange={this.handleChange} />
                    Comments:
                    <textarea name='comments' value={this.state.comments} onChange={this.handleChange} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default EditItem;
