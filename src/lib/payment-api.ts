// Simulated payment API functions
// In a real application, these would call your backend API

export interface PaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'canceled';
}

export interface CreatePaymentIntentRequest {
  amount: number;
  currency: string;
  planId: string;
  billingCycle: 'monthly' | 'yearly';
}

export const createPaymentIntent = async (
  request: CreatePaymentIntentRequest
): Promise<PaymentIntent> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would call your backend:
  // const response = await fetch('/api/create-payment-intent', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(request)
  // });
  // return response.json();
  
  // Simulated response
  return {
    id: `pi_${Math.random().toString(36).substr(2, 9)}`,
    client_secret: `pi_${Math.random().toString(36).substr(2, 9)}_secret_${Math.random().toString(36).substr(2, 9)}`,
    amount: request.amount * 100, // Stripe uses cents
    currency: request.currency,
    status: 'requires_payment_method'
  };
};

export const confirmPayment = async (paymentIntentId: string): Promise<{ success: boolean; error?: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate success/failure (90% success rate for demo)
  const success = Math.random() > 0.1;
  
  if (success) {
    return { success: true };
  } else {
    return { 
      success: false, 
      error: 'Your card was declined. Please try a different payment method.' 
    };
  }
};