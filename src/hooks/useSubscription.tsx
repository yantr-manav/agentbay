
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export interface Subscription {
  plan: 'basic' | 'premium' | 'enterprise' | null;
  isActive: boolean;
  expiresAt: string | null;
}

// Mock subscription data - in a real app this would come from Supabase
const mockSubscriptions: Record<string, Subscription> = {
  'admin@agentbay.com': {
    plan: 'enterprise',
    isActive: true,
    expiresAt: '2025-12-31T23:59:59Z'
  }
};

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription>({
    plan: null,
    isActive: false,
    expiresAt: null
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const checkSubscription = async () => {
    if (!user?.email) {
      setSubscription({ plan: null, isActive: false, expiresAt: null });
      setLoading(false);
      return;
    }

    // Check mock subscriptions (in real app, query Supabase)
    const userSub = mockSubscriptions[user.email];
    if (userSub) {
      setSubscription(userSub);
    } else {
      setSubscription({ plan: 'basic', isActive: true, expiresAt: null });
    }
    setLoading(false);
  };

  const hasAccess = (requiredPlan: 'basic' | 'premium' | 'enterprise') => {
    if (!subscription.isActive) return false;
    
    const planHierarchy = { basic: 1, premium: 2, enterprise: 3 };
    const userPlanLevel = subscription.plan ? planHierarchy[subscription.plan] : 0;
    const requiredLevel = planHierarchy[requiredPlan];
    
    return userPlanLevel >= requiredLevel;
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return { subscription, loading, hasAccess, refetch: checkSubscription };
};
