
import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise, { STRIPE_CONFIG } from '@/lib/stripe';
import StripePaymentForm from '@/components/StripePaymentForm';
import { paymentService } from '@/services/index';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'node_modules/react-resizable-panels/dist/declarations/src/vendor/react';
import { useCallback } from 'node_modules/react-resizable-panels/dist/declarations/src/vendor/react';

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe');
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [processing, setProcessing] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    loadSubscriptionData();
  }, [user, navigate, loadSubscriptionData]);

  const loadSubscriptionData = useCallback(async () => {
    try {
      // Temporarily using static data - service integration pending
      setSubscriptionPlans([
        {
          id: 'basic',
          name: 'Basic',
          price_usd_monthly: 9.99,
          price_usd_yearly: 99.99,
          price_inr_monthly: 799,
          price_inr_yearly: 7999,
          features: ['Up to 10 hours per month', 'Basic AI agents', 'Standard support', 'Basic analytics']
        },
        {
          id: 'premium',
          name: 'Premium',
          price_usd_monthly: 29.99,
          price_usd_yearly: 299.99,
          price_inr_monthly: 2499,
          price_inr_yearly: 24999,
          features: ['Up to 50 hours per month', 'Premium AI agents', 'Priority support', 'Advanced analytics', 'Custom integrations']
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          price_usd_monthly: 99.99,
          price_usd_yearly: 999.99,
          price_inr_monthly: 8499,
          price_inr_yearly: 84999,
          features: ['Unlimited hours', 'All AI agents', 'Dedicated support', 'Advanced analytics', 'Custom agents', 'API access']
        }
      ]);
      setCurrentSubscription(null);
    } catch (error) {
      console.error('Error loading subscription data:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription data",
        variant: "destructive"
      });
    }
  });

  // Transform database plans to component format
  const plans = subscriptionPlans.map((plan: unknown) => ({
    id: plan.id,
    name: plan.name,
    price: {
      usd: { monthly: plan.price_usd_monthly, yearly: plan.price_usd_yearly },
      inr: { monthly: plan.price_inr_monthly, yearly: plan.price_inr_yearly }
    },
    features: plan.features || [],
    color: plan.id === 'basic' ? 'border-cyber-violet' : 
           plan.id === 'premium' ? 'border-cyber-aqua' : 'border-cyber-magenta',
    popular: plan.id === 'premium',
    max_hours_monthly: plan.max_hours_monthly
  }));

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Credit/Debit Card',
      icon: '💳',
      description: 'Secure payment via Stripe',
      fee: '2.9% processing fee'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: '₿',
      description: 'Pay with ETH, BTC, or other cryptocurrencies',
      fee: '0% processing fee'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Pay with your PayPal account',
      fee: '3.4% processing fee'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: '🏦',
      description: 'Direct bank transfer (3-5 business days)',
      fee: '1% processing fee'
    }
  ];

  const currencies = [
    { id: 'usd', name: 'USD ($)', symbol: '$' },
    { id: 'inr', name: 'INR (₹)', symbol: '₹' }
  ];

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to continue",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    setProcessing(true);
    
    try {
      if (selectedPaymentMethod === 'stripe') {
        // Stripe payment will be handled by StripePaymentForm component
        return;
      } else {
        // Handle other payment methods
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Create subscription in database
        await paymentService.createSubscription(user.id, {
          planId: selectedPlan,
          billingCycle: billingCycle as 'monthly' | 'yearly',
          currency: selectedCurrency as 'usd' | 'inr'
        });
        
        toast({
          title: "Payment Successful!",
          description: `Successfully upgraded to ${plans.find(p => p.id === selectedPlan)?.name} plan`,
        });
        
        // Reload subscription data
        await loadSubscriptionData();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleStripeSuccess = async () => {
    if (!user) return;

    try {
      // Create subscription in database
      await paymentService.createSubscription(user.id, {
        planId: selectedPlan,
        billingCycle: billingCycle as 'monthly' | 'yearly',
        currency: selectedCurrency as 'usd' | 'inr'
      });

      toast({
        title: "Payment Successful!",
        description: `Successfully upgraded to ${plans.find(p => p.id === selectedPlan)?.name} plan`,
      });

      // Reload subscription data
      await loadSubscriptionData();
      
      // Redirect to dashboard
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Subscription Error",
        description: "Payment succeeded but there was an error setting up your subscription. Please contact support.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-cyber-black">
      <Navigation />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-cyber-gradient">Choose Your Plan</span>
            </h1>
            <p className="text-xl text-white/70">
              Select the perfect plan for your AI agent needs
            </p>
            {currentSubscription && (
              <div className="mt-4 p-4 glass-effect rounded-xl max-w-md mx-auto">
                <p className="text-cyber-aqua font-semibold">
                  Current Plan: {currentSubscription.plan_id.charAt(0).toUpperCase() + currentSubscription.plan_id.slice(1)}
                </p>
              </div>
            )}
            
            {/* Currency Selector */}
            <div className="mt-6 flex justify-center">
              <div className="glass-effect rounded-2xl p-2 flex">
                {currencies.map((currency) => (
                  <button
                    key={currency.id}
                    onClick={() => setSelectedCurrency(currency.id)}
                    className={`px-4 py-2 rounded-xl transition-all ${
                      selectedCurrency === currency.id
                        ? 'bg-cyber-violet text-white'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {currency.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="glass-effect rounded-2xl p-2 flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-xl transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-cyber-violet text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-xl transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-cyber-violet text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Yearly
                <span className="ml-2 text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded-lg">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative glass-effect rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  selectedPlan === plan.id ? plan.color : 'border-transparent'
                } ${plan.popular ? 'ring-2 ring-cyber-aqua/50' : ''} ${
                  currentSubscription?.plan_id === plan.id ? 'bg-neon-green/5 border-neon-green' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-cyber-aqua text-cyber-black px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {currentSubscription?.plan_id === plan.id && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-neon-green text-cyber-black px-3 py-1 rounded-full text-xs font-bold">
                      Current Plan
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-cyber-aqua mb-2">
                    {currencies.find(c => c.id === selectedCurrency)?.symbol}{plan.price[selectedCurrency][billingCycle]}
                  </div>
                  <div className="text-white/60">
                    per {billingCycle === 'monthly' ? 'month' : 'year'}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-white/80">
                      <span className="text-neon-green mr-3">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${
                    selectedPlan === plan.id
                      ? 'bg-gradient-to-r from-cyber-violet to-cyber-aqua'
                      : 'bg-cyber-dark/50 border border-cyber-violet/30'
                  } ${currentSubscription?.plan_id === plan.id ? 'opacity-50' : ''}`}
                  disabled={currentSubscription?.plan_id === plan.id}
                >
                  {currentSubscription?.plan_id === plan.id ? 'Current Plan' : selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Payment Method</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                  className={`glass-effect rounded-2xl p-6 cursor-pointer transition-all border-2 ${
                    selectedPaymentMethod === method.id
                      ? 'border-cyber-aqua bg-cyber-aqua/5'
                      : 'border-transparent hover:border-cyber-violet/30'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{method.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{method.name}</h3>
                    <p className="text-white/60 text-sm mb-2">{method.description}</p>
                    <p className="text-cyber-aqua text-xs">{method.fee}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment Form */}
            {selectedPaymentMethod === 'stripe' && (
              <div className="glass-effect rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-white mb-6">Secure Card Payment</h3>
                <Elements stripe={stripePromise} options={{ appearance: STRIPE_CONFIG.appearance }}>
                  <StripePaymentForm
                    amount={plans.find(p => p.id === selectedPlan)?.price[selectedCurrency][billingCycle] || 0}
                    currency={currencies.find(c => c.id === selectedCurrency)?.symbol || '$'}
                    planId={selectedPlan}
                    billingCycle={billingCycle}
                    onSuccess={handleStripeSuccess}
                    onError={(error) => {
                      toast({
                        title: "Payment Failed",
                        description: error,
                        variant: "destructive"
                      });
                    }}
                    processing={processing}
                    setProcessing={setProcessing}
                  />
                </Elements>
              </div>
            )}

            {selectedPaymentMethod === 'crypto' && (
              <div className="glass-effect rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-white mb-6">Cryptocurrency Payment</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 mb-2">Select Currency</label>
                    <select className="w-full p-3 bg-cyber-dark/50 border border-cyber-violet/30 rounded-xl text-white">
                      <option>Ethereum (ETH)</option>
                      <option>Bitcoin (BTC)</option>
                      <option>USDC</option>
                      <option>USDT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2">Wallet Address</label>
                    <Input 
                      placeholder="0x..."
                      className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedPaymentMethod === 'bank' && (
              <div className="glass-effect rounded-2xl p-8 mb-8">
                <h3 className="text-xl font-bold text-white mb-6">Bank Transfer Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 mb-2">Bank Name</label>
                    <Input 
                      placeholder="Enter your bank name"
                      className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2">Account Number</label>
                    <Input 
                      placeholder="Enter account number"
                      className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 mb-2">Routing Number</label>
                    <Input 
                      placeholder="Enter routing number"
                      className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Checkout Button - Only show for non-Stripe payments */}
            {selectedPaymentMethod !== 'stripe' && (
              <div className="text-center">
                <Button 
                  className="cyber-button text-lg px-16 py-6"
                  onClick={handlePayment}
                  disabled={processing || currentSubscription?.plan_id === selectedPlan}
                >
                  <span className="relative z-10">
                    {processing ? 'Processing...' : currentSubscription?.plan_id === selectedPlan ? 'Current Plan' : 'Complete Payment'}
                  </span>
                </Button>
                <p className="text-white/60 text-sm mt-4">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            )}
            
            {/* Terms for Stripe payments */}
            {selectedPaymentMethod === 'stripe' && (
              <div className="text-center">
                <p className="text-white/60 text-sm">
                  By proceeding, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
