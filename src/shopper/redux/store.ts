import { configureStore } from '@reduxjs/toolkit';
import { reducer, actions as sliceActions, importFromClipboard } from './slice';
import { save } from './localStorage';

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;

export const actions = {
  ...sliceActions,
  importFromClipboard,
};

// note that logger.log will be replaced by the `Notifier` element.
export const logger = { log: (message: string) => console.log(message) };

// auto-save
store.subscribe(() => {
  const state = store.getState();
  save(state);
  // console.log(JSON.stringify(state));
});
