import { configureStore } from '@reduxjs/toolkit';
import {
  reducer,
  actions as sliceActions,
  importFromClipboard,
  importFromGoogleSheets,
  copyToGoogleSheet,
  addItemsFromClipboard,
} from './slice';
import { save } from './localStorage';
import { enqueueIfNeeded, dequeueIfNeeded, isShopperQueued } from '../history';

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;

export const actions = {
  ...sliceActions,
  importFromClipboard,
  importFromGoogleSheets,
  copyToGoogleSheet,
  addItemsFromClipboard,
};

// auto-save
store.subscribe(() => {
  const state = store.getState();
  save(state);
  // console.log(JSON.stringify(state));

  const isQueued = isShopperQueued();
  const isListSelected = state.selectedList !== undefined;

  enqueueIfNeeded(isQueued, isListSelected);
  dequeueIfNeeded(isQueued, isListSelected);
});
