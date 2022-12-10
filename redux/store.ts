import { configureStore } from '@reduxjs/toolkit';
import {
	allSubgraphEndpoints,
	createApiWithReactHooks,
	initializeSubgraphApiSlice
} from '@superfluid-finance/sdk-redux';
import { streams } from './slices/streamsReducer.slice';

export const sfSubgraph = initializeSubgraphApiSlice(createApiWithReactHooks).injectEndpoints(allSubgraphEndpoints);

export const store = configureStore({
	reducer: {
		[streams.name]: streams.reducer,
		[sfSubgraph.reducerPath]: sfSubgraph.reducer,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(streamsApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
