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
	console.log({ config });
	const outputPool: any = await readContract(config);
	console.log({ outputPool });
	const shareScaler = outputPool?.shareScaler! * 1e3;
	// contract.methods.getOutputPool(outputIndex).call();
	console.log(outputPool?.shareScaler * 1e3);
	return shareScaler;
};
