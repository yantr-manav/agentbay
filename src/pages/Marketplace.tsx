import { useState, useEffect } from 'react';
import { Search, Filter, Star, Heart, DollarSign } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { agentService } from '@/services/index';

// Define interfaces for TypeScript
interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  capabilities: string[];
  price_per_hour: number;
  currency: 'usd' | 'inr';
  rating: number;
  total_sessions: number;
}

interface AgentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [categories, setCategories] = useState<unknown[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [currency, setCurrency] = useState<'usd' | 'inr'>('usd');
  const [sortBy, setSortBy] = useState('rating');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, [searchTerm, selectedCategory, currency, sortBy]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load agents with filters
      const agentsData = await agentService.getAgents({
        search: searchTerm,
        category: selectedCategory,
        currency: currency,
        maxPrice: priceRange.max,
        limit: 20
      });
      setAgents(agentsData);

      // Load categories
      const categoriesData = await agentService.getCategories();
      setCategories(categoriesData);

      // Load user favorites if logged in
      if (user) {
        const favoritesData = await agentService.getUserFavorites();
        setFavorites(favoritesData.map((f: unknown) => f.agent_id));
      }
    } catch (error) {
      console.error('Failed to load marketplace data:', error);
      toast({
        title: "Error",
        description: "Failed to load agents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (agentId: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to add favorites",
        variant: "destructive"
      });
      return;
    }

    try {
      if (favorites.includes(agentId)) {
        await agentService.removeFromFavorites(agentId);
        setFavorites(prev => prev.filter(id => id !== agentId));
        toast({
          title: "Removed from favorites",
          description: "Agent removed from your favorites"
        });
      } else {
        await agentService.addToFavorites(agentId);
        setFavorites(prev => [...prev, agentId]);
        toast({
          title: "Added to favorites",
          description: "Agent added to your favorites"
        });
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number, currency: 'usd' | 'inr') => {
    const symbol = currency === 'usd' ? '$' : '₹';
    return `${symbol}${price.toFixed(2)}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-cyber-gradient">AI Agent Marketplace</span>
            </h1>
            <p className="text-xl text-white/70">
              Discover and rent powerful AI agents for your projects
            </p>
          </div>

          {/* Filters */}
          <div className="glass-effect rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <Input
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-cyber-dark/50 border-cyber-violet/30 text-white"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-cyber-dark/50 border border-cyber-violet/30 rounded-xl px-4 py-2 text-white"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Currency */}
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'usd' | 'inr')}
                className="bg-cyber-dark/50 border border-cyber-violet/30 rounded-xl px-4 py-2 text-white"
              >
                <option value="usd">USD ($)</option>
                <option value="inr">INR (₹)</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-cyber-dark/50 border border-cyber-violet/30 rounded-xl px-4 py-2 text-white"
              >
                <option value="rating">Highest Rated</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyber-aqua mx-auto"></div>
              <p className="text-white/70 mt-4">Loading agents...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-white/70">
                  Found {agents.length} agents
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <div key={agent.id} className="glass-effect rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                    {/* Agent Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{agent.avatar}</div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                          <div className="flex items-center space-x-1">
                            {renderStars(agent.rating)}
                            <span className="text-white/60 text-sm ml-2">
                              ({agent.total_sessions} sessions)
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {user && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(agent.id)}
                          className="text-white/60 hover:text-red-400"
                        >
                          <Heart 
                            className={`w-5 h-5 ${
                              favorites.includes(agent.id) 
                                ? 'text-red-400 fill-current' 
                                : ''
                            }`} 
                          />
                        </Button>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {agent.description}
                    </p>

                    {/* Capabilities */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agent.capabilities.slice(0, 3).map((capability, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-cyber-violet/20 text-cyber-violet text-xs rounded-lg"
                        >
                          {capability}
                        </span>
                      ))}
                      {agent.capabilities.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-lg">
                          +{agent.capabilities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-4 h-4 text-cyber-aqua" />
                        <span className="text-cyber-aqua font-bold">
                          {formatPrice(agent.price_per_hour, agent.currency)}/hour
                        </span>
                      </div>
                      
                      <Link to={`/agent/${agent.id}`}>
                        <Button className="cyber-button text-sm">
                          <span className="relative z-10">View Details</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {agents.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold text-white mb-2">No agents found</h3>
                  <p className="text-white/70">
                    Try adjusting your search criteria or browse all categories
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;