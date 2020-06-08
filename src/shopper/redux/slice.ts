import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ShopperState } from './state';
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

export const shopperSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<string>) => {
      state.lists.push({ name: action.payload, items: [] });
    },
    editList: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      state.lists[action.payload.index].name = action.payload.name;
    },
    deleteList: (state, action: PayloadAction<number>) => {
      state.lists.splice(action.payload, 1);
    },
    selectList: (state, action: PayloadAction<number>) => {
      state.selectedList = action.payload;
    },
    deselectList: state => {
      state.selectedList = undefined;
    },
    addItem: (
      state,
      action: PayloadAction<{ name: string; quantity: number }>
    ) => {
      const listIndex = state.selectedList;
      if (
        listIndex !== undefined &&
        listIndex >= 0 &&
        listIndex < state.lists.length
      ) {
        state.lists[listIndex].items.push({
          name: action.payload.name,
          quantity: action.payload.quantity,
          enabled: true,
        });
      }
    },
    editItem: (
      state,
      action: PayloadAction<{ index: number; name: string; quantity: number }>
    ) => {
      const listIndex = state.selectedList;
      if (
        listIndex !== undefined &&
        listIndex >= 0 &&
        listIndex < state.lists.length
        // TODO: bound check on index
      ) {
        const item = state.lists[listIndex].items[action.payload.index];
        item.name = action.payload.name;
        item.quantity = action.payload.quantity;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const listIndex = state.selectedList;
      if (
        listIndex !== undefined &&
        listIndex >= 0 &&
        listIndex < state.lists.length
      ) {
        state.lists[listIndex].items.splice(action.payload, 1);
      }
    },
    toggleItem: (state, action: PayloadAction<number>) => {
      const listIndex = state.selectedList;
      if (
        listIndex !== undefined &&
        listIndex >= 0 &&
        listIndex < state.lists.length
      ) {
        const item = state.lists[listIndex].items[action.payload];
        item.enabled = !item.enabled;
      }
    },
  },
});

export const { actions, reducer } = shopperSlice;
