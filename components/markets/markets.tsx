import { formatCurrency } from '@richochet/utils/functions';
import { useTranslation } from 'next-i18next';
import { CardTitle } from '../cards/card-title';
import { DataTable } from '../table/data-table';

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

const marketTitles = ['market', 'total', 'position amount'];

export const Markets = () => {
	const { t } = useTranslation('home');
	return (
		<>
			<CardTitle
				content={
					<>
						<p className='text-slate-400 uppercase'>{t('markets')}</p>
					</>
				}
			/>
			<DataTable headers={marketTitles} rowData={marketData} tableLoaderRows={12} />
		</>
	);
};
