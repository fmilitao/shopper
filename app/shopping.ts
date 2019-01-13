// to avoid precision errors, make sure to use only
// the integer part of `number`
type Price = {
    priceInCents: number;
};

type Item = {
    shop: string,
    name: string,
    quantity: number,
    quantityKind: string,
    category: string,
    comments: string,
    price: Price,
    done: boolean,
};

type List = {
    items: Item[],
};

/*
List Manager:
 > create list
 > copy list
 > delete list
 > move list up/down

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
*/
