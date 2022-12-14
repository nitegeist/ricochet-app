import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { startFlow } from '@richochet/api/ethereum';
import { transformError } from '@richochet/utils/transformError';
import { getContract } from '@wagmi/core';
import { idaABI } from 'constants/abis';
import { idaAddress } from 'constants/polygon_config';

export interface Payload {
	amount: string;
	config: {
		[key: string]: string;
	};
	callback: (e?: string) => void;
}

export const startStream = createAsyncThunk(
	'streams/startStream',
	async ({ payload }: PayloadAction<Payload>, { rejectWithValue }): Promise<any | undefined> => {
		try {
			console.log({ payload });
			const { config, amount } = payload;
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
			return streamTx;
			// payload.callback();
		} catch (e) {
			console.error(e);
			const error = transformError(e);
			// return custom error message from API if any
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
			// payload.callback(error);
		}
	}
);
