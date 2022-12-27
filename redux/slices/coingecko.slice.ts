import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const coingeckoApi = createApi({
	keepUnusedDataFor: 60, // 60 seconds (default)
	reducerPath: 'coingecko',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
	endpoints: (builder) => ({
		getUpgradedTokensList: builder.query<any | null, string>({
			query: () =>
				`simple/price?ids=richochet%2Cusd-coin%2Cdai%2Cmaker%2Cethereum%2Cwrapped-bitcoin%2Cidle%2Cmatic-network%2Csushi&vs_currencies=usd`,
		}),
		getTokenHistory: builder.query<any | null, string>({
			query: (tokenId) => `coins/${tokenId}/market_chart?vs_currency=usd&days=1`,
		}),
		getTokenPrice: builder.query<any | null, string>({
			query: (tokenId) => `simple/price?ids=${tokenId}&vs_currencies=usd`,
		}),
	}),
});

export default coingeckoApi;
