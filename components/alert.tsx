import { Transition } from '@headlessui/react';
import { InformationCircleIcon, ShieldCheckIcon, ShieldExclamationIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { combineClasses } from '@richochet/utils/functions';
import { AlertContext } from 'contexts/AlertContext';
import { AlertTypes } from 'enumerations/alertTypes.enum';
import { Fragment, useContext, useEffect, useState } from 'react';

export const Alert = () => {
	const [state, dispatch] = useContext(AlertContext);
	const [alertType, setAlertType] = useState<AlertTypes>(AlertTypes.NONE);
	const [message, setMessage] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [hash, setHash] = useState<string>('');
	let [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const { title, message, type, hash } = state.alertShower;
		setAlertType(type);
		setTitle(title);
		setMessage(message);
		setHash(hash);
		if (type !== AlertTypes.NONE) setIsOpen(true);
		if (type === AlertTypes.NONE) setIsOpen(false);
	}, [state.alertShower]);

	return (
		<Transition
			as={Fragment}
			show={isOpen}
			enter='transition-opacity duration-75'
			enterFrom='opacity-0'
			enterTo='opacity-100'
			leave='transition-opacity duration-150'
			leaveFrom='opacity-100'
			leaveTo='opacity-0'>
			<div className='max-w-full'>
				<div
					className={combineClasses(
						alertType === AlertTypes.INFO
							? 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700'
							: alertType === AlertTypes.WARNING
							? 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-yellow-100 rounded-lg p-4 mb-4 text-sm text-yellow-700'
							: alertType === AlertTypes.ERROR
							? 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700'
							: alertType === AlertTypes.SUCCESS
							? 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700'
							: 'flex flex-wrap items-center justify-start space-y-1 md:space-y-0 bg-slate-100 rounded-lg p-4 mb-4 text-sm text-slate-700'
					)}
					role='alert'>
					{alertType === AlertTypes.INFO ? (
						<InformationCircleIcon className='h-5 w-5' />
					) : alertType === AlertTypes.SUCCESS ? (
						<ShieldCheckIcon className='h-5 w-5' />
					) : alertType === AlertTypes.WARNING ? (
						<ShieldExclamationIcon className='h-5 w-5' />
					) : alertType === AlertTypes.ERROR ? (
						<ShieldExclamationIcon className='h-5 w-5' />
					) : alertType === AlertTypes.LOADING ? (
						<div className='h-5 w-5 border-4 border-slate-700 border-t-transparent rounded-full animate-spin'></div>
					) : (
						''
					)}
					<div className='md:ml-2'>
						{alertType !== AlertTypes.LOADING && <span className='font-medium'>{title}</span>} {message}
					</div>
					{alertType === AlertTypes.LOADING && (
						<a className='font-medium text-slate-800 underline md:ml-auto' href={`https://polygonscan.com/tx/${hash}`}>
							check status
						</a>
					)}
					{alertType !== AlertTypes.LOADING && (
						<button className='text-slate-800 hover:text-slate-700 ml-auto' onClick={() => setIsOpen(!isOpen)}>
							<XMarkIcon className='h-6 w-6' />
						</button>
					)}
				</div>
			</div>
		</Transition>
	);
};
