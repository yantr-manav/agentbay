
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  requiredPlan: 'basic' | 'premium' | 'enterprise';
  fallback?: React.ReactNode;
}

const SubscriptionGuard = ({ children, requiredPlan, fallback }: SubscriptionGuardProps) => {
  const { hasAccess, loading } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyber-aqua"></div>
      </div>
    );
  }

  if (!hasAccess(requiredPlan)) {
    return fallback || (
      <div className="glass-effect rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">
          {requiredPlan.charAt(0).toUpperCase() + requiredPlan.slice(1)} Plan Required
        </h3>
        <p className="text-white/70 mb-6">
          This feature requires a {requiredPlan} subscription or higher.
        </p>
        <Link to="/payment">
          <Button className="cyber-button">
            <span className="relative z-10">Upgrade Now</span>
          </Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
};

export default SubscriptionGuard;
