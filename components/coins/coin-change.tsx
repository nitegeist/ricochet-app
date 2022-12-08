import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { combineClasses } from '@richochet/utils/functions';
import BTCLogo from 'icons/btc-logo';
import ETHLogo from 'icons/eth-logo';
import RicochetLogo from 'icons/richochet-logo';
import USDCLogo from 'icons/usdc-logo';
import { NextPage } from 'next';

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
				{coinA === 'RIC' ? <RicochetLogo width='25' height='25' /> : ''} <ArrowLongRightIcon className='h-5 w-5' />
				{coinB === 'USDC' ? <USDCLogo width='22' height='22' /> : ''}
			</>
		);
	}
	if (type === DataType.Market && coinA && coinB) {
		return (
			<>
				<span className='flex items-center space-x-2'>
					{coinA === 'BTC' ? <BTCLogo width='22' height='22' /> : ''} <span>{coinA}</span>
				</span>
				<ArrowLongRightIcon className='h-5 w-5' />
				<span className='flex items-center space-x-2'>
					{coinB === 'RIC' ? <RicochetLogo width='25' height='25' /> : ''} <span>{coinB}</span>
				</span>
			</>
		);
	}
	if (type === DataType.Balances && token) {
		return (
			<>
				{token === 'ETH' ? (
					<ETHLogo width='22' height='22' />
				) : token === 'BTC' ? (
					<BTCLogo width='22' height='22' />
				) : token === 'RIC' ? (
					<RicochetLogo width='25' height='25' />
				) : (
					''
				)}
				<span
					className={combineClasses(
						token === 'ETH'
							? 'bg-eth text-slate-800 px-1 py-0'
							: token === 'BTC'
							? 'bg-btc text-slate-800 px-1 py-0'
							: token === 'RIC'
							? 'bg-ric text-slate-800 px-1 py-0'
							: 'bg-transparent'
					)}>
					{token}
				</span>
			</>
		);
	}
};
