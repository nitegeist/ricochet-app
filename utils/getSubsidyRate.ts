import { getContract } from '@wagmi/core';
import { erc20ABI } from 'constants/abis';
import { flowConfig } from 'constants/flowConfig';
import { RICAddress } from 'constants/polygon_config';

// load abi, create contract instance, get subsidy rate, return
export const getSubsidyRate = async (
	flowKey: string,
	placeholder: string,
	flowsOwned: string
): Promise<{ perso: number; total: number; endDate: string }> => {
	const flow = flowConfig.find((flow_) => flow_.flowKey === flowKey);
	const outgoing = parseFloat(placeholder);
	const totalFlow = parseFloat(flowsOwned);
	const exchangeContract = flow?.superToken || '0';
	// const contract = getContract(exchangeContract, streamExchangeABI, web3);
	// NOTE: getSubsidyRate no longer exists, no longer 1 subsidy rate/contract
	const subsidyRate = 0;
	const subsidyRateTotal = (subsidyRate * 30 * 24 * 60 * 60) / 1e18;
	const subsidyRatePerso = (subsidyRateTotal * outgoing) / totalFlow;
	const RIC = await getContract({ address: RICAddress, abi: erc20ABI });
	const exchangeContractRic = await RIC.methods.balanceOf(exchangeContract).call();
	const endDateTimestamp = Date.now() + (exchangeContractRic / subsidyRate) * 1000;
	const endDate = new Date(endDateTimestamp).toLocaleDateString();

	// const subsidyTokenAddr = await contract.methods.getSubsidyToken().call();
	// const subsidyToken = (subsidyTokenAddr.toLowerCase() === RICAddress.toLowerCase()) ?
	//   'RIC' :
	//   downgradeTokensList.find(
	//     (t:any) => t.tokenAddress.toLowerCase() === subsidyTokenAddr.toLowerCase(),
	//   );
	// const subsidyRates = `${subsidyRatePerso.toFixed(3)} ${subsidyToken}/mo.
	//     (out of ${(subsidyRateTotal / 1e3).toFixed(0)} kRIC/mo. total pooled) for ${flowKey}`;
	// console.log(subsidyRates);
	return { perso: subsidyRatePerso, total: subsidyRateTotal, endDate };
};
