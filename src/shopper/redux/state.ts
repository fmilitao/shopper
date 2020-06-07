export interface Item {
  name: string;
  quantity: number;
  enabled: boolean;
}

const ItemSchema = {
  type: 'object',
  required: ['name', 'quantity', 'enabled'],
  properties: {
    name: {
      type: 'string',
    },
    quantity: {
      type: 'number',
    },
    enabled: {
      type: 'boolean',
    },
  },
};

export interface List {
  name: string;
  items: Item[];
}

const ListSchema = {
  type: 'object',
  required: ['name', 'items'],
  properties: {
    name: {
      type: 'string',
    },
    items: {
      type: 'array',
      minItems: 0,
      items: ItemSchema,
    },
  },
};

export interface ShopperState {
  selectedList: number | undefined;
  selectedItem: number | undefined;
  lists: List[];
}

export const ShopperStateSchema = {
  title: 'ShopperState',
  type: 'object',
  properties: {
    selectedList: {
      type: 'number',
    },
    selectedIndex: {
      type: 'number',
    },
    lists: {
      type: 'array',
      minItems: 0,
      items: ListSchema,
    },
  },
  additionalProperties: false,
  required: ['lists'],
};
