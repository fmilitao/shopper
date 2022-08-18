import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ShopperState, DialogType, AppThunk } from './state';
import { load, validate } from './localStorage';
import { logger } from '../components/common/Notifier';
import { newListId, newItemId } from './id';
import { serialize } from '../components/google-sheets/gsheets-serde';
import { importText } from '../importer';
import {
  batchClear,
  batchUpdate,
  getValues,
} from '../components/google-sheets/spreadsheet';

function loadOrDefault(): ShopperState {
  const defaultValue: ShopperState = {
    selectedList: undefined,
    sortMode: 'default',
    itemClick: false,
    googleSheetActions: false,
    categoryMode: 'text',
    lists: [],
  };

  try {
    return load(defaultValue);
  } catch (error) {
    logger.error(`Failed to load local state: ${error}`);
  }
  return defaultValue;
}

const isInBounds = <T>(index: number, array: T[]) =>
  index >= 0 && index < array.length;

export const shopperSlice = createSlice({
  name: 'shopper',
  initialState: loadOrDefault(),
  reducers: {
    // sort
    setDefaultSort: state => {
      state.sortMode = 'default';
    },
    setCategorySort: state => {
      state.sortMode = 'categories';
    },
    setAlphabeticSort: state => {
      state.sortMode = 'alphabetic';
    },
    // item click
    toggleItemClick: state => {
      state.itemClick = !state.itemClick;
    },
    toggleGoogleSheetActions: state => {
      state.googleSheetActions = !state.googleSheetActions;
    },
    // category
    setTextCategoryMode: state => {
      state.categoryMode = 'text';
    },
    setHiddenCategoryMode: state => {
      state.categoryMode = 'hidden';
    },
    setColorCategoryMode: state => {
      state.categoryMode = 'color';
    },
    // list
    addList: (
      state,
      action: PayloadAction<{
        name: string;
        items: { name: string; comment: string }[];
      }>
    ) => {
      const { name, items } = action.payload;
      state.lists.push({
        id: newListId(),
        name,
        items: items.map(({ name, comment }) => ({
          id: newItemId(),
          name,
          comment,
          enabled: true,
        })),
      });
    },
    editList: (state, action: PayloadAction<string>) => {
      const { dialogState } = state;
      if (dialogState && dialogState.type === DialogType.EDIT_LIST) {
        const { index } = dialogState;
        const name = action.payload;
        if (isInBounds(index, state.lists)) {
          state.lists[index].name = name;
          logger.info('List updated');
        }
      }
    },
    deleteList: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (isInBounds(index, state.lists)) {
        const [deleted] = state.lists.splice(index, 1);

        if (state.listUndo === undefined) {
          state.listUndo = [];
        }
        state.listUndo.push(deleted);

        logger.info(`List "${deleted.name}" deleted`);
      }
    },
    selectList: (state, action: PayloadAction<number>) => {
      state.selectedList = action.payload;
    },
    deselectList: state => {
      state.selectedList = undefined;
      state.itemUndo = undefined;
    },
    // undo
    undoItemDeletion: state => {
      const listIndex = state.selectedList;
      if (
        listIndex !== undefined &&
        isInBounds(listIndex, state.lists) &&
        state.itemUndo !== undefined &&
        state.itemUndo.length > 0
      ) {
        const undo = state.itemUndo.pop();
        if (undo !== undefined) {
          state.lists[listIndex].items.push(undo);
          logger.info('Item restored');
          return;
        }
      }
      logger.warn('Nothing to undo');
    },
    undoListDeletion: state => {
      if (state.listUndo !== undefined && state.listUndo.length > 0) {
        const undo = state.listUndo.pop();
        if (undo !== undefined) {
          state.lists.push(undo);
          logger.info(`List "${undo.name}" restored`);
          return;
        }
      }
      logger.warn('Nothing to undo');
    },
    // item
    addItem: (
      state,
      action: PayloadAction<{
        name: string;
        comment: string;
        category?: string;
      }>
    ) => {
      const { name, comment, category } = action.payload;
      const listIndex = state.selectedList;
      if (listIndex !== undefined && isInBounds(listIndex, state.lists)) {
        state.lists[listIndex].items.push({
          id: newItemId(),
          name,
          comment,
          enabled: true,
          category,
        });
      }
    },
    editItem: (
      state,
      action: PayloadAction<{
        name: string;
        comment: string;
        listIndex?: number;
        category?: string;
      }>
    ) => {
      const { dialogState } = state;
      if (dialogState && dialogState.type === DialogType.EDIT_ITEM) {
        const { index } = dialogState;
        const {
          name,
          comment,
          listIndex: newListIndex,
          category,
        } = action.payload;

        const listIndex = state.selectedList;
        const itemIndex = index;
        if (
          listIndex !== undefined &&
          isInBounds(listIndex, state.lists) &&
          isInBounds(itemIndex, state.lists[listIndex].items)
        ) {
          const item = state.lists[listIndex].items[itemIndex];
          item.name = name;
          item.comment = comment;
          item.category = category;

          if (
            newListIndex !== undefined &&
            listIndex !== newListIndex &&
            isInBounds(newListIndex, state.lists)
          ) {
            const [moved] = state.lists[listIndex].items.splice(itemIndex, 1);
            state.lists[newListIndex].items.push(moved);
            logger.info('Item moved');
          } else {
            logger.info('Item updated');
          }
        }
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const listIndex = state.selectedList;
      const itemIndex = action.payload;
      if (
        listIndex !== undefined &&
        isInBounds(listIndex, state.lists) &&
        isInBounds(itemIndex, state.lists[listIndex].items)
      ) {
        const [deleted] = state.lists[listIndex].items.splice(itemIndex, 1);

        if (state.itemUndo === undefined) {
          state.itemUndo = [];
        }
        state.itemUndo.push(deleted);

        logger.info('Item deleted');
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
    openSetupGoogleSheetsDialog: state => {
      state.dialogState = {
        type: DialogType.SETUP_GOOGLE_SHEETS,
      };
    },
    closeDialog: state => {
      state.dialogState = undefined;
    },
    copyToClipboard: state => {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(JSON.stringify(state));
        logger.info('Copied to clipboard');
      } else {
        logger.error('ERROR: denied use of browser clipboard');
      }
    },
    copyItemsToClipboard: state => {
      const listIndex = state.selectedList;
      if (listIndex !== undefined && isInBounds(listIndex, state.lists)) {
        if (navigator?.clipboard?.writeText) {
          const items = state.lists[listIndex].items;
          const text = items
            .map(({ name, comment }) => `${name} ${comment}`)
            .join('\n');
          navigator.clipboard.writeText(text);
          logger.info(`Copied ${items.length} items to clipboard`);
        } else {
          logger.error('ERROR: denied use of browser clipboard');
        }
      }
    },
    updateState: (state, action: PayloadAction<ShopperState>) => {
      state.selectedList = undefined;
      state.categoryColorMapper = undefined;
      Object.assign(state, action.payload);
    },
    // set sign in
    setGoogleSheetsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.googleSheetsLoggedIn = action.payload;
    },
    setGoogleSheetsDetails: (
      state,
      action: PayloadAction<ShopperState['googleSheets']>
    ) => {
      state.googleSheets = action.payload;
    },
  },
});

