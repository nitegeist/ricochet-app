import { AlertTypes } from 'enumerations/alertTypes.enum';

export default class AlertAction {
	static SHOW_ALERT = 'SHOW_ALERT';
	static HIDE_ALERT = 'HIDE_ALERT';

	static showSuccessAlert = (title: string, message: string) => {
		return {
			type: AlertAction.SHOW_ALERT,
			payload: { title, message, type: AlertTypes.SUCCESS },
		};
	};

	static showLoadingAlert = (message: string, hash: string) => {
		return {
			type: AlertAction.SHOW_ALERT,
			payload: { message, hash, type: AlertTypes.LOADING },
		};
	};

	static showErrorAlert = (title: string, message: string) => {
		return {
			type: AlertAction.SHOW_ALERT,
			payload: { title, message, type: AlertTypes.ERROR },
		};
	};

	static hideAlert = () => {
		return {
			type: AlertAction.HIDE_ALERT,
			payload: { type: AlertTypes.NONE },
		};
	};
}
