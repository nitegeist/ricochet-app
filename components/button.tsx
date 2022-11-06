import { combineClasses } from '@richochet/utils/functions';
import { NextPage } from 'next';
import { MouseEventHandler } from 'react';
interface Props {
	action: string;
	type: 'button' | 'submit' | 'reset';
	form?: string;
	primary?: boolean;
	icon?: JSX.Element;
	handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export const RoundedButton: NextPage<Props> = ({ action, type, form, icon, handleClick }) => {
	return (
		<button type={type} form={form} className='btn-rounded' onClick={handleClick}>
			{icon}
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

export const SolidButton: NextPage<Props> = ({ action, type, primary, handleClick }) => {
	return (
		<button
			type={type}
			className={combineClasses(primary ? 'btn-pill-solid' : 'btn-pill-solid bg-slate-100 hover:bg-slate-300')}
			onClick={handleClick}>
			<span>{action}</span>
		</button>
	);
};
