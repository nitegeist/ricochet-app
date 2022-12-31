import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { combineClasses } from '@richochet/utils/helperFunctions';
import { Coin, iconsCoin, namesCoin, namesCoinX } from 'constants/coins';
import { NextPage } from 'next';
import Image from 'next/image';
import { Dispatch, Fragment, SetStateAction } from 'react';

interface Props {
	value: Coin;
	classNames?: string;
	handleChange?: Dispatch<SetStateAction<Coin>>;
}

const TokenList: NextPage<Props> = ({ classNames, value, handleChange }): JSX.Element => (
	<Listbox value={value} onChange={handleChange}>
		<div className={combineClasses(classNames ? classNames : 'relative w-full z-10')}>
			<Listbox.Button className='relative w-full cursor-default rounded-lg bg-slate-700 py-2 pl-3 pr-10 text-left text-slate-200 shadow-md focus:outline-none focus-visible:border-slate-500 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm'>
				<div className='flex items-center whitespace-nowrap space-x-2'>
					<span>
						<Image width='22' height='22' src={iconsCoin[value as Coin] as string} alt={value} />
					</span>
					<span className='block truncate'>{value}</span>
				</div>
				<span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
					<ChevronUpDownIcon className='h-5 w-5 text-slate-100' aria-hidden='true' />
				</span>
			</Listbox.Button>
			<Transition as={Fragment} leave='transition ease-in duration-100' leaveFrom='opacity-100' leaveTo='opacity-0'>
				<Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
					{namesCoin.map((coin, index) => (
						<Listbox.Option
							key={index}
							className={({ active }) =>
								`relative cursor-default select-none py-2 pl-10 pr-4 ${
									active ? 'bg-slate-800 text-slate-200' : 'text-slate-200'
								}`
							}
							value={coin}>
							{({ selected }) => (
								<>
									<div className='flex items-center whitespace-nowrap space-x-2'>
										<span>
											<Image width='22' height='22' src={iconsCoin[coin as Coin] as string} alt={coin} />
										</span>
										<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{coin}</span>
									</div>
									{selected ? (
										<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
											<CheckIcon className='h-5 w-5' aria-hidden='true' />
										</span>
									) : null}

									{selected ? (
										<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
											<CheckIcon className='h-5 w-5' aria-hidden='true' />
										</span>
									) : null}
								</>
							)}
						</Listbox.Option>
					))}
					{namesCoinX.map((coin, index) => (
						<Listbox.Option
							key={index}
							className={({ active }) =>
								`relative cursor-default select-none py-2 pl-10 pr-4 ${
									active ? 'bg-slate-800 text-slate-200' : 'text-slate-200'
								}`
							}
							value={coin}>
							{({ selected }) => (
								<>
									<div className='flex items-center whitespace-nowrap space-x-2'>
										<span>
											<Image width='22' height='22' src={iconsCoin[coin as Coin] as string} alt={coin} />
										</span>
										<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{coin}</span>
									</div>
									{selected ? (
										<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
											<CheckIcon className='h-5 w-5' aria-hidden='true' />
										</span>
									) : null}

									{selected ? (
										<span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-600'>
											<CheckIcon className='h-5 w-5' aria-hidden='true' />
										</span>
									) : null}
								</>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Transition>
		</div>
	</Listbox>
);

export default TokenList;
