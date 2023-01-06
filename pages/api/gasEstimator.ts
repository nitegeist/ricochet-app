import { fetchFeeData } from '@wagmi/core';
import { ethers } from 'ethers';
import { polygon } from 'wagmi/chains';

// Get cost of Polygon transaction gas
export const gas = async () => {
	try {
		const gasResponse = await fetchFeeData({ chainId: polygon.id, formatUnits: 'gwei' });
		const { maxPriorityFeePerGas, maxFeePerGas } = gasResponse.formatted || {};
		return {
			maxPriorityFeePerGas: ethers.utils.hexlify(ethers.utils.parseUnits(maxPriorityFeePerGas!, 'gwei')?.toNumber()),
			maxFeePerGas: ethers.utils.hexlify(ethers.utils.parseUnits(maxFeePerGas!, 'gwei')?.toNumber()),
		};
	} catch (error) {
		return {};
	}
};
