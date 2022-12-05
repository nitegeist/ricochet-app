import { configureStore } from '@reduxjs/toolkit';
import {
	allSubgraphEndpoints,
	createApiWithReactHooks,
	initializeSubgraphApiSlice
} from '@superfluid-finance/sdk-redux';
import { streamsApi } from './slices/streamsReducer.slice';

export const sfSubgraph = initializeSubgraphApiSlice(createApiWithReactHooks).injectEndpoints(allSubgraphEndpoints);

export const store = configureStore({
	reducer: {
		[streamsApi.reducerPath]: streamsApi.reducer,
		[sfSubgraph.reducerPath]: sfSubgraph.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
