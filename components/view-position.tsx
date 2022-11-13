import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { combineClasses, formatCurrency } from '@richochet/utils/functions';
import RicochetLogo from 'icons/richochet-logo';
import USDCLogo from 'icons/usdc-logo';
import { NextPage } from 'next';
import { useState } from 'react';
import { EditPosition } from './edit-position';
import { LineGraph } from './line-graph';
import { PositionData } from './positions';

interface Props {
	close: boolean;
	setClose: Function;
	position: PositionData;
}

export const ViewPosition: NextPage<Props> = ({ setClose, position }) => {
	const [edit, setEdit] = useState(false);
	return (
		<>
			<div className='flex items-center justify-start border-b border-slate-600 space-x-4 mb-6 lg:mb-12 pb-2'>
				<button type='button' className='outline-none text-primary-500 space-x-2' onClick={() => setClose(true)}>
					<span className='no-underline'>&#60;</span>
					<span className='underline'>show all</span>
				</button>
				<button
					type='button'
					className={combineClasses(
						edit
							? 'outline-none text-slate-500 pointer-events-none'
							: 'outline-none text-primary-500 underline cursor-pointer'
					)}
					onClick={() => setEdit(true)}
					disabled={edit}>
					{edit ? 'editing position...' : 'edit position'}
				</button>
			</div>
			<div className='flex flex-wrap items-start justify-between space-y-4 md:space-y-0'>
				<div className='w-full md:w-1/2'>
					<span className='flex items-center justify-start'>
						{position.from === 'RIC' ? <RicochetLogo width='40' height='40' /> : ''}{' '}
						<ArrowLongRightIcon className='h-10 w-16' />
						{position.to === 'USDC' ? <USDCLogo width='30' height='30' /> : ''}
					</span>
					<p className='text-slate-100 my-2'>
						<span className='text-slate-400'>input:</span> {position.input}
					</p>
					<p className='text-slate-100 my-2'>
						<span className='text-slate-400'>output:</span> {position.output}
					</p>
					<p className='text-slate-100'>
						<span className='text-slate-400'>time left:</span> {position.timeLeft}
					</p>
				</div>
				{!edit && (
					<div className='w-full md:w-1/2'>
						<LineGraph />
						<p className='text-slate-100 my-2'>
							<span className='text-slate-400'>average buy price:</span> 1 ETH = {formatCurrency(1456.78)}
						</p>
						<div>
							<span className='text-slate-400'>average buy price &#62;&#60; current price: </span>
							<p className='text-slate-100'>
								{formatCurrency(1456.78)} &#62;&#60; {formatCurrency(1889.45)}
							</p>
						</div>
					</div>
				)}
				{edit && (
					<div className='w-full md:w-1/2  mt-4'>
						<EditPosition setClose={setEdit} position={position} />
					</div>
				)}
			</div>
		</>
	);
};
