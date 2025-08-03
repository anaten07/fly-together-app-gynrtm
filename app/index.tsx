
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
        {/* Enhanced Header with Fly Encore Branding */}
        <LinearGradient
          colors={['#667eea', '#764ba2', '#5441cc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[commonStyles.headerGradient, { paddingTop: 70, paddingBottom: 40 }]}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon 
                name="airplane" 
                size={32} 
                color={colors.background} 
                style={{ marginRight: 12, transform: [{ rotate: '45deg' }] }} 
              />
              <Text style={[commonStyles.titleLarge, { 
                color: colors.background, 
                fontSize: 42, 
                fontWeight: '900',
                letterSpacing: -1.5,
                textShadowColor: 'rgba(0,0,0,0.3)',
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4,
              }]}>
                Fly Encore
              </Text>
            </View>
            <Text style={[commonStyles.text, { 
              color: colors.background, 
              opacity: 0.95, 
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
              letterSpacing: 0.5,
              textShadowColor: 'rgba(0,0,0,0.2)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }]}>
              Connect with certified pilots for extraordinary flights
            </Text>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginTop: 16,
              backgroundColor: 'rgba(255,255,255,0.2)',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}>
              <Icon name="location" size={16} color={colors.background} />
              <Text style={[commonStyles.textLight, { 
                color: colors.background, 
                marginLeft: 6,
                fontWeight: '600',
              }]}>
                San Francisco Bay Area
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Enhanced Search Bar */}
        <View style={{ paddingHorizontal: 20, marginTop: -25, zIndex: 1 }}>
          <View style={[commonStyles.searchContainer, { 
            ...shadows.large,
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.borderLight,
          }]}>
            <Icon name="search" size={22} color={colors.primary} />
            <TextInput
              style={[commonStyles.searchInput, { fontSize: 17, fontWeight: '500' }]}
              placeholder="Search pilots, aircraft, or location..."
              placeholderTextColor={colors.textMuted}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <Icon name="close-circle" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Enhanced Stats Cards */}
        <View style={{ paddingHorizontal: 20, marginVertical: 25 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[commonStyles.cardCompact, { 
                  minWidth: 140, 
                  alignItems: 'center',
                  ...shadows.colored,
                }]}
              >
                <Icon name="people" size={28} color={colors.background} backgroundColor="rgba(255,255,255,0.2)" padding={10} />
                <Text style={[commonStyles.subtitleMedium, { 
                  marginTop: 12, 
                  marginBottom: 4, 
                  color: colors.background,
                  fontSize: 24,
                  fontWeight: '800',
                }]}>
                  {mockPilots.length}
                </Text>
                <Text style={[commonStyles.textMuted, { color: 'rgba(255,255,255,0.8)', fontWeight: '600' }]}>
                  Active Pilots
                </Text>
              </LinearGradient>
              
              <LinearGradient
                colors={['#06B6D4', '#67E8F9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[commonStyles.cardCompact, { 
                  minWidth: 140, 
                  alignItems: 'center',
                  ...shadows.medium,
                }]}
              >
                <Icon name="airplane" size={28} color={colors.background} backgroundColor="rgba(255,255,255,0.2)" padding={10} />
                <Text style={[commonStyles.subtitleMedium, { 
                  marginTop: 12, 
                  marginBottom: 4, 
                  color: colors.background,
                  fontSize: 24,
                  fontWeight: '800',
                }]}>
                  12
                </Text>
                <Text style={[commonStyles.textMuted, { color: 'rgba(255,255,255,0.8)', fontWeight: '600' }]}>
                  Aircraft Types
                </Text>
              </LinearGradient>
              
              <LinearGradient
                colors={['#F59E0B', '#FCD34D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[commonStyles.cardCompact, { 
                  minWidth: 140, 
                  alignItems: 'center',
                  ...shadows.medium,
                }]}
              >
                <Icon name="star" size={28} color={colors.background} backgroundColor="rgba(255,255,255,0.2)" padding={10} />
                <Text style={[commonStyles.subtitleMedium, { 
                  marginTop: 12, 
                  marginBottom: 4, 
                  color: colors.background,
                  fontSize: 24,
                  fontWeight: '800',
                }]}>
                  4.8
                </Text>
                <Text style={[commonStyles.textMuted, { color: 'rgba(255,255,255,0.8)', fontWeight: '600' }]}>
                  Avg Rating
                </Text>
              </LinearGradient>
            </View>
          </ScrollView>
        </View>

        {/* Map View */}
        <View style={{ paddingHorizontal: 20 }}>
          <MapView pilots={mockPilots} />
        </View>

        {/* Enhanced Filter Buttons */}
        <View style={{ paddingHorizontal: 20, marginVertical: 25 }}>
          <Text style={[commonStyles.subtitleMedium, { marginBottom: 16, fontSize: 20, fontWeight: '700' }]}>
            Categories
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              {filterCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    commonStyles.badge,
                    {
                      backgroundColor: activeFilter === category.id ? colors.primary : colors.surfaceAlt,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                      paddingVertical: 12,
                      borderRadius: 25,
                      borderWidth: activeFilter === category.id ? 0 : 1,
                      borderColor: colors.border,
                      ...shadows.small,
                    }
                  ]}
                  onPress={() => handleFilterPress(category.id)}
                >
                  <Icon 
                    name={category.icon as any} 
                    size={18} 
                    color={activeFilter === category.id ? colors.background : colors.text} 
                  />
                  <Text style={[
                    commonStyles.badgeText,
                    {
                      color: activeFilter === category.id ? colors.background : colors.text,
                      marginLeft: 8,
                      fontSize: 14,
                      fontWeight: '600',
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
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <Text style={[commonStyles.subtitle, { fontSize: 22, fontWeight: '700' }]}>
              Available Pilots ({filteredPilots.length})
            </Text>
            <TouchableOpacity style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              backgroundColor: colors.surfaceAlt,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              ...shadows.small,
            }}>
              <Text style={[commonStyles.textLight, { marginRight: 6, fontWeight: '600' }]}>Sort by</Text>
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
            <View style={[commonStyles.cardElevated, { alignItems: 'center', paddingVertical: 50 }]}>
              <Icon name="search" size={64} color={colors.textMuted} />
              <Text style={[commonStyles.subtitle, { marginTop: 20, color: colors.textMuted, fontSize: 20 }]}>
                No pilots found
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 12, fontSize: 16 }]}>
                Try adjusting your search criteria or filters
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
