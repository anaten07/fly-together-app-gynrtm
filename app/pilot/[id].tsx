
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
import { commonStyles, colors, buttonStyles, gradients, shadows } from '../../styles/commonStyles';
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
    bio: 'Commercial pilot with extensive experience in recreational flying. I love sharing the joy of aviation with fellow enthusiasts and helping new pilots build confidence in the cockpit. My passion for flying started 20 years ago, and I&apos;ve been fortunate to explore some of the most beautiful landscapes from above.',
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
    bio: 'Weekend warrior pilot who enjoys scenic flights and teaching others about aviation. Flying is my escape from the busy tech world, and I love sharing that peaceful experience with others.',
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
        <Icon key={i} name="star" size={18} color={colors.primary} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={18} color={colors.primary} />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-outline" size={18} color={colors.textMuted} />
      );
    }

    return stars;
  };

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Enhanced Header with Black & Orange Design */}
        <LinearGradient
          colors={['#000000', '#1A1A1A', '#FF6B35']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[commonStyles.headerGradient, { paddingTop: 60, paddingBottom: 40 }]}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 50,
              left: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              padding: 12,
              borderWidth: 1,
              borderColor: 'rgba(255, 107, 53, 0.3)',
              ...shadows.medium,
            }}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color={colors.textInverse} />
          </TouchableOpacity>

          {/* Pilot Avatar and Basic Info */}
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View style={{
              borderRadius: 60,
              borderWidth: 4,
              borderColor: colors.primary,
              ...shadows.orange,
              marginBottom: 20,
            }}>
              <Image
                source={{ uri: pilot.avatar }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 56,
                }}
              />
            </View>
            
            <Text style={[commonStyles.titleLarge, {
              color: colors.textInverse,
              fontSize: 32,
              fontWeight: '900',
              textAlign: 'center',
              marginBottom: 8,
            }]}>
              {pilot.name}
            </Text>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.primary,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              marginBottom: 12,
              ...shadows.orange,
            }}>
              {renderStars(pilot.rating)}
              <Text style={[commonStyles.textMedium, {
                color: colors.textInverse,
                marginLeft: 8,
                fontWeight: '800',
                fontSize: 16,
              }]}>
                {pilot.rating} Rating
              </Text>
            </View>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}>
              <Icon name="location" size={18} color={colors.textInverse} />
              <Text style={[commonStyles.textMedium, {
                color: colors.textInverse,
                marginLeft: 8,
                fontWeight: '600',
              }]}>
                {pilot.location} • {pilot.distance}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Stats Cards */}
        <View style={{ paddingHorizontal: 20, marginTop: -25, zIndex: 1 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={[commonStyles.cardCompact, {
              flex: 1,
              alignItems: 'center',
              backgroundColor: colors.background,
              borderWidth: 2,
              borderColor: colors.border,
              ...shadows.medium,
            }]}>
              <Icon name="time" size={24} color={colors.primary} />
              <Text style={[commonStyles.subtitleMedium, {
                fontSize: 18,
                fontWeight: '800',
                color: colors.text,
                marginTop: 8,
                marginBottom: 4,
              }]}>
                {pilot.experience}
              </Text>
              <Text style={[commonStyles.textMuted, {
                color: colors.textLight,
                fontWeight: '600',
              }]}>
                Experience
              </Text>
            </View>
            
            <View style={[commonStyles.cardCompact, {
              flex: 1,
              alignItems: 'center',
              backgroundColor: colors.background,
              borderWidth: 2,
              borderColor: colors.border,
              ...shadows.medium,
            }]}>
              <Icon name="airplane" size={24} color={colors.primary} />
              <Text style={[commonStyles.subtitleMedium, {
                fontSize: 18,
                fontWeight: '800',
                color: colors.text,
                marginTop: 8,
                marginBottom: 4,
              }]}>
                {pilot.aircraft}
              </Text>
              <Text style={[commonStyles.textMuted, {
                color: colors.textLight,
                fontWeight: '600',
              }]}>
                Aircraft
              </Text>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 24,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 16,
          }]}>
            About {pilot.name.split(' ')[0]}
          </Text>
          <View style={[commonStyles.card, {
            backgroundColor: colors.backgroundAlt,
            borderWidth: 1,
            borderColor: colors.border,
          }]}>
            <Text style={[commonStyles.text, {
              fontSize: 16,
              lineHeight: 26,
              color: colors.textLight,
              fontWeight: '500',
            }]}>
              {pilot.bio}
            </Text>
          </View>
        </View>

        {/* Certifications */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 20,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 16,
          }]}>
            Certifications
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {pilot.certifications.map((cert, index) => (
              <View key={index} style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 20,
                ...shadows.orange,
              }}>
                <Text style={[commonStyles.badgeText, {
                  color: colors.textInverse,
                  fontSize: 14,
                  fontWeight: '700',
                }]}>
                  {cert}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Specialties */}
        <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 20,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 16,
          }]}>
            Specialties
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {pilot.specialties.map((specialty, index) => (
              <View key={index} style={{
                backgroundColor: colors.secondary,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 20,
                ...shadows.medium,
              }}>
                <Text style={[commonStyles.badgeText, {
                  color: colors.textInverse,
                  fontSize: 14,
                  fontWeight: '700',
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
            fontSize: 20,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 20,
          }]}>
            Get in Touch
          </Text>
          
          <View style={{ gap: 16 }}>
            {/* Book Flight Button */}
            <Button
              text="Book a Flight"
              onPress={handleBookFlight}
              variant="gradient"
              size="large"
              icon={<Icon name="airplane" size={20} color={colors.textInverse} />}
              style={{ ...shadows.orange }}
            />
            
            {/* Contact Buttons */}
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button
                text="Call"
                onPress={() => handleContact('phone')}
                variant="secondary"
                style={{ flex: 1 }}
                icon={<Icon name="call" size={18} color={colors.textInverse} />}
              />
              <Button
                text="Email"
                onPress={() => handleContact('email')}
                variant="outline"
                style={{ flex: 1 }}
                icon={<Icon name="mail" size={18} color={colors.primary} />}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
