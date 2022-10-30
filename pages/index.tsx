import { Balances } from '@richochet/components/balances';
import { RoundedButton } from '@richochet/components/button';
import { Card } from '@richochet/components/card';
import { CardContainer } from '@richochet/components/card-container';
import { CardTitle } from '@richochet/components/card-title';
import { DataTable } from '@richochet/components/data-table';
import Navigation from '@richochet/components/navigation';
import { SmallCard } from '@richochet/components/small-card';
import { formatCurrency } from '@richochet/utils/functions';

export interface PositionData {
	symbol: string;
	position: string;
	timeLeft: string;
	input: string;
	output: string;
	avgPrice: string;
}

export interface MarketData {
	market: string;
	total: string;
	posAmt: string;
}
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

const positionData: PositionData[] = [
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		symbol: 'a > b',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
];

const marketData: MarketData[] = [
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
	{
		market: 'a > b',
		total: `${formatCurrency(40012.65)} / month`,
		posAmt: '15 positions',
	},
];

const positionTitles = ['symbols', 'positions', 'time left', 'input', 'output', 'avg. price'];
const marketTitles = ['market', 'total', 'position amt.'];

export default function Home(): JSX.Element {
	return (
		<div className='bg-gradient-to-b from-slate-900 to-slate-800'>
			<Navigation />
			<main>
				<div className='mx-auto w-screen py-6 px-8 lg:px-16'>
					<div className='flex flex-wrap items-stretch justify-center md:justify-between space-y-8 lg:space-y-0'>
						{stats.map((stat, index) => (
							<SmallCard key={index} stat={stat} />
						))}
					</div>
					<div className='flex flex-wrap lg:flex-nowrap items-start space-x-0 lg:space-x-10 space-y-10 lg:space-y-0 mt-16'>
						<div className='w-full lg:w-2/3 space-y-10'>
							<CardContainer
								content={
									<>
										<CardTitle
											content={
												<>
													<p className='text-slate-400 uppercase'>Your Positions</p>
													<RoundedButton action='new position' />
												</>
											}
										/>
										<DataTable headers={positionTitles} rowData={positionData} />
									</>
								}
							/>
							<CardContainer
								content={
									<>
										<CardTitle
											content={
												<>
													<p className='text-slate-400 uppercase'>Markets</p>
												</>
											}
										/>
										<DataTable headers={marketTitles} rowData={marketData} />
									</>
								}
							/>
						</div>
						<div className='w-full lg:w-1/3 space-y-10'>
							<Card content={<Balances />} />
							<Card content={<p className='font-light uppercase tracking-widest text-slate-400'> I work!</p>} />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
