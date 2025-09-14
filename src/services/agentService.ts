import { supabase } from '@/integrations/supabase/client';

export interface Agent {
  id: string;
  user_id: string;
  name: string;
  description: string;
  avatar: string;
  capabilities: string[];
  pricing_model: string;
  price_per_hour: number;
  currency: 'usd' | 'inr';
  rating: number;
  total_sessions: number;
  is_active: boolean;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AgentReview {
  id: string;
  agent_id: string;
  reviewer_id: string;
  rating: number;
  review_text: string;
  is_verified: boolean;
  created_at: string;
  reviewer?: {
    full_name: string;
    avatar_url: string;
  };
}

export interface AgentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  is_active: boolean;
}

export const agentService = {
  // Get all agents with filters
  async getAgents(filters?: {
    category?: string;
    search?: string;
    minRating?: number;
    maxPrice?: number;
    currency?: 'usd' | 'inr';
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('agents')
      .select(`
        *,
        users!agents_user_id_fkey(full_name, avatar_url),
        agent_category_relations!inner(
          agent_categories(name, icon, color)
        )
      `)
      .eq('is_active', true);

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.minRating) {
      query = query.gte('rating', filters.minRating);
    }

    if (filters?.maxPrice) {
      query = query.lte('price_per_hour', filters.maxPrice);
    }

    if (filters?.currency) {
      query = query.eq('currency', filters.currency);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, (filters.offset + (filters.limit || 10)) - 1);
    }

    const { data, error } = await query.order('rating', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get single agent with details
  async getAgent(id: string) {
    const { data, error } = await supabase
      .from('agents')
      .select(`
        *,
        users!agents_user_id_fkey(full_name, avatar_url),
        agent_category_relations(
          agent_categories(name, icon, color)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Create new agent
  async createAgent(agentData: {
    name: string;
    description: string;
    avatar: string;
    capabilities: string[];
    price_per_hour: number;
    currency: 'usd' | 'inr';
    categories: string[];
    metadata?: Record<string, any>;
  }) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    // Create agent
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .insert({
        user_id: user.data.user.id,
        name: agentData.name,
        description: agentData.description,
        avatar: agentData.avatar,
        capabilities: agentData.capabilities,
        price_per_hour: agentData.price_per_hour,
        currency: agentData.currency,
        metadata: agentData.metadata || {}
      })
      .select()
      .single();

    if (agentError) throw agentError;

    // Add categories
    if (agentData.categories.length > 0) {
      const categoryRelations = agentData.categories.map(categoryId => ({
        agent_id: agent.id,
        category_id: categoryId
      }));

      const { error: categoryError } = await supabase
        .from('agent_category_relations')
        .insert(categoryRelations);

      if (categoryError) throw categoryError;
    }

    // Log activity
    await this.logActivity(user.data.user.id, 'upload_agent', 'agent', agent.id);

    return agent;
  },

  // Update agent
  async updateAgent(id: string, updates: Partial<Agent>) {
    const { data, error } = await supabase
      .from('agents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete agent
  async deleteAgent(id: string) {
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get agent reviews
  async getAgentReviews(agentId: string) {
    const { data, error } = await supabase
      .from('agent_reviews')
      .select(`
        *,
        users!agent_reviews_reviewer_id_fkey(full_name, avatar_url)
      `)
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Create review
  async createReview(reviewData: {
    agent_id: string;
    session_id?: string;
    rating: number;
    review_text: string;
  }) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('agent_reviews')
      .insert({
        ...reviewData,
        reviewer_id: user.data.user.id
      })
      .select()
      .single();

    if (error) throw error;

    // Update agent rating
    await this.updateAgentRating(reviewData.agent_id);

    return data;
  },

  // Update agent rating (called after new review)
  async updateAgentRating(agentId: string) {
    const { data: reviews } = await supabase
      .from('agent_reviews')
      .select('rating')
      .eq('agent_id', agentId);

    if (reviews && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      
      await supabase
        .from('agents')
        .update({ rating: Math.round(avgRating * 100) / 100 })
        .eq('id', agentId);
    }
  },

  // Get categories
  async getCategories() {
    const { data, error } = await supabase
      .from('agent_categories')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) throw error;
    return data;
  },

  // Add to favorites
  async addToFavorites(agentId: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_favorites')
      .insert({
        user_id: user.data.user.id,
        agent_id: agentId
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Remove from favorites
  async removeFromFavorites(agentId: string) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('user_favorites')
      .delete()
      .eq('user_id', user.data.user.id)
      .eq('agent_id', agentId);

    if (error) throw error;
  },

  // Get user favorites
  async getUserFavorites() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_favorites')
      .select(`
        agent_id,
        agents(*)
      `)
      .eq('user_id', user.data.user.id);

    if (error) throw error;
    return data;
  },

  // Create agent session
  async createSession(sessionData: {
    agent_id: string;
    duration_hours: number;
    total_cost: number;
    currency: 'usd' | 'inr';
  }) {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('agent_sessions')
      .insert({
        ...sessionData,
        renter_id: user.data.user.id
      })
      .select()
      .single();

    if (error) throw error;

    // Update agent session count
    await supabase.rpc('increment_agent_sessions', { agent_id: sessionData.agent_id });

    // Log activity
    await this.logActivity(user.data.user.id, 'rent_agent', 'agent', sessionData.agent_id);

    return data;
  },

  // Get user sessions
  async getUserSessions() {
    const user = await supabase.auth.getUser();
    if (!user.data.user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('agent_sessions')
      .select(`
        *,
        agents(name, avatar, user_id)
      `)
      .eq('renter_id', user.data.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Log user activity
  async logActivity(userId: string, action: string, resourceType?: string, resourceId?: string) {
    const { error } = await supabase
      .from('user_activity_logs')
      .insert({
        user_id: userId,
        action,
        resource_type: resourceType,
        resource_id: resourceId
      });

    if (error) console.error('Failed to log activity:', error);
  }
};