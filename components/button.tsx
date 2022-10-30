import { PlusSmallIcon } from '@heroicons/react/24/solid';
import { NextPage } from 'next';
import { MouseEventHandler } from 'react';
interface Props {
	action: string;
	type: 'button' | 'submit' | 'reset';
	handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export const RoundedButton: NextPage<Props> = ({ action, type, handleClick }) => {
	return (
		<button type={type} className='btn-rounded' onClick={handleClick}>
			<PlusSmallIcon className='h-4 w-4' />
			<span>{action}</span>
		</button>
	);
};

export const OutlineButton: NextPage<Props> = ({ action, type, handleClick }) => {
	return (
		<button type={type} className='btn-pill-outline' onClick={handleClick}>
			<span>{action}</span>
		</button>
	);
};

export const SolidButton: NextPage<Props> = ({ action, type, handleClick }) => {
	return (
		<button type={type} className='btn-pill-solid' onClick={handleClick}>
			<span>{action}</span>
		</button>
	);
};
