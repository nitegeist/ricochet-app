import { configureStore } from '@reduxjs/toolkit';
import { streamsReducers } from './slices/streamsReducer.slice';

export const store = configureStore({
	reducer: {
		[streamsReducers.reducerPath]: streamsReducers.reducer,
	},
});

export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
