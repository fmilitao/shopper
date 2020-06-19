import { ThunkAction, Action } from '@reduxjs/toolkit';
export interface Item {
  name: string;
  quantity: number; // TODO: switch to comment: string;
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
  selectedList?: number;
  lists: List[];
  // not in schema
  dialogState?: DialogState;
}

export const ShopperStateSchema = {
  title: 'ShopperState',
  type: 'object',
  properties: {
    selectedList: {
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

// not in schema
export enum DialogType {
  ADD_LIST,
  EDIT_LIST,
  ADD_ITEM,
  EDIT_ITEM,
}

export interface AddListDialog {
  type: DialogType.ADD_LIST;
}
export interface AddItemDialog {
  type: DialogType.ADD_ITEM;
}

export interface EditListDialog {
  type: DialogType.EDIT_LIST;
  index: number;
}

export interface EditItemDialog {
  type: DialogType.EDIT_ITEM;
  index: number;
}

export type DialogState =
  | AddListDialog
  | AddItemDialog
  | EditListDialog
  | EditItemDialog;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ShopperState,
  unknown,
  Action<string>
>;
