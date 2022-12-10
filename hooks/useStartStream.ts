import { streams } from './../redux/slices/streamsReducer.slice';
export const useStartStream = (payload: string, config: { [key: string]: string }, callback: (e?: string) => void) => {
	const streamPayload = { amount: payload, config, callback };
	streams.actions.start(streamPayload);
};