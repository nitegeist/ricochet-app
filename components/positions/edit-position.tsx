import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { OutlineButton, RoundedButton } from '../button';
import { PositionData } from './positions';

interface Props {
	setClose: Function;
	position: PositionData;
}

export const EditPosition: NextPage<Props> = ({ setClose, position }) => {
	const { t } = useTranslation('home');
	const [action, setAction] = useState('');
	const [amount, setAmount] = useState('');
	const handleSubmit = (event) => {
		event.preventDefault();
	};
	return (
		<div className='flex flex-col space-y-4'>
			{!action && (
				<>
					<h6 className='text-slate-100'>{t('position-action')}?</h6>
					<OutlineButton action={`${t('change-swap-amount')}`} type='button' handleClick={() => setAction('change')} />
					<OutlineButton action={`${t('deposit')} ${position.from}`} type='button' />
					<RoundedButton action={`${t('stop-position')}`} type='button' />
					<hr className='border-slate-500' />
					<div className='flex justify-end'>
						<button type='button' className='outline-none text-slate-100 underline' onClick={() => setClose(false)}>
							{t('cancel')}
						</button>
					</div>
				</>
			)}
			{action === 'change' && (
				<form id='change-swap-form' className='flex flex-col space-y-6' onSubmit={handleSubmit}>
					<label className='text-slate-100'>{t('desired-swap-amount')}?</label>
					<input
						type='number'
						step='any'
						className='input-outline'
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						placeholder={`${t('swap-amount')}`}
					/>
					<div className='flex justify-end space-x-4'>
						<button type='button' className='outline-none text-slate-100 underline' onClick={() => setAction('')}>
							{t('cancel')}
						</button>
						<RoundedButton action={`${t('confirm-change')}`} primary={true} disabled={!amount} type='submit' />
					</div>
				</form>
			)}
		</div>
	);
};
