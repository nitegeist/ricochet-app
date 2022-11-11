import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import RicochetLogo from 'icons/richochet-logo';
import USDCLogo from 'icons/usdc-logo';
import { NextPage } from 'next';
import { LineGraph } from './line-graph';
import { PositionData } from './positions';

interface Props {
	close: boolean;
	setClose: Function;
	position: PositionData;
}

export const ViewPosition: NextPage<Props> = ({ close, setClose, position }) => {
	return (
		<>
			<div className='flex items-center justify-start border-b border-slate-600 space-x-4 mb-12 pb-2'>
				<a className='text-primary-500 underline cursor-pointer' onClick={() => setClose(true)}>
					show all
				</a>
				<a className='text-primary-500 underline cursor-pointer'>edit position</a>
			</div>
			<div className='flex flex-wrap items-start justify-between'>
				<article className='space-y-2'>
					<span className='flex items-center justify-start'>
						{position.from === 'RIC' ? <RicochetLogo width='40' height='40' /> : ''}{' '}
						<ArrowLongRightIcon className='h-10 w-16' />
						{position.to === 'USDC' ? <USDCLogo width='30' height='30' /> : ''}
					</span>
					<p className='text-slate-100'>
						<span className='text-slate-500'>input:</span> {position.input}
					</p>
					<p className='text-slate-100'>
						<span className='text-slate-500'>output:</span> {position.output}
					</p>
					<p className='text-slate-100'>
						<span className='text-slate-500'>time left:</span> {position.timeLeft}
					</p>
				</article>
				<LineGraph />
			</div>
		</>
	);
};
