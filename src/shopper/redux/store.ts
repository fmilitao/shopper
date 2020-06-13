import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './slice';
import { save } from './localStorage';

export const store = configureStore({
  reducer: {
    shopper: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const mapState = (state: RootState) => ({
  shopper: {
    ...state.shopper,
    isListSelected: state.shopper.selectedList !== undefined,
  },
});

export { actions, importFromClipboard } from './slice';

// auto-save
store.subscribe(() => {
  const state = store.getState();
  save(state.shopper);
  // console.log(JSON.stringify(state));
});
