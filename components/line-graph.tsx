import { faker } from '@faker-js/faker';
import { CategoryScale, Chart as ChartJS, LinearScale, LineElement, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

export const options = {
	responsive: true,
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			borderColor: 'rgb(255, 99, 132)',
			backgroundColor: 'rgba(255, 99, 132, 0.5)',
		},
	],
};

export const LineGraph = () => (
	<div className='w-full xl:w-1/2'>
		<Line options={options} data={data} />
	</div>
);
