import { Alert } from '@richochet/components/alert';
import { Balances } from '@richochet/components/balances';
import { Card, CardWithBackground, CardWithOutline } from '@richochet/components/card';
import { CardContainer } from '@richochet/components/card-container';
import { Footer } from '@richochet/components/footer';
import { LaunchPad } from '@richochet/components/launchpad';
import { Markets } from '@richochet/components/markets';
import Navigation from '@richochet/components/navigation';
import { Positions } from '@richochet/components/positions';
import { Refer } from '@richochet/components/refer';
import { SmallCard } from '@richochet/components/small-card';
import { formatCurrency } from '@richochet/utils/functions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useState } from 'react';

export interface Stat {
	title: string;
	value: string;
}

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
		title: 'RIC Balance',
		value: '6893 RIC',
	},
	{
		title: 'Rewards Earned',
		value: formatCurrency(2556.789),
	},
];

export async function getStaticProps({ locale }): Promise<Object> {
	return {
		props: {
			...(await serverSideTranslations(locale, ['home', 'footer'])),
		},
	};
}
export default function Home({ locale }): JSX.Element {
	const [loading, setLoading] = useState(false);
	return (
		<>
			<Head>
				<title>Ricochet Exchange</title>
				<meta name='description' content='A place to exchange tokens' />
			</Head>
			<div className='bg-gradient-to-b from-background-700 via-background-800 to-background-900 backdrop-blur-lg'>
				<Navigation />
				<main>
					<div className='mx-auto w-screen py-6 px-8 lg:px-16'>
						{loading && <Alert type='loading' message='Waiting for your transaction to be confirmed...' />}
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch place-items-stretch gap-10'>
							{stats.map((stat, index) => (
								<SmallCard key={index} stat={stat} />
							))}
						</div>
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-10 place-content-stretch mt-16'>
							<div className='lg:col-span-2 space-y-10'>
								<CardContainer content={<Positions />} />
								<CardContainer content={<Markets />} />
							</div>
							<div className='space-y-10'>
								<Card content={<Balances />} />
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
