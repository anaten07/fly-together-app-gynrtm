
import { Text, View, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, gradients, shadows } from '../styles/commonStyles';
import Icon from '../components/Icon';
import PilotCard from '../components/PilotCard';
import MapView from '../components/MapView';

// Mock data for pilots
const mockPilots = [
  {
    id: '1',
    name: 'Captain Sarah Johnson',
    experience: '15 years',
    aircraft: 'Cessna 172',
    location: 'San Francisco, CA',
    rating: 4.9,
    distance: '2.3 miles',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Commercial pilot with extensive experience in recreational flying. Love sharing the joy of aviation!',
    certifications: ['PPL', 'IFR', 'Commercial'],
  },
  {
    id: '2',
    name: 'Mike Rodriguez',
    experience: '8 years',
    aircraft: 'Piper Cherokee',
    location: 'Oakland, CA',
    rating: 4.7,
    distance: '5.1 miles',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Weekend warrior pilot who enjoys scenic flights and teaching others about aviation.',
    certifications: ['PPL', 'IFR'],
  },
  {
    id: '3',
    name: 'Emily Chen',
    experience: '12 years',
    aircraft: 'Cirrus SR22',
    location: 'San Jose, CA',
    rating: 4.8,
    distance: '8.7 miles',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Aerobatic pilot and flight instructor. Always excited to share advanced flying techniques.',
    certifications: ['PPL', 'IFR', 'CFI', 'Aerobatic'],
  },
  {
    id: '4',
    name: 'David Thompson',
    experience: '20 years',
    aircraft: 'Beechcraft Bonanza',
    location: 'Palo Alto, CA',
    rating: 4.9,
    distance: '12.4 miles',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Retired airline pilot who loves sharing decades of aviation experience with fellow enthusiasts.',
    certifications: ['PPL', 'IFR', 'Commercial', 'ATP'],
  },
];

const filterCategories = [
  { id: 'all', name: 'All', icon: 'grid-outline' },
  { id: 'cessna', name: 'Cessna', icon: 'airplane-outline' },
  { id: 'piper', name: 'Piper', icon: 'airplane-outline' },
  { id: 'cirrus', name: 'Cirrus', icon: 'airplane-outline' },
  { id: 'nearby', name: 'Nearby', icon: 'location-outline' },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPilots, setFilteredPilots] = useState(mockPilots);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPilots(mockPilots);
    } else {
      const filtered = mockPilots.filter(pilot =>
        pilot.name.toLowerCase().includes(query.toLowerCase()) ||
        pilot.aircraft.toLowerCase().includes(query.toLowerCase()) ||
        pilot.location.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPilots(filtered);
    }
  };

  const handleFilterPress = (filterId: string) => {
    setActiveFilter(filterId);
    // In a real app, this would filter the pilots based on the selected category
    console.log('Filter selected:', filterId);
  };

  const handlePilotPress = (pilotId: string) => {
    console.log('Navigating to pilot profile:', pilotId);
    router.push(`/pilot/${pilotId}`);
  };

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={commonStyles.headerGradient}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={[commonStyles.titleLarge, { color: colors.background, marginBottom: 8 }]}>
              SkyConnect ✈️
            </Text>
            <Text style={[commonStyles.text, { color: colors.background, opacity: 0.9, textAlign: 'center' }]}>
              Connect with certified pilots in your area for unforgettable flights
            </Text>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={{ paddingHorizontal: 20, marginTop: -20, zIndex: 1 }}>
          <View style={[commonStyles.searchContainer, { ...shadows.large }]}>
            <Icon name="search" size={20} color={colors.primary} />
            <TextInput
              style={commonStyles.searchInput}
              placeholder="Search pilots, aircraft, or location..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Icon name="close-circle" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Stats Cards */}
        <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={[commonStyles.cardCompact, { minWidth: 120, alignItems: 'center' }]}>
                <Icon name="people" size={24} color={colors.primary} backgroundColor={colors.surfaceAlt} padding={8} />
                <Text style={[commonStyles.subtitleMedium, { marginTop: 8, marginBottom: 4 }]}>
                  {mockPilots.length}
                </Text>
                <Text style={commonStyles.textMuted}>Active Pilots</Text>
              </View>
              
              <View style={[commonStyles.cardCompact, { minWidth: 120, alignItems: 'center' }]}>
                <Icon name="airplane" size={24} color={colors.secondary} backgroundColor={colors.surfaceAlt} padding={8} />
                <Text style={[commonStyles.subtitleMedium, { marginTop: 8, marginBottom: 4 }]}>
                  12
                </Text>
                <Text style={commonStyles.textMuted}>Aircraft Types</Text>
              </View>
              
              <View style={[commonStyles.cardCompact, { minWidth: 120, alignItems: 'center' }]}>
                <Icon name="star" size={24} color={colors.accent} backgroundColor={colors.surfaceAlt} padding={8} />
                <Text style={[commonStyles.subtitleMedium, { marginTop: 8, marginBottom: 4 }]}>
                  4.8
                </Text>
                <Text style={commonStyles.textMuted}>Avg Rating</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Map View */}
        <View style={{ paddingHorizontal: 20 }}>
          <MapView pilots={mockPilots} />
        </View>

        {/* Filter Buttons */}
        <View style={{ paddingHorizontal: 20, marginVertical: 20 }}>
          <Text style={[commonStyles.subtitleMedium, { marginBottom: 12 }]}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              {filterCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    commonStyles.badge,
                    {
                      backgroundColor: activeFilter === category.id ? colors.primary : colors.surfaceAlt,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                    }
                  ]}
                  onPress={() => handleFilterPress(category.id)}
                >
                  <Icon 
                    name={category.icon as any} 
                    size={16} 
                    color={activeFilter === category.id ? colors.background : colors.text} 
                  />
                  <Text style={[
                    commonStyles.badgeText,
                    {
                      color: activeFilter === category.id ? colors.background : colors.text,
                      marginLeft: 6,
                    }
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Pilots List */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <Text style={commonStyles.subtitle}>
              Available Pilots ({filteredPilots.length})
            </Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[commonStyles.textLight, { marginRight: 4 }]}>Sort by</Text>
              <Icon name="funnel-outline" size={16} color={colors.textLight} />
            </TouchableOpacity>
          </View>
          
          {filteredPilots.map((pilot) => (
            <PilotCard
              key={pilot.id}
              pilot={pilot}
              onPress={() => handlePilotPress(pilot.id)}
            />
          ))}
          
          {filteredPilots.length === 0 && (
            <View style={[commonStyles.cardElevated, { alignItems: 'center', paddingVertical: 40 }]}>
              <Icon name="search" size={48} color={colors.textMuted} />
              <Text style={[commonStyles.subtitle, { marginTop: 16, color: colors.textMuted }]}>
                No pilots found
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
                Try adjusting your search criteria or filters
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
