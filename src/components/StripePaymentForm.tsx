import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { createPaymentIntent, confirmPayment } from '@/lib/payment-api';

interface StripePaymentFormProps {
  amount: number;
  currency: string;
  planId: string;
  billingCycle: 'monthly' | 'yearly';
  onSuccess: () => void;
  onError: (error: string) => void;
  processing: boolean;
  setProcessing: (processing: boolean) => void;
}

const StripePaymentForm = ({ 
  amount, 
  currency, 
  planId,
  billingCycle,
  onSuccess, 
  onError, 
  processing, 
  setProcessing 
}: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onError('Card element not found');
      setProcessing(false);
      return;
    }

    try {
      // Simulate payment processing for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment (90% success rate)
      const success = Math.random() > 0.1;
      
      if (success) {
        onSuccess();
      } else {
        onError('Payment failed. Please try again.');
      }
    } catch (err) {
      onError('An unexpected error occurred');
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: 'transparent',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/70 mb-2">Full Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-white/70 mb-2">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="bg-cyber-dark/50 border-cyber-violet/30 text-white"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-white/70 mb-2">Card Details</label>
        <div className="p-4 bg-cyber-dark/50 border border-cyber-violet/30 rounded-xl">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="text-center">
        <Button
          type="submit"
          disabled={!stripe || processing}
          className="cyber-button text-lg px-16 py-6 w-full"
        >
          <span className="relative z-10">
            {processing ? 'Processing...' : `Pay ${currency.toUpperCase()} ${amount}`}
          </span>
        </Button>
      </div>
    </form>
  );
};

export default StripePaymentForm;