import { RectangleGroupIcon } from '@heroicons/react/24/solid';
import { SolidButton } from './button';

export const AdContent = () => {
	return (
		<div className='flex flex-col space-y-4'>
			<div className='flex items-center justify-center text-slate-100 space-x-3'>
				<RectangleGroupIcon className='h-6 w-6' />
				<p className='uppercase tracking-widest'>Rexpro</p>
			</div>
			<p className='text-slate-100'>
				Start a position swapping any coin for RIC and gain access to token-gated content!
			</p>
			<SolidButton type='button' action='start $20/month-position' />
			<SolidButton type='button' action='buy 100,000 RIC' />
		</div>
	);
};
