
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

const WalletConnectModal = ({ isOpen, onClose, onConnect }: WalletConnectModalProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const wallets = [
    {
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect using browser wallet',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Connect with QR code',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Connect using Coinbase',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'Phantom',
      icon: '👻',
      description: 'Solana wallet support',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const handleWalletConnect = async (walletName: string) => {
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onConnect(walletName);
      toast({
        title: "Wallet Connected",
        description: `Successfully connected ${walletName}`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-cyber-dark/95 backdrop-blur-xl border border-cyber-violet/20">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-cyber-gradient mb-2">
            Connect Your Wallet
          </DialogTitle>
          <p className="text-white/70">Secure. Fast. Decentralized.</p>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {wallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className={`w-full h-16 border-2 border-white/10 hover:border-cyber-violet/50 bg-gradient-to-r ${wallet.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 group`}
              onClick={() => handleWalletConnect(wallet.name)}
              disabled={isConnecting}
            >
              <div className="flex items-center space-x-4">
                <span className="text-2xl group-hover:animate-pulse">{wallet.icon}</span>
                <div className="text-left">
                  <div className="font-semibold text-white">{wallet.name}</div>
                  <div className="text-sm text-white/60">{wallet.description}</div>
                </div>
              </div>
            </Button>
          ))}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-cyber-dark px-2 text-white/60">Or</span>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full text-cyber-aqua hover:bg-cyber-aqua/10"
            onClick={() => {
              toast({
                title: "Guest Mode",
                description: "Browsing in guest mode with limited features",
              });
              onClose();
            }}
          >
            Continue as Guest
          </Button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-white/50">
            By connecting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnectModal;
