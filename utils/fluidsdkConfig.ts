import { Framework } from '@superfluid-finance/sdk-core';
import { getProvider } from '@wagmi/core';
import { chain } from 'wagmi';

export const getSFFramework = async () => {
	const provider = getProvider({ chainId: Number(chain.polygon) });
	return await Framework.create({
		provider: provider,
		chainId: Number(chain.polygon),
	});
};
