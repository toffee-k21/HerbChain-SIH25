"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Check, AlertCircle, Smartphone, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

let wcProvider: EthereumProvider | null = null;

const projectId = "29a699b060ba734c4986b31205e83da5"; // for test only

export default function WalletPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [lastAttempt, setLastAttempt] = useState<number>(0);

  async function connectWallet() {
    // Prevent multiple simultaneous connection attempts
    if (isConnecting) {
      return;
    }

    // Prevent rapid successive attempts (wait at least 2 seconds between attempts)
    const now = Date.now();
    if (now - lastAttempt < 2000) {
      return;
    }
    setLastAttempt(now);

    setIsConnecting(true);
    setConnectionStatus('connecting');
    setErrorMessage('');
    
    try {
      // If in browser use extension to build connection
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        
        // Check if already connected first
        const accounts = await provider.send("eth_accounts", []);
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
          setConnectionStatus('connected');
          setIsConnecting(false);
          return;
        }

        // Request account access only if not already connected
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const walletAddress = await signer.getAddress();
        setAddress(walletAddress);
        setConnectionStatus('connected');
        return;
      }

      // If on mobile use walletconnect
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
      const walletAddress = await signer.getAddress();
      setAddress(walletAddress);
      setConnectionStatus('connected');
    } catch (err: any) {
      console.error("Wallet connection failed", err);
      setConnectionStatus('failed');
      
      // Handle specific error types
      if (err.code === -32002) {
        setErrorMessage('Please wait for the current wallet request to complete, then try again.');
      } else if (err.code === 4001) {
        setErrorMessage('Connection rejected by user.');
      } else if (err.message?.includes('User rejected')) {
        setErrorMessage('Connection rejected by user.');
      } else {
        setErrorMessage(t('wallet.connection.failed'));
      }
    } finally {
      setIsConnecting(false);
    }
  }

  const navigateToDashboard = () => {
    router.push("/home");
  };

  const resetConnection = () => {
    setAddress(null);
    setConnectionStatus('idle');
    setErrorMessage('');
    setIsConnecting(false);
  };

  const disconnectWallet = async () => {
    try {
      // For WalletConnect
      if (wcProvider) {
        await wcProvider.disconnect();
        wcProvider = null;
      }
      
      // Reset all state
      setAddress(null);
      setConnectionStatus('idle');
      setErrorMessage('');
      setIsConnecting(false);
      
      // For browser wallets, we can't actually disconnect programmatically
      // but we clear our local state
    } catch (error) {
      console.error("Disconnect failed:", error);
      // Still reset the state even if disconnect fails
      resetConnection();
    }
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 15)}...${addr.slice(-4)}`;
  };

  useEffect(() => {
    // Check if wallet is already connected
    if (typeof window !== "undefined" && (window as any).ethereum) {
      (window as any).ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setConnectionStatus('connected');
          }
        });
    }
  }, []);

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FCFFFE 43%, #A7F2CC 67%, #00D96B 100%)'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Wallet className="w-12 h-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">
            {t('wallet.title')}
          </h1>
        </motion.div>

        {/* Wallet Connection Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto bg-white rounded-md shadow-2xl overflow-hidden"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 25px rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="p-8">
            
            {/* Connection Status */}
            <AnimatePresence mode="wait">
              {connectionStatus === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" />
                      <span className="text-sm font-medium">
                        {t('wallet.status.disconnected')}
                      </span>
                    </div>
                    
                    {/* Connection Methods */}
                    <div className="space-y-3 text-left">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Globe className="w-5 h-5 text-primary" />
                        <span className="text-xs text-gray-700">{t('wallet.browser.detected')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={connectWallet}
                    disabled={isConnecting || (Date.now() - lastAttempt < 2000)}
                    className="w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isConnecting ? t('wallet.connection.trying') : t('wallet.connect')}
                  </Button>
                </motion.div>
              )}

              {connectionStatus === 'connecting' && (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                      <Wallet className="absolute inset-0 m-auto w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-primary font-semibold">
                      {t('wallet.connection.trying')}
                    </p>
                    <p className="text-sm text-gray-500">
                      Please check your wallet application
                    </p>
                  </div>
                </motion.div>
              )}

              {connectionStatus === 'connected' && address && (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm font-medium">
                        {t('wallet.status.connected')}
                      </span>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-md border border-green-200">
                      <p className="text-sm text-gray-600 mb-2">
                        {t('wallet.address')}:
                      </p>
                      <p className="font-mono text-primary font-semibold">
                        {formatAddress(address)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={navigateToDashboard}
                      className="w-full"
                    >
                      {t('wallet.continue')}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                    
                    <Button
                      onClick={disconnectWallet}
                      variant="outline"
                      className="w-full py-2 text-sm border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
                    >
                      {t('wallet.disconnect')}
                    </Button>
                  </div>
                </motion.div>
              )}

              {connectionStatus === 'failed' && (
                <motion.div
                  key="failed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="p-3 bg-red-100 rounded-full">
                      <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-red-600 font-semibold">
                      {t('wallet.connection.failed')}
                    </p>
                    {errorMessage && (
                      <p className="text-sm text-gray-500">
                        {errorMessage}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={connectWallet}
                      disabled={isConnecting || (Date.now() - lastAttempt < 2000)}
                      className="w-full py-4 bg-primary hover:bg-primary-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Try Again
                    </Button>
                    
                    <Button
                      onClick={resetConnection}
                      variant="outline"
                      className="w-full py-2 text-sm border-gray-300 text-gray-600 hover:bg-gray-50"
                    >
                      Reset & Start Over
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
