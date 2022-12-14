import { Action, AnyAction, createSlice } from '@reduxjs/toolkit';
import { startStream } from 'redux/actions';

interface RejectedAction extends Action {
	error: Error;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
	return action.type.endsWith('rejected');
}

const initialState = {
	loading: false,
	success: false,
	payload: undefined,
	error: undefined,
	message: '',
};

// // api implementation
// export const streamsApi = createApi({
// 	reducerPath: 'startStream',
// 	baseQuery: fakeBaseQuery(),
// 	endpoints: (builder) => {
// 		return {
// 			startStream: builder.query<
// 				{
// 					amount: string;
// 					config: {
// 						[key: string]: string;
// 					};
// 					callback: (e?: string) => void;
// 				} | null,
// 				string
// 			>({
// 				//Payload type:
// 				//config.superToken,
// 				//config.tokenA,
// 				//config.tokenB,
// 				//normalizedAmount,
// 				//config.referralId

// 				queryFn: async (payload: any): Promise<any | undefined> => {
// 					try {
// 						console.log('Made it to query!');
// 						const { config, amount } = payload;
// 						console.log({ config, amount });
// 						// we must initialize a contract address with idaContract: getContract(idaAddress, idaABI, web3);
// 						const provider = getProvider({ chainId: chain.polygon.id });
// 						const idaContract = await getContract({ address: idaAddress, abi: idaABI, signerOrProvider: provider });
// 						console.log({ idaContract });
// 						// We must normalize the payload amount for superfluid function
// 						const normalizedAmount = Math.round((Number(amount) * 1e18) / 2592000);
// 						// we must call the startFlow function in api/ethereum.ts with following Data
// 						//
// 						//idaContract: Initialized Contract Object from line 18 comment,
// 						//exchangeAddress: string, (part of config) from user input
// 						//inputTokenAddress: string,  (part of config) from user input
// 						//outputTokenAddress: string, (part of config) from user input
// 						//amount: number, // (part of config) from user input
// 						//web3: Web3,  //Initialized in line 17, WEB3 object
// 						//referralId?: string, //this comes from state
// 						const streamTx = await startFlow(
// 							idaContract,
// 							config.superToken,
// 							config.tokenA,
// 							config.tokenB,
// 							normalizedAmount,
// 							config.referralId
// 						);
// 						console.log({ streamTx });
// 						return streamTx;
// 						// payload.callback();
// 					} catch (e) {
// 						console.error(e);
// 						const error = transformError(e);
// 						// payload.callback(error);
// 					}
// 				},
// 			}),
// 		};
// 	},
// });
//slice implementation
export const streamsSlice = createSlice({
	name: 'streams',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(startStream.pending, (state, { payload }) => {
				state.loading = true;
				state.message = 'Waiting for your transaction to be confirmed...';
			})
			// You can chain calls, or have separate `builder.addCase()` lines each time
			.addCase(startStream.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.success = true;
				state.message = 'Transaction confirmed!';
			})
			// You can match a range of action types
			.addMatcher(
				isRejectedAction,
				// `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
				(state, { error }) => {
					state.loading = false;
					state.success = false;
					// @ts-ignore
					state.error = error;
				}
			)
			// and provide a default case if no other handlers matched
			.addDefaultCase((state, action) => {});
	},
});
