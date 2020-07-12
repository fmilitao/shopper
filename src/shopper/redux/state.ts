import { ThunkAction, Action } from '@reduxjs/toolkit';

const SORT_MODES = ['default', 'categories', 'alphabetic'] as const;
export type SortMode = typeof SORT_MODES[number];

const CATEGORY_MODES = ['text', 'color', 'hidden'] as const;
export type CategoryMode = typeof CATEGORY_MODES[number];

export interface Category {
  name: string;
}

export interface Item {
  id: string;
  name: string;
  comment: string;
  enabled: boolean;
  category?: string;
}

export type SimpleItem = Omit<Item, 'enabled' | 'id'>;

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
    category: {
      type: 'string',
      minLength: 1,
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
  sortMode: SortMode;
  categoryMode: CategoryMode;
  categoryColorMapper?: {
    [category: string]: string;
  };
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
    sortMode: { type: 'string', enum: SORT_MODES },
    categoryMode: { type: 'string', enum: CATEGORY_MODES },
    categoryColorMapper: {
      type: 'object',
      patternProperties: {
        '^.*$': {
          type: 'string',
        },
      },
      additionalProperties: false,
    },
    lists: {
      type: 'array',
      minItems: 0,
      items: ListSchema,
    },
  },
  additionalProperties: false,
  required: ['lists', 'categoryMode', 'sortMode'],
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
