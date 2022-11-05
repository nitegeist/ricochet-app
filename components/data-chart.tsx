import { formatCurrency } from '@richochet/utils/functions';
import { ArcElement, Chart, DoughnutController } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, DoughnutController);

const data = {
	labels: ['Red', 'Green', 'Yellow'],
	datasets: [
		{
			data: [300, 50, 100],
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

export const DataChart = () => (
	<div className='w-48 md:w-52 lg:w-64 relative'>
		<div className='absolute top-1/3 left-1/4 lg:left-1/3 text-center'>
			<h6 className='text-slate-400'>total</h6>
			<p className='text-slate-100 font-semibold text-lg'>{formatCurrency(44896.45)}</p>
		</div>
		<Doughnut data={data} options={options} />
	</div>
);
