import { fetchFeeData } from '@wagmi/core';
import { ethers } from 'ethers';
import { chain } from 'wagmi';

// const GAS_STATION_MATIC_URL = 'https://gasstation-mainnet.matic.network/v2';
export const gas = async () => {
	try {
		// const gasResponse = await fetch(GAS_STATION_MATIC_URL)
		// .then(async (response) => response.json())
		// .catch(() => ({}));
		// const toFixedMaxPriorityFee = maxPriorityFee.toFixed(8);
		// const toFixedMaxFee = maxFee.toFixed(8);
		const gasResponse = await fetchFeeData({ chainId: chain.polygon.id, formatUnits: 'gwei' });
		const { maxPriorityFeePerGas, maxFeePerGas } = gasResponse.formatted || {};
		return {
			maxPriorityFeePerGas: ethers.utils.hexlify(
				ethers.utils.parseUnits(maxPriorityFeePerGas as string, 'gwei')?.toNumber()
			),
			maxFeePerGas: ethers.utils.hexlify(ethers.utils.parseUnits(maxFeePerGas as string, 'gwei')?.toNumber()),
		};
	} catch (error) {
		return {};
	}
};
