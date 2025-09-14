// Real service implementations - activate after database setup
import { supabase } from '@/integrations/supabase/client';

export const agentService = {
  async getAgents(filters?: any) {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getCategories() {
    const { data, error } = await supabase
      .from('agent_categories')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  async getUserFavorites() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) return [];

    const { data, error } = await supabase
      .from('user_favorites')
      .select('agent_id')
      .eq('user_id', user.data.user.id);
    
    if (error) throw error;
    return data || [];
  },

  async addToFavorites(agentId: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('user_favorites')
      .insert({ user_id: user.data.user.id, agent_id: agentId });
    
    if (error) throw error;
  },

  async removeFromFavorites(agentId: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', user.data.user.id)
      .eq('agent_id', agentId);
    
    if (error) throw error;
  }
};

export const paymentService = {
  async getSubscriptionPlans() {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('is_active', true)
      .order('price_usd_monthly');
    
    if (error) throw error;
    return data || [];
  },

  async getUserSubscription(userId: string) {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async createSubscription(userId: string, subscriptionData: any) {
    const { data, error } = await supabase
      .from('user_subscriptions')
      .insert({
        user_id: userId,
        plan_id: subscriptionData.planId,
        currency: subscriptionData.currency,
        billing_cycle: subscriptionData.billingCycle,
        status: 'active',
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(Date.now() + (subscriptionData.billingCycle === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

export const notificationService = {
  async getNotifications(limit = 50) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) return [];

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.data.user.id)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data || [];
  },

  async getUnreadCount() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) return 0;

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.data.user.id)
      .eq('is_read', false);
    
    if (error) throw error;
    return count || 0;
  },

  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);
    
    if (error) throw error;
  },

  async markAllAsRead() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) return;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.data.user.id)
      .eq('is_read', false);
    
    if (error) throw error;
  },

  subscribeToNotifications(userId: string, callback: (notification: unknown) => void) {
    return supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        (payload) => callback(payload.new)
      )
      .subscribe();
  }
};