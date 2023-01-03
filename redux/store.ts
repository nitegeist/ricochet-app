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
import superfluidSubgraphApi from './slices/superfluidSubgraph.slice';

export const sfSubgraph = initializeSubgraphApiSlice(createApiWithReactHooks).injectEndpoints(allSubgraphEndpoints);
export const rpcApi = initializeRpcApiSlice(createApiWithReactHooks).injectEndpoints(balanceRpcApiEndpoints);

const reducer = {
	// [streams.name]: streams.reducer,
	[rpcApi.reducerPath]: rpcApi.reducer,
	[streamApi.reducerPath]: streamApi.reducer,
	[sfSubgraph.reducerPath]: sfSubgraph.reducer,
	[coingeckoApi.reducerPath]: coingeckoApi.reducer,
	[superfluidSubgraphApi.reducerPath]: superfluidSubgraphApi.reducer,
};

export type AppState = StateFromReducersMapObject<typeof reducer>;

export const store = (preloadedState?: PreloadedState<AppState>) =>
	configureStore({
		reducer: reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware()
				.concat(rpcApi.middleware)
				.concat(streamApi.middleware)
				.concat(sfSubgraph.middleware)
				.concat(coingeckoApi.middleware)
				.concat(superfluidSubgraphApi.middleware),
		preloadedState,
	});

type Store = ReturnType<typeof store>;

export type AppDispatch = Store['dispatch'];
