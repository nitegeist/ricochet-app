import { TransactionReceipt } from '@ethersproject/providers';

import { Signer } from '@ethersproject/abstract-signer';
import { getSFFramework } from '@richochet/utils/fluidsdkConfig';
import { Framework } from '@superfluid-finance/sdk-core';
import Operation from '@superfluid-finance/sdk-core/dist/main/Operation';
import { fetchSigner, getAccount, getProvider, prepareWriteContract, writeContract } from '@wagmi/core';
import { superTokenABI } from 'constants/abis';
import { indexIDA } from 'constants/flowConfig';
import {
	MATICxAddress,
	rexLPETHAddress,
	RICAddress,
	ricRexHatLaunchpadAddress,
	ricRexShirtLaunchpadAddress,
	usdcxRicExchangeAddress
} from 'constants/polygon_config';
import { ethers } from 'ethers';
import { polygon } from 'wagmi/chains';
import { gas } from './gasEstimator';

export const downgrade = async (contract: any, amount: string, address: string) => {
	const config = await prepareWriteContract({
		address: contract?.address as `0x${string}`,
		abi: superTokenABI,
		functionName: 'downgrade',
		args: [amount],
		overrides: {
			from: address as `0x${string}`,
		},
	});
	console.log({ config });
	const data = await writeContract(config);
	console.log({ data });
	return data;
};

export const downgradeMatic = async (contract: any, amount: string, address: string) => {
	const config = await prepareWriteContract({
		address: contract?.address as `0x${string}`,
		abi: superTokenABI,
		functionName: 'downgradeToETH',
		args: [amount],
		overrides: {
			from: address as `0x${string}`,
		},
	});
	const data = await writeContract(config);
	return data;
};

export const allowance = (contract: any, address: string, superTokenAddress: string) =>
	contract.methods.allowance(address, superTokenAddress).call();

export const approve = async (contract: any, address: string, tokenAddress: string, amount: string) =>
	contract.methods.approve(tokenAddress, amount).send({
		from: address,
		...(await gas()),
	});

export const upgrade = async (contract: any, amount: string, address: string) =>
	contract.methods.upgrade(amount).send({
		from: address,
		...(await gas()),
	});

export const upgradeMatic = async (contract: any, amount: string, address: string) => {
	contract.methods.upgradeByETH().send({
		from: address,
		value: amount,
		...(await gas()),
	});
};

export const stopFlow = async (exchangeAddress: string, inputTokenAddress: string) => {
	try {
		const { address } = await getAccount();
		const provider = await getProvider({ chainId: polygon.id });
		const framework = await getSFFramework();
		const signer = await fetchSigner({
			chainId: polygon.id,
		});
		const { maxFeePerGas, maxPriorityFeePerGas } = await gas();
		await framework.cfaV1
			.deleteFlow({
				superToken: inputTokenAddress,
				sender: address!,
				receiver: exchangeAddress,
				overrides: {
					maxFeePerGas,
					maxPriorityFeePerGas,
				},
			})
			.exec(signer as Signer);
	} catch (e: any) {
		console.error(e);
		throw new Error(e);
	}
};

const executeBatchOperations = async (
	operations: Operation[],
	framework: Framework,
	signer: Signer
): Promise<TransactionReceipt> => {
	const txnResponse = await framework.batchCall(operations).exec(signer);
	return txnResponse.wait();
};

