import { MetaMaskSDK } from "@metamask/sdk";

const MMSDK = new MetaMaskSDK();

const etherium = MMSDK.getProvider();
