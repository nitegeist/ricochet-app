import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { flowConfig, FlowTypes, InvestmentFlow } from 'constants/flowConfig';
import {
	DAIxAddress,
	MATICxAddress,
	RICAddress,
	StIbAlluoBTCAddress,
	StIbAlluoETHAddress,
	StIbAlluoUSDAddress,
	USDCxAddress,
	WBTCxAddress,
	WETHxAddress
} from 'constants/polygon_config';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import coingeckoApi from 'redux/slices/coingecko.slice';
import superfluidSubgraphApi from 'redux/slices/superfluidSubgraph.slice';
import { Flow } from 'types/flow';
import { useAccount } from 'wagmi';
import { CardTitle } from '../cards/card-title';
import { DataTable } from '../table/data-table';

export interface MarketData {
	from: string;
	to: string;
	total: number;
	posAmt: number;
}

const marketTitles = ['market', 'total', 'amount of positions'];
const coingeckoIds = new Map<string, string>([
	[DAIxAddress, 'dai'],
	[USDCxAddress, 'usd-coin'],
	[WETHxAddress, 'weth'],
	[WBTCxAddress, 'wrapped-bitcoin'],
	[MATICxAddress, 'matic-network'],
	[RICAddress, 'richochet'],
	// TODO: These prices need to be multiplied by the growingRatio
	// from these contracts since 1 ibAlluoUSD > 1 USD
	[StIbAlluoETHAddress, 'weth'],
	[StIbAlluoUSDAddress, 'usd-coin'],
	[StIbAlluoBTCAddress, 'wrapped-bitcoin'],
]);
const ids = [...coingeckoIds.values()];

export const Markets = () => {
	const { t } = useTranslation('home');
	const [marketList, setMarketList] = useState<MarketData[]>([]);
	const [flows, setFlows] = useState<{
		flowsOwned: Flow[];
		flowsReceived: Flow[];
	}>();
	const { address, isConnected } = useAccount();
	const { data: coingeckoPrices, isSuccess } = coingeckoApi.useGetPricesQuery(ids.join(','));
	const [queryFlows, { isLoading }] = superfluidSubgraphApi.useQueryFlowsMutation();
	useEffect(() => {
		async function getGraphData() {
			await queryFlows(address!).then((response) => {
				console.log({ response });
				if (response?.data) setFlows(response?.data?.data?.account);
			});
		}
		if (isConnected) getGraphData();
	}, [address, isConnected]);

	useEffect(() => {
		if (isSuccess && coingeckoPrices) {
			let sortedList = flowConfig.filter((each) => each.type === FlowTypes.market);
			sortedList = sortedList.sort((a, b) => {
				const totalVolumeA = parseFloat(getFlowUSDValue(a));
				const totalVolumeB = parseFloat(getFlowUSDValue(b));
				return totalVolumeB - totalVolumeA;
			});
			console.log({ sortedList });
			const marketData: MarketData[] = [];
			sortedList.map((item) =>
				marketData.push({
					from: item.coinA,
					to: item.coinB,
					total: parseFloat(flows?.flowsOwned[0]?.flowRate!),
					posAmt: flows?.flowsOwned.length!,
				})
			);
			setMarketList(marketData);
		}
	}, [flows, coingeckoPrices]);

	const getFlowUSDValue = (flow: InvestmentFlow, toFixed: number = 0) => {
		return (coingeckoPrices ? parseFloat(flows?.flowsOwned[0]?.sum!) * coingeckoPrices[flow.tokenA] : 0).toFixed(
			toFixed
		);
	};
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
