import { exchangeAddresses } from 'constants/polygon_config';
import { ExchangeKeys } from 'enumerations/exchangeKeys.enum';

export const getExchangeAddressFromKey = (exchangeKey: ExchangeKeys) => {
	return exchangeAddresses[exchangeKey];
};
