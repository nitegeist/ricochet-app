import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { startFlow } from '@richochet/api/ethereum';
import { transformError } from '@richochet/utils/transformError';
import { getContract } from '@wagmi/core';
import { idaABI } from 'constants/abis';
import { idaAddress } from 'constants/polygon_config';

interface Payload {
	amount: string;
	config: {
		[key: string]: string;
	};
	callback: (e?: string) => void;
}
// api implementation
export const streamsApi = createApi({
	reducerPath: 'startStream',
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => {
		return {
			startStream: builder.query<
				{
					amount: string;
					config: {
						[key: string]: string;
					};
					callback: (e?: string) => void;
				} | null,
				string
			>({
				//Payload type:
				//config.superToken,
				//config.tokenA,
				//config.tokenB,
				//normalizedAmount,
				//config.referralId

				queryFn: async (payload: any): Promise<any | undefined> => {
					try {
						const { config, amount } = payload;
						// we must initialize a contract address with idaContract: getContract(idaAddress, idaABI, web3);
						const idaContract = await getContract({ address: idaAddress, abi: idaABI });
						console.log(idaContract);
						// We must normalize the payload amount for superfluid function
						const normalizedAmount = Math.round((Number(amount) * 1e18) / 2592000);
						// we must call the startFlow function in api/ethereum.ts with following Data
						//
						//idaContract: Initialized Contract Object from line 18 comment,
						//exchangeAddress: string, (part of config) from user input
						//inputTokenAddress: string,  (part of config) from user input
						//outputTokenAddress: string, (part of config) from user input
						//amount: number, // (part of config) from user input
						//web3: Web3,  //Initialized in line 17, WEB3 object
						//referralId?: string, //this comes from state
						const streamTx = await startFlow(
							idaContract,
							config.superToken,
							config.tokenA,
							config.tokenB,
							normalizedAmount,
							config.referralId
						);
						console.log(streamTx);
						return streamTx;
						// payload.callback();
					} catch (e) {
						console.error(e);
						const error = transformError(e);
						// payload.callback(error);
					}
				},
			}),
		};
	},
});
//slice implementation
export const streams = createSlice({
	name: 'startStream',
	initialState: {},
	reducers: {
		start: async (state, action: PayloadAction<Payload>): Promise<any | undefined> => {
			try {
				console.log({ action });
				const { config, amount } = action.payload;
				// we must initialize a contract address with idaContract: getContract(idaAddress, idaABI, web3);
				const idaContract = await getContract({ address: idaAddress, abi: idaABI });
				console.log({ idaContract });
				// We must normalize the payload amount for superfluid function
				const normalizedAmount = Math.round((Number(amount) * 1e18) / 2592000);
				// we must call the startFlow function in api/ethereum.ts with following Data
				//
				//idaContract: Initialized Contract Object from line 18 comment,
				//exchangeAddress: string, (part of config) from user input
				//inputTokenAddress: string,  (part of config) from user input
				//outputTokenAddress: string, (part of config) from user input
				//amount: number, // (part of config) from user input
				//web3: Web3,  //Initialized in line 17, WEB3 object
				//referralId?: string, //this comes from state
				const streamTx = await startFlow(
					idaContract,
					config.superToken,
					config.tokenA,
					config.tokenB,
					normalizedAmount,
					config.referralId
				);
				console.log({ streamTx });
				return streamTx;
				// payload.callback();
			} catch (e) {
				console.error(e);
				const error = transformError(e);
				// payload.callback(error);
			}
		},
	},
});
