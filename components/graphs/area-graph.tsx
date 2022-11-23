import { faker } from '@faker-js/faker';
import useBreakpoint from '@richochet/hooks/useBreakpoint';
import breakpoints from '@richochet/utils/breakpoints';
import { Area, AreaChart, Tooltip, XAxis, YAxis } from 'recharts';

interface ChartData {
	name: string;
	uv: number;
	pv: number;
	amt: number;
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data: ChartData[] = [];
labels.map((label) => {
	data.push({
		name: label,
		uv: faker.datatype.number({ min: 1000, max: 4000 }),
		pv: faker.datatype.number({ min: 1000, max: 4000 }),
		amt: faker.datatype.number({ min: 1000, max: 4000 }),
	});
});

export const AreaGraph = () => {
	const breakpoint = useBreakpoint();
	return (
		<AreaChart
			width={
				breakpoint < breakpoints[640]
					? 300
					: breakpoint >= breakpoints[768] && breakpoint < breakpoints[1024]
					? 400
					: breakpoint >= breakpoints[1024] && breakpoint < breakpoints[1280]
					? 200
					: breakpoint >= breakpoints[1280] && breakpoint < breakpoints[1536]
					? 600
					: 300
			}
			height={
				breakpoint < breakpoints[640]
					? 200
					: breakpoint < breakpoints[768] && breakpoint < breakpoints[1024]
					? 400
					: breakpoint < breakpoints[1024] && breakpoint < breakpoints[1280]
					? 200
					: breakpoint < breakpoints[1280] && breakpoint < breakpoints[1536]
					? 600
					: 300
			}
			data={data}>
			<XAxis dataKey='name' />
			<YAxis />
			<Tooltip />
			<Area type='monotone' dataKey='uv' stroke='#81a8ce' fill='#81a8ce' />
		</AreaChart>
	);
};
