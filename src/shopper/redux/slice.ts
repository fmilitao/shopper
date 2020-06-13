import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopperState, DialogType } from './state';
import { load } from './localStorage';

// const defaultValue: ShopperState = {
//   selectedList: undefined,
//   lists: [],
// };

// FIXME: placeholder - revert to above
const defaultValue: ShopperState = {
  selectedList: 0,
  lists: [
    {
      name: 'LIDL',
      items: Array.from(Array(20).keys()).map((value, index) => ({
        name: `Item${value}`,
        quantity: index,
        enabled: true,
      })),
    },
  ],
};

const initialState: ShopperState = load(defaultValue);

const isInBounds = <T>(index: number, array: T[]) =>
  index >= 0 && index < array.length;

export const shopperSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // list
    addList: (state, action: PayloadAction<string>) => {
      state.dialogState = undefined;
      state.lists.push({ name: action.payload, items: [] });
    },
    editList: (state, action: PayloadAction<string>) => {
      const { dialogState } = state;
      if (dialogState && dialogState.type === DialogType.EDIT_LIST) {
        const { index } = dialogState;
        const name = action.payload;
        if (isInBounds(index, state.lists)) {
          state.lists[index].name = name;
        }
      }
      state.dialogState = undefined;
    },
    deleteList: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (isInBounds(index, state.lists)) {
        state.lists.splice(index, 1);
      }
    },
    selectList: (state, action: PayloadAction<number>) => {
      state.selectedList = action.payload;
    },
    deselectList: state => {
      state.selectedList = undefined;
    },
    // item
    addItem: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>
    ) => {
      state.dialogState = undefined;
      const { name, quantity } = action.payload;
      const listIndex = state.selectedList;
      if (listIndex !== undefined && isInBounds(listIndex, state.lists)) {
        state.lists[listIndex].items.push({
          name,
          quantity,
          enabled: true,
        });
      }
    },
    editItem: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>
    ) => {
      const { dialogState } = state;
      if (dialogState && dialogState.type === DialogType.EDIT_ITEM) {
        const { index } = dialogState;
        const { name, quantity } = action.payload;
        const listIndex = state.selectedList;
        const itemIndex = index;
        if (
          listIndex !== undefined &&
          isInBounds(listIndex, state.lists) &&
          isInBounds(itemIndex, state.lists[listIndex].items)
        ) {
          const item = state.lists[listIndex].items[itemIndex];
          item.name = name;
          item.quantity = quantity;
        }
      }
      state.dialogState = undefined;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const listIndex = state.selectedList;
      const itemIndex = action.payload;
      if (
        listIndex !== undefined &&
        isInBounds(listIndex, state.lists) &&
        isInBounds(itemIndex, state.lists[listIndex].items)
      ) {
        state.lists[listIndex].items.splice(itemIndex, 1);
      }
    },
    toggleItem: (state, action: PayloadAction<number>) => {
      const listIndex = state.selectedList;
      const itemIndex = action.payload;
      if (
        listIndex !== undefined &&
        isInBounds(listIndex, state.lists) &&
        isInBounds(itemIndex, state.lists[listIndex].items)
      ) {
        const item = state.lists[listIndex].items[itemIndex];
        item.enabled = !item.enabled;
      }
    },
    // dialog
    openAddListDialog: state => {
      state.dialogState = {
        type: DialogType.ADD_LIST,
      };
    },
    openEditListDialog: (state, action: PayloadAction<number>) => {
      state.dialogState = {
        type: DialogType.EDIT_LIST,
        index: action.payload,
      };
    },
    openAddItemDialog: state => {
      state.dialogState = {
        type: DialogType.ADD_ITEM,
      };
    },
    openEditItemDialog: (state, action: PayloadAction<number>) => {
      state.dialogState = {
        type: DialogType.EDIT_ITEM,
        index: action.payload,
      };
    },
    closeDialog: state => {
      state.dialogState = undefined;
    },
  },
});

export const { actions, reducer } = shopperSlice;
