import { formatCurrency } from '@richochet/utils/functions';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { TokenData } from '../balances';

interface Props {
	tokens: TokenData[];
}

interface ChartData {
	name: string;
	color: string;
	value: number;
}

export const DoughnutChart: NextPage<Props> = ({ tokens }): JSX.Element => {
	const { t } = useTranslation('home');
	const data: ChartData[] = [];
	tokens
		.filter((token) => !!token.color)
		.map((token) => {
			data.push({
				name: token.token,
				color: token.color,
				value: token.dollarVal,
			});
		});
	const total: number = tokens
		.filter((token) => !!token.dollarVal)
		.reduce((accumulator, current) => accumulator + current.dollarVal, 0);
	return (
		<div className='h-52 w-52'>
			<ResponsiveContainer height='100%' width='100%'>
				<PieChart>
					<text fill='#81a8ce' x={100} y={80} textAnchor='middle' dominantBaseline='middle'>
						{t('total')}
					</text>
					<text fill='white' x={100} y={110} fontWeight={600} textAnchor='middle' dominantBaseline='middle'>
						{formatCurrency(total)}
					</text>
					<Pie
						data={data}
						innerRadius={80}
						outerRadius={100}
						fill='#81a8ce'
						paddingAngle={0}
						nameKey='name'
						dataKey='value'>
						{data.map((entry) => (
							<Cell key={`cell-${entry.name}`} fill={entry.color} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
