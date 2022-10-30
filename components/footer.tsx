import { RectangleGroupIcon } from '@heroicons/react/24/solid';

export const Footer = () => {
	return (
		<div className='flex flex-wrap items-start justify-between bg-slate-900 p-16'>
			<h6 className='text-slate-100 font-bold flex space-x-2 mb-10 md:mb-0'>
				<RectangleGroupIcon className='h-6 w-6' />
				<span>Ricochet</span>
			</h6>
			<section className='flex flex-wrap items-center space-x-14 lg:space-x-32'>
				<article className='flex flex-col space-y-4'>
					<h6 className='text-slate-500 font-bold'>Support</h6>
					<a href='http://' className='text-slate-400 underline'>
						Discord
					</a>
					<a href='http://' className='text-slate-400 underline'>
						Tutorials
					</a>
					<a href='http://' className='text-slate-400 underline'>
						Documentation
					</a>
				</article>
				<article className='flex flex-col space-y-4'>
					<h6 className='text-slate-500 font-bold'>Explore</h6>
					<a href='http://' className='text-slate-400 underline'>
						Medium
					</a>
					<a href='http://' className='text-slate-400 underline'>
						Github
					</a>
					<a href='http://' className='text-slate-400 underline'>
						Twitter
					</a>
				</article>
			</section>
		</div>
	);
};
