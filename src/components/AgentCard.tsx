
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Agent } from '@/hooks/useAgents';
import { useAuth } from '@/hooks/useAuth';
import RentAgentModal from './RentAgentModal';
import { Link } from 'react-router-dom';

interface AgentCardProps {
  agent: Agent;
  index?: number;
}

const AgentCard = ({ agent, index = 0 }: AgentCardProps) => {
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const { user } = useAuth();

  const handleRentClick = () => {
    if (!user) {
      // Redirect to auth page
      window.location.href = '/auth';
      return;
    }
    setIsRentModalOpen(true);
  };

  return (
    <>
      <div 
        className="group glass-effect rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyber-violet/20 animate-fade-in"
        style={{animationDelay: `${index * 0.1}s`}}
      >
        <div className="text-3xl mb-4">{agent.avatar}</div>
        
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyber-aqua transition-colors">
          {agent.name}
        </h3>
        
        <p className="text-white/70 text-sm mb-4 line-clamp-3">
          {agent.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {agent.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 bg-cyber-violet/20 text-cyber-violet text-xs rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <span className="text-neon-green">⭐</span>
            <span className="text-white text-sm">{agent.rating}</span>
            <span className="text-white/60 text-xs">({agent.total_sessions} sessions)</span>
          </div>
          <div className="text-cyber-aqua font-bold text-sm">
            {agent.price_per_hour} ETH/hour
          </div>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleRentClick}
            className="w-full bg-gradient-to-r from-cyber-violet to-cyber-aqua hover:scale-105 transition-transform text-sm"
          >
            Rent Now
          </Button>
          <Link to={`/agent/${agent.id}`}>
            <Button variant="outline" className="w-full border-cyber-violet/50 text-cyber-violet hover:bg-cyber-violet/10 text-sm">
              View Details
            </Button>
          </Link>
        </div>
      </div>

      <RentAgentModal
        isOpen={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
        agent={agent}
      />
    </>
  );
};

export default AgentCard;
