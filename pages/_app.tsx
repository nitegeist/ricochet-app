import { ConnectKitProvider } from 'connectkit';
import { AlertProvider } from 'contexts/AlertContext';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
	arbitrum,
	arbitrumGoerli, goerli, mainnet, optimism,
	optimismGoerli,
	polygon,
	polygonMumbai
} from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import '../styles/globals.css';

const { chains, provider, webSocketProvider } = configureChains(
	[mainnet, goerli, arbitrum, arbitrumGoerli, polygon, polygonMumbai, optimism, optimismGoerli],
	[alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }), publicProvider()]
);
const client = createClient({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'Ricochet',
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				qrcode: true,
			},
		}),
		new InjectedConnector({
			chains,
			options: {
				name: 'Injected',
				shimDisconnect: true,
			},
		}),
	],
	provider,
	webSocketProvider,
});

function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider
				theme='midnight'
				customTheme={{
					'--ck-font-family': '"Montserrat"',
					'--ck-accent-color': '#81a8ce',
					'--ck-accent-text-color': '##f1f5f9',
					'--ck-body-background': '#16212C',
				}}>
				<Provider store={store()}>
					<AlertProvider>
						<Component {...pageProps} />
					</AlertProvider>
				</Provider>
			</ConnectKitProvider>
		</WagmiConfig>
	);
}

export default appWithTranslation(App);
