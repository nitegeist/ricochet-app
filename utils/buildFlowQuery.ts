import { flowConfig } from 'constants/flowConfig';
import { Flow } from 'types/flow';
import { getOwnedFlows } from './getOwnedFlows';
import { getReceviedFlows } from './getReceviedFlows';

export const buildFlowQuery = (
	flowKey: string,
	address: string,
	flows: { [key: string]: { flowsOwned: Flow[]; flowsReceived: Flow[] } },
	streamedSoFarMap: Record<string, number>,
	receivedSoFarMap: Record<string, number>
) => {
	console.log({ flowKey, address, flows, streamedSoFarMap, receivedSoFarMap });
	const flowConfigObject = flowConfig.find((o) => o.flowKey === flowKey);
	console.log({ flowConfigObject });
	const exchangeAddress = flowConfigObject?.superToken || '';
	const tokenAxAddress = flowConfigObject?.tokenA || '';
	const tokenAtokenBFlows = flows[exchangeAddress];
	console.log({ tokenAtokenBFlows });
	const tokenAtokenBFlowsReceived = getReceviedFlows(tokenAtokenBFlows?.flowsReceived, tokenAxAddress, address);

	let streamedSoFar;
	let receivedSoFar;

	if (Object.keys(streamedSoFarMap).length) {
		streamedSoFar = streamedSoFarMap[`${tokenAxAddress.toLowerCase()}-${exchangeAddress.toLowerCase()}`];
	}

	if (Object.keys(receivedSoFarMap).length) {
		receivedSoFar = receivedSoFarMap[`${tokenAxAddress.toLowerCase()}-${exchangeAddress.toLowerCase()}`];
	}

	const tokenAtokenBPlaceholder = ((tokenAtokenBFlowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);
	const flowsOwned = getOwnedFlows(tokenAtokenBFlows?.flowsReceived, tokenAxAddress);
	const subsidyRate = { perso: 0, total: 0, endDate: 'unknown' };
	/*
	getSubsidyRate(flowKey, tokenAtokenBPlaceholder, flowsOwned)
		.then((p) => { subsidyRate = p; });
	*/
	return {
		[flowKey]: {
			flowKey,
			flowsReceived: tokenAtokenBFlowsReceived,
			flowsOwned,
			totalFlows: tokenAtokenBFlows?.flowsReceived.length,
			placeholder: tokenAtokenBPlaceholder,
			streamedSoFar,
			receivedSoFar,
			subsidyRate, // await getSubsidyRate(FlowEnum.daiMkrFlowQuery,
			// usdcRicPlaceholder, flowsOwned),
		},
	};
};
