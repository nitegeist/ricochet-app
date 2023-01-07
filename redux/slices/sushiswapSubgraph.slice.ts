import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { getSushiPoolPrices } from '../../utils/getSushiPoolPrice';

const sushiswapSubgraphApi = createApi({
	keepUnusedDataFor: 60, // 60 seconds (default)
	reducerPath: 'sushiswapSubgraph',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thegraph.com/subgraphs/name/sushiswap' }),
	endpoints: (builder) => ({
		querySushiPoolPrices: builder.mutation({
			query: (poolAddress: string) => ({
				url: '/matic-exchange',
				method: 'POST',
				headers: new Headers({
					'content-type': 'application/json ',
				}),
				body: { query: getSushiPoolPrices(poolAddress) },
			}),
		}),
	}),
});

export default sushiswapSubgraphApi;
