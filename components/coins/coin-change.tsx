import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { combineClasses } from '@richochet/utils/helperFunctions';
import { Coin, iconsCoin } from 'constants/coins';
import { NextPage } from 'next';
import Image from 'next/image';

export enum DataType {
	Position = 'Position',
	Market = 'Market',
	Balances = 'Balances',
}

interface Props {
	coinA?: string;
	coinB?: string;
	token?: string;
	type: DataType;
}

export const CoinChange: NextPage<Props> = ({ coinA, coinB, token, type }) => {
	if (type === DataType.Position && coinA && coinB) {
		return (
			<>
				<Image width='24' height='24' src={iconsCoin[coinA as Coin]!} alt={coinA} />{' '}
				<ArrowLongRightIcon className='h-5 w-5' />
				<Image width='24' height='24' src={iconsCoin[coinB as Coin]!} alt={coinB} />
			</>
		);
	}
	if (type === DataType.Market && coinA && coinB) {
		return (
			<>
				<span className='flex items-center space-x-2'>
					<Image width='24' height='24' src={iconsCoin[coinA as Coin]!} alt={coinA} /> <span>{coinA}</span>
				</span>
				<ArrowLongRightIcon className='h-5 w-5' />
				<span className='flex items-center space-x-2'>
					<Image width='24' height='24' src={iconsCoin[coinB as Coin]!} alt={coinB} /> <span>{coinB}</span>
				</span>
			</>
		);
	}
	if (type === DataType.Balances && token) {
		return (
			<>
				<Image width='24' height='24' src={iconsCoin[token as Coin]!} alt={token} />
				<span
					className={combineClasses(
						token === Coin.ETH
							? 'bg-eth text-slate-800 px-1 py-0'
							: token === Coin.WBTC
							? 'bg-btc text-slate-800 px-1 py-0'
							: token === Coin.RIC
							? 'bg-ric text-slate-800 px-1 py-0'
							: token === Coin.StIbAlluoETH
							? 'bg-stIbAlluoEth text-slate-800 px-1 py-0'
							: token === Coin.StIbAlluoUSD
							? 'bg-stIbAlluoUsd text-slate-800 px-1 py-0'
							: 'bg-transparent'
					)}>
					{token}
				</span>
			</>
		);
	}
};
