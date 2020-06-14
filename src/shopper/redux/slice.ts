import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopperState, DialogType, AppThunk } from './state';
import { load, validate } from './localStorage';
import { logger } from './store';

const defaultValue: ShopperState = {
  selectedList: undefined,
  lists: [],
};

const initialState: ShopperState = load(defaultValue);

const isInBounds = <T>(index: number, array: T[]) =>
  index >= 0 && index < array.length;

export const shopperSlice = createSlice({
  name: 'shopper',
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
    copyToClipboard: state => {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(JSON.stringify(state));
        logger.log('Copied to clipboard.');
      } else {
        logger.log('ERROR: Missing clipboard browser functionality');
      }
    },
    updateState: (state, action: PayloadAction<ShopperState>) => {
      state.lists = action.payload.lists;
      state.selectedList = undefined;
    },
  },
});

export const importFromClipboard = (): AppThunk => dispatch => {
  if (navigator?.clipboard?.readText) {
    navigator.clipboard
      .readText()
      .then(value => {
        const obj = JSON.parse(value);
        const state = validate(obj);
        dispatch(actions.updateState(state));
        logger.log('Imported from clipboard');
      })
      .catch(error => {
        console.log(error);
        logger.log(`ERROR: ${error}`);
      });
  } else {
    logger.log('ERROR: Missing clipboard browser functionality');
  }
};

export const { actions, reducer } = shopperSlice;
