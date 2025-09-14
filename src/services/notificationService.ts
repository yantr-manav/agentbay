import { supabase } from '@/integrations/supabase/client';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  action_url?: string;
  metadata: Record<string, any>;
  created_at: string;
}

export const notificationService = {
  // Get user notifications
  async getNotifications(limit = 50) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.data.user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Get unread count
  async getUnreadCount() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.data.user.id)
      .eq('is_read', false);

    if (error) throw error;
    return count || 0;
  },

  // Mark notification as read
  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (error) throw error;
  },

  // Mark all as read
  async markAllAsRead() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.data.user.id)
      .eq('is_read', false);

    if (error) throw error;
  },

  // Create notification (usually called from backend)
  async createNotification(data: {
    title: string;
    message: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    action_url?: string;
    metadata?: Record<string, any>;
  }) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: user.data.user.id,
        title: data.title,
        message: data.message,
        type: data.type || 'info',
        action_url: data.action_url,
        metadata: data.metadata || {}
      })
      .select()
      .single();

    if (error) throw error;
    return notification;
  },

  // Delete notification
  async deleteNotification(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
  },

  // Subscribe to real-time notifications
  subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
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
        (payload) => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();
  }
};