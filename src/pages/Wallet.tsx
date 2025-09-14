
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Wallet = () => {
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();

  const mockWalletData = {
    address: '0x742d35Cc8506C4b6c8b3d8e8f9e2b1a3c4d5e6f7',
    ensName: 'agent.eth',
    balances: [
      { token: 'ETH', amount: '2.456', value: '$4,912.45', color: 'text-blue-400' },
      { token: 'USDC', amount: '1,250.00', value: '$1,250.00', color: 'text-green-400' },
      { token: 'AGENT', amount: '500', value: '$125.00', color: 'text-cyber-violet' }
    ]
  };

  const recentTransactions = [
    { id: 1, type: 'Rent', agent: 'Research Assistant Pro', amount: '-$15.00', date: '2 hours ago', status: 'completed' },
    { id: 2, type: 'Deposit', agent: '', amount: '+$100.00', date: '1 day ago', status: 'completed' },
    { id: 3, type: 'Rent', agent: 'Code Review AI', amount: '-$12.50', date: '3 days ago', status: 'completed' },
    { id: 4, type: 'Earnings', agent: 'My Data Analyst', amount: '+$45.00', date: '1 week ago', status: 'completed' }
  ];

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been safely disconnected",
    });
  };

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Wallet Dashboard</h1>
            <p className="text-white/70">Manage your digital assets and transaction history</p>
          </div>

          {isConnected ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Wallet Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="glass-effect rounded-3xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">Connected Wallet</h2>
                      <div className="flex items-center space-x-3">
                        <span className="text-cyber-aqua font-mono">{mockWalletData.ensName}</span>
                        <span className="text-white/60 font-mono text-sm">
                          {mockWalletData.address.slice(0, 6)}...{mockWalletData.address.slice(-4)}
                        </span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-500 hover:bg-red-500/10"
                      onClick={handleDisconnect}
                    >
                      Disconnect
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    {mockWalletData.balances.map((balance, index) => (
                      <div key={index} className="bg-cyber-dark/30 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="text-white/60">{balance.token}</span>
                          <span className={balance.color}>●</span>
                        </div>
                        <div className="mt-2">
                          <div className="text-2xl font-bold text-white">{balance.amount}</div>
                          <div className="text-white/60 text-sm">{balance.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transaction History */}
                <div className="glass-effect rounded-3xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
                  <div className="space-y-4">
                    {recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-cyber-dark/20 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            tx.type === 'Rent' ? 'bg-cyber-violet' :
                            tx.type === 'Deposit' ? 'bg-neon-green' :
                            'bg-cyber-aqua'
                          }`}></div>
                          <div>
                            <div className="text-white font-semibold">{tx.type}</div>
                            {tx.agent && <div className="text-white/60 text-sm">{tx.agent}</div>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-semibold ${
                            tx.amount.startsWith('+') ? 'text-neon-green' : 'text-white'
                          }`}>
                            {tx.amount}
                          </div>
                          <div className="text-white/60 text-sm">{tx.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button className="w-full cyber-button">
                      <span className="relative z-10">Add Funds</span>
                    </Button>
                    <Button variant="outline" className="w-full border-cyber-violet text-cyber-violet">
                      Withdraw
                    </Button>
                    <Button variant="outline" className="w-full border-cyber-aqua text-cyber-aqua">
                      Stake AGENT
                    </Button>
                  </div>
                </div>

                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Portfolio Value</h3>
                  <div className="text-3xl font-bold text-cyber-gradient mb-2">$6,287.45</div>
                  <div className="text-neon-green text-sm">+12.5% (24h)</div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Active Rentals</span>
                      <span className="text-white">3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Monthly Spent</span>
                      <span className="text-white">$124.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Earnings (Creator)</span>
                      <span className="text-neon-green">$45.20</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔌</div>
              <h2 className="text-2xl font-bold text-white mb-4">No Wallet Connected</h2>
              <p className="text-white/70 mb-6">Connect your wallet to view your dashboard</p>
              <Button className="cyber-button">
                <span className="relative z-10">Connect Wallet</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
