
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
    console.log('Filter selected:', filterId);
  };

  const handlePilotPress = (pilotId: string) => {
    console.log('Navigating to pilot profile:', pilotId);
    router.push(`/pilot/${pilotId}`);
  };

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Sleek Black & Orange Header */}
        <LinearGradient
          colors={['#000000', '#1A1A1A', '#FF6B35']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[commonStyles.headerGradient, { paddingTop: 70, paddingBottom: 50 }]}
        >
          <View style={{ alignItems: 'center' }}>
            {/* Logo and Brand */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginBottom: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: 'rgba(255, 107, 53, 0.3)',
            }}>
              <Icon 
                name="airplane" 
                size={28} 
                color={colors.textInverse} 
                style={{ marginRight: 12, transform: [{ rotate: '45deg' }] }} 
              />
              <Text style={[commonStyles.titleLarge, { 
                color: colors.textInverse, 
                fontSize: 38, 
                fontWeight: '900',
                letterSpacing: -1.5,
                textShadowColor: 'rgba(255, 107, 53, 0.5)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 8,
              }]}>
                Fly Encore
              </Text>
            </View>
            
            <Text style={[commonStyles.text, { 
              color: colors.textInverse, 
              opacity: 0.95, 
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
              letterSpacing: 0.5,
              marginBottom: 20,
            }]}>
              Connect with certified pilots for extraordinary flights
            </Text>
            
            {/* Location Badge */}
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              backgroundColor: colors.primary,
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 25,
              ...shadows.orange,
            }}>
              <Icon name="location" size={18} color={colors.textInverse} />
              <Text style={[commonStyles.textMedium, { 
                color: colors.textInverse, 
                marginLeft: 8,
                fontWeight: '700',
                fontSize: 16,
              }]}>
                San Francisco Bay Area
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Elevated Search Bar */}
        <View style={{ paddingHorizontal: 20, marginTop: -30, zIndex: 1 }}>
          <View style={[commonStyles.searchContainer, { 
            ...shadows.large,
            backgroundColor: colors.background,
            borderWidth: 2,
            borderColor: colors.primary,
          }]}>
            <Icon name="search" size={24} color={colors.primary} />
            <TextInput
              style={[commonStyles.searchInput, { fontSize: 17, fontWeight: '500' }]}
              placeholder="Search pilots, aircraft, or location..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Icon name="close-circle" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Modern Stats Cards */}
        <View style={{ paddingHorizontal: 20, marginVertical: 30 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              {/* Active Pilots Card */}
              <View style={[commonStyles.cardCompact, { 
                minWidth: 150, 
                alignItems: 'center',
                backgroundColor: colors.secondary,
                borderColor: colors.primary,
                borderWidth: 2,
                ...shadows.orange,
              }]}>
                <View style={{
                  backgroundColor: colors.primary,
                  borderRadius: 20,
                  padding: 12,
                  marginBottom: 12,
                }}>
                  <Icon name="people" size={28} color={colors.textInverse} />
                </View>
                <Text style={[commonStyles.subtitleMedium, { 
                  marginBottom: 4, 
                  color: colors.textInverse,
                  fontSize: 28,
                  fontWeight: '900',
                }]}>
                  {mockPilots.length}
                </Text>
                <Text style={[commonStyles.textMuted, { 
                  color: colors.primary, 
                  fontWeight: '700',
                  fontSize: 14,
                }]}>
                  Active Pilots
                </Text>
              </View>
              
              {/* Aircraft Types Card */}
              <View style={[commonStyles.cardCompact, { 
                minWidth: 150, 
                alignItems: 'center',
                backgroundColor: colors.background,
                borderColor: colors.secondary,
                borderWidth: 2,
                ...shadows.medium,
              }]}>
                <View style={{
                  backgroundColor: colors.secondary,
                  borderRadius: 20,
                  padding: 12,
                  marginBottom: 12,
                }}>
                  <Icon name="airplane" size={28} color={colors.textInverse} />
                </View>
                <Text style={[commonStyles.subtitleMedium, { 
                  marginBottom: 4, 
                  color: colors.text,
                  fontSize: 28,
                  fontWeight: '900',
                }]}>
                  12
                </Text>
                <Text style={[commonStyles.textMuted, { 
                  color: colors.textLight, 
                  fontWeight: '700',
                  fontSize: 14,
                }]}>
                  Aircraft Types
                </Text>
              </View>
              
              {/* Average Rating Card */}
              <View style={[commonStyles.cardCompact, { 
                minWidth: 150, 
                alignItems: 'center',
                backgroundColor: colors.primary,
                borderColor: colors.secondary,
                borderWidth: 2,
                ...shadows.orange,
              }]}>
                <View style={{
                  backgroundColor: colors.textInverse,
                  borderRadius: 20,
                  padding: 12,
                  marginBottom: 12,
                }}>
                  <Icon name="star" size={28} color={colors.primary} />
                </View>
                <Text style={[commonStyles.subtitleMedium, { 
                  marginBottom: 4, 
                  color: colors.textInverse,
                  fontSize: 28,
                  fontWeight: '900',
                }]}>
                  4.8
                </Text>
                <Text style={[commonStyles.textMuted, { 
                  color: colors.textInverse, 
                  fontWeight: '700',
                  fontSize: 14,
                  opacity: 0.9,
                }]}>
                  Avg Rating
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Map View */}
        <View style={{ paddingHorizontal: 20 }}>
          <MapView pilots={mockPilots} />
        </View>

        {/* Sleek Filter Buttons */}
        <View style={{ paddingHorizontal: 20, marginVertical: 30 }}>
          <Text style={[commonStyles.subtitleMedium, { 
            marginBottom: 20, 
            fontSize: 22, 
            fontWeight: '800',
            color: colors.text,
          }]}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              {filterCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    {
                      backgroundColor: activeFilter === category.id ? colors.secondary : colors.background,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 24,
                      paddingVertical: 14,
                      borderRadius: 30,
                      borderWidth: 2,
                      borderColor: activeFilter === category.id ? colors.primary : colors.border,
                      ...shadows.small,
                    }
                  ]}
                  onPress={() => handleFilterPress(category.id)}
                >
                  <Icon 
                    name={category.icon as any} 
                    size={20} 
                    color={activeFilter === category.id ? colors.textInverse : colors.text} 
                  />
                  <Text style={[
                    {
                      color: activeFilter === category.id ? colors.textInverse : colors.text,
                      marginLeft: 10,
                      fontSize: 16,
                      fontWeight: '700',
                    }
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Enhanced Pilots List */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25 }}>
            <Text style={[commonStyles.subtitle, { 
              fontSize: 24, 
              fontWeight: '800',
              color: colors.text,
            }]}>
              Available Pilots ({filteredPilots.length})
            </Text>
            <TouchableOpacity style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              backgroundColor: colors.surfaceAlt,
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: colors.border,
              ...shadows.small,
            }}>
              <Text style={[commonStyles.textLight, { 
                marginRight: 8, 
                fontWeight: '700',
                color: colors.text,
              }]}>
                Sort by
              </Text>
              <Icon name="funnel-outline" size={18} color={colors.text} />
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
            <View style={[commonStyles.cardElevated, { 
              alignItems: 'center', 
              paddingVertical: 60,
              backgroundColor: colors.backgroundAlt,
              borderColor: colors.border,
            }]}>
              <Icon name="search" size={72} color={colors.textMuted} />
              <Text style={[commonStyles.subtitle, { 
                marginTop: 24, 
                color: colors.textMuted, 
                fontSize: 22,
                fontWeight: '700',
              }]}>
                No pilots found
              </Text>
              <Text style={[commonStyles.textLight, { 
                textAlign: 'center', 
                marginTop: 12, 
                fontSize: 16,
                color: colors.textLight,
              }]}>
                Try adjusting your search criteria or filters
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
