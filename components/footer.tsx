import { RectangleGroupIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';

export const Footer = () => {
	const { t } = useTranslation('footer');
	return (
		<div className='flex flex-wrap items-start justify-between bg-slate-900 p-16'>
			<h6 className='text-slate-100 font-bold flex space-x-2 mb-10 md:mb-0'>
				<RectangleGroupIcon className='h-6 w-6' />
				<span>Ricochet</span>
			</h6>
			<section className='flex flex-wrap items-center space-x-14 lg:space-x-32'>
				<article className='flex flex-col space-y-4'>
					<h6 className='text-slate-500 font-bold'>{t('support')}</h6>
					<a href='http://' className='text-slate-400 underline'>
						{t('discord')}
					</a>
					<a href='http://' className='text-slate-400 underline'>
						{t('tutorials')}
					</a>
					<a href='http://' className='text-slate-400 underline'>
						{t('documentation')}
					</a>
				</article>
				<article className='flex flex-col space-y-4'>
					<h6 className='text-slate-500 font-bold'>{t('explore')}</h6>
					<a href='http://' className='text-slate-400 underline'>
						{t('medium')}
					</a>
					<a href='http://' className='text-slate-400 underline'>
						{t('github')}
					</a>
					<a href='http://' className='text-slate-400 underline'>
						{t('twitter')}
					</a>
				</article>
			</section>
		</div>
	);
};
