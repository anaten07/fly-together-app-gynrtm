
import { useState, useEffect } from 'react';
import { supabase } from '../app/integrations/supabase/client';

interface FlightLog {
  id: string;
  user_id: string;
  pilot_id: string;
  aircraft_type: string;
  aircraft_registration: string;
  departure_airport: string;
  arrival_airport: string;
  departure_time: string;
  arrival_time: string;
  flight_duration_hours: number;
  flight_type: string;
  pilot_in_command: boolean;
  dual_received: number;
  solo_time: number;
  cross_country_time: number;
  night_time: number;
  instrument_time: number;
  landings_day: number;
  landings_night: number;
  approaches: number;
  holds: number;
  remarks: string;
  instructor_name: string;
  instructor_signature: string;
  weather_conditions: string;
  route: string;
  total_distance_nm: number;
  fuel_used_gallons: number;
  hobbs_start: number;
  hobbs_end: number;
  tach_start: number;
  tach_end: number;
  foreflight_sync_id: string;
  external_app_data: any;
  created_at: string;
  updated_at: string;
}

interface UseFlightLogsOptions {
  userId?: string;
  flightType?: string;
  aircraftType?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
}

export function useFlightLogs(options: UseFlightLogsOptions = {}) {
  const [flightLogs, setFlightLogs] = useState<FlightLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFlightLogs = async () => {
    try {
      console.log('Fetching flight logs with options:', options);
      setLoading(true);
      setError(null);

      let query = supabase
        .from('flight_logs')
        .select('*')
        .order('departure_time', { ascending: false });

      // Apply filters
      if (options.userId) {
        query = query.eq('user_id', options.userId);
      }

      if (options.flightType) {
        query = query.eq('flight_type', options.flightType);
      }

      if (options.aircraftType) {
        query = query.eq('aircraft_type', options.aircraftType);
      }

      if (options.dateFrom) {
        query = query.gte('departure_time', options.dateFrom);
      }

      if (options.dateTo) {
        query = query.lte('departure_time', options.dateTo);
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching flight logs:', fetchError);
        setError(fetchError.message);
        return;
      }

      console.log('Flight logs fetched successfully:', data?.length || 0, 'logs');
      setFlightLogs(data || []);
    } catch (err) {
      console.error('Unexpected error fetching flight logs:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addFlightLog = async (logData: Partial<FlightLog>) => {
    try {
      console.log('Adding flight log:', logData);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error: insertError } = await supabase
        .from('flight_logs')
        .insert([{
          ...logData,
          user_id: user.id
        }])
        .select()
        .single();

      if (insertError) {
        console.error('Error adding flight log:', insertError);
        throw insertError;
      }

      console.log('Flight log added successfully:', data);
      
      // Refresh the list
      await fetchFlightLogs();
      
      return data;
    } catch (err) {
      console.error('Error adding flight log:', err);
      throw err;
    }
  };

  const updateFlightLog = async (id: string, updates: Partial<FlightLog>) => {
    try {
      console.log('Updating flight log:', id, updates);
      
      const { data, error: updateError } = await supabase
        .from('flight_logs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating flight log:', updateError);
        throw updateError;
      }

      console.log('Flight log updated successfully:', data);
      
      // Refresh the list
      await fetchFlightLogs();
      
      return data;
    } catch (err) {
      console.error('Error updating flight log:', err);
      throw err;
    }
  };

  const deleteFlightLog = async (id: string) => {
    try {
      console.log('Deleting flight log:', id);
      
      const { error: deleteError } = await supabase
        .from('flight_logs')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting flight log:', deleteError);
        throw deleteError;
      }

      console.log('Flight log deleted successfully');
      
      // Refresh the list
      await fetchFlightLogs();
    } catch (err) {
      console.error('Error deleting flight log:', err);
      throw err;
    }
  };

  const getFlightLogStats = () => {
    const totalHours = flightLogs.reduce((sum, log) => sum + log.flight_duration_hours, 0);
    const totalFlights = flightLogs.length;
    const soloHours = flightLogs.reduce((sum, log) => sum + log.solo_time, 0);
    const dualHours = flightLogs.reduce((sum, log) => sum + log.dual_received, 0);
    const crossCountryHours = flightLogs.reduce((sum, log) => sum + log.cross_country_time, 0);
    const nightHours = flightLogs.reduce((sum, log) => sum + log.night_time, 0);
    const instrumentHours = flightLogs.reduce((sum, log) => sum + log.instrument_time, 0);
    const totalLandings = flightLogs.reduce((sum, log) => sum + log.landings_day + log.landings_night, 0);
    const picHours = flightLogs.filter(log => log.pilot_in_command).reduce((sum, log) => sum + log.flight_duration_hours, 0);

    return {
      totalHours,
      totalFlights,
      soloHours,
      dualHours,
      crossCountryHours,
      nightHours,
      instrumentHours,
      totalLandings,
      picHours
    };
  };

  useEffect(() => {
    fetchFlightLogs();
  }, [options.userId, options.flightType, options.aircraftType, options.dateFrom, options.dateTo, options.limit]);

  return {
    flightLogs,
    loading,
    error,
    refetch: fetchFlightLogs,
    addFlightLog,
    updateFlightLog,
    deleteFlightLog,
    stats: getFlightLogStats()
  };
}
