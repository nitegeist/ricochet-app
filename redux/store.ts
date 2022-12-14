import { configureStore } from '@reduxjs/toolkit';
import {
	allSubgraphEndpoints,
	createApiWithReactHooks,
	initializeSubgraphApiSlice
} from '@superfluid-finance/sdk-redux';
import { streamsSlice } from './slices/streamsReducer.slice';

export const sfSubgraph = initializeSubgraphApiSlice(createApiWithReactHooks).injectEndpoints(allSubgraphEndpoints);

export const store = configureStore({
	reducer: {
		[streamsSlice.name]: streamsSlice.reducer,
		[sfSubgraph.reducerPath]: sfSubgraph.reducer,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(streamsApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
