import { UsersIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { SolidButton } from './button';

export const Refer = () => {
	const { t } = useTranslation('home');
	const [refURL, setRefURL] = useState('');
	const handleSubmit = (event) => {
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
			<p className='text-slate-100'>{t('applyrefer')}</p>
			<p className='text-slate-400'>{t('customizeurl')}:</p>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<input
					type='text'
					className='input-outline'
					value={refURL}
					onChange={(e) => setRefURL(e.target.value)}
					placeholder='app.ricochet.exchange/#/ref/'
				/>
				<SolidButton type='submit' action={t('registerurl')} />
			</form>
			<a
				className='inline-flex items-center space-x-1 text-slate-400'
				href='http://'
				target='_blank'
				rel='noopener noreferrer'>
				<span className='underline'>{t('howdoesitwork')}</span>
			</a>
		</div>
	);
};
