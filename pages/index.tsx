import { Alert } from '@richochet/components/alert';
import { Balances } from '@richochet/components/balances';
import { OutlineButton } from '@richochet/components/button';
import { Card, CardContainer, CardWithBackground, CardWithOutline, SmallCard } from '@richochet/components/cards';
import { Footer } from '@richochet/components/footer';
import { LaunchPad } from '@richochet/components/launchpad';
import { Markets } from '@richochet/components/markets';
import Navigation from '@richochet/components/navigation';
import { Positions } from '@richochet/components/positions';
import { Refer } from '@richochet/components/refer';
import { useIsMounted } from '@richochet/hooks/useIsMounted';
import { buildFlowQuery } from '@richochet/utils/buildFlowQuery';
import calculateStreamedSoFar from '@richochet/utils/calculateStreamedSoFar';
import { getSFFramework } from '@richochet/utils/fluidsdkConfig';
import { formatCurrency } from '@richochet/utils/helperFunctions';
import Big, { BigSource } from 'big.js';
import { ConnectKitButton } from 'connectkit';
import { Coin } from 'constants/coins';
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import coingeckoApi from 'redux/slices/coingecko.slice';
import superfluidSubgraphApi from 'redux/slices/superfluidSubgraph.slice';
import { Flow } from 'types/flow';
import { useAccount, useBalance, useProvider } from 'wagmi';
import { polygon } from 'wagmi/chains';

export async function getStaticProps({ locale }: any): Promise<Object> {
	return {
		props: {
			...(await serverSideTranslations(locale, ['home', 'footer'])),
		},
	};
}
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

