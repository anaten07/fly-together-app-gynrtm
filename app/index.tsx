
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { commonStyles, colors } from '../styles/commonStyles';
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
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPilots, setFilteredPilots] = useState(mockPilots);

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

  const handlePilotPress = (pilotId: string) => {
    console.log('Navigating to pilot profile:', pilotId);
    router.push(`/pilot/${pilotId}`);
  };

  return (
    <View style={commonStyles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ padding: 20, paddingTop: 10 }}>
          <Text style={commonStyles.title}>SkyConnect</Text>
          <Text style={commonStyles.textLight}>Find pilots in your area to fly together</Text>
        </View>

        {/* Search Bar */}
        <View style={{ paddingHorizontal: 20 }}>
          <View style={commonStyles.searchContainer}>
            <Icon name="search" size={20} />
            <TextInput
              style={commonStyles.searchInput}
              placeholder="Search pilots, aircraft, or location..."
              placeholderTextColor={colors.textLight}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {/* Map View */}
        <View style={{ paddingHorizontal: 20 }}>
          <MapView pilots={mockPilots} />
        </View>

        {/* Filter Buttons */}
        <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={commonStyles.badge}>
                <Text style={commonStyles.badgeText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[commonStyles.badge, { backgroundColor: colors.backgroundAlt }]}>
                <Text style={[commonStyles.badgeText, { color: colors.text }]}>Cessna</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[commonStyles.badge, { backgroundColor: colors.backgroundAlt }]}>
                <Text style={[commonStyles.badgeText, { color: colors.text }]}>Piper</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[commonStyles.badge, { backgroundColor: colors.backgroundAlt }]}>
                <Text style={[commonStyles.badgeText, { color: colors.text }]}>Cirrus</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[commonStyles.badge, { backgroundColor: colors.backgroundAlt }]}>
                <Text style={[commonStyles.badgeText, { color: colors.text }]}>Nearby</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Pilots List */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
          <Text style={commonStyles.subtitle}>Available Pilots ({filteredPilots.length})</Text>
          {filteredPilots.map((pilot) => (
            <PilotCard
              key={pilot.id}
              pilot={pilot}
              onPress={() => handlePilotPress(pilot.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
