import { configureStore, PreloadedState, StateFromReducersMapObject } from '@reduxjs/toolkit';
import {
	allSubgraphEndpoints,
	createApiWithReactHooks,
	initializeRpcApiSlice,
	initializeSubgraphApiSlice
} from '@superfluid-finance/sdk-redux';
import { balanceRpcApiEndpoints } from './balanceRpcApiEndpoints';
import coingeckoApi from './slices/coingecko.slice';
import streamApi from './slices/streams.slice';

export const sfSubgraph = initializeSubgraphApiSlice(createApiWithReactHooks).injectEndpoints(allSubgraphEndpoints);
export const rpcApi = initializeRpcApiSlice(createApiWithReactHooks).injectEndpoints(balanceRpcApiEndpoints);

const reducer = {
	[rpcApi.reducerPath]: rpcApi.reducer,
	[streamApi.reducerPath]: streamApi.reducer,
	[coingeckoApi.reducerPath]: coingeckoApi.reducer,
	// [streams.name]: streams.reducer,
	[sfSubgraph.reducerPath]: sfSubgraph.reducer,
};

export type AppState = StateFromReducersMapObject<typeof reducer>;

export const store = (preloadedState?: PreloadedState<AppState>) =>
	configureStore({
		reducer: reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(streamApi.middleware)
				.concat(coingeckoApi.middleware)
				.concat(rpcApi.middleware)
				.concat(sfSubgraph.middleware),
		preloadedState,
	});

type Store = ReturnType<typeof store>;

export type AppDispatch = Store['dispatch'];
