import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  preferred_currency: 'usd' | 'inr';
  created_at: string;
}

interface UserSubscription {
  id: string;
  plan_id: string;
  status: string;
  currency: 'usd' | 'inr';
  billing_cycle: 'monthly' | 'yearly';
  current_period_end: string | null;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchUserData();
  }, [user, navigate]);

  const fetchUserData = async () => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setProfile(profileData);
      }

      // Fetch user subscription
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .single();

      if (subscriptionError && subscriptionError.code !== 'PGRST116') {
        console.error('Error fetching subscription:', subscriptionError);
      } else {
        setSubscription(subscriptionData);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="text-cyber-aqua text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-cyber-gradient">Dashboard</span>
              </h1>
              <p className="text-white/70">
                Welcome back, {profile?.full_name || user?.email}!
              </p>
            </div>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="border-cyber-violet/30 text-white hover:bg-cyber-violet/20"
            >
              Sign Out
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Profile</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-white/70">Email:</span>
                  <p className="text-white">{profile?.email}</p>
                </div>
                <div>
                  <span className="text-white/70">Name:</span>
                  <p className="text-white">{profile?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <span className="text-white/70">Preferred Currency:</span>
                  <p className="text-white uppercase">{profile?.preferred_currency || 'USD'}</p>
                </div>
                <div>
                  <span className="text-white/70">Member since:</span>
                  <p className="text-white">
                    {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>

            {/* Subscription Card */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Subscription</h3>
              {subscription ? (
                <div className="space-y-3">
                  <div>
                    <span className="text-white/70">Plan:</span>
                    <p className="text-cyber-aqua font-bold capitalize">{subscription.plan_id}</p>
                  </div>
                  <div>
                    <span className="text-white/70">Status:</span>
                    <p className="text-neon-green capitalize">{subscription.status}</p>
                  </div>
                  <div>
                    <span className="text-white/70">Billing:</span>
                    <p className="text-white capitalize">{subscription.billing_cycle}</p>
                  </div>
                  <div>
                    <span className="text-white/70">Next billing:</span>
                    <p className="text-white">
                      {subscription.current_period_end 
                        ? new Date(subscription.current_period_end).toLocaleDateString()
                        : 'N/A'
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-white/70 mb-4">No active subscription</p>
                  <Button 
                    onClick={() => navigate('/payment')}
                    className="cyber-button"
                  >
                    <span className="relative z-10">Choose Plan</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Actions Card */}
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/upload-agent')}
                  className="w-full bg-cyber-violet/20 border border-cyber-violet/30 text-white hover:bg-cyber-violet/30"
                >
                  Upload Agent
                </Button>
                <Button 
                  onClick={() => navigate('/marketplace')}
                  className="w-full bg-cyber-aqua/20 border border-cyber-aqua/30 text-white hover:bg-cyber-aqua/30"
                >
                  Browse Agents
                </Button>
                <Button 
                  onClick={() => navigate('/wallet')}
                  className="w-full bg-neon-green/20 border border-neon-green/30 text-white hover:bg-neon-green/30"
                >
                  View Wallet
                </Button>
                {!subscription && (
                  <Button 
                    onClick={() => navigate('/payment')}
                    className="w-full cyber-button"
                  >
                    <span className="relative z-10">Upgrade Plan</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <div className="glass-effect rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="text-center text-white/70 py-8">
                <p>No recent activity to display</p>
                <p className="text-sm mt-2">Start by uploading an agent or browsing the marketplace</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;