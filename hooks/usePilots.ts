
import { useState, useEffect } from 'react';
import { supabase } from '../app/integrations/supabase/client';
import type { Tables } from '../app/integrations/supabase/types';

export type Pilot = Tables<'pilots'>;

interface UsePilotsOptions {
  location?: string;
  maxDistance?: number;
  minRating?: number;
  availableOnly?: boolean;
}

export function usePilots(options: UsePilotsOptions = {}) {
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPilots = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('pilots')
        .select('*')
        .order('rating', { ascending: false });

      if (options.availableOnly) {
        query = query.eq('available', true);
      }

      if (options.minRating) {
        query = query.gte('rating', options.minRating);
      }

      if (options.location) {
        query = query.ilike('location', `%${options.location}%`);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching pilots:', fetchError);
        setError(fetchError.message);
        return;
      }

      console.log('Fetched pilots:', data?.length || 0, 'data:', data);
      setPilots(data || []);
    } catch (err) {
      console.error('Error in fetchPilots:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPilots();
  }, [options.location, options.maxDistance, options.minRating, options.availableOnly]);

  const refetch = () => {
    fetchPilots();
  };

  return {
    pilots,
    loading,
    error,
    refetch
  };
}
