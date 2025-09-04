"use client";
import { useState } from "react";
import { ethers } from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";

let wcProvider: EthereumProvider | null = null;

const projectId = "29a699b060ba734c4986b31205e83da5"; // for test only

export default function WalletPage() {
  const [address, setAddress] = useState<string | null>(null);

  async function connectWallet() {
    try {
      // If in browser use extention to build connection
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        setAddress(await signer.getAddress());
        return;
      }

      // If on mobile use inlink
      if (!wcProvider) {
        wcProvider = await EthereumProvider.init({
          projectId,
          chains: [11155111], // Sepolia
          showQrModal: true,
        });
      }

      await wcProvider.enable();
      const ethersProvider = new ethers.BrowserProvider(wcProvider as any);
      const signer = await ethersProvider.getSigner();
      setAddress(await signer.getAddress());
    } catch (err) {
      console.error("Wallet connection failed", err);
    }
  }

  return (
    <div className="p-6 text-center">
      {address ? (
        <p className="text-green-600">Connected: {address}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
