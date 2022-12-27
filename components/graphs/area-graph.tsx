import { faker } from '@faker-js/faker';
import { useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import coingeckoApi from 'redux/slices/coingecko.slice';
import { useAccount } from 'wagmi';

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

// Get coingecko token history
export const AreaGraph = () => {
	const { isConnected } = useAccount();
	const {
		data: tokens,
		isLoading,
		isFetching,
		isSuccess,
		isError,
		error,
		refetch,
	} = coingeckoApi.useGetTokenHistoryQuery('deusdc');
	useEffect(() => {
		if (isConnected && isSuccess) {
			console.log({ tokens });
		}
	}, [isConnected, isSuccess, tokens]);
	return (
		<div className='h-52 min-h-full w-52 min-w-full'>
			<ResponsiveContainer height='100%' width='100%'>
				<AreaChart data={data}>
					<XAxis dataKey='name' />
					<YAxis />
					<Tooltip />
					<Area type='monotone' dataKey='uv' stroke='#81a8ce' fill='#81a8ce' />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};
