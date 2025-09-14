
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Agent {
  id: string;
  creator_id: string;
  name: string;
  description: string;
  avatar: string;
  category: string;
  tags: string[];
  price_per_hour: number;
  rating: number;
  total_sessions: number;
  status: string;
  capabilities?: any;
  created_at: string;
  updated_at: string;
}

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('agents' as any)
        .select('*')
        .eq('status', 'active')
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching agents:', error);
        throw error;
      }
      
      // Transform the data to match our interface
      const transformedAgents = (data || []).map((agent: any) => {
        // Handle tags field - ensure it's always an array
        let tags: string[] = [];
        if (Array.isArray(agent.tags)) {
          tags = agent.tags;
        } else if (typeof agent.tags === 'string' && agent.tags.trim()) {
          // If it's a comma-separated string, split it
          tags = agent.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag.length > 0);
        }

        return {
          ...agent,
          tags,
          price_per_hour: parseFloat(agent.price_per_hour || 0),
          rating: parseFloat(agent.rating || 0),
          total_sessions: parseInt(agent.total_sessions || 0),
          avatar: agent.avatar || '',
          category: agent.category || '',
          name: agent.name || '',
          description: agent.description || '',
          status: agent.status || 'active',
          updated_at: agent.updated_at || agent.created_at,
          capabilities: agent.capabilities
        };
      });
      
      setAgents(transformedAgents);
    } catch (error: any) {
      console.error('Failed to fetch agents:', error);
      toast({
        title: "Error",
        description: "Failed to fetch agents",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return { agents, loading, refetch: fetchAgents };
};