export default function Home({ locale }: any): JSX.Element {
	const { t } = useTranslation('home');
	const { address, isConnected } = useAccount();
	const [usdPrice, setUsdPrice] = useState<Big>(new Big(0));
	const [usdFlowRate, setUsdFlowRate] = useState<string>();
	const provider = useProvider({ chainId: polygon.id });
	const { data: tokenPrice, isError, error } = coingeckoApi.useGetTokenPriceQuery('richochet');
	const [queries, setQueries] = useState<
		Map<
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
		>
	>(new Map());
	const [sortedList, setSortedList] = useState<InvestmentFlow[]>([]);
	const [positions, setPositions] = useState<InvestmentFlow[]>([]);
	const [positionTotal, setPositionTotal] = useState<number>(0);
	const { data: coingeckoPrices } = coingeckoApi.useGetPricesQuery(ids.join(','));
	const [queryFlows] = superfluidSubgraphApi.useQueryFlowsMutation();
	const [queryStreams] = superfluidSubgraphApi.useQueryStreamsMutation();
	const [queryReceived] = superfluidSubgraphApi.useQueryReceivedMutation();
	const sweepQueryFlows = async () => {
		const exchangeContractsAddresses = flowConfig.map((f) => f.superToken);
		let results: any[] = [];
		exchangeContractsAddresses.map(async (addr) => {
			if (addr) {
				results.push(await queryFlows(addr).then((res: any) => res?.data?.data?.account));
			}
		});
		const streamedSoFarMap: Record<string, number> = {};
		const receivedSoFarMap: Record<string, number> = {};
		if (address) {
			const streamed = await queryStreams(address).then((res: any) => res?.data?.data?.streams);
			const received = await queryReceived(address).then((res: any) => res?.data?.data?.streams);
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
		let flowQueries: Map<
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
		> = new Map();
		if (flows !== null) {
			for (const [key, value] of Object.entries(FlowEnum)) {
				flowQueries.set(value, buildFlowQuery(value, address!, flows, streamedSoFarMap, receivedSoFarMap));
			}
		}
		console.log({ flowQueries });
		setQueries(flowQueries);
	};
	useEffect(() => {
		sweepQueryFlows();
	}, []);
	useEffect(() => {
		const positions = flowConfig.filter(({ flowKey }) => parseFloat(queries.get(flowKey)?.placeholder || '0') > 0);
		setPositions(positions);
		const totalInPos = positions.reduce((acc, curr) => acc + parseFloat(queries.get(curr.flowKey)?.flowsOwned!), 0);
		setPositionTotal(totalInPos);
	}, [queries]);
	useEffect(() => {
		if (coingeckoPrices && queries) {
			let list = flowConfig.filter((each) => each.type === FlowTypes.market);
			setSortedList(
				list.sort((a, b) => {
					const totalVolumeA = parseFloat(getFlowUSDValue(a));
					const totalVolumeB = parseFloat(getFlowUSDValue(b));
					return totalVolumeB - totalVolumeA;
				})
			);
			console.log({ sortedList });
		}
	}, [queries, coingeckoPrices]);

	const getFlowUSDValue = (flow: InvestmentFlow, toFixed: number = 0) => {
		return (
			coingeckoPrices ? parseFloat(queries.get(flow.flowKey)?.flowsOwned!) * coingeckoPrices[flow.tokenA] : 0
		).toFixed(toFixed);
	};

	useEffect(() => {
		if (isConnected && tokenPrice) {
			setUsdPrice(new Big(parseFloat(tokenPrice?.richochet?.usd)));
		}
		if (isError) {
			console.error(error);
		}
	}, [isConnected, tokenPrice]);
	const getNetFlowRate = async () => {
		const framework = await getSFFramework();
		//load the token you'd like to use like this
		//note that tokens may be loaded by symbol or by address
		const ric = await framework.loadSuperToken(Coin.RIC);
		let flowRate = await ric.getNetFlow({
			account: address!,
			providerOrSigner: provider,
		});
		const flowRateBigNumber = new Big(flowRate);
		const usdFlowRate = flowRateBigNumber
			.times(new Big('2592000'))
			.div(new Big('10e17'))
			.times(usdPrice as BigSource)
			.toFixed(2);
		setUsdFlowRate(usdFlowRate);
	};
	useEffect(() => {
		if (isConnected && usdPrice) {
			getNetFlowRate();
		}
	}, [isConnected, usdPrice]);
	const { data } = useBalance({
		address: address,
		chainId: polygon.id,
		token: RICAddress,
	});
	const isMounted = useIsMounted();

	if (!isMounted) {
		return <></>;
	}

	return (
		<>
			<Head>
				<title>Ricochet | Streaming Exchange</title>
				<meta name='description' content='Automatic Real-Time Crypto Investing' />
				<link rel='icon' href='/favicon.ico' />
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
			</Head>
			<div className='bg-gradient-to-b from-background-700 via-background-800 to-background-900 overflow-clip'>
				<Navigation />
				<main>
					<div className='mx-auto w-screen py-6 px-8 lg:px-16'>
						<Alert />
						{isConnected && (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch place-items-stretch gap-10'>
								<SmallCard
									content={
										<>
											<h6 className='font-light uppercase tracking-widest text-primary-500 mb-2'>
												{t('total-in-positions')}
											</h6>
											<p className='text-slate-100 font-light text-2xl'>{formatCurrency(positionTotal)}</p>
										</>
									}
								/>
								<SmallCard
									content={
										<>
											<h6 className='font-light uppercase tracking-widest text-primary-500 mb-2'>
												{t('net-flow-rate')}
											</h6>
											<p className='text-slate-100 font-light text-2xl'>
												{formatCurrency(parseFloat(usdFlowRate!))} / {t('month')}
											</p>
										</>
									}
								/>
								<SmallCard
									content={
										<>
											<h6 className='font-light uppercase tracking-widest text-primary-500 mb-2'>{t('ric-balance')}</h6>
											<p className='text-slate-100 font-light text-2xl space-x-1'>
												<span>{Number(data?.formatted).toFixed(2)}</span>
												<span>{data?.symbol}</span>
											</p>
										</>
									}
								/>
								<SmallCard
									content={
										<>
											<h6 className='font-light uppercase tracking-widest text-primary-500 mb-2'>
												{t('rewards-earned')}
											</h6>
											<p className='text-slate-100 font-light text-2xl'>{formatCurrency(2556.789)}</p>
										</>
									}
								/>
							</div>
						)}
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-10 place-content-stretch mt-16'>
							<div className='lg:col-span-2 space-y-10'>
								<CardContainer
									content={
										isConnected ? (
											<Positions positions={positions} queries={queries} />
										) : (
											<div className='flex flex-col items-center justify-center space-y-4 h-96'>
												<p className='text-primary-500'>{t('connect-for-positions')}.</p>
												<ConnectKitButton.Custom>
													{({ isConnected, show }) => (
														<>
															{!isConnected && (
																<OutlineButton
																	action={`${t('connect-wallet')}`}
																	type='button'
																	handleClick={show}></OutlineButton>
															)}
														</>
													)}
												</ConnectKitButton.Custom>
											</div>
										)
									}
								/>
								<CardContainer content={<Markets sortedList={sortedList} queries={queries} />} />
							</div>
							<div className='space-y-10'>
								<Card
									content={
										isConnected ? (
											<Balances />
										) : (
											<div className='flex flex-col items-center justify-center space-y-4 h-96'>
												<p className='text-primary-500'>{t('connect-for-balances')}.</p>
												<ConnectKitButton.Custom>
													{({ isConnected, show }) => (
														<>
															{!isConnected && (
																<OutlineButton
																	action={`${t('connect-wallet')}`}
																	type='button'
																	handleClick={show}></OutlineButton>
															)}
														</>
													)}
												</ConnectKitButton.Custom>
											</div>
										)
									}
								/>
								<CardWithBackground content={<LaunchPad />} />
								<CardWithOutline content={<Refer />} />
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
}