export const copyToGoogleSheet = (): AppThunk => async (_, getState) => {
  try {
    const state = getState();
    if (state.googleSheets === undefined) {
      logger.error('Missing google sheets info');
      return;
    }
    const values = serialize(state, true);
    const spreadsheetId = state.googleSheets.spreadsheetId;
    const sheet = state.googleSheets.range;
    // clear is necessary to ensure any old value is removed
    await batchClear(spreadsheetId, sheet);
    await batchUpdate(spreadsheetId, sheet, values);
    logger.info('Copied to google sheet');
  } catch (error) {
    console.log(error);
    logger.error(`ERROR: ${error}`);
  }
};

export const importFromGoogleSheets =
  (): AppThunk => async (dispatch, getState) => {
    try {
      const state = getState();
      if (state.googleSheets === undefined) {
        logger.error('Missing google sheets info');
        return;
      }
      const spreadsheetId = state.googleSheets.spreadsheetId;
      const sheet = state.googleSheets.range;
      const values = await getValues(spreadsheetId, sheet);
      dispatch(actions.updateState(values));
      logger.info('Imported from google sheet');
    } catch (error) {
      console.log(error);
      logger.error(`ERROR: ${error}`);
    }
  };

export const addItemsFromClipboard =
  (): AppThunk => async (dispatch, getState) => {
    if (navigator?.clipboard?.readText) {
      navigator.clipboard
        .readText()
        .then(value => {
          const items = importText(value);
          const state = getState();

          const listIndex = state.selectedList;
          if (
            items.length > 0 &&
            listIndex !== undefined &&
            isInBounds(listIndex, state.lists)
          ) {
            const clonedState = JSON.parse(JSON.stringify(state));
            const fullItems = items.map(({ name, comment }) => ({
              id: newItemId(),
              name,
              comment,
              enabled: true,
            }));
            clonedState.lists[listIndex].items.push(...fullItems);
            dispatch(actions.updateState(clonedState));
            logger.info(`Added ${items.length ?? 0} items from clipboard`);
          } else {
            logger.error('Failed to add items from clipboard');
          }
        })
        .catch(error => {
          console.log(error);
          logger.error(`ERROR: ${error}`);
        });
    } else {
      logger.error('ERROR: denied use of browser clipboard');
    }
  };

export const importFromClipboard = (): AppThunk => dispatch => {
  if (navigator?.clipboard?.readText) {
    navigator.clipboard
      .readText()
      .then(value => {
        const obj = JSON.parse(value);
        const state = validate(obj);
        dispatch(actions.updateState(state));
        logger.info('Imported from clipboard');
      })
      .catch(error => {
        console.log(error);
        logger.error(`ERROR: ${error}`);
      });
  } else {
    logger.error('ERROR: denied use of browser clipboard');
  }
};

export const { actions, reducer } = shopperSlice;
