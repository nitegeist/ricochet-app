import { InformationCircleIcon, ShieldCheckIcon, ShieldExclamationIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { combineClasses } from '@richochet/utils/functions';
import { NextPage } from 'next';
import { useState } from 'react';

interface Props {
	message: string;
	type: 'info' | 'loading' | 'warning' | 'error' | 'success';
	title?: string;
	hash?: string;
}

export const Alert: NextPage<Props> = ({ title, message, type, hash }) => {
	let [isOpen, setIsOpen] = useState(true);
	return (
		<>
			{isOpen && (
				<div className='max-w-full'>
					<div
						className={combineClasses(
							type === 'info'
								? 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700'
								: type === 'warning'
								? 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700'
								: type === 'error'
								? 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700'
								: type === 'success'
								? 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700'
								: 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-slate-100 rounded-lg p-4 mb-4 text-sm text-slate-700'
						)}
						role='alert'>
						{type === 'info' ? (
							<InformationCircleIcon className='h-5 w-5' />
						) : type === 'success' ? (
							<ShieldCheckIcon className='h-5 w-5' />
						) : type === 'warning' ? (
							<ShieldExclamationIcon className='h-5 w-5' />
						) : type === 'error' ? (
							<ShieldExclamationIcon className='h-5 w-5' />
						) : (
							<div className='h-5 w-5 border-4 border-slate-700 border-t-transparent rounded-full animate-spin'></div>
						)}
						<div className='md:ml-2'>
							{type !== 'loading' && <span className='font-medium'>{title}</span>} {message}
						</div>
						{type === 'loading' && (
							<a
								className='font-medium text-slate-800 underline md:ml-auto'
								href={`https://polygonscan.com/tx/${hash}`}>
								check status
							</a>
						)}
						{type !== 'loading' && (
							<button className='text-slate-800 hover:text-slate-700 ml-auto' onClick={() => setIsOpen(!isOpen)}>
								<XMarkIcon className='h-6 w-6' />
							</button>
						)}
					</div>
				</div>
			)}
		</>
	);
};
