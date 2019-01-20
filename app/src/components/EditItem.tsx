import React, { Component } from 'react';
import './EditItem.css';

class EditItem extends Component<{}, {}> {

    private input: HTMLInputElement | null;
    constructor(props: Readonly<{}>) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.input = null;
    }

    handleSubmit() {
        alert('The value is: ' + this.input!.value);
    }

    // FIXME: all broken follows:
    // needs Item: name, quantity, unit, comments
    render() {
        return (
            <div className='Edit'>
                <form id='usrform' onSubmit={this.handleSubmit}>
                    <label>
                        Name: <input type="text" ref={(input) => this.input = input} />
                    </label>
                    <label>
                        Quantity: <input type="text" ref={(input) => this.input = input} />
                        Unit: <input type="text" ref={(input) => this.input = input} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                Comments:
                <textarea form='usrform'>test</textarea>
            </div>
        );
    }
}

export default EditItem;
