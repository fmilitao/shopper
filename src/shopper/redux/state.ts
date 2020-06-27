import { ThunkAction, Action } from '@reduxjs/toolkit';
export interface Item {
  id: string;
  name: string;
  comment: string;
  enabled: boolean;
}

const ItemSchema = {
  type: 'object',
  required: ['id', 'name', 'enabled'],
  properties: {
    id: {
      type: 'string',
      minLength: 1,
    },
    name: {
      type: 'string',
      minLength: 1,
    },
    comment: {
      type: 'string',
    },
    enabled: {
      type: 'boolean',
    },
  },
};

export interface List {
  id: string;
  name: string;
  items: Item[];
}

const ListSchema = {
  type: 'object',
  required: ['id', 'name', 'items'],
  properties: {
    id: {
      type: 'string',
      minLength: 1,
    },
    name: {
      type: 'string',
      minLength: 1,
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
  listUndo?: List[];
  itemUndo?: Item[];
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
