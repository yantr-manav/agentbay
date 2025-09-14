
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Rental {
  id: string;
  agent_id: string;
  renter_id: string;
  start_time: string;
  end_time?: string;
  duration_hours?: number;
  total_cost?: number;
  status: string;
  agent?: {
    name: string;
    avatar: string;
  };
}

export const useRentals = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchRentals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('agent_rentals')
        .select(`
          *,
          agent:agents(name, avatar)
        `)
        .eq('renter_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching rentals:', error);
        throw error;
      }
      
      // Transform the data to match our interface
      const transformedRentals = (data || []).map((rental: any) => ({
        ...rental,
        total_cost: parseFloat(rental.total_cost || 0),
        duration_hours: parseInt(rental.duration_hours || 0)
      }));
      
      setRentals(transformedRentals);
    } catch (error: any) {
      console.error('Failed to fetch rentals:', error);
      toast({
        title: "Error",
        description: "Failed to fetch rentals",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createRental = async (agentId: string, durationHours: number) => {
    if (!user) return null;

    try {
      const { data: agent, error: agentError } = await supabase
        .from('agents')
        .select('price_per_hour')
        .eq('id', agentId)
        .single();

      if (agentError || !agent) {
        console.error('Agent fetch error:', agentError);
        throw new Error('Agent not found');
      }

      const totalCost = parseFloat(agent.price_per_hour?.toString() || '0') * durationHours;

      const { data, error } = await supabase
        .from('agent_rentals')
        .insert({
          agent_id: agentId,
          renter_id: user.id,
          duration_hours: durationHours,
          total_cost: totalCost,
          status: 'active'
        })
        .select()
        .single();

      if (error) {
        console.error('Rental creation error:', error);
        throw error;
      }

      // Create transaction record
      if (data) {
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            agent_id: agentId,
            rental_id: data.id,
            amount: totalCost,
            transaction_type: 'rent',
            status: 'completed'
          });

        if (transactionError) {
          console.error('Transaction creation error:', transactionError);
        }
      }

      toast({
        title: "Success!",
        description: "Agent rented successfully!"
      });

      fetchRentals();
      return data;
    } catch (error: any) {
      console.error('Failed to rent agent:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to rent agent",
        variant: "destructive"
      });
      return null;
    }
  };

  useEffect(() => {
    fetchRentals();
  }, [user]);

  return { rentals, loading, createRental, refetch: fetchRentals };
};
