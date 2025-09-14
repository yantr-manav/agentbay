
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';

const Tokenomics = () => {
  const tokenMetrics = [
    { label: 'Total Supply', value: '1,000,000,000', suffix: 'AGENT' },
    { label: 'Circulating Supply', value: '250,000,000', suffix: 'AGENT' },
    { label: 'Market Cap', value: '$125,000,000', suffix: '' },
    { label: 'Current Price', value: '$0.50', suffix: '' }
  ];

  const tokenDistribution = [
    { category: 'Community Rewards', percentage: 40, color: 'bg-cyber-violet' },
    { category: 'Ecosystem Development', percentage: 25, color: 'bg-cyber-aqua' },
    { category: 'Team & Advisors', percentage: 15, color: 'bg-neon-green' },
    { category: 'Private Sale', percentage: 10, color: 'bg-cyber-magenta' },
    { category: 'Treasury', percentage: 10, color: 'bg-neon-pink' }
  ];

  const utilities = [
    {
      icon: '🤖',
      title: 'Agent Rentals',
      description: 'Pay for AI agent sessions with AGENT tokens at discounted rates'
    },
    {
      icon: '💰',
      title: 'Creator Rewards',
      description: 'Earn AGENT tokens for building popular and high-quality AI agents'
    },
    {
      icon: '📊',
      title: 'Staking Benefits',
      description: 'Stake tokens to earn yield and unlock premium marketplace features'
    },
    {
      icon: '🗳️',
      title: 'Governance',
      description: 'Vote on protocol upgrades, fee structures, and marketplace policies'
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-cyber-gradient mb-6">
                AGENT Tokenomics
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                The AGENT token powers the AgentBay ecosystem, enabling seamless payments, 
                governance, and rewards for creators and users.
              </p>
            </div>

            {/* Token Metrics */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {tokenMetrics.map((metric, index) => (
                <div key={index} className="glass-effect rounded-2xl p-6 text-center">
                  <div className="text-3xl font-bold text-cyber-aqua mb-2">
                    {metric.value}
                  </div>
                  <div className="text-white/70">{metric.label}</div>
                  {metric.suffix && (
                    <div className="text-cyber-violet text-sm mt-1">{metric.suffix}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Token Distribution */}
            <div className="glass-effect rounded-3xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Token Distribution</h2>
              
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  {tokenDistribution.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded ${item.color}`}></div>
                      <div className="flex-1 flex justify-between">
                        <span className="text-white">{item.category}</span>
                        <span className="text-cyber-aqua font-semibold">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="relative">
                  <div className="w-64 h-64 mx-auto rounded-full border-8 border-cyber-violet/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-cyber-gradient">1B</div>
                      <div className="text-white/70">AGENT</div>
                      <div className="text-cyber-violet text-sm">Total Supply</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Utility */}
            <div className="glass-effect rounded-3xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Token Utility</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {utilities.map((utility, index) => (
                  <div key={index} className="bg-cyber-dark/30 rounded-xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{utility.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{utility.title}</h3>
                        <p className="text-white/70">{utility.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vesting Schedule */}
            <div className="glass-effect rounded-3xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Vesting Schedule</h2>
              
              <div className="space-y-6">
                <div className="bg-cyber-dark/30 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Community Rewards</h3>
                    <span className="text-cyber-aqua">Linear over 4 years</span>
                  </div>
                  <div className="w-full bg-cyber-dark rounded-full h-3">
                    <div className="bg-cyber-violet h-3 rounded-full" style={{width: '25%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm text-white/60 mt-2">
                    <span>25% Unlocked</span>
                    <span>Year 1 of 4</span>
                  </div>
                </div>

                <div className="bg-cyber-dark/30 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Team & Advisors</h3>
                    <span className="text-cyber-aqua">12-month cliff, then linear</span>
                  </div>
                  <div className="w-full bg-cyber-dark rounded-full h-3">
                    <div className="bg-neon-green h-3 rounded-full" style={{width: '0%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm text-white/60 mt-2">
                    <span>0% Unlocked</span>
                    <span>Cliff Period</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Get AGENT Tokens */}
            <div className="glass-effect rounded-3xl p-8 text-center bg-gradient-to-r from-cyber-violet/10 to-cyber-aqua/10">
              <h2 className="text-3xl font-bold text-white mb-4">Get AGENT Tokens</h2>
              <p className="text-white/70 mb-6">
                Start using AGENT tokens to rent AI agents and participate in governance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="cyber-button">
                  <span className="relative z-10">Buy AGENT</span>
                </Button>
                <Button variant="outline" className="border-cyber-aqua text-cyber-aqua">
                  Stake Tokens
                </Button>
                <Button variant="outline" className="border-cyber-violet text-cyber-violet">
                  View on Uniswap
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
