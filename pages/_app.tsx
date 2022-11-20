import { connectorsForWallets, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { coinbaseWallet, injectedWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import '../styles/globals.css';

const { chains, provider } = configureChains(
	[chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
	[alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }), publicProvider()]
);

const connectors = connectorsForWallets([
	{
		groupName: 'Suggested',
		wallets: [
			injectedWallet({ chains }),
			metaMaskWallet({ chains }),
			coinbaseWallet({ chains, appName: 'Ricochet' }),
			walletConnectWallet({ chains }),
		],
	},
]);

const appInfo = {
	appName: 'Ricochet',
};

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				theme={darkTheme({
					accentColor: '#81a8ce',
					accentColorForeground: '#1E293B',
					borderRadius: 'small',
					fontStack: 'system',
					overlayBlur: 'small',
				})}
				appInfo={appInfo}
				chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default appWithTranslation(App);
