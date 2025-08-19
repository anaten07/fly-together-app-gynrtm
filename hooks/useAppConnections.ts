
import { useState, useEffect } from 'react';
import { supabase } from '../app/integrations/supabase/client';

interface AppConnection {
  id: string;
  user_id: string;
  app_name: string;
  connection_status: 'connected' | 'disconnected' | 'pending' | 'error';
  access_token?: string;
  refresh_token?: string;
  token_expires_at?: string;
  app_user_id?: string;
  sync_enabled: boolean;
  last_sync_at?: string;
  sync_settings: any;
  connection_data: any;
  error_message?: string;
  created_at: string;
  updated_at: string;
}

interface UseAppConnectionsOptions {
  userId?: string;
  appName?: string;
}

export function useAppConnections(options: UseAppConnectionsOptions = {}) {
  const [connections, setConnections] = useState<AppConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConnections = async () => {
    try {
      console.log('Fetching app connections with options:', options);
      setLoading(true);
      setError(null);

      let query = supabase
        .from('app_connections')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (options.userId) {
        query = query.eq('user_id', options.userId);
      }

      if (options.appName) {
        query = query.eq('app_name', options.appName);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching app connections:', fetchError);
        setError(fetchError.message);
        return;
      }

      console.log('App connections fetched successfully:', data?.length || 0, 'connections');
      setConnections(data || []);
    } catch (err) {
      console.error('Unexpected error fetching app connections:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createConnection = async (connectionData: Partial<AppConnection>) => {
    try {
      console.log('Creating app connection:', connectionData);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error: insertError } = await supabase
        .from('app_connections')
        .insert([{
          ...connectionData,
          user_id: user.id
        }])
        .select()
        .single();

      if (insertError) {
        console.error('Error creating app connection:', insertError);
        throw insertError;
      }

      console.log('App connection created successfully:', data);
      
      // Refresh the list
      await fetchConnections();
      
      return data;
    } catch (err) {
      console.error('Error creating app connection:', err);
      throw err;
    }
  };

  const updateConnection = async (id: string, updates: Partial<AppConnection>) => {
    try {
      console.log('Updating app connection:', id, updates);
      
      const { data, error: updateError } = await supabase
        .from('app_connections')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating app connection:', updateError);
        throw updateError;
      }

      console.log('App connection updated successfully:', data);
      
      // Refresh the list
      await fetchConnections();
      
      return data;
    } catch (err) {
      console.error('Error updating app connection:', err);
      throw err;
    }
  };

  const deleteConnection = async (id: string) => {
    try {
      console.log('Deleting app connection:', id);
      
      const { error: deleteError } = await supabase
        .from('app_connections')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting app connection:', deleteError);
        throw deleteError;
      }

      console.log('App connection deleted successfully');
      
      // Refresh the list
      await fetchConnections();
    } catch (err) {
      console.error('Error deleting app connection:', err);
      throw err;
    }
  };

  const connectApp = async (appName: string, authData: any) => {
    try {
      console.log('Connecting app:', appName, authData);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check if connection already exists
      const existingConnection = connections.find(conn => conn.app_name === appName);
      
      if (existingConnection) {
        // Update existing connection
        return await updateConnection(existingConnection.id, {
          connection_status: 'connected',
          access_token: authData.access_token,
          refresh_token: authData.refresh_token,
          token_expires_at: authData.expires_at,
          app_user_id: authData.user_id,
          connection_data: authData,
          error_message: null
        });
      } else {
        // Create new connection
        return await createConnection({
          app_name: appName,
          connection_status: 'connected',
          access_token: authData.access_token,
          refresh_token: authData.refresh_token,
          token_expires_at: authData.expires_at,
          app_user_id: authData.user_id,
          sync_enabled: true,
          connection_data: authData
        });
      }
    } catch (err) {
      console.error('Error connecting app:', err);
      throw err;
    }
  };

  const disconnectApp = async (appName: string) => {
    try {
      console.log('Disconnecting app:', appName);
      
      const connection = connections.find(conn => conn.app_name === appName);
      if (!connection) {
        throw new Error('Connection not found');
      }

      return await updateConnection(connection.id, {
        connection_status: 'disconnected',
        access_token: null,
        refresh_token: null,
        token_expires_at: null,
        app_user_id: null,
        sync_enabled: false,
        error_message: null
      });
    } catch (err) {
      console.error('Error disconnecting app:', err);
      throw err;
    }
  };

  const syncApp = async (appName: string) => {
    try {
      console.log('Syncing app:', appName);
      
      const connection = connections.find(conn => conn.app_name === appName);
      if (!connection || connection.connection_status !== 'connected') {
        throw new Error('App not connected');
      }

      // Update last sync time
      await updateConnection(connection.id, {
        last_sync_at: new Date().toISOString()
      });

      // In a real implementation, this would trigger the actual sync process
      // For now, we'll just update the timestamp
      console.log('Sync completed for:', appName);
      
      return true;
    } catch (err) {
      console.error('Error syncing app:', err);
      throw err;
    }
  };

  const getConnectionStatus = (appName: string) => {
    const connection = connections.find(conn => conn.app_name === appName);
    return connection?.connection_status || 'disconnected';
  };

  const isAppConnected = (appName: string) => {
    return getConnectionStatus(appName) === 'connected';
  };

  useEffect(() => {
    fetchConnections();
  }, [options.userId, options.appName]);

  return {
    connections,
    loading,
    error,
    refetch: fetchConnections,
    createConnection,
    updateConnection,
    deleteConnection,
    connectApp,
    disconnectApp,
    syncApp,
    getConnectionStatus,
    isAppConnected
  };
}
