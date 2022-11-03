import sampleImage from '@richochet/assets/images/sample-bg.jpg';
import { NextPage } from 'next';
import Image from 'next/image';

interface Props {
	content: JSX.Element;
}

export const Card: NextPage<Props> = ({ content }) => {
	return <div className='card'>{content}</div>;
};

export const CardWithOutline: NextPage<Props> = ({ content }) => {
	return <div className='card-outline text-center'>{content}</div>;
};

export const CardWithBackground: NextPage<Props> = ({ content }) => {
	return (
		<div className='card text-center relative'>
			<div className='z-10'>{content}</div>
			{/* Background Image */}
			<Image
				src={sampleImage}
				className='object-cover object-bottom absolute inset-0 z-0 rounded-lg'
				draggable='false'
				fill={true}
				sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
				alt='Sample Image'
				priority={true}
			/>
			<div className='absolute inset-0 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 z-0 opacity-60'></div>
		</div>
	);
};
