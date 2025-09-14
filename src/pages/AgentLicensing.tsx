
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const AgentLicensing = () => {
  const [selectedTier, setSelectedTier] = useState('standard');
  const { toast } = useToast();

  const licensingTiers = [
    {
      id: 'basic',
      name: 'Basic License',
      price: '0.1 ETH',
      description: 'Essential protection for your AI agent',
      features: [
        'Ownership verification',
        'Basic usage tracking',
        'Standard revenue split',
        'Community support'
      ],
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'standard',
      name: 'Standard License',
      price: '0.25 ETH',
      description: 'Professional licensing with enhanced features',
      features: [
        'All Basic features',
        'Advanced analytics',
        'Priority marketplace placement',
        'Custom branding options',
        'Premium support'
      ],
      color: 'from-cyber-violet to-cyber-aqua',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium License',
      price: '0.5 ETH',
      description: 'Enterprise-grade licensing solution',
      features: [
        'All Standard features',
        'White-label licensing',
        'Custom revenue models',
        'API access',
        'Dedicated account manager',
        'Custom smart contracts'
      ],
      color: 'from-neon-green to-cyber-magenta'
    }
  ];

  const handleMintLicense = () => {
    toast({
      title: "License Minting Started",
      description: "Your NFT license is being created. This may take a few minutes.",
    });
  };

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-cyber-gradient mb-6">
                Agent Licensing
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Protect your AI agents with blockchain-verified licensing. Mint NFT licenses to verify ownership, 
                track usage, and secure your intellectual property.
              </p>
            </div>

            {/* Licensing Tiers */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {licensingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`glass-effect rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedTier === tier.id ? 'ring-2 ring-cyber-aqua' : ''
                  } ${tier.popular ? 'relative' : ''}`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-cyber-gradient px-4 py-1 rounded-full text-xs font-bold text-black">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className={`h-2 bg-gradient-to-r ${tier.color} rounded-full mb-6`}></div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-cyber-aqua mb-4">{tier.price}</div>
                  <p className="text-white/70 mb-6">{tier.description}</p>
                  
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <span className="text-neon-green">✓</span>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* License Details */}
            <div className="glass-effect rounded-3xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">How Agent Licensing Works</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-violet/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏗️</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Create</h3>
                  <p className="text-white/70">
                    Build your AI agent and choose a licensing tier that fits your needs.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyber-aqua/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔐</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Mint</h3>
                  <p className="text-white/70">
                    Mint an NFT license on the blockchain to verify ownership and enable tracking.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Earn</h3>
                  <p className="text-white/70">
                    Receive automatic payments when users rent your licensed AI agents.
                  </p>
                </div>
              </div>
            </div>

            {/* Mint License Section */}
            <div className="glass-effect rounded-3xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Ready to License Your Agent?</h2>
              <p className="text-white/70 mb-6">
                Selected: <span className="text-cyber-aqua font-semibold">
                  {licensingTiers.find(t => t.id === selectedTier)?.name}
                </span>
              </p>
              
              <div className="max-w-md mx-auto space-y-4">
                <div className="bg-cyber-dark/30 rounded-xl p-4">
                  <div className="text-sm text-white/60 mb-2">License Fee</div>
                  <div className="text-2xl font-bold text-cyber-aqua">
                    {licensingTiers.find(t => t.id === selectedTier)?.price}
                  </div>
                </div>
                
                <Button 
                  className="w-full cyber-button text-lg py-6"
                  onClick={handleMintLicense}
                >
                  <span className="relative z-10">Mint License NFT</span>
                </Button>
                
                <p className="text-xs text-white/50">
                  Smart contract will be deployed to Ethereum mainnet. 
                  Gas fees apply separately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentLicensing;
