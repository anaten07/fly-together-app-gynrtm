
import { useState, useEffect } from 'react';
import { supabase } from '../app/integrations/supabase/client';
import type { Tables } from '../app/integrations/supabase/types';

export type FlightRequest = Tables<'flight_requests'>;

interface UseFlightRequestsOptions {
  userId?: string;
  pilotId?: string;
  status?: string;
}

export function useFlightRequests(options: UseFlightRequestsOptions = {}) {
  const [flightRequests, setFlightRequests] = useState<FlightRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlightRequests = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('flight_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (options.userId) {
        query = query.eq('student_id', options.userId);
      }

      if (options.pilotId) {
        query = query.eq('pilot_id', options.pilotId);
      }

      if (options.status) {
        query = query.eq('status', options.status);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching flight requests:', fetchError);
        setError(fetchError.message);
        return;
      }

      console.log('Fetched flight requests:', data?.length || 0);
      setFlightRequests(data || []);
    } catch (err) {
      console.error('Error in fetchFlightRequests:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const createFlightRequest = async (request: Omit<FlightRequest, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('flight_requests')
        .insert([request])
        .select()
        .single();

      if (error) {
        console.error('Error creating flight request:', error);
        throw error;
      }

      console.log('Created flight request:', data);
      await fetchFlightRequests(); // Refresh the list
      return data;
    } catch (err) {
      console.error('Error in createFlightRequest:', err);
      throw err;
    }
  };

  const updateFlightRequest = async (id: string, updates: Partial<FlightRequest>) => {
    try {
      const { data, error } = await supabase
        .from('flight_requests')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating flight request:', error);
        throw error;
      }

      console.log('Updated flight request:', data);
      await fetchFlightRequests(); // Refresh the list
      return data;
    } catch (err) {
      console.error('Error in updateFlightRequest:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchFlightRequests();
  }, [options.userId, options.pilotId, options.status]);

  const refetch = () => {
    fetchFlightRequests();
  };

  return {
    flightRequests,
    loading,
    error,
    refetch,
    createFlightRequest,
    updateFlightRequest
  };
}
