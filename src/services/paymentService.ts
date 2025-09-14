import { supabase } from '@/integrations/supabase/client';

export interface CreateSubscriptionRequest {
  planId: string;
  billingCycle: 'monthly' | 'yearly';
  currency: 'usd' | 'inr';
  stripePaymentMethodId?: string;
}

export interface PaymentTransaction {
  id: string;
  user_id: string;
  amount: number;
  currency: 'usd' | 'inr';
  status: 'pending' | 'succeeded' | 'failed' | 'canceled' | 'refunded';
  description: string;
  stripe_payment_intent_id?: string;
  created_at: string;
}

export interface UserSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  currency: 'usd' | 'inr';
  billing_cycle: 'monthly' | 'yearly';
  current_period_start: string | null;
  current_period_end: string | null;
  stripe_subscription_id?: string;
  created_at: string;
}

export const paymentService = {
  // Get subscription plans
  async getSubscriptionPlans() {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price_usd_monthly', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get user's current subscription
  async getUserSubscription(userId: string): Promise<UserSubscription | null> {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  // Create a new subscription
  async createSubscription(userId: string, request: CreateSubscriptionRequest): Promise<UserSubscription> {
    // First, get the plan details
    const { data: plan, error: planError } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', request.planId)
      .single();

    if (planError) throw planError;

    // Calculate period dates
    const now = new Date();
    const periodEnd = new Date(now);
    if (request.billingCycle === 'monthly') {
      periodEnd.setMonth(periodEnd.getMonth() + 1);
    } else {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1);
    }

    // Create subscription record
    const { data: subscription, error: subscriptionError } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: userId,
        plan_id: request.planId,
        status: 'active',
        currency: request.currency,
        billing_cycle: request.billingCycle,
        current_period_start: now.toISOString(),
        current_period_end: periodEnd.toISOString(),
      })
      .select()
      .single();

    if (subscriptionError) throw subscriptionError;

    // Create payment transaction record
    const amount = request.currency === 'usd' 
      ? (request.billingCycle === 'monthly' ? plan.price_usd_monthly : plan.price_usd_yearly)
      : (request.billingCycle === 'monthly' ? plan.price_inr_monthly : plan.price_inr_yearly);

    await this.createPaymentTransaction({
      userId,
      subscriptionId: subscription.id,
      amount,
      currency: request.currency,
      description: `${plan.name} subscription (${request.billingCycle})`,
      status: 'succeeded'
    });

    return subscription;
  },

  // Create payment transaction
  async createPaymentTransaction(params: {
    userId: string;
    subscriptionId?: string;
    amount: number;
    currency: 'usd' | 'inr';
    description: string;
    status: 'pending' | 'succeeded' | 'failed' | 'canceled' | 'refunded';
    stripePaymentIntentId?: string;
    metadata?: Record<string, any>;
  }): Promise<PaymentTransaction> {
    const { data, error } = await supabase
      .from('payment_transactions')
      .insert({
        user_id: params.userId,
        subscription_id: params.subscriptionId,
        amount: params.amount,
        currency: params.currency,
        description: params.description,
        status: params.status,
        stripe_payment_intent_id: params.stripePaymentIntentId,
        metadata: params.metadata || {}
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update payment transaction status
  async updatePaymentTransaction(transactionId: string, status: string, metadata?: Record<string, any>) {
    const updateData: any = { status, updated_at: new Date().toISOString() };
    if (metadata) {
      updateData.metadata = metadata;
    }

    const { data, error } = await supabase
      .from('payment_transactions')
      .update(updateData)
      .eq('id', transactionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user's payment history
  async getPaymentHistory(userId: string): Promise<PaymentTransaction[]> {
    const { data, error } = await supabase
      .from('payment_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Cancel subscription
  async cancelSubscription(subscriptionId: string) {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .update({
        status: 'canceled',
        canceled_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriptionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update user's Stripe customer ID
  async updateStripeCustomerId(userId: string, stripeCustomerId: string) {
    const { data, error } = await supabase
      .from('users')
      .update({ stripe_customer_id: stripeCustomerId })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user profile
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: {
    full_name?: string;
    avatar_url?: string;
    preferred_currency?: 'usd' | 'inr';
  }) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};