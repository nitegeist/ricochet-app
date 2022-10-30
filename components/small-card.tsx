import { NextPage } from 'next';
import { Stat } from 'pages';

interface Props {
	stat: Stat;
}

export const SmallCard: NextPage<Props> = ({ stat: { title, value } }) => {
	return (
		<div className='card-sm'>
			<h6 className='font-light uppercase tracking-widest text-slate-400'>{title}</h6>
			<p className='text-slate-100 font-light text-2xl'>{value}</p>
		</div>
	);
};
