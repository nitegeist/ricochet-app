import { formatCurrency } from '@richochet/utils/functions';
import { NextPage } from 'next';
import { Cell, Pie, PieChart } from 'recharts';
import { TokenData } from '../balances';

interface Props {
	tokens: TokenData[];
}

interface ChartData {
	name: string;
	value: number;
}

export const DoughnutChart: NextPage<Props> = ({ tokens }): JSX.Element => {
	const data: ChartData[] = [];
	const COLORS = ['#B3FFFF', '#FF8D8F', '#7B7EFF'];
	tokens
		.filter((token, index, self) => self.findIndex((t) => t.dollarVal === token.dollarVal) === index)
		.map((token) => {
			data.push({
				name: token.token,
				value: token.dollarVal,
			});
		});
	const total: number = tokens.reduce((accumulator, current) => accumulator + current.dollarVal, 0);
	return (
		<>
			<PieChart width={200} height={200}>
				<text fill='#81a8ce' x={100} y={80} textAnchor='middle' dominantBaseline='middle'>
					total
				</text>
				<text fill='white' x={100} y={110} fontWeight={600} textAnchor='middle' dominantBaseline='middle'>
					{formatCurrency(total)}
				</text>
				<Pie data={data} innerRadius={80} outerRadius={100} fill='#81a8ce' paddingAngle={0} dataKey='value'>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
					))}
				</Pie>
			</PieChart>
		</>
	);
};
