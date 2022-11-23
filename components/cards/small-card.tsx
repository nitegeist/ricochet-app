import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { Stat } from 'pages';
interface Props {
	stat: Stat;
}

export const SmallCard: NextPage<Props> = ({ stat: { title, value } }) => {
	const { t } = useTranslation('home');
	return (
		<div className='card-sm'>
			{!title && !value && (
				<div className='animate-pulse'>
					<div className='grid grid-rows-2 gap-2'>
						<div className='h-5 bg-slate-700 rounded'></div>
						<div className='h-6 bg-slate-700 rounded'></div>
					</div>
				</div>
			)}
			{!!title && !!value && (
				<>
					<h6 className='font-light uppercase tracking-widest text-primary-500'>
						{t(`${title.toLocaleLowerCase().replace(/\s/g, '')}`)}
					</h6>
					<p className='text-slate-100 font-light text-2xl'>{value}</p>
				</>
			)}
		</div>
	);
};
