import { formatCurrency } from '@richochet/utils/functions';
import { CardTitle } from './card-title';
import { DataTable } from './data-table';

export interface MarketData {
	from: string;
	to: string;
	total: string;
	posAmt: string;
}

const marketData: MarketData[] = [
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		from: 'BTC',
		to: 'RIC',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
];

const marketTitles = ['market', 'total', 'position amt.'];

export const Markets = () => {
	return (
		<>
			<CardTitle
				content={
					<>
						<p className='text-slate-400 uppercase'>Markets</p>
					</>
				}
			/>
			<DataTable headers={marketTitles} rowData={marketData} />
		</>
	);
};
