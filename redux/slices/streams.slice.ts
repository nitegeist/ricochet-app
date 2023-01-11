import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { startFlow, upgrade } from '@richochet/api/ethereum';
import { transformError } from '@richochet/utils/transformError';
import { getAccount, getContract } from '@wagmi/core';
import { idaABI, superTokenABI } from 'constants/abis';
import { idaAddress, MATICxAddress } from 'constants/polygon_config';
import { ethers } from 'ethers';
import { downgrade, downgradeMatic, upgradeMatic } from './../../pages/api/ethereum';

const streamApi = createApi({
	keepUnusedDataFor: 60, // 60 seconds (default)
	reducerPath: 'streams',
	baseQuery: fetchBaseQuery(),
	endpoints: (builder) => ({
		startStream: builder.query<
			{
				amount: string;
				config: {
					[key: string]: string;
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

			queryFn: async (payload: any): Promise<any | undefined> => {
				try {
					const { amount, config } = payload;
					console.log({ config, amount });
					// we must initialize a contract address with idaContract: getContract(idaAddress, idaABI, web3);
					const idaContract = await getContract({ address: idaAddress, abi: idaABI });
					console.log({ idaContract });
					// We must normalize the payload amount for superfluid function
					const normalizedAmount = Math.round((Number(amount) * 1e18) / 2592000);
					console.log({ normalizedAmount });
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
					console.log('Transaction Results: ', streamTx);
					return {
						data: streamTx,
					};
				} catch (e) {
					console.error(e);
					const error = transformError(e);
					return { error };
				}
			},
		}),
		downgrade: builder.query<{ value: string; tokenAddress: string } | null, { value: string; tokenAddress: string }>({
			queryFn: async (payload: any): Promise<any | undefined> => {
				try {
					console.log({ payload });
					const { tokenAddress, value } = payload;
					const amount = Math.round(Number(value) * 10e18).toString();
					console.log({ amount });
					const { address } = getAccount();
					const contract = await getContract({ address: tokenAddress, abi: superTokenABI });
					console.log({ contract });
					const tx =
						tokenAddress === MATICxAddress
							? await downgradeMatic(contract, amount, address!)
							: await downgrade(contract, amount, address!);
					console.log({ tx });
					return { data: tx };
				} catch (e) {
					console.error(e);
					const error = transformError(e);
					return { error };
				}
			},
		}),
		upgrade: builder.query<{ value: string; tokenAddress: string } | null, { value: string; tokenAddress: string }>({
			queryFn: async (payload: any): Promise<any | undefined> => {
				try {
					const { tokenAddress, value } = payload;
					const amountBigNumber = ethers.utils.parseUnits(value, 'wei');
					const amount = ethers.utils.formatUnits(amountBigNumber, 'ether');
					const { address } = getAccount();
					const contract = await getContract({ address: tokenAddress, abi: superTokenABI });
					const tx =
						tokenAddress === MATICxAddress
							? await upgradeMatic(contract, amount, address!)
							: await upgrade(contract, amount, address!);
					console.log({ tx });
					return { data: tx };
				} catch (e) {
					console.error(e);
					const error = transformError(e);
					return { error };
				}
			},
		}),
	}),
});

export default streamApi;
