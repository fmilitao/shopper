

type Shop = {
    name: string
};

type Item = {
    shop: Shop,
    name: string,
    quantity: number,
    quantityKind: string,
    category: string,
    comments: string,
    price: number
};

type List = {
    items: Item[]
};
