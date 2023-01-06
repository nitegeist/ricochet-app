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
import { getSFFramework } from '@richochet/utils/fluidsdkConfig';
import { formatCurrency } from '@richochet/utils/helperFunctions';
import Big, { BigSource } from 'big.js';
import { ConnectKitButton } from 'connectkit';
import { Coin } from 'constants/coins';
import { RICAddress } from 'constants/polygon_config';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import coingeckoApi from 'redux/slices/coingecko.slice';
import { useAccount, useBalance, useProvider } from 'wagmi';
import { polygon } from 'wagmi/chains';

export async function getStaticProps({ locale }: any): Promise<Object> {
	return {
		props: {
			...(await serverSideTranslations(locale, ['home', 'footer'])),
		},
	};
}
export default function Home({ locale }: any): JSX.Element {
	const { t } = useTranslation('home');
	const { address, isConnected } = useAccount();
	const [usdPrice, setUsdPrice] = useState<Big>(new Big(0));
	const [usdFlowRate, setUsdFlowRate] = useState<string>();
	const provider = useProvider({ chainId: polygon.id });
	const {
		data: tokenPrice,
		isLoading,
		isFetching,
		isSuccess,
		isError,
		error,
		refetch,
	} = coingeckoApi.useGetTokenPriceQuery('richochet');
	useEffect(() => {
		if (isConnected && isSuccess && tokenPrice) {
			setUsdPrice(new Big(parseFloat(tokenPrice?.richochet?.usd)));
		}
		if (isError) {
			console.error(error);
		}
	}, [isConnected, isSuccess, tokenPrice, isError, error]);
	useEffect(() => {
		if (isConnected && usdPrice) {
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
											<p className='text-slate-100 font-light text-2xl'>{formatCurrency(2556.789)}</p>
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
											<Positions />
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
								<CardContainer content={<Markets />} />
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
