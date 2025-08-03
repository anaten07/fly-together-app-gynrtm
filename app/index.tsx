
import { Text, View, ScrollView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows } from '../styles/commonStyles';
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
    bio: 'Commercial pilot with extensive experience in recreational flying. Love sharing the joy of aviation with fellow enthusiasts!',
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
    bio: 'Weekend warrior pilot who enjoys scenic flights and teaching others about aviation safety and techniques.',
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
    bio: 'Aerobatic pilot and flight instructor. Always excited to share advanced flying techniques and aerobatic maneuvers.',
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
    bio: 'Retired airline pilot who loves sharing decades of aviation experience with fellow enthusiasts and new pilots.',
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
        {/* Header */}
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[commonStyles.headerGradient, { paddingTop: 60, paddingBottom: 40 }]}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              marginBottom: 16,
            }}>
              <Icon 
                name="airplane" 
                size={32} 
                color={colors.textInverse} 
                style={{ marginRight: 12, transform: [{ rotate: '45deg' }] }} 
              />
              <Text style={[commonStyles.titleLarge, { 
                color: colors.textInverse, 
                fontSize: 32, 
                fontWeight: '800',
              }]}>
                Fly Encore
              </Text>
            </View>
            
            <Text style={[commonStyles.text, { 
              color: colors.textInverse, 
              textAlign: 'center',
              fontSize: 16,
              marginBottom: 20,
            }]}>
              Connect with certified pilots for extraordinary flights
            </Text>
            
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}>
              <Icon name="location" size={16} color={colors.textInverse} />
              <Text style={[commonStyles.textMedium, { 
                color: colors.textInverse, 
                marginLeft: 8,
                fontSize: 14,
              }]}>
                San Francisco Bay Area
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={{ paddingHorizontal: 20, marginTop: -25, zIndex: 1 }}>
          <View style={[commonStyles.searchContainer, { 
            backgroundColor: colors.background,
            borderColor: colors.primary,
            ...shadows.medium,
          }]}>
            <Icon name="search" size={20} color={colors.primary} />
            <TextInput
              style={[commonStyles.searchInput, { fontSize: 16 }]}
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

        {/* Stats */}
        <View style={{ paddingHorizontal: 20, marginVertical: 25 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={[commonStyles.cardCompact, { 
              flex: 1, 
              marginRight: 8,
              alignItems: 'center',
              backgroundColor: colors.background,
              borderColor: colors.border,
            }]}>
              <Icon name="people" size={24} color={colors.primary} />
              <Text style={[commonStyles.subtitleMedium, { 
                marginTop: 8,
                marginBottom: 4, 
                color: colors.text,
                fontSize: 20,
                fontWeight: '700',
              }]}>
                {mockPilots.length}
              </Text>
              <Text style={[commonStyles.textMuted, { 
                color: colors.textLight, 
                fontSize: 12,
              }]}>
                Active Pilots
              </Text>
            </View>
            
            <View style={[commonStyles.cardCompact, { 
              flex: 1, 
              marginLeft: 8,
              alignItems: 'center',
              backgroundColor: colors.background,
              borderColor: colors.border,
            }]}>
              <Icon name="star" size={24} color={colors.primary} />
              <Text style={[commonStyles.subtitleMedium, { 
                marginTop: 8,
                marginBottom: 4, 
                color: colors.text,
                fontSize: 20,
                fontWeight: '700',
              }]}>
                4.8
              </Text>
              <Text style={[commonStyles.textMuted, { 
                color: colors.textLight, 
                fontSize: 12,
              }]}>
                Avg Rating
              </Text>
            </View>
          </View>
        </View>

        {/* Map View */}
        <View style={{ paddingHorizontal: 20 }}>
          <MapView pilots={mockPilots} />
        </View>

        {/* Filter Buttons */}
        <View style={{ paddingHorizontal: 20, marginVertical: 25 }}>
          <Text style={[commonStyles.subtitle, { 
            marginBottom: 16, 
            fontSize: 18, 
            fontWeight: '700',
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
                      backgroundColor: activeFilter === category.id ? colors.primary : colors.background,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: activeFilter === category.id ? colors.primary : colors.border,
                      ...shadows.small,
                    }
                  ]}
                  onPress={() => handleFilterPress(category.id)}
                >
                  <Icon 
                    name={category.icon as any} 
                    size={16} 
                    color={activeFilter === category.id ? colors.textInverse : colors.text} 
                  />
                  <Text style={[
                    {
                      color: activeFilter === category.id ? colors.textInverse : colors.text,
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

        {/* Pilots List */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 60 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <Text style={[commonStyles.subtitle, { 
              fontSize: 20, 
              fontWeight: '700',
              color: colors.text,
            }]}>
              Available Pilots ({filteredPilots.length})
            </Text>
            <TouchableOpacity style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              backgroundColor: colors.surfaceAlt,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <Text style={[commonStyles.textLight, { 
                marginRight: 6, 
                fontSize: 12,
                color: colors.text,
              }]}>
                Sort
              </Text>
              <Icon name="funnel-outline" size={14} color={colors.text} />
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
            <View style={[commonStyles.card, { 
              alignItems: 'center', 
              paddingVertical: 40,
              backgroundColor: colors.backgroundAlt,
              borderColor: colors.border,
            }]}>
              <Icon name="search" size={48} color={colors.textMuted} />
              <Text style={[commonStyles.subtitle, { 
                marginTop: 16, 
                color: colors.textMuted, 
                fontSize: 18,
              }]}>
                No pilots found
              </Text>
              <Text style={[commonStyles.textLight, { 
                textAlign: 'center', 
                marginTop: 8, 
                color: colors.textLight,
              }]}>
                Try adjusting your search criteria
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
