import wbtc from '@richochet/assets/images/coins/bitcoin.svg';
import btc from '@richochet/assets/images/coins/bitcoinRotate.svg';
import dai from '@richochet/assets/images/coins/dai.svg';
import eth from '@richochet/assets/images/coins/ethereum.svg';
import iballuobtc from '@richochet/assets/images/coins/ibbtc.svg';
import iballuoeth from '@richochet/assets/images/coins/ibeth.svg';
import iballuousd from '@richochet/assets/images/coins/ibusd.svg';
import idle from '@richochet/assets/images/coins/idle.svg';
import matic from '@richochet/assets/images/coins/matic.svg';
import mkr from '@richochet/assets/images/coins/mkr.svg';
import rexhat from '@richochet/assets/images/coins/rexhat.svg';
import rexshirt from '@richochet/assets/images/coins/rexshirt.svg';
import ric from '@richochet/assets/images/coins/ric.svg';
import shib from '@richochet/assets/images/coins/shibaInu.svg';
import slp from '@richochet/assets/images/coins/slp.svg';
import sushi from '@richochet/assets/images/coins/sushiswap.svg';
import usdt from '@richochet/assets/images/coins/tetherUsdt.svg';
import usdc from '@richochet/assets/images/coins/usdCoin.svg';

export enum Coin {
	WBTC = 'WBTC',
	IDLE = 'IDLE',
	BTC = 'BTC',
	ETH = 'ETH',
	SHIB = 'SHIB',
	USDT = 'USDT',
	USDC = 'USDC',
	DAI = 'DAI',
	MATIC = 'MATIC',
	MKR = 'MKR',
	RIC = 'RIC',
	WETH = 'ETH',
	SLP = 'USDC-ETH',
	USDCx = 'USDCx',
	DAIx = 'DAIx',
	MKRx = 'MKRx',
	WETHx = 'WETHx',
	ETHx = 'ETHx',
	WBTCx = 'WBTCx',
	rexLPEth = 'USDC/ETH',
	SUSHI = 'SUSHI',
	MATICx = 'MATICx',
	SUSHIx = 'SUSHIx',
	IDLEx = 'IDLEx',
	IbAlluoETH = 'IbAlluoETH',
	IbAlluoUSD = 'IbAlluoUSD',
	StIbAlluoETH = 'StIbAlluoETH',
	StIbAlluoUSD = 'StIbAlluoUSD',
	StIbAlluoBTC = 'StIbAlluoBTC',
	IbAlluoBTC = 'IbAlluoBTC',
	REXSHIRT = 'REXSHIRT',
	REXHAT = 'REXHAT',
}

export const namesCoin = [
	Coin.USDC,
	Coin.DAI,
	Coin.MKR,
	Coin.WETH,
	Coin.WBTC,
	Coin.SLP,
	Coin.RIC,
	Coin.MATIC,
	Coin.SUSHI,
	Coin.IDLE,
	Coin.IbAlluoETH,
	Coin.IbAlluoUSD,
	Coin.IbAlluoBTC,
];

export const namesCoinX = [
	Coin.DAIx,
	Coin.MKRx,
	Coin.USDCx,
	Coin.WBTCx,
	Coin.WETHx,
	Coin.rexLPEth,
	Coin.MATICx,
	Coin.SUSHIx,
	Coin.IDLEx,
	Coin.StIbAlluoETH,
	Coin.StIbAlluoUSD,
	Coin.StIbAlluoBTC,
];

export const iconsCoin: Partial<Record<Coin, string>> = {
	[Coin.USDC]: usdc,
	[Coin.WBTC]: wbtc,
	[Coin.ETH]: eth,
	[Coin.USDT]: usdt,
	[Coin.SHIB]: shib,
	[Coin.BTC]: btc,
	[Coin.DAI]: dai,
	[Coin.MATIC]: matic,
	[Coin.MKR]: mkr,
	[Coin.RIC]: ric,
	[Coin.REXSHIRT]: rexshirt,
	[Coin.REXHAT]: rexhat,
	[Coin.WETH]: eth,
	[Coin.SLP]: slp,
	[Coin.DAIx]: dai,
	[Coin.MKRx]: mkr,
	[Coin.USDCx]: usdc,
	[Coin.WBTCx]: wbtc,
	[Coin.WETHx]: eth,
	[Coin.ETHx]: eth,
	[Coin.rexLPEth]: slp,
	[Coin.IDLE]: idle,
	[Coin.IDLEx]: idle,
	[Coin.SUSHI]: sushi,
	[Coin.MATICx]: matic,
	[Coin.SUSHIx]: sushi,
	[Coin.IbAlluoETH]: iballuoeth,
	[Coin.IbAlluoUSD]: iballuousd,
	[Coin.StIbAlluoETH]: iballuoeth,
	[Coin.StIbAlluoUSD]: iballuousd,
	[Coin.IbAlluoBTC]: iballuobtc,
	[Coin.StIbAlluoBTC]: iballuobtc,
};
