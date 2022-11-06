import RicochetLogoWhite from 'icons/ricochet-logo-white';
import { useTranslation } from 'next-i18next';

export const Footer = () => {
	const { t } = useTranslation('footer');
	return (
		<div className='flex flex-wrap items-start justify-between bg-background-500 p-16'>
			<h6 className='flex space-x-2 mb-10 md:mb-0'>
				<RicochetLogoWhite width='50' height='25' />
				<span className='text-slate-100 font-semibold tracking-wide'>Ricochet</span>
			</h6>
			<section className='flex flex-wrap items-center space-x-14 lg:space-x-32'>
				<article className='flex flex-col space-y-4'>
					<h6 className='text-slate-600 font-bold'>{t('support')}</h6>
					<a href='http://' className='text-primary-400 underline'>
						{t('discord')}
					</a>
					<a href='http://' className='text-primary-400 underline'>
						{t('tutorials')}
					</a>
					<a href='http://' className='text-primary-400 underline'>
						{t('documentation')}
					</a>
				</article>
				<article className='flex flex-col space-y-4'>
					<h6 className='text-slate-600 font-bold'>{t('explore')}</h6>
					<a href='http://' className='text-primary-400 underline'>
						{t('medium')}
					</a>
					<a href='http://' className='text-primary-400 underline'>
						{t('github')}
					</a>
					<a href='http://' className='text-primary-400 underline'>
						{t('twitter')}
					</a>
				</article>
			</section>
		</div>
	);
};
