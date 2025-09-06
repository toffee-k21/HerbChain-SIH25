import { ethers } from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";
import HerbChainABI from "../utils/ABI.json";
import contractAddress from "../utils/Address.json";

const projectId = "29a699b060ba734c4986b31205e83da5";

let wcProvider: EthereumProvider | null = null;

export async function getWalletProvider() {
  if (typeof window === "undefined") throw new Error("Window not available");

  // 1. Check injected wallets (MetaMask extension / Coinbase Wallet in desktop browser)
  if ((window as any).ethereum) {
    return new ethers.BrowserProvider((window as any).ethereum);
  }

  // 2. Fallback to WalletConnect for mobile browsers (no extension support)
  if (!wcProvider) {
    wcProvider = await EthereumProvider.init({
      projectId,
      chains: [11155111], // e.g. Sepolia testnet
      showQrModal: true,
    });
    await wcProvider.enable();
  }

  return new ethers.BrowserProvider(wcProvider as any);
}

export async function getHerbChainContract() {
  const provider = await getWalletProvider();
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, HerbChainABI, signer);
}

export async function recordCollection(
    batchId: string,
    herbName: string,
    quantity: number,
    actorId: string,
    quality: string,
    location: string,
    details: string
  ) {
    const contract = await getHerbChainContract();
    // console.log("contract",contract.recordCollection);
    const tx = await contract.recordCollection(
      batchId,
      herbName,
      quantity,
      actorId,
      quality,
      location,
      details
    );
    return tx.wait();
  }
