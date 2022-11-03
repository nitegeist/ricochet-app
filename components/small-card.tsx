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
			<h6 className='font-light uppercase tracking-widest text-slate-400'>
				{t(`${title.toLocaleLowerCase().replace(/\s/g, '')}`)}
			</h6>
			<p className='text-slate-100 font-light text-2xl'>{value}</p>
		</div>
	);
};
