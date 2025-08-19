
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StatusBar, Modal, TextInput, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import FlightLogForm from '../../components/FlightLogForm';
import { useFlightLogs } from '../../hooks/useFlightLogs';
import { useAppConnections } from '../../hooks/useAppConnections';

interface FlightLog {
  id: string;
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
  weather_conditions: string;
  route: string;
  total_distance_nm: number;
  fuel_used_gallons: number;
  hobbs_start: number;
  hobbs_end: number;
  created_at: string;
}

interface AppConnection {
  id: string;
  app_name: string;
  connection_status: string;
  last_sync_at: string;
  sync_enabled: boolean;
}

export default function PilotLogScreen() {
  console.log('PilotLogScreen component rendering...');
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  
  // Fetch flight logs and app connections
  const { flightLogs, loading: logsLoading, error: logsError, refetch: refetchLogs, addFlightLog } = useFlightLogs();
  const { connections, loading: connectionsLoading, error: connectionsError, refetch: refetchConnections } = useAppConnections();

  // Debug logging
  console.log('PilotLogScreen render - logs:', flightLogs.length, 'loading:', logsLoading, 'error:', logsError);
  console.log('PilotLogScreen render - connections:', connections.length, 'loading:', connectionsLoading, 'error:', connectionsError);

  const filters = [
    { id: 'all', title: 'All Flights', icon: 'airplane' },
    { id: 'training', title: 'Training', icon: 'school' },
    { id: 'cross_country', title: 'Cross Country', icon: 'map' },
    { id: 'instrument', title: 'Instrument', icon: 'speedometer' },
    { id: 'solo', title: 'Solo', icon: 'person' },
  ];

  const supportedApps = [
    {
      id: 'foreflight',
      name: 'ForeFlight',
      icon: 'airplane',
      color: '#1E88E5',
      description: 'Sync flight logs with ForeFlight Mobile',
      features: ['Flight logs', 'Route planning', 'Weather data']
    },
    {
      id: 'garmin_pilot',
      name: 'Garmin Pilot',
      icon: 'navigate',
      color: '#FF6B35',
      description: 'Connect with Garmin Pilot app',
      features: ['Flight logs', 'Aircraft data', 'Navigation']
    },
    {
      id: 'fltplan_go',
      name: 'FltPlan Go',
      icon: 'map',
      color: '#4CAF50',
      description: 'Integrate with FltPlan Go',
      features: ['Flight planning', 'Weather', 'NOTAMs']
    },
    {
      id: 'cloudahoy',
      name: 'CloudAhoy',
      icon: 'cloud',
      color: '#9C27B0',
      description: 'Flight analysis and debriefing',
      features: ['Flight analysis', 'Performance tracking', 'Debriefing']
    }
  ];

  const handleAddFlight = () => {
    console.log('Add flight pressed');
    setShowAddModal(true);
  };

  const handleSaveFlightLog = async (logData: any) => {
    try {
      console.log('Saving flight log:', logData);
      await addFlightLog(logData);
      setShowAddModal(false);
      Alert.alert('Success', 'Flight log saved successfully!');
    } catch (error) {
      console.error('Error saving flight log:', error);
      Alert.alert('Error', 'Failed to save flight log. Please try again.');
    }
  };

  const handleConnectApps = () => {
    console.log('Connect apps pressed');
    setShowConnectionModal(true);
  };

  const handleFilterPress = (filterId: string) => {
    console.log('Filter selected:', filterId);
    setSelectedFilter(filterId);
  };

  const handleSortPress = (sortType: string) => {
    console.log('Sort selected:', sortType);
    setSortBy(sortType);
  };

  const handleAppConnect = (appId: string) => {
    console.log('Connecting to app:', appId);
    Alert.alert(
      'Connect to App',
      `This will redirect you to ${appId} to authorize the connection. Continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Connect', onPress: () => connectToApp(appId) }
      ]
    );
  };

  const connectToApp = (appId: string) => {
    // In a real implementation, this would handle OAuth flow
    console.log('Initiating connection to:', appId);
    Alert.alert('Coming Soon', 'App integration is coming soon! This will allow you to sync your flight logs with external apps.');
  };

  const handleSyncApp = (appId: string) => {
    console.log('Syncing app:', appId);
    Alert.alert('Sync Started', 'Syncing flight logs with ' + appId + '...');
  };

  const getConnectionStatus = (appName: string) => {
    const connection = connections.find(conn => conn.app_name === appName);
    return connection?.connection_status || 'disconnected';
  };

  const getLastSyncTime = (appName: string) => {
    const connection = connections.find(conn => conn.app_name === appName);
    if (!connection?.last_sync_at) return 'Never';
    
    const syncDate = new Date(connection.last_sync_at);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - syncDate.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  const filteredLogs = flightLogs.filter(log => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'solo') return log.solo_time > 0;
    return log.flight_type === selectedFilter;
  });

  const sortedLogs = [...filteredLogs].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.departure_time).getTime() - new Date(a.departure_time).getTime();
      case 'duration':
        return b.flight_duration_hours - a.flight_duration_hours;
      case 'aircraft':
        return a.aircraft_type.localeCompare(b.aircraft_type);
      default:
        return 0;
    }
  });

  const totalHours = flightLogs.reduce((sum, log) => sum + log.flight_duration_hours, 0);
  const totalFlights = flightLogs.length;
  const soloHours = flightLogs.reduce((sum, log) => sum + log.solo_time, 0);
  const dualHours = flightLogs.reduce((sum, log) => sum + log.dual_received, 0);

  const renderFlightLogCard = (log: FlightLog) => (
    <View key={log.id} style={[commonStyles.card, { marginBottom: 12 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={[commonStyles.cardTitle, { fontSize: 16 }]}>
            {log.departure_airport} → {log.arrival_airport}
          </Text>
          <Text style={[commonStyles.textSecondary, { fontSize: 14 }]}>
            {log.aircraft_type} • {log.aircraft_registration}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[commonStyles.text, { fontWeight: 'bold', color: colors.primary }]}>
            {log.flight_duration_hours.toFixed(1)}h
          </Text>
          <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
            {new Date(log.departure_time).toLocaleDateString()}
          </Text>
        </View>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="time" size={14} color={colors.textSecondary} />
          <Text style={[commonStyles.textSecondary, { marginLeft: 4, fontSize: 12 }]}>
            {new Date(log.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
            {new Date(log.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
        <View style={{ 
          backgroundColor: log.pilot_in_command ? colors.success + '20' : colors.info + '20',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 12
        }}>
          <Text style={{ 
            color: log.pilot_in_command ? colors.success : colors.info,
            fontSize: 10,
            fontWeight: 'bold'
          }}>
            {log.pilot_in_command ? 'PIC' : 'DUAL'}
          </Text>
        </View>
      </View>

      {log.route && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <Icon name="map" size={14} color={colors.textSecondary} />
          <Text style={[commonStyles.textSecondary, { marginLeft: 4, fontSize: 12 }]}>
            Route: {log.route}
          </Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="airplane" size={14} color={colors.textSecondary} />
          <Text style={[commonStyles.textSecondary, { marginLeft: 4, fontSize: 12 }]}>
            {log.landings_day + log.landings_night} landings
          </Text>
        </View>
        {log.instrument_time > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="speedometer" size={14} color={colors.textSecondary} />
            <Text style={[commonStyles.textSecondary, { marginLeft: 4, fontSize: 12 }]}>
              {log.instrument_time.toFixed(1)}h IMC
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderAppCard = (app: typeof supportedApps[0]) => {
    const status = getConnectionStatus(app.id);
    const lastSync = getLastSyncTime(app.id);
    const isConnected = status === 'connected';

    return (
      <View key={app.id} style={[commonStyles.card, { marginBottom: 16 }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <View style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: app.color + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12
          }}>
            <Icon name={app.icon} size={24} color={app.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.cardTitle, { fontSize: 16 }]}>
              {app.name}
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              {app.description}
            </Text>
          </View>
          <View style={{
            backgroundColor: isConnected ? colors.success + '20' : colors.textSecondary + '20',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12
          }}>
            <Text style={{
              color: isConnected ? colors.success : colors.textSecondary,
              fontSize: 10,
              fontWeight: 'bold'
            }}>
              {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          {app.features.map((feature, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Icon name="checkmark-circle" size={12} color={colors.success} />
              <Text style={[commonStyles.textSecondary, { marginLeft: 6, fontSize: 12 }]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        {isConnected && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Icon name="sync" size={14} color={colors.textSecondary} />
            <Text style={[commonStyles.textSecondary, { marginLeft: 4, fontSize: 12 }]}>
              Last sync: {lastSync}
            </Text>
          </View>
        )}

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            text={isConnected ? 'Disconnect' : 'Connect'}
            onPress={() => handleAppConnect(app.id)}
            variant={isConnected ? 'outline' : 'primary'}
            size="small"
            style={{ flex: 1 }}
          />
          {isConnected && (
            <Button
              text="Sync Now"
              onPress={() => handleSyncApp(app.id)}
              variant="secondary"
              size="small"
              icon={<Icon name="sync" size={16} color={colors.primary} />}
              style={{ flex: 1 }}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={commonStyles.header}
      >
        <View style={commonStyles.headerContent}>
          <Text style={commonStyles.headerTitle}>Pilot Log</Text>
          <Text style={commonStyles.headerSubtitle}>
            Track your flight hours and connect with apps
          </Text>
        </View>
      </LinearGradient>

      <ScrollView style={commonStyles.content}>
        {/* Statistics Cards */}
        <View style={{ flexDirection: 'row', marginBottom: 20, gap: 8 }}>
          <View style={[commonStyles.card, { flex: 1, alignItems: 'center', padding: 16 }]}>
            <Text style={[commonStyles.text, { fontSize: 24, fontWeight: 'bold', color: colors.primary }]}>
              {totalHours.toFixed(1)}
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Total Hours</Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, alignItems: 'center', padding: 16 }]}>
            <Text style={[commonStyles.text, { fontSize: 24, fontWeight: 'bold', color: colors.primary }]}>
              {totalFlights}
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Total Flights</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 20, gap: 8 }}>
          <View style={[commonStyles.card, { flex: 1, alignItems: 'center', padding: 16 }]}>
            <Text style={[commonStyles.text, { fontSize: 20, fontWeight: 'bold', color: colors.success }]}>
              {soloHours.toFixed(1)}
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Solo Hours</Text>
          </View>
          <View style={[commonStyles.card, { flex: 1, alignItems: 'center', padding: 16 }]}>
            <Text style={[commonStyles.text, { fontSize: 20, fontWeight: 'bold', color: colors.info }]}>
              {dualHours.toFixed(1)}
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Dual Hours</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', marginBottom: 20, gap: 12 }}>
          <Button
            text="Add Flight"
            onPress={handleAddFlight}
            variant="primary"
            size="medium"
            icon={<Icon name="add" size={20} color={colors.background} />}
            style={{ flex: 1 }}
          />
          <Button
            text="Connect Apps"
            onPress={handleConnectApps}
            variant="outline"
            size="medium"
            icon={<Icon name="link" size={20} color={colors.primary} />}
            style={{ flex: 1 }}
          />
        </View>

        {/* Filter and Sort */}
        <View style={[commonStyles.card, { marginBottom: 16 }]}>
          <Text style={[commonStyles.cardTitle, { marginBottom: 12 }]}>Filter & Sort</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                style={[
                  commonStyles.filterButton,
                  selectedFilter === filter.id && commonStyles.filterButtonActive,
                  { marginRight: 8 }
                ]}
                onPress={() => handleFilterPress(filter.id)}
              >
                <Icon 
                  name={filter.icon} 
                  size={14} 
                  color={selectedFilter === filter.id ? colors.background : colors.primary} 
                />
                <Text style={[
                  commonStyles.filterButtonText,
                  selectedFilter === filter.id && commonStyles.filterButtonTextActive
                ]}>
                  {filter.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            {['date', 'duration', 'aircraft'].map((sort) => (
              <TouchableOpacity
                key={sort}
                style={[
                  {
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 16,
                    backgroundColor: sortBy === sort ? colors.primary : colors.surface,
                    borderWidth: 1,
                    borderColor: colors.primary
                  }
                ]}
                onPress={() => handleSortPress(sort)}
              >
                <Text style={{
                  color: sortBy === sort ? colors.background : colors.primary,
                  fontSize: 12,
                  fontWeight: 'bold',
                  textTransform: 'capitalize'
                }}>
                  {sort}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Flight Logs */}
        <View style={commonStyles.sectionHeader}>
          <Text style={commonStyles.sectionTitle}>Flight Logs</Text>
          <Text style={commonStyles.sectionSubtitle}>
            {sortedLogs.length} flights
          </Text>
        </View>

        {logsError && (
          <View style={[commonStyles.card, { backgroundColor: colors.error + '20', marginBottom: 16 }]}>
            <Text style={[commonStyles.text, { color: colors.error }]}>
              Error loading flight logs: {logsError}
            </Text>
          </View>
        )}

        {logsLoading && (
          <View style={[commonStyles.card, { alignItems: 'center', padding: 40 }]}>
            <Icon name="refresh" size={48} color={colors.primary} />
            <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
              Loading flight logs...
            </Text>
          </View>
        )}

        {!logsLoading && sortedLogs.map(renderFlightLogCard)}

        {sortedLogs.length === 0 && !logsLoading && (
          <View style={[commonStyles.card, { alignItems: 'center', padding: 40 }]}>
            <Icon name="book" size={48} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
              No flight logs found
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
              Add your first flight to get started
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add Flight Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[commonStyles.container, { paddingTop: 60 }]}>
          <View style={[commonStyles.header, { paddingBottom: 20 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[commonStyles.headerTitle, { fontSize: 20 }]}>Add Flight Log</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          
          <FlightLogForm
            onSubmit={handleSaveFlightLog}
            onCancel={() => setShowAddModal(false)}
          />
        </View>
      </Modal>

      {/* App Connections Modal */}
      <Modal
        visible={showConnectionModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={[commonStyles.container, { paddingTop: 60 }]}>
          <View style={[commonStyles.header, { paddingBottom: 20 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[commonStyles.headerTitle, { fontSize: 20 }]}>Connect Apps</Text>
              <TouchableOpacity onPress={() => setShowConnectionModal(false)}>
                <Icon name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <Text style={[commonStyles.headerSubtitle, { marginTop: 8 }]}>
              Sync your flight logs with popular aviation apps
            </Text>
          </View>
          
          <ScrollView style={[commonStyles.content, { padding: 20 }]}>
            {supportedApps.map(renderAppCard)}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
