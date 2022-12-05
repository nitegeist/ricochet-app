import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
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

const marketTitles = ['market', 'total', 'amount of positions'];

export const Markets = () => {
	const { t } = useTranslation('home');
	return (
		<>
			<CardTitle
				content={
					<div className='w-full flex items-center justify-between'>
						<p className='text-slate-400 uppercase'>{t('markets')}</p>
						<label className='relative block w-max'>
							<span className='sr-only'>Search</span>
							<span className='absolute inset-y-0 right-0 flex items-center cursor-pointer pr-2'>
								<MagnifyingGlassIcon className='h-4 w-4 fill-slate-400' viewBox='0 0 20 20' />
							</span>
							<input
								className='placeholder-transparent placeholder-slate-400 placeholder:italic block bg-transparent h-8 w-8 focus:cursor-text focus:w-full focus:border rounded-md py-2 pr-9 pl-3 shadow-sm focus:outline-none focus:border-slate-500 focus:ring-slate-400 focus:ring-1 sm:text-sm'
								placeholder='search by name...'
								type='text'
								name='search'
							/>
						</label>
					</div>
				}
			/>
			<DataTable headers={marketTitles} rowData={marketData} tableLoaderRows={12} />
		</>
	);
};
