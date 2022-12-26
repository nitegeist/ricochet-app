import { Coin } from 'constants/coins';

export enum Color {
	ETH = '#B3FFFF',
	WBTC = '#FF8D8F',
	RIC = '#7B7EFF',
	StIbAlluoETH = '#75E276',
	StIbAlluoUSD = '#E9DF89',
}

export const colors: Record<string, string> = {
	[Coin.ETH]: Color.ETH,
	[Coin.WBTC]: Color.WBTC,
	[Coin.RIC]: Color.RIC,
	[Coin.StIbAlluoUSD]: Color.StIbAlluoUSD,
	[Coin.StIbAlluoETH]: Color.StIbAlluoETH,
};
