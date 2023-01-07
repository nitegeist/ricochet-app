import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { InvestmentFlow } from 'constants/flowConfig';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { CardTitle } from '../cards/card-title';
import { DataTable } from '../table/data-table';

export interface MarketData {
	from: string;
	to: string;
	total: number;
	posAmt: number;
}
interface Props {
	sortedList: InvestmentFlow[];
	queries: Map<
		string,
		{
			flowKey: string;
			flowsReceived: number;
			flowsOwned: string;
			totalFlows: number;
			placeholder: string;
			subsidyRate: { perso: number; total: number; endDate: string };
			streamedSoFar?: number;
			receivedSoFar?: number;
		}
	>;
}

const marketTitles = ['market', 'total', 'amount of positions'];

export const Markets: NextPage<Props> = ({ sortedList, queries }) => {
	const { t } = useTranslation('home');
	const [marketList, setMarketList] = useState<MarketData[]>([]);
	useEffect(() => {
		const marketData: MarketData[] = [];
		sortedList.map((item) =>
			marketData.push({
				from: item.coinA,
				to: item.coinB,
				total: parseFloat(queries.get(item.flowKey)?.flowsOwned!) || 0,
				posAmt: queries.get(item.flowKey)?.totalFlows || 0,
			})
		);
		console.log({ marketData });
		setMarketList(marketData);
	}, [queries, sortedList]);
	return (
		<>
			<CardTitle
				content={
					<div className='w-full flex flex-wrap items-center justify-between space-y-4 lg:space-y-0'>
						<p className='text-slate-400 uppercase'>{t('markets')}</p>
						<label className='relative block w-max'>
							<span className='sr-only'>Search</span>
							<span className='absolute inset-y-0 right-0 flex items-center pr-2'>
								<MagnifyingGlassIcon className='h-4 w-4 fill-slate-400' viewBox='0 0 20 20' />
							</span>
							<input className='input-search' placeholder={t('search')!} type='text' name='search' />
						</label>
					</div>
				}
			/>
			<DataTable headers={marketTitles} rowData={marketList} tableLoaderRows={12} />
		</>
	);
};
