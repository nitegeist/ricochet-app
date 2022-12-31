import { readContract } from '@wagmi/core';
import { ExchangeKeys } from 'enumerations/exchangeKeys.enum';
import { streamExchangeABI } from '../constants/abis';
import { indexIDA } from '../constants/flowConfig';
import { getExchangeAddressFromKey } from './getExchangeAddress';

export const getShareScaler = async (exchangeKey: ExchangeKeys, tokenA: string, tokenB: string): Promise<number> => {
	const { outputIndex } = indexIDA.filter((data) => data.input === tokenA && data.output === tokenB)[0];
	const config = {
		address: getExchangeAddressFromKey(exchangeKey),
		abi: streamExchangeABI,
		functionName: 'getOutputPool',
		args: [outputIndex],
	};
	const outputPool: any = await readContract(config);
	// contract.methods.getOutputPool(outputIndex).call();
	return outputPool?.shareScaler * 1e3;
};
