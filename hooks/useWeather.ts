
import { useState, useEffect } from 'react';
import { supabase } from '../app/integrations/supabase/client';
import type { Tables } from '../app/integrations/supabase/types';

export type WeatherData = Tables<'weather_data'>;

interface UseWeatherOptions {
  stations?: string[];
  location?: { lat: number; lng: number };
  autoRefresh?: boolean;
  refreshInterval?: number; // in minutes
}

export function useWeather(options: UseWeatherOptions = {}) {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWeatherFromAPI = async () => {
    try {
      console.log('Fetching weather from API with stations:', options.stations);
      const response = await supabase.functions.invoke('fetch-aviation-weather', {
        body: {
          stations: options.stations,
          location: options.location
        }
      });

      console.log('Weather API full response:', response);

      if (response.error) {
        console.error('Error from weather API:', response.error);
        throw new Error(response.error.message || 'Failed to fetch weather');
      }

      console.log('Weather API response data:', response.data);
      return response.data?.data || [];
    } catch (err) {
      console.error('Error fetching weather from API:', err);
      throw err;
    }
  };

  const fetchWeatherFromDB = async () => {
    try {
      let query = supabase
        .from('weather_data')
        .select('*')
        .order('last_updated', { ascending: false });

      if (options.stations && options.stations.length > 0) {
        query = query.in('station_id', options.stations);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching weather from DB:', fetchError);
        throw fetchError;
      }

      console.log('Fetched weather from DB:', data?.length || 0);
      return data || [];
    } catch (err) {
      console.error('Error in fetchWeatherFromDB:', err);
      throw err;
    }
  };

  const fetchWeather = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check if we have recent data (less than 30 minutes old)
      if (!forceRefresh) {
        const dbData = await fetchWeatherFromDB();
        
        if (dbData.length > 0) {
          const mostRecent = new Date(dbData[0].last_updated || 0);
          const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
          
          if (mostRecent > thirtyMinutesAgo) {
            console.log('Using cached weather data');
            setWeatherData(dbData);
            setLastUpdated(mostRecent);
            setLoading(false);
            return;
          }
        }
      }

      // Fetch fresh data from API
      console.log('Fetching fresh weather data...');
      const apiData = await fetchWeatherFromAPI();
      setWeatherData(apiData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error in fetchWeather:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // Fallback to DB data if API fails
      try {
        const dbData = await fetchWeatherFromDB();
        setWeatherData(dbData);
        if (dbData.length > 0) {
          setLastUpdated(new Date(dbData[0].last_updated || 0));
        }
      } catch (dbErr) {
        console.error('Fallback to DB also failed:', dbErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [options.stations?.join(','), options.location?.lat, options.location?.lng]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!options.autoRefresh) return;

    const interval = setInterval(() => {
      fetchWeather(true);
    }, (options.refreshInterval || 30) * 60 * 1000); // Default 30 minutes

    return () => clearInterval(interval);
  }, [options.autoRefresh, options.refreshInterval]);

  const refetch = () => {
    fetchWeather(true);
  };

  return {
    weatherData,
    loading,
    error,
    lastUpdated,
    refetch
  };
}
