import { fetchFeeData } from '@wagmi/core';
import { ethers } from 'ethers';
import { chain } from 'wagmi';

// Get cost of Polygon transaction gas
export const gas = async () => {
	try {
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
