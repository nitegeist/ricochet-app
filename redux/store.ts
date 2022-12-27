import { configureStore } from '@reduxjs/toolkit';
import {
	allSubgraphEndpoints,
	createApiWithReactHooks,
	initializeRpcApiSlice,
	initializeSubgraphApiSlice
} from '@superfluid-finance/sdk-redux';
import { balanceRpcApiEndpoints } from './balanceRpcApiEndpoints';
import streamApi from './slices/streams.slice';

export const sfSubgraph = initializeSubgraphApiSlice(createApiWithReactHooks).injectEndpoints(allSubgraphEndpoints);
export const rpcApi = initializeRpcApiSlice(createApiWithReactHooks).injectEndpoints(balanceRpcApiEndpoints);

export const store = configureStore({
	reducer: {
		[rpcApi.reducerPath]: rpcApi.reducer,
		[streamApi.reducerPath]: streamApi.reducer,
		// [streams.name]: streams.reducer,
		[sfSubgraph.reducerPath]: sfSubgraph.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(streamApi.middleware).concat(rpcApi.middleware).concat(sfSubgraph.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
