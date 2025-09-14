
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TransactionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  price: string;
  duration: string;
}

const TransactionPreviewModal = ({ isOpen, onClose, agentName, price, duration }: TransactionPreviewModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const mockTransactionData = {
    contractHash: '0x1234...5678',
    gasEstimate: '0.0012 ETH',
    totalCost: '0.0512 ETH',
    networkFee: '0.0012 ETH'
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate transaction processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: "Transaction Confirmed",
        description: `Successfully rented ${agentName}`,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to process transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-cyber-dark/95 backdrop-blur-xl border border-cyber-violet/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyber-gradient">
            Transaction Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Agent Details */}
          <div className="bg-cyber-violet/10 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-white mb-2">{agentName}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Duration:</span>
                <span className="text-white">{duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Rate:</span>
                <span className="text-cyber-aqua">{price}</span>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-white/60">Agent Rental</span>
              <span className="text-white">{price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Network Fee</span>
              <span className="text-white">{mockTransactionData.networkFee}</span>
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between">
              <span className="text-white font-semibold">Total Cost</span>
              <span className="text-cyber-aqua font-bold">{mockTransactionData.totalCost}</span>
            </div>
          </div>

          {/* Smart Contract Info */}
          <div className="bg-cyber-dark/30 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Smart Contract</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Contract:</span>
                <span className="text-cyber-violet font-mono">{mockTransactionData.contractHash}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Gas Estimate:</span>
                <span className="text-white">{mockTransactionData.gasEstimate}</span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-neon-green/10 border border-neon-green/20 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-neon-green">🛡️</span>
              <span className="text-neon-green font-semibold">Security Notice</span>
            </div>
            <p className="text-white/70 text-sm">
              Smart contracts audited by CertiK. Your funds are protected by escrow until session completion.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              className="flex-1 border-white/20 text-white/70"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 cyber-button"
              onClick={handleApprove}
              disabled={isProcessing}
            >
              <span className="relative z-10">
                {isProcessing ? 'Processing...' : 'Approve & Execute'}
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionPreviewModal;