export const startFlow = async (
	idaContract: any,
	exchangeAddress: string,
	inputTokenAddress: string,
	outputTokenAddress: string,
	amount: number,
	referralId?: string
) => {
	try {
		const { address } = await getAccount();
		const framework = await getSFFramework();
		const config = indexIDA.find(
			(data: any) =>
				data.input === inputTokenAddress &&
				data.output === outputTokenAddress &&
				data.exchangeAddress === exchangeAddress
		);
		if (!config) {
			throw new Error(
				`No config found for this pair: , ${inputTokenAddress}, ${outputTokenAddress}, ${exchangeAddress}`
			);
		}
		const provider = getProvider({ chainId: polygon.id });
		const signer = await fetchSigner({ chainId: polygon.id });
		const web3Subscription = await framework.idaV1.getSubscription({
			superToken: config.output,
			publisher: exchangeAddress,
			indexId: config.outputIndex.toString(),
			subscriber: address!,
			providerOrSigner: provider,
		});
		console.log({ web3Subscription });
		const userFlow = await framework.cfaV1.getFlow({
			superToken: inputTokenAddress,
			sender: address!,
			receiver: exchangeAddress,
			providerOrSigner: provider,
		});
		console.log({ userFlow });
		const { maxFeePerGas, maxPriorityFeePerGas } = await gas();
		console.log({ maxFeePerGas, maxPriorityFeePerGas });
		if (web3Subscription.approved) {
			const transactionData = {
				superToken: inputTokenAddress,
				sender: address!,
				receiver: exchangeAddress,
				flowRate: amount.toString(),
				overrides: {
					gasLimit: 6000000,
				},
			};
			console.log({ transactionData });
			const tx =
				Number(userFlow.flowRate) !== 0
					? await framework.cfaV1.updateFlow(transactionData).exec(signer as Signer)
					: await framework.cfaV1.createFlow(transactionData).exec(signer as Signer);
			return tx;
		} else {
			const userData = referralId ? ethers.utils.solidityPack(['string'], [referralId]) : '0x';
			if (
				exchangeAddress === usdcxRicExchangeAddress ||
				exchangeAddress === ricRexShirtLaunchpadAddress ||
				exchangeAddress == ricRexHatLaunchpadAddress
			) {
				const operations = [
					await framework.idaV1.approveSubscription({
						superToken: outputTokenAddress,
						indexId: '0',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.cfaV1.createFlow({
						superToken: inputTokenAddress,
						sender: address!,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
				];
				console.log({
					superToken: inputTokenAddress,
					sender: address!,
					receiver: exchangeAddress,
					flowRate: amount.toString(),
					userData,
					overrides: {
						maxFeePerGas,
						maxPriorityFeePerGas,
					},
				}),
					await executeBatchOperations(operations, framework, signer as Signer);
			} else if (outputTokenAddress === rexLPETHAddress) {
				const operations = [
					await framework.idaV1.approveSubscription({
						superToken: outputTokenAddress,
						indexId: '0',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.idaV1.approveSubscription({
						superToken: RICAddress,
						indexId: '1',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					/* await framework.idaV1.approveSubscription({
						superToken: WETHxAddress,
						indexId: '2',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}), */
					await framework.idaV1.approveSubscription({
						superToken: MATICxAddress,
						indexId: '3',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.cfaV1.createFlow({
						superToken: inputTokenAddress,
						sender: address!,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
				];
				await executeBatchOperations(operations, framework, signer as Signer);
			} else if (config.subsidy) {
				const operations = [
					await framework.idaV1.approveSubscription({
						superToken: config.output,
						indexId: config.outputIndex.toString(),
						publisher: exchangeAddress,
						userData,
						overrides: {
							gasLimit: 6000000,
						},
					}),
					await framework.idaV1.approveSubscription({
						superToken: config.subsidy,
						indexId: config.subsidyIndex?.toString() || '0',
						publisher: exchangeAddress,
						userData,
						overrides: {
							gasLimit: 6000000,
						},
					}),
					await framework.cfaV1.createFlow({
						superToken: config.input,
						sender: address!,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						userData,
						overrides: {
							gasLimit: 6000000,
						},
					}),
				];
				console.log({
					superToken: inputTokenAddress,
					sender: address!,
					receiver: exchangeAddress,
					flowRate: amount.toString(),
					userData,
					overrides: {
						maxFeePerGas,
						maxPriorityFeePerGas,
					},
				}),
					await executeBatchOperations(operations, framework, signer as Signer);
			} else {
				const operations = [
					await framework.idaV1.approveSubscription({
						superToken: config.output,
						indexId: config.outputIndex.toString(),
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.cfaV1.createFlow({
						superToken: config.input,
						sender: address!,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
				];
				console.log({
					superToken: inputTokenAddress,
					sender: address!,
					receiver: exchangeAddress,
					flowRate: amount.toString(),
					userData,
					overrides: {
						maxFeePerGas,
						maxPriorityFeePerGas,
					},
				}),
					await executeBatchOperations(operations, framework, signer as Signer);
			}
		}
	} catch (e: any) {
		console.error(e);
		throw new Error(e);
	}
};

// TODO Hookup type coinOptions
export const registerToken = async (options: any) => {
	const tokenAdded = await (window as any).ethereum.request({
		method: 'wallet_watchAsset',
		params: {
			type: 'ERC20',
			options,
		},
	});

	return tokenAdded;
};

export const approveToken = async (accountAddress: string, bankAddress: string, tokenContract: any, wad?: any) => {
	const mainWad = wad || ethers.BigNumber.from(2).pow(ethers.BigNumber.from(255));
	const approveRes = await tokenContract.methods
		.approve(bankAddress, mainWad)
		.send({
			from: accountAddress,
			...(await gas()),
		})
		.once('transactionHash', (txHash: string) => {
			console.log(txHash);
		})
		.then((resp: string) => resp);

	return approveRes;
};
