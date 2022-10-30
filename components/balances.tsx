import { formatCurrency } from '@richochet/utils/functions';
import { OutlineButton, SolidButton } from './button';
import { DataTable } from './data-table';

export interface TokenData {
	token: string;
	amount: number;
	dollarVal: string;
}

const headerTitles = ['token', 'amount', 'dollar-value'];
const tokenData: TokenData[] = [
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
	{
		token: 'ETH',
		amount: 3.445,
		dollarVal: formatCurrency(6856.45),
	},
];

export const Balances = (): JSX.Element => {
	return (
		<>
			<p className='font-light uppercase tracking-widest text-slate-400'> Your Balances</p>
			<div className='flex flex-wrap items-center justify-evenly space-x-3 space-y-2 lg:space-y-0 my-4'>
				<OutlineButton action='withdraw' />
				<SolidButton action='deposit' />
				<OutlineButton action='swap' />
			</div>
			<DataTable headers={headerTitles} rowData={tokenData} />
		</>
	);
};
