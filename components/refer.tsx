import { UsersIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { SolidButton } from './button';

export const Refer = () => {
	const { t } = useTranslation('home');
	const [refURL, setRefURL] = useState('');
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		console.log(refURL);
		setRefURL('');
	};
	return (
		<div className='flex flex-col items-center space-y-4'>
			<div className='flex items-center justify-center text-slate-100 space-x-3'>
				<UsersIcon className='h-6 w-6' />
				<p className='uppercase tracking-widest'>{t('refer')}</p>
			</div>
			<p className='text-slate-100'>{t('apply-refer')}</p>
			<p className='text-slate-400'>{t('customize-url')}:</p>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<input
					type='text'
					className='input-outline'
					value={refURL}
					onChange={(e) => setRefURL(e.target.value)}
					placeholder='app.ricochet.exchange/#/ref/'
				/>
				<SolidButton type='submit' primary={true} action={t('register-url')} />
			</form>
			<a
				className='inline-flex items-center space-x-1 text-primary-400'
				href='https://docs.ricochet.exchange/readme/referral-program'
				target='_blank'
				rel='noopener noreferrer'>
				<span className='underline'>{t('how-does-it-work')}</span>
			</a>
		</div>
	);
};
