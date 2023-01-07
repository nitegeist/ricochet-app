import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { buildFlowQuery } from '@richochet/utils/buildFlowQuery';
import calculateStreamedSoFar from '@richochet/utils/calculateStreamedSoFar';
import { flowConfig, FlowEnum, FlowTypes, InvestmentFlow } from 'constants/flowConfig';
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
	const [queries, setQueries] = useState<{
		[key: string]: {
			flowKey: string;
			flowsReceived: number;
			flowsOwned: string;
			totalFlows: number;
			placeholder: string;
			subsidyRate: { perso: number; total: number; endDate: string };
			streamedSoFar?: number;
			receivedSoFar?: number;
		};
	}>({});
	const [flows, setFlows] = useState<{
		flowsOwned: Flow[];
		flowsReceived: Flow[];
	}>();
	const { address, isConnected } = useAccount();
	const { data: coingeckoPrices, isSuccess } = coingeckoApi.useGetPricesQuery(ids.join(','));
	const [queryFlows] = superfluidSubgraphApi.useQueryFlowsMutation();
	const [queryStreams] = superfluidSubgraphApi.useQueryStreamsMutation();
	const [queryReceived] = superfluidSubgraphApi.useQueryReceivedMutation();
	async function getGraphQLData() {
		await queryFlows(address!).then((response: any) => {
			console.log({ response });
			if (response?.data) setFlows(response?.data?.data?.account);
		});
	}
	const sweepQueryFlows = async () => {
		const exchangeContractsAddresses = flowConfig.map((f) => f.superToken);
		let results: any[] = [];
		exchangeContractsAddresses.map(async (addr) => {
			if (addr) {
				results.push(await queryFlows(addr).then((res: any) => res?.data?.data?.account));
			}
		});
		console.log({ results });
		const streamedSoFarMap: Record<string, number> = {};
		const receivedSoFarMap: Record<string, number> = {};
		if (address) {
			const streamed = await queryStreams(address).then((res: any) => res?.data?.data?.streams);
			const received = await queryReceived(address).then((res: any) => res?.data?.data?.streams);
			console.log({ streamed, received });
			(streamed || []).forEach((stream: any) => {
				const streamedSoFar = streamedSoFarMap[`${stream.token.id}-${stream.receiver.id}`] || 0;
				Object.assign(streamedSoFarMap, {
					[`${stream.token.id}-${stream.receiver.id}`]:
						Number(streamedSoFar) +
						Number(
							calculateStreamedSoFar(stream.streamedUntilUpdatedAt, stream.updatedAtTimestamp, stream.currentFlowRate)
						),
				});
			});
			(received || []).forEach((stream: any) => {
				const receivedSoFar = receivedSoFarMap[`${stream.token.id}-${stream.sender.id}`] || 0;
				Object.assign(receivedSoFarMap, {
					[`${stream.token.id}-${stream.sender.id}`]:
						Number(receivedSoFar) +
						Number(
							calculateStreamedSoFar(stream.streamedUntilUpdatedAt, stream.updatedAtTimestamp, stream.currentFlowRate)
						),
				});
			});
		}
		const flows: { [key: string]: { flowsOwned: Flow[]; flowsReceived: Flow[] } } = {};
		exchangeContractsAddresses.forEach((el, i) => {
			if (results.length) {
				if (results[i] !== null) {
					flows[el] = results[i];
				} else {
					flows[el] = { flowsOwned: [], flowsReceived: [] };
				}
			}
		});
		console.log({ flows });
		let flowQueries: {
			[key: string]: {
				flowKey: string;
				flowsReceived: number;
				flowsOwned: string;
				totalFlows: number;
				placeholder: string;
				subsidyRate: { perso: number; total: number; endDate: string };
				streamedSoFar?: number;
				receivedSoFar?: number;
			};
		} = {};
		for (const [key, value] of Object.entries(FlowEnum)) {
			console.log({ key, value });
			flowQueries[value] = buildFlowQuery(value, address!, flows, streamedSoFarMap, receivedSoFarMap);
		}
		console.log(flowQueries);
		setQueries(flowQueries);
	};
	useEffect(() => {
		sweepQueryFlows();
	}, []);
	useEffect(() => {
		if (isConnected) getGraphQLData();
	}, [address, isConnected]);

	useEffect(() => {
		if (isSuccess && coingeckoPrices && queries) {
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
					total: parseFloat(queries[item.flowKey]?.flowsOwned) || 0,
					posAmt: queries[item.flowKey]?.totalFlows || 0,
				})
			);
			console.log({ marketData });
			setMarketList(marketData);
		}
	}, [queries, coingeckoPrices]);

	const getFlowUSDValue = (flow: InvestmentFlow, toFixed: number = 0) => {
		return (coingeckoPrices ? parseFloat(queries[flow.flowKey]?.flowsOwned) * coingeckoPrices[flow.tokenA] : 0).toFixed(
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
