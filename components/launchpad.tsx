import { RectangleGroupIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { SolidButton } from './button';

export const LaunchPad = () => {
	const { t } = useTranslation('home');
	return (
		<div className='flex flex-col space-y-4'>
			<div className='flex items-center justify-center text-slate-100 space-x-3'>
				<RectangleGroupIcon className='h-6 w-6' />
				<p className='uppercase tracking-widest'>Rexpro</p>
			</div>
			<p className='text-slate-100'>{t('start-a-position')}</p>
			<SolidButton type='button' primary={true} action={t('start-20-position')} />
			<SolidButton type='button' primary={false} action={t('buy-ric')} />
		</div>
	);
};
