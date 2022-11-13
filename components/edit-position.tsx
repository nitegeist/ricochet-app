import { NextPage } from 'next';
import { OutlineButton, RoundedButton } from './button';
import { PositionData } from './positions';

interface Props {
	setClose: Function;
	position: PositionData;
}

export const EditPosition: NextPage<Props> = ({ setClose, position }) => {
	return (
		<div className='flex flex-col space-y-4'>
			<h6 className='text-slate-100'>What would you like to do to your position?</h6>
			<OutlineButton action='change swap-amount' type='button' />
			<OutlineButton action={`deposit ${position.from}`} type='button' />
			<RoundedButton action='stop position' type='button' />
			<hr className='border-slate-500' />
			<div className='flex justify-end'>
				<button type='button' className='outline-none text-slate-100 underline' onClick={() => setClose(false)}>
					cancel
				</button>
			</div>
		</div>
	);
};
