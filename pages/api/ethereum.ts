import { TransactionReceipt } from '@ethersproject/providers';
import { getSFFramework } from '@richochet/utils/fluidsdkConfig';
import { Framework, Operation } from '@superfluid-finance/sdk-core';
import { fetchSigner, getAccount, getProvider } from '@wagmi/core';
import { indexIDA } from 'constants/flowConfig';
import {
	MATICxAddress,
	rexLPETHAddress,
	RICAddress,
	ricRexHatLaunchpadAddress,
	ricRexShirtLaunchpadAddress,
	SUSHIxAddress,
	usdcxRicExchangeAddress
} from 'constants/polygon_config';
import { ethers, Signer } from 'ethers';
import { chain } from 'wagmi';
import { gas } from './gasEstimator';

export const downgrade = async (contract: any, amount: string, address: string) =>
	contract.methods.downgrade(amount).send({
		from: address,
		...(await gas()),
	});

export const downgradeMatic = async (contract: any, amount: string, address: string) =>
	contract.methods.downgradeToETH(amount).send({
		from: address,
		// value: amount,
		...(await gas()),
	});

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
		const provider = getProvider({ chainId: Number(chain.polygon) });
		const { address } = getAccount();
		const signer = await fetchSigner({ chainId: Number(chain.polygon) }).then((signer) => signer);
		const framework = await getSFFramework();
		const config = indexIDA.find(
			(data) =>
				data.input === inputTokenAddress &&
				data.output === outputTokenAddress &&
				data.exchangeAddress === exchangeAddress
		);
		if (!config) {
			throw new Error(
				`No config found for this pair: , ${inputTokenAddress}, ${outputTokenAddress}, ${exchangeAddress}`
			);
		}
		const web3Subscription = await framework.idaV1.getSubscription({
			superToken: config.output,
			publisher: exchangeAddress,
			indexId: config.outputIndex.toString(),
			subscriber: address as string,
			providerOrSigner: provider,
		});
		const userFlow = await framework.cfaV1.getFlow({
			superToken: inputTokenAddress,
			sender: address as string,
			receiver: exchangeAddress,
			providerOrSigner: provider,
		});
		const { maxFeePerGas, maxPriorityFeePerGas } = await gas();
		if (web3Subscription.approved) {
			if (Number(userFlow.flowRate) !== 0) {
				//Existing flow so call updateFlow
				await framework.cfaV1
					.updateFlow({
						superToken: inputTokenAddress,
						sender: address as string,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					})
					.exec(signer as Signer);
			} else {
				// Flow is 0 so createFlow
				await framework.cfaV1
					.createFlow({
						sender: address as string,
						superToken: inputTokenAddress,
						receiver: exchangeAddress,
						flowRate: amount.toString(),
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					})
					.exec(signer as Signer);
			}
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
						sender: address as string,
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
					await framework.idaV1.approveSubscription({
						superToken: SUSHIxAddress,
						indexId: '2',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
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
						sender: address as string,
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
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.idaV1.approveSubscription({
						superToken: config.subsidy,
						indexId: config.subsidyIndex?.toString() || '0',
						publisher: exchangeAddress,
						userData,
						overrides: {
							maxFeePerGas,
							maxPriorityFeePerGas,
						},
					}),
					await framework.cfaV1.createFlow({
						superToken: config.input,
						sender: address as string,
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
						sender: address as string,
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
			}
		}
	} catch (error) {
		console.log(error);
	}
};
