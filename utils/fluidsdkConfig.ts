import { Framework } from '@superfluid-finance/sdk-core';
import { getProvider } from '@wagmi/core';
import { polygon } from 'wagmi/chains';

export const getSFFramework = async () => {
	const provider = getProvider({ chainId: polygon.id });
	return await Framework.create({
		provider: provider,
		chainId: polygon.id,
	});
};
