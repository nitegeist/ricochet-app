import { combineClasses } from '@richochet/utils/functions';
import { NextPage } from 'next';
import { MouseEventHandler } from 'react';
interface Props {
	action: string;
	type: 'button' | 'submit' | 'reset';
	form?: string;
	primary?: boolean;
	disabled?: boolean;
	icon?: JSX.Element;
	handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const RoundedButton: NextPage<Props> = ({ action, type, form, icon, primary, disabled, handleClick }) => {
	return (
		<button
			type={type}
			form={form}
			disabled={disabled}
			className={combineClasses(
				primary
					? 'btn-rounded bg-primary-500 hover:bg-primary-300 disabled:bg-primary-200 disabled:text-slate-500 text-slate-800'
					: 'btn-rounded bg-slate-100 hover:bg-slate-300'
			)}
			onClick={handleClick}>
			{icon}
			<span>{action}</span>
		</button>
	);
};

export const OutlineButton: NextPage<Props> = ({ action, type, disabled, handleClick }) => {
	return (
		<button type={type} className='btn-pill-outline' disabled={disabled} onClick={handleClick}>
			<span>{action}</span>
		</button>
	);
};

export const SolidButton: NextPage<Props> = ({ action, type, primary, disabled, handleClick }) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={combineClasses(
				primary
					? 'btn-pill-solid'
					: 'btn-pill-solid bg-slate-100 hover:bg-slate-300 disabled:bg-primary-200 disabled:text-slate-500'
			)}
			onClick={handleClick}>
			<span>{action}</span>
		</button>
	);
};
