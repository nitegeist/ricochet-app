import { PlusSmallIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { RoundedButton } from './button';
import { CardTitle } from './card-title';
import { DataTable } from './data-table';
import { NewPosition } from './new-position';

export interface PositionData {
	from: string;
	to: string;
	position: string;
	timeLeft: string;
	input: string;
	output: string;
	avgPrice: string;
}

const positionTitles = ['symbols', 'positions', 'time left', 'input', 'output', 'avg. price'];

const positionData: PositionData[] = [
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
	{
		from: 'RIC',
		to: 'USDC',
		position: '1000 RIC > USDC',
		timeLeft: '4 months',
		input: '2039 RIC',
		output: '34.45 USDC',
		avgPrice: '1.02 RIC',
	},
];

export const Positions = () => {
	const [tabsClosed, setTabsClosed] = useState(true);
	return (
		<>
			{tabsClosed && (
				<div className='mt-4'>
					<CardTitle
						content={
							<>
								<p className='text-primary-500 uppercase'>Your Positions</p>
								<RoundedButton
									icon={<PlusSmallIcon className='h-4 w-4' />}
									type='button'
									action='new position'
									handleClick={() => {
										setTabsClosed(false);
									}}
								/>
							</>
						}
					/>
					<DataTable headers={positionTitles} rowData={positionData} />
				</div>
			)}
			{!tabsClosed && <NewPosition close={tabsClosed} setClose={setTabsClosed} />}
		</>
	);
};
