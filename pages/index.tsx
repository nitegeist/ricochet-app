import { Card } from '@richochet/components/card';
import { CardContainer } from '@richochet/components/card-container';
import Navigation from '@richochet/components/navigation';
import { SmallCard } from '@richochet/components/small-card';

const stats = [
	{
		title: 'Total in Positions',
		value: '$ 2556.789',
	},
	{
		title: 'Net Flow Rate',
		value: '$ 2556.789 / hr',
	},
	{
		title: 'RIC Balance',
		value: '6893 RIC',
	},
	{
		title: 'Rewards Earned',
		value: '$ 2556.789',
	},
];

export default function Home(): JSX.Element {
	return (
		<div className='h-screen bg-gradient-to-b from-slate-900 to-slate-800'>
			<Navigation />
			<main>
				<div className='mx-auto w-screen py-6 sm:px-8 lg:px-16'>
					<div className='flex flex-wrap items-center justify-between'>
						{stats.map((stat, index) => (
							<SmallCard key={index} title={stat.title} value={stat.value} />
						))}
					</div>
					<div className='flex items-center justify-between mt-10 space-x-8'>
						<CardContainer content={<p className='font-light uppercase tracking-widest text-slate-400'> I work!</p>} />
						<Card content={<p className='font-light uppercase tracking-widest text-slate-400'> I work!</p>} />
					</div>
				</div>
			</main>
		</div>
	);
}
