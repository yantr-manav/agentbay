
import { useAgents } from '@/hooks/useAgents';
import AgentCard from './AgentCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedAgentsSection = () => {
  const { agents, loading } = useAgents();

  const featuredAgents = agents.slice(0, 6);

  return (
    <section className="py-24 bg-gradient-to-b from-cyber-black to-cyber-dark/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-cyber-gradient">Featured AI Agents</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover the most popular and highly-rated AI agents in our marketplace
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-effect rounded-2xl p-6 animate-pulse">
                <div className="w-12 h-12 bg-cyber-violet/20 rounded-lg mb-4"></div>
                <div className="h-6 bg-cyber-violet/20 rounded mb-2"></div>
                <div className="h-4 bg-cyber-violet/20 rounded mb-4"></div>
                <div className="flex space-x-2 mb-4">
                  <div className="h-6 w-16 bg-cyber-violet/20 rounded"></div>
                  <div className="h-6 w-20 bg-cyber-violet/20 rounded"></div>
                </div>
                <div className="h-10 bg-cyber-violet/20 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredAgents.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/explore">
            <Button className="cyber-button text-lg px-8 py-4">
              <span className="relative z-10">Explore All Agents</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAgentsSection;
