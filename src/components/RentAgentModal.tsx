
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRentals } from '@/hooks/useRentals';
import { Agent } from '@/hooks/useAgents';

interface RentAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent | null;
}

const RentAgentModal = ({ isOpen, onClose, agent }: RentAgentModalProps) => {
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);
  const { createRental } = useRentals();

  if (!isOpen || !agent) return null;

  const totalCost = agent.price_per_hour * duration;

  const handleRent = async () => {
    setLoading(true);
    const rental = await createRental(agent.id, duration);
    if (rental) {
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-effect rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Rent Agent</h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="text-3xl">{agent.avatar}</div>
          <div>
            <h4 className="text-lg font-bold text-white">{agent.name}</h4>
            <p className="text-cyber-aqua">{agent.price_per_hour} ETH/hour</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-white font-medium mb-2">
              Duration (hours)
            </label>
            <Input
              type="number"
              min="1"
              max="24"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
            />
          </div>

          <div className="bg-cyber-dark/30 rounded-xl p-4">
            <div className="flex justify-between text-white/70 mb-2">
              <span>Duration:</span>
              <span>{duration} hour(s)</span>
            </div>
            <div className="flex justify-between text-white/70 mb-2">
              <span>Rate:</span>
              <span>{agent.price_per_hour} ETH/hour</span>
            </div>
            <div className="border-t border-white/20 pt-2 flex justify-between text-white font-bold">
              <span>Total Cost:</span>
              <span>{totalCost.toFixed(4)} ETH</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/30 text-white/70"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRent}
              disabled={loading}
              className="flex-1 cyber-button"
            >
              <span className="relative z-10">
                {loading ? 'Processing...' : 'Rent Now'}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentAgentModal;
