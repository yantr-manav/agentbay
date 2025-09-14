
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Input } from '@/components/ui/input';
import { useAgents } from '@/hooks/useAgents';
import AgentCard from '@/components/AgentCard';

const ExploreAgents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { agents, loading } = useAgents();

  const categories = [
    { id: 'all', name: 'All Agents', count: agents.length },
    { id: 'research', name: 'Research', count: agents.filter(a => a.category === 'research').length },
    { id: 'content', name: 'Content Creation', count: agents.filter(a => a.category === 'content').length },
    { id: 'development', name: 'Development', count: agents.filter(a => a.category === 'development').length },
    { id: 'business', name: 'Business', count: agents.filter(a => a.category === 'business').length },
    { id: 'automation', name: 'Automation', count: agents.filter(a => a.category === 'automation').length }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-cyber-gradient">Explore AI Agents</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Discover and rent the perfect AI agent for your specific needs
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search agents by name, functionality, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-cyber-dark/50 border-cyber-violet/30 text-white placeholder:text-white/50 focus:border-cyber-aqua rounded-2xl"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyber-violet">
                🔍
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-2xl p-6 sticky top-32">
                <h3 className="text-xl font-bold text-white mb-6">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all ${
                        selectedCategory === category.id
                          ? 'bg-cyber-violet/20 text-cyber-violet border border-cyber-violet/30'
                          : 'bg-cyber-dark/30 text-white/70 hover:bg-cyber-dark/50 hover:text-white'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{category.name}</span>
                        <span className="text-sm opacity-60">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Agents Grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">
                  {loading ? 'Loading...' : `${filteredAgents.length} Agents Found`}
                </h2>
                <select className="bg-cyber-dark/50 border border-cyber-violet/30 rounded-xl px-4 py-2 text-white">
                  <option>Sort by Popularity</option>
                  <option>Sort by Rating</option>
                  <option>Sort by Price</option>
                  <option>Sort by Recent</option>
                </select>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="glass-effect rounded-2xl p-6 animate-pulse">
                      <div className="w-12 h-12 bg-cyber-violet/20 rounded-lg mb-4"></div>
                      <div className="h-6 bg-cyber-violet/20 rounded mb-2"></div>
                      <div className="h-4 bg-cyber-violet/20 rounded mb-4"></div>
                      <div className="h-10 bg-cyber-violet/20 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredAgents.map((agent, index) => (
                    <AgentCard key={agent.id} agent={agent} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreAgents;
