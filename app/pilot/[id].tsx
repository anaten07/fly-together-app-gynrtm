
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import Icon from '../../components/Icon';

// Mock pilot data - in a real app, this would come from an API
const mockPilotData = {
  '1': {
    id: '1',
    name: 'Captain Sarah Johnson',
    experience: '15 years',
    aircraft: 'Cessna 172',
    location: 'San Francisco, CA',
    rating: 4.9,
    distance: '2.3 miles',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    bio: 'Commercial pilot with extensive experience in recreational flying. I love sharing the joy of aviation with fellow enthusiasts and helping new pilots build confidence in the cockpit.',
    certifications: ['PPL', 'IFR', 'Commercial', 'CFI'],
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@flyencore.com',
    totalFlights: 2847,
    safetyRecord: '100%',
    languages: ['English', 'Spanish'],
    specialties: ['Scenic Tours', 'Flight Training', 'Cross Country'],
  },
  '2': {
    id: '2',
    name: 'Mike Rodriguez',
    experience: '8 years',
    aircraft: 'Piper Cherokee',
    location: 'Oakland, CA',
    rating: 4.7,
    distance: '5.1 miles',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    bio: 'Weekend warrior pilot who enjoys scenic flights and teaching others about aviation. Flying is my escape from the busy tech world.',
    certifications: ['PPL', 'IFR'],
    phone: '+1 (555) 234-5678',
    email: 'mike.rodriguez@flyencore.com',
    totalFlights: 1245,
    safetyRecord: '100%',
    languages: ['English'],
    specialties: ['Weekend Flights', 'Bay Area Tours'],
  },
};

export default function PilotProfileScreen() {
  const { id } = useLocalSearchParams();
  const pilot = mockPilotData[id as keyof typeof mockPilotData];

  if (!pilot) {
    return (
      <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={commonStyles.title}>Pilot not found</Text>
        <Button text="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleContact = (type: 'phone' | 'email') => {
    if (type === 'phone') {
      Linking.openURL(`tel:${pilot.phone}`);
    } else {
      Linking.openURL(`mailto:${pilot.email}`);
    }
  };

  const handleBookFlight = () => {
    console.log('Booking flight with pilot:', pilot.name);
    // In a real app, this would navigate to a booking screen or open a booking modal
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={16} color={colors.primary} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={16} color={colors.primary} />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-outline" size={16} color={colors.textMuted} />
      );
    }

    return stars;
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
          style={[commonStyles.headerGradient, { paddingTop: 60, paddingBottom: 30 }]}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 50,
              left: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              padding: 10,
              ...shadows.medium,
            }}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color={colors.textInverse} />
          </TouchableOpacity>

          {/* Pilot Info */}
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View style={{
              borderRadius: 50,
              borderWidth: 3,
              borderColor: colors.textInverse,
              marginBottom: 16,
            }}>
              <Image
                source={{ uri: pilot.avatar }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 47,
                }}
              />
            </View>
            
            <Text style={[commonStyles.titleLarge, {
              color: colors.textInverse,
              fontSize: 28,
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: 8,
            }]}>
              {pilot.name}
            </Text>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              marginBottom: 8,
            }}>
              {renderStars(pilot.rating)}
              <Text style={[commonStyles.textMedium, {
                color: colors.textInverse,
                marginLeft: 8,
                fontWeight: '600',
                fontSize: 14,
              }]}>
                {pilot.rating}
              </Text>
            </View>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Icon name="location" size={16} color={colors.textInverse} />
              <Text style={[commonStyles.textMedium, {
                color: colors.textInverse,
                marginLeft: 6,
                fontSize: 14,
              }]}>
                {pilot.location} • {pilot.distance}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Stats */}
        <View style={{ paddingHorizontal: 20, marginTop: -20, zIndex: 1 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={[commonStyles.cardCompact, {
              flex: 1,
              alignItems: 'center',
              backgroundColor: colors.background,
              borderColor: colors.border,
            }]}>
              <Icon name="time" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitleMedium, {
                fontSize: 16,
                fontWeight: '700',
                color: colors.text,
                marginTop: 6,
                marginBottom: 2,
              }]}>
                {pilot.experience}
              </Text>
              <Text style={[commonStyles.textMuted, {
                color: colors.textLight,
                fontSize: 12,
              }]}>
                Experience
              </Text>
            </View>
            
            <View style={[commonStyles.cardCompact, {
              flex: 1,
              alignItems: 'center',
              backgroundColor: colors.background,
              borderColor: colors.border,
            }]}>
              <Icon name="airplane" size={20} color={colors.primary} />
              <Text style={[commonStyles.subtitleMedium, {
                fontSize: 16,
                fontWeight: '700',
                color: colors.text,
                marginTop: 6,
                marginBottom: 2,
              }]}>
                {pilot.aircraft}
              </Text>
              <Text style={[commonStyles.textMuted, {
                color: colors.textLight,
                fontSize: 12,
              }]}>
                Aircraft
              </Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 12,
          }]}>
            About {pilot.name.split(' ')[0]}
          </Text>
          <View style={[commonStyles.card, {
            backgroundColor: colors.backgroundAlt,
            borderColor: colors.border,
          }]}>
            <Text style={[commonStyles.text, {
              fontSize: 15,
              lineHeight: 22,
              color: colors.textLight,
            }]}>
              {pilot.bio}
            </Text>
          </View>
        </View>

        {/* Certifications */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 12,
          }]}>
            Certifications
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {pilot.certifications.map((cert, index) => (
              <View key={index} style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                ...shadows.small,
              }}>
                <Text style={[commonStyles.badgeText, {
                  color: colors.textInverse,
                  fontSize: 12,
                  fontWeight: '600',
                }]}>
                  {cert}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Specialties */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 12,
          }]}>
            Specialties
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {pilot.specialties.map((specialty, index) => (
              <View key={index} style={{
                backgroundColor: colors.secondary,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                ...shadows.small,
              }}>
                <Text style={[commonStyles.badgeText, {
                  color: colors.textInverse,
                  fontSize: 12,
                  fontWeight: '600',
                }]}>
                  {specialty}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Actions */}
        <View style={{ paddingHorizontal: 20, marginTop: 30, marginBottom: 40 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 16,
          }]}>
            Get in Touch
          </Text>
          
          <View style={{ gap: 12 }}>
            {/* Book Flight Button */}
            <Button
              text="Book a Flight"
              onPress={handleBookFlight}
              variant="gradient"
              size="large"
              icon={<Icon name="airplane" size={18} color={colors.textInverse} />}
            />
            
            {/* Contact Buttons */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                text="Call"
                onPress={() => handleContact('phone')}
                variant="secondary"
                style={{ flex: 1 }}
                icon={<Icon name="call" size={16} color={colors.textInverse} />}
              />
              <Button
                text="Email"
                onPress={() => handleContact('email')}
                variant="outline"
                style={{ flex: 1 }}
                icon={<Icon name="mail" size={16} color={colors.primary} />}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
