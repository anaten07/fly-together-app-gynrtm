
import { Text, View, ScrollView, TextInput, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import MapView from '../../components/MapView';
import PremiumFeatures from '../../components/PremiumFeatures';
import PilotCard from '../../components/PilotCard';
import Icon from '../../components/Icon';
import { router } from 'expo-router';
import FlightBooking from '../../components/FlightBooking';
import { usePilots } from '../../hooks/usePilots';
import { useWeather } from '../../hooks/useWeather';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPilot, setSelectedPilot] = useState('');

  // Fetch pilots with search and filter options
  const { pilots, loading: pilotsLoading, error: pilotsError, refetch: refetchPilots } = usePilots({
    location: searchQuery,
    availableOnly: selectedFilter === 'available',
    minRating: selectedFilter === 'top-rated' ? 4.5 : undefined
  });

  // Fetch weather data for major airports
  const { weatherData, loading: weatherLoading, error: weatherError, refetch: refetchWeather } = useWeather({
    stations: ['KLAX', 'KSFO', 'KSAN', 'KPHX', 'KDEN'],
    autoRefresh: true,
    refreshInterval: 30
  });

  const filters = [
    { id: 'all', title: 'All Pilots', icon: 'people' },
    { id: 'available', title: 'Available', icon: 'checkmark-circle' },
    { id: 'nearby', title: 'Nearby', icon: 'location' },
    { id: 'top-rated', title: 'Top Rated', icon: 'star' },
  ];

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    setSearchQuery(query);
  };

  const handleFilterPress = (filterId: string) => {
    console.log('Filter selected:', filterId);
    setSelectedFilter(filterId);
  };

  const handlePilotPress = (pilotId: string) => {
    console.log('Pilot selected:', pilotId);
    router.push(`/pilot/${pilotId}`);
  };

  const handleFeaturePress = (featureId: string) => {
    console.log('Feature selected:', featureId);
    if (featureId === 'weather') {
      refetchWeather();
    }
  };

  const handleQuickBook = (pilotName: string) => {
    console.log('Quick book for pilot:', pilotName);
    setSelectedPilot(pilotName);
    setShowBooking(true);
  };

  const handleBookFlight = (flightType: string) => {
    console.log('Booking flight type:', flightType);
    setShowBooking(false);
    // Here you would typically create a flight request
  };

  const onRefresh = () => {
    refetchPilots();
    refetchWeather();
  };

  const isRefreshing = pilotsLoading || weatherLoading;

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      <LinearGradient
        colors={[colors.background, colors.surface]}
        style={commonStyles.header}
      >
        <View style={commonStyles.headerContent}>
          <Text style={commonStyles.headerTitle}>Find Your Flight Partner</Text>
          <Text style={commonStyles.headerSubtitle}>
            Connect with certified pilots in your area
          </Text>
        </View>
      </LinearGradient>

      <ScrollView 
        style={commonStyles.content}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {/* Search Bar */}
        <View style={[commonStyles.card, { marginBottom: 16 }]}>
          <View style={commonStyles.searchContainer}>
            <Icon name="search" size={20} color={colors.textSecondary} />
            <TextInput
              style={commonStyles.searchInput}
              placeholder="Search by location..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
        </View>

        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                commonStyles.filterButton,
                selectedFilter === filter.id && commonStyles.filterButtonActive
              ]}
              onPress={() => handleFilterPress(filter.id)}
            >
              <Icon 
                name={filter.icon} 
                size={16} 
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

        {/* Weather Summary */}
        {weatherData.length > 0 && (
          <View style={[commonStyles.card, { marginBottom: 20 }]}>
            <View style={commonStyles.cardHeader}>
              <Icon name="cloud" size={20} color={colors.primary} />
              <Text style={commonStyles.cardTitle}>Current Weather</Text>
              <TouchableOpacity onPress={refetchWeather}>
                <Icon name="refresh" size={16} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {weatherData.slice(0, 5).map((weather) => (
                <View key={weather.id} style={commonStyles.weatherCard}>
                  <Text style={commonStyles.weatherStation}>{weather.station_id}</Text>
                  <Text style={commonStyles.weatherCategory}>{weather.flight_category}</Text>
                  <Text style={commonStyles.weatherTemp}>
                    {weather.temperature ? `${Math.round(weather.temperature)}°F` : 'N/A'}
                  </Text>
                  <Text style={commonStyles.weatherWind}>
                    {weather.wind_speed ? `${Math.round(weather.wind_speed)} kt` : 'Calm'}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Map View */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <MapView pilots={pilots.map(pilot => ({
            id: pilot.id,
            name: pilot.name,
            location: pilot.location,
            distance: '5 miles', // Calculate actual distance
            latitude: pilot.latitude || undefined,
            longitude: pilot.longitude || undefined
          }))} />
        </View>

        {/* Premium Features */}
        <PremiumFeatures onFeaturePress={handleFeaturePress} />

        {/* Pilots List */}
        <View style={commonStyles.sectionHeader}>
          <Text style={commonStyles.sectionTitle}>Available Pilots</Text>
          <Text style={commonStyles.sectionSubtitle}>
            {pilots.length} pilots found
          </Text>
        </View>

        {pilotsError && (
          <View style={[commonStyles.card, { backgroundColor: colors.error + '20', marginBottom: 16 }]}>
            <Text style={[commonStyles.text, { color: colors.error }]}>
              Error loading pilots: {pilotsError}
            </Text>
          </View>
        )}

        {pilots.map((pilot) => (
          <PilotCard
            key={pilot.id}
            pilot={{
              id: pilot.id,
              name: pilot.name,
              experience: pilot.experience,
              aircraft: pilot.aircraft,
              location: pilot.location,
              rating: pilot.rating || 0,
              distance: '5 miles', // Calculate actual distance
              avatar: pilot.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
              bio: pilot.bio || '',
              certifications: pilot.certifications || []
            }}
            onPress={() => handlePilotPress(pilot.id)}
          />
        ))}

        {pilots.length === 0 && !pilotsLoading && (
          <View style={[commonStyles.card, { alignItems: 'center', padding: 40 }]}>
            <Icon name="airplane" size={48} color={colors.textSecondary} />
            <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
              No pilots found matching your criteria
            </Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>

      <FlightBooking
        visible={showBooking}
        onClose={() => setShowBooking(false)}
        pilotName={selectedPilot}
        onBookFlight={handleBookFlight}
      />
    </View>
  );
}
