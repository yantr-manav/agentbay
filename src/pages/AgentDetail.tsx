import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Agent } from '@/hooks/useAgents';
import { useAuth } from '@/hooks/useAuth';
import RentAgentModal from '@/components/RentAgentModal';

const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRentModalOpen, setIsRentModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAgent = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('agents')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        // Transform the data to match our interface
        if (data) {
          // Handle tags field - ensure it's always an array
          let tags: string[] = [];
          if (Array.isArray(data.tags)) {
            tags = data.tags;
          } else if (typeof data.tags === 'string' && data.tags.trim()) {
            // If it's a comma-separated string, split it
            tags = data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
          }

          const transformedAgent: Agent = {
            ...data,
            tags,
            price_per_hour: parseFloat(data.price_per_hour?.toString() || '0'),
            rating: parseFloat(data.rating?.toString() || '0'),
            total_sessions: parseInt(data.total_sessions?.toString() || '0'),
            avatar: data.avatar || '',
            category: data.category || '',
            name: data.name || '',
            description: data.description || '',
            status: data.status || 'active',
            created_at: data.created_at,
            updated_at: data.updated_at || data.created_at,
            creator_id: data.creator_id,
            capabilities: data.capabilities
          };
          setAgent(transformedAgent);
        }
      } catch (error) {
        console.error('Error fetching agent:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [id]);

  const handleRentClick = () => {
    if (!user) {
      window.location.href = '/auth';
      return;
    }
    setIsRentModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black">
        <Navigation />
        <div className="pt-24 pb-12 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-aqua"></div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-cyber-black">
        <Navigation />
        <div className="pt-24 pb-12 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Agent Not Found</h1>
          <Link to="/explore">
            <Button className="cyber-button">
              <span className="relative z-10">Browse Agents</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-effect rounded-3xl p-8">
              <div className="flex items-start space-x-6 mb-8">
                <div className="text-6xl">{agent.avatar}</div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{agent.name}</h1>
                  <p className="text-white/70 text-lg mb-4">{agent.description}</p>
                  
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-neon-green">⭐</span>
                      <span className="text-white font-bold">{agent.rating}</span>
                      <span className="text-white/60">({agent.total_sessions} sessions)</span>
                    </div>
                    <div className="text-cyber-aqua font-bold text-xl">
                      {agent.price_per_hour} ETH/hour
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {agent.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-cyber-violet/20 text-cyber-violet text-sm rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      onClick={handleRentClick}
                      className="cyber-button px-8 py-3"
                    >
                      <span className="relative z-10">Rent This Agent</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-cyber-violet text-cyber-violet hover:bg-cyber-violet/10 px-8 py-3"
                    >
                      Try Demo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Capabilities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {agent.tags.map((capability) => (
                    <div key={capability} className="flex items-center space-x-3 p-3 bg-cyber-dark/30 rounded-xl">
                      <div className="w-2 h-2 bg-cyber-aqua rounded-full"></div>
                      <span className="text-white">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Reviews</h2>
                <div className="space-y-4">
                  <div className="bg-cyber-dark/30 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex text-neon-green">⭐⭐⭐⭐⭐</div>
                      <span className="text-white font-medium">Amazing performance!</span>
                    </div>
                    <p className="text-white/70">This agent helped me complete my research project in half the time. Highly recommended!</p>
                  </div>
                  <div className="bg-cyber-dark/30 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex text-neon-green">⭐⭐⭐⭐⭐</div>
                      <span className="text-white font-medium">Great value</span>
                    </div>
                    <p className="text-white/70">Excellent results and very responsive. Will definitely use again.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RentAgentModal
        isOpen={isRentModalOpen}
        onClose={() => setIsRentModalOpen(false)}
        agent={agent}
      />
    </div>
  );
};

export default AgentDetail;
