import { Balances } from '@richochet/components/balances';
import { Card, CardWithBackground, CardWithOutline } from '@richochet/components/card';
import { CardContainer } from '@richochet/components/card-container';
import { Footer } from '@richochet/components/footer';
import { AdContent } from '@richochet/components/launchpad';
import { Markets } from '@richochet/components/markets';
import Navigation from '@richochet/components/navigation';
import { Positions } from '@richochet/components/positions';
import { Refer } from '@richochet/components/refer';
import { SmallCard } from '@richochet/components/small-card';
import { formatCurrency } from '@richochet/utils/functions';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

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
	return (
		<>
			<Head>
				<title>Ricochet Exchange</title>
				<meta name='description' content='A place to exchange tokens' />
			</Head>
			<div className='bg-gradient-to-b from-slate-900 to-slate-800 backdrop-blur-lg'>
				<Navigation />
				<main>
					<div className='mx-auto w-screen py-6 px-8 lg:px-16'>
						<div className='flex flex-wrap items-stretch justify-center md:justify-between basis-1/4'>
							{stats.map((stat, index) => (
								<SmallCard key={index} stat={stat} />
							))}
						</div>
						<div className='flex flex-wrap lg:flex-nowrap items-start space-x-0 lg:space-x-10 space-y-10 lg:space-y-0 mt-16'>
							<div className='w-full lg:w-2/3 space-y-10'>
								<CardContainer content={<Positions />} />
								<CardContainer content={<Markets />} />
							</div>
							<div className='w-full lg:w-1/3 space-y-10'>
								<Card content={<Balances />} />
								<CardWithBackground content={<AdContent />} />
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
