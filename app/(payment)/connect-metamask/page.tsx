"use client";

import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import detectEthereumProvider from "@metamask/detect-provider";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const ConnectMetamask = () => {
	const [hasProvider, setHasProvider] = useState<boolean | null>(null);
	const initialState = { accounts: [] };
	const [wallet, setWallet] = useState(initialState);

	useEffect(() => {
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true });
			console.log(provider);
			setHasProvider(Boolean(provider));
		};

		getProvider();
	}, []);

	const updateWallet = async (accounts: any) => {
		setWallet({ accounts });
	};

	const handleConnect = async () => {
		let accounts = await window?.ethereum?.request({
			method: "eth_requestAccounts",
		});
		updateWallet(accounts);
	};

	const sendEth = async () => {
		window.ethereum?.request({
			method: "eth_sendTransaction",
			params: [
				{
					from: wallet.accounts[0],
					to: "0xd5ecF94046296665Fc7eB2f0D6614E2E8578F094",
					value: "0x38d7ea4c68000",
					gasLimit: "0x5028",
					maxPriorityFeePerGas: "0x3b9aca00",
					maxFeePerGas: "0x2540be400",
				},
			],
		});
	};

	return (
		<div className="flex items-center justify-center h-full ">
			<Card className="">
				<CardHeader className="pb-8 ">
					<CardTitle>Pay Booking</CardTitle>
					<CardDescription>Pay a commitment fee</CardDescription>
				</CardHeader>
				<CardContent>
					{hasProvider && (
						<Button variant="destructive" onClick={handleConnect}>
							Connect MetaMask
						</Button>
					)}

					{wallet.accounts.length > 0 && (
						<>
							<div>Wallet Accounts: {wallet.accounts[0]}</div>
							<Button
								variant="destructive"
								onClick={() =>
									sendEth().then(() => {
										console.log("done");
									})
								}
							>
								Send money
							</Button>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default ConnectMetamask;
