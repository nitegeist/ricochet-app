import { formatCurrency } from '@richochet/utils/functions';
import { ArcElement, Chart, DoughnutController } from 'chart.js';
import { NextPage } from 'next';
import { Doughnut } from 'react-chartjs-2';
import { TokenData } from '../balances';

Chart.register(ArcElement, DoughnutController);

interface Props {
	tokens: TokenData[];
}

export const DoughnutChart: NextPage<Props> = ({ tokens }): JSX.Element => {
	const data = {
		datasets: [
			{
				data: tokens
					.map((token) => token.dollarVal)
					.filter((dollarValue, index, self) => self.findIndex((value) => value === dollarValue) === index),
				backgroundColor: ['#B3FFFF', '#FF8D8F', '#7B7EFF'],
				hoverBackgroundColor: ['#B3FFFF', '#FF8D8F', '#7B7EFF'],
				borderWidth: 0,
				hoverOffset: 3,
			},
		],
	};

	const options = {
		cutout: '80%',
	};
	const total: number = tokens.reduce((accumulator, current) => accumulator + current.dollarVal, 0);
	return (
		<div className='w-48 md:w-52 lg:w-64 relative'>
			<div className='absolute top-1/3 left-1/4 lg:left-1/3 text-center'>
				<h6 className='text-slate-400'>total</h6>
				<p className='text-slate-100 font-semibold text-lg'>{formatCurrency(total)}</p>
			</div>
			<Doughnut data={data} options={options} />
		</div>
	);
};
