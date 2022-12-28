import AlertAction from '@richochet/utils/alertAction';
import { AlertTypes } from 'enumerations/alertTypes.enum';
import { createContext, useReducer } from 'react';

interface IAlertShower {
	type: AlertTypes;
	message: string;
	title?: string;
	hash?: string;
}

interface IAlertState {
	alertShower?: IAlertShower;
}

const initialState: IAlertState = {
	alertShower: {
		type: AlertTypes.NONE,
		title: '',
		message: '',
		hash: '',
	},
};

export const AlertContext = createContext<any>(initialState);

const alertReducer = (state: any, action: any) => {
	switch (action.type) {
		case AlertAction.SHOW_ALERT:
			return {
				...state,
				alertShower: action.payload,
			};
		case AlertAction.HIDE_ALERT:
			return {
				...state,
				alertShower: action.payload,
			};
		default:
			return state;
	}
};

export default alertReducer;

export const AlertProvider = ({ children }: any) => {
	const [state, dispatch] = useReducer(alertReducer, initialState);

	const value: any = [state, dispatch];

	return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>;
};
