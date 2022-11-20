import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Alert } from '@richochet/components/alert';
import { Balances } from '@richochet/components/balances';
import { OutlineButton } from '@richochet/components/button';
import { Card, CardWithBackground, CardWithOutline } from '@richochet/components/card';
import { CardContainer } from '@richochet/components/card-container';
import { Footer } from '@richochet/components/footer';
import { LaunchPad } from '@richochet/components/launchpad';
import { Markets } from '@richochet/components/markets';
import Navigation from '@richochet/components/navigation';
import { Positions } from '@richochet/components/positions';
import { Refer } from '@richochet/components/refer';
import { SmallCard } from '@richochet/components/small-card';
import { useIsMounted } from '@richochet/hooks/useIsMounted';
import { formatCurrency } from '@richochet/utils/functions';
import { tokens } from '@richochet/utils/tokens';
import { Token } from 'enumerations/token.enum';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';

export interface Stat {
	title: string;
	value: string;
}

export async function getStaticProps({ locale }): Promise<Object> {
	return {
		props: {
			...(await serverSideTranslations(locale, ['home', 'footer'])),
		},
	};
}
export default function Home({ locale }): JSX.Element {
	const { address, isConnected } = useAccount();
	const { data, isError, isLoading } = useBalance({
		address: address,
		watch: true,
		token: tokens[Token.RIC],
	});
	const isMounted = useIsMounted();
	const [loading, setLoading] = useState(false);

	const stats: Stat[] = [
		{
			title: 'Total in Positions',
			value: formatCurrency(2556.789),
		},
		{
			title: 'Net Flow Rate',
			value: `${formatCurrency(2556.789)} / hr`,
		},
		{
			title: `${data?.symbol} Balance`,
			value: `${data?.formatted} ${data?.symbol}`,
		},
		{
			title: 'Rewards Earned',
			value: formatCurrency(2556.789),
		},
	];

	if (!isMounted) {
		return <></>;
	}

	return (
		<>
			<Head>
				<title>Ricochet | Streaming Exchange</title>
				<meta name='description' content='A place to exchange tokens' />
				<link rel='icon' type='image/png' href='/favicon.png' />
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
			</Head>
			<div className='bg-gradient-to-b from-background-700 via-background-800 to-background-900 overflow-clip'>
				<Navigation />
				<main>
					<div className='mx-auto w-screen py-6 px-8 lg:px-16'>
						{loading && <Alert type='loading' message='Waiting for your transaction to be confirmed...' />}
						{isConnected && (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch place-items-stretch gap-10'>
								{stats.map((stat, index) => (
									<SmallCard key={index} stat={stat} />
								))}
							</div>
						)}
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-10 place-content-stretch mt-16'>
							<div className='lg:col-span-2 space-y-10'>
								<CardContainer
									content={
										isConnected ? (
											<Positions />
										) : (
											<div className='flex flex-col items-center justify-center space-y-4 h-72'>
												<p className='text-primary-500'>
													Connect your wallet to see your positions or start a new position.
												</p>
												<ConnectButton.Custom>
													{({ account, chain, openConnectModal, openChainModal, mounted }) => {
														return (
															<div
																{...(!mounted && {
																	'aria-hidden': true,
																	style: {
																		opacity: 0,
																		pointerEvents: 'none',
																		userSelect: 'none',
																	},
																})}>
																{(() => {
																	if (!mounted || !account || !chain) {
																		return (
																			<OutlineButton
																				action='connect wallet'
																				type='button'
																				handleClick={openConnectModal}></OutlineButton>
																		);
																	}

																	if (chain.unsupported) {
																		return (
																			<OutlineButton
																				action='wrong network'
																				type='button'
																				handleClick={openChainModal}></OutlineButton>
																		);
																	}
																})()}
															</div>
														);
													}}
												</ConnectButton.Custom>
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
											<div className='flex flex-col items-center justify-center space-y-4 h-72'>
												<p className='text-primary-500'>Connect your wallet to see your balances.</p>
												<ConnectButton.Custom>
													{({ account, chain, openConnectModal, openChainModal, mounted }) => {
														return (
															<div
																{...(!mounted && {
																	'aria-hidden': true,
																	style: {
																		opacity: 0,
																		pointerEvents: 'none',
																		userSelect: 'none',
																	},
																})}>
																{(() => {
																	if (!mounted || !account || !chain) {
																		return (
																			<OutlineButton
																				action='connect wallet'
																				type='button'
																				handleClick={openConnectModal}></OutlineButton>
																		);
																	}

																	if (chain.unsupported) {
																		return (
																			<OutlineButton
																				action='wrong network'
																				type='button'
																				handleClick={openChainModal}></OutlineButton>
																		);
																	}
																})()}
															</div>
														);
													}}
												</ConnectButton.Custom>
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
