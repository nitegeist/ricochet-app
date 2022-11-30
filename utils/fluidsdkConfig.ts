import { Framework } from '@superfluid-finance/sdk-core';

interface Args {
	provider: any;
	chain: number;
}

export const getSFFramework = async (args: Args) =>
	await Framework.create({
		provider: args.provider,
		chainId: Number(args.chain),
	});
