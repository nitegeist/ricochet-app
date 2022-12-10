import { Framework } from '@superfluid-finance/sdk-core';
import { getProvider } from '@wagmi/core';
import { chain } from 'wagmi';

export const getSFFramework = async () => {
	const provider = getProvider({ chainId: chain.polygon.id });
	return await Framework.create({
		provider: provider,
		chainId: chain.polygon.id,
	});
};
