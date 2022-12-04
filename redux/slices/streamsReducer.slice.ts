import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { startFlow } from '@richochet/api/ethereum';
import { transformError } from '@richochet/utils/transformError';
import { getContract, getProvider } from '@wagmi/core';
import { idaABI } from 'constants/abis';
import { idaAddress } from 'constants/polygon_config';
import { chain } from 'wagmi';

export const streamsReducers = createApi({
	reducerPath: 'startStream',
	baseQuery: fakeBaseQuery(),
	endpoints: (builder) => {
		return {
			startStream: builder.query<
				{
					payload: {
						amount: string;
						config: {
							[key: string]: string;
						};
						callback: (e?: string) => void;
					};
				} | null,
				string
			>({
				//Payload type:
				//config.superToken,
				//config.tokenA,
				//config.tokenB,
				//normalizedAmount,
				//config.referralId

				queryFn: async (payload: {
					amount: string;
					config: {
						[key: string]: string;
					};
					callback: (e?: string) => void;
				}): Promise<void> => {
					try {
						const provider = getProvider({ chainId: Number(chain.polygon) });
						// we must initialize a contract address with idaContract: getContract(idaAddress, idaABI, web3);
						const idaContract = getContract({ address: idaAddress, abi: idaABI });
						const { config } = payload;
						// We must normalize the payload amount for superfluid function
						const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
						// we must call the startFlow function in api/ethereum.ts with following Data
						//
						//idaContract: Initialized Contract Object from line 18 comment,
						//exchangeAddress: string, (part of config) from user input
						//inputTokenAddress: string,  (part of config) from user input
						//outputTokenAddress: string, (part of config) from user input
						//amount: number, // (part of config) from user input
						//web3: Web3,  //Initialized in line 17, WEB3 object
						//referralId?: string, //this comes from state
						startFlow(
							idaContract,
							config.superToken,
							config.tokenA,
							config.tokenB,
							normalizedAmount,
							config.referralId
						);
						payload.callback();
					} catch (e) {
						console.error(e);
						const error = transformError(e);
						payload.callback(error);
					}
				},
			}),
		};
	},
});
