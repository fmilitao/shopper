// to avoid precision errors, make sure to use only
// the integer part of `number`
type Price = {
    priceInCents: number,
    currency: Currency,
};

enum Currency {
    POUND = '£',
    EURO = '€',
    DOLLAR = '$',
};

function newPrice(value: number, currency: Currency = Currency.POUND): Price {
    return {
        priceInCents: value,
        currency
    };
}

type Quantity = {
    amount: number,
    unit: string,
};

type Item = {
    name: string,
    price?: Price,
    quantity: Quantity,
    comments: string,
    done: boolean,
};

class List {
    public items: Item[] = [];
    constructor(
        public name: string
    ) {
        // intentionally empty
    }

    addItem(item: Item) {
        this.items.push(item);
    }
}

export {
    Price,
    Currency,
    Quantity,
    newPrice,
    Item,
    List,
};

/*
List Manager:
 > create list
 > copy list
 > delete list
 > move list up/down
 > undo last operations?

List:
 > create list (empty)
 > import (from clipboard, from google sheets)
 > export (to clipboard, to google sheets)
 > rename list
 > get count of pending/completed/total items
 > get current cost estimate
 > sort/filter list by done/category/shop

Item:
 > add item
 > delete item
 > edit item
 > move item in list
 > copy/move item to list


Pages:
 * ListView for showing lists
 * ListAdd page
 * ListEdit page
 * ItemView for showing items
 * ItemAdd page
 * ItemEdit page
*/
