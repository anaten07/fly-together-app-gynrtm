
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, buttonStyles, gradients, shadows } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

// Mock data for pilot details
const mockPilotDetails = {
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
    certifications: ['PPL', 'IFR', 'Commercial'],
    totalFlightHours: 3500,
    aircraftOwned: ['Cessna 172', 'Piper Cherokee'],
    preferredFlightTypes: ['Scenic Tours', 'Cross Country', 'Training Flights'],
    availability: 'Weekends and evenings',
    contactInfo: {
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@email.com',
    },
    reviews: [
      {
        id: '1',
        reviewer: 'John D.',
        rating: 5,
        comment: 'Amazing flight experience! Sarah is very professional and made me feel safe throughout the entire flight.',
        date: '2024-01-15',
      },
      {
        id: '2',
        reviewer: 'Lisa M.',
        rating: 5,
        comment: 'Great instructor and pilot. Learned so much during our flight together.',
        date: '2024-01-10',
      },
    ],
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
    bio: 'Weekend warrior pilot who enjoys scenic flights and teaching others about aviation. Always looking for flying companions for weekend adventures.',
    certifications: ['PPL', 'IFR'],
    totalFlightHours: 1200,
    aircraftOwned: ['Piper Cherokee'],
    preferredFlightTypes: ['Scenic Tours', 'Weekend Trips'],
    availability: 'Weekends',
    contactInfo: {
      phone: '+1 (555) 234-5678',
      email: 'mike.rodriguez@email.com',
    },
    reviews: [
      {
        id: '1',
        reviewer: 'Emma S.',
        rating: 5,
        comment: 'Fantastic pilot and great company. The scenic flight was breathtaking!',
        date: '2024-01-12',
      },
    ],
  },
  '3': {
    id: '3',
    name: 'Emily Chen',
    experience: '12 years',
    aircraft: 'Cirrus SR22',
    location: 'San Jose, CA',
    rating: 4.8,
    distance: '8.7 miles',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    bio: 'Aerobatic pilot and flight instructor. Always excited to share advanced flying techniques and the thrill of aerobatic maneuvers.',
    certifications: ['PPL', 'IFR', 'CFI', 'Aerobatic'],
    totalFlightHours: 2800,
    aircraftOwned: ['Cirrus SR22', 'Extra 300'],
    preferredFlightTypes: ['Aerobatic', 'Training Flights', 'Cross Country'],
    availability: 'Flexible schedule',
    contactInfo: {
      phone: '+1 (555) 345-6789',
      email: 'emily.chen@email.com',
    },
    reviews: [
      {
        id: '1',
        reviewer: 'David K.',
        rating: 5,
        comment: 'Emily is an exceptional instructor. Her aerobatic skills are impressive!',
        date: '2024-01-14',
      },
      {
        id: '2',
        reviewer: 'Rachel T.',
        rating: 4,
        comment: 'Great experience learning advanced techniques. Very knowledgeable.',
        date: '2024-01-08',
      },
    ],
  },
  '4': {
    id: '4',
    name: 'David Thompson',
    experience: '20 years',
    aircraft: 'Beechcraft Bonanza',
    location: 'Palo Alto, CA',
    rating: 4.9,
    distance: '12.4 miles',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    bio: 'Retired airline pilot who loves sharing decades of aviation experience with fellow enthusiasts.',
    certifications: ['PPL', 'IFR', 'Commercial', 'ATP'],
    totalFlightHours: 15000,
    aircraftOwned: ['Beechcraft Bonanza'],
    preferredFlightTypes: ['Cross Country', 'Training Flights', 'Scenic Tours'],
    availability: 'Flexible schedule',
    contactInfo: {
      phone: '+1 (555) 456-7890',
      email: 'david.thompson@email.com',
    },
    reviews: [
      {
        id: '1',
        reviewer: 'Mark S.',
        rating: 5,
        comment: 'Incredible experience with a true aviation professional. Highly recommended!',
        date: '2024-01-16',
      },
    ],
  },
};

export default function PilotProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pilot = mockPilotDetails[id as keyof typeof mockPilotDetails];

  if (!pilot) {
    return (
      <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Icon name="person-circle-outline" size={80} color={colors.textMuted} />
        <Text style={[commonStyles.title, { color: colors.textMuted, marginTop: 20 }]}>
          Pilot not found
        </Text>
        <Button
          text="Go Back"
          onPress={() => router.back()}
          variant="outline"
          style={{ marginTop: 20, width: 200 }}
        />
      </View>
    );
  }

  const handleContact = (type: 'phone' | 'email') => {
    console.log(`Contacting pilot via ${type}`);
    if (type === 'phone') {
      Linking.openURL(`tel:${pilot.contactInfo.phone}`);
    } else {
      Linking.openURL(`mailto:${pilot.contactInfo.email}`);
    }
  };

  const handleBookFlight = () => {
    console.log('Booking flight with pilot:', pilot.name);
    // In a real app, this would navigate to a booking screen
    alert('Booking feature coming soon!');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={colors.accent}
        />
      );
    }
    return stars;
  };

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header with gradient background */}
      <LinearGradient
        colors={gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 50,
          paddingBottom: 30,
          paddingHorizontal: 20,
        }}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
        }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              padding: 12,
              borderRadius: 25,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              marginRight: 15,
            }}
          >
            <Icon name="chevron-back" size={24} color={colors.background} />
          </TouchableOpacity>
          <Text style={[commonStyles.subtitle, { flex: 1, color: colors.background }]}>
            Pilot Profile
          </Text>
          <TouchableOpacity
            style={{
              padding: 12,
              borderRadius: 25,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          >
            <Icon name="heart-outline" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>

        {/* Profile Header */}
        <View style={{ alignItems: 'center' }}>
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: pilot.avatar }}
              style={[
                {
                  width: 140,
                  height: 140,
                  borderRadius: 70,
                  marginBottom: 16,
                },
                commonStyles.avatarLarge
              ]}
            />
            {/* Verified badge */}
            <View style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              backgroundColor: colors.success,
              borderRadius: 15,
              padding: 6,
              borderWidth: 3,
              borderColor: colors.background,
            }}>
              <Icon name="checkmark" size={16} color={colors.background} />
            </View>
          </View>
          
          <Text style={[commonStyles.title, { color: colors.background, marginBottom: 8 }]}>
            {pilot.name}
          </Text>
          
          <View style={commonStyles.ratingContainer}>
            <Icon name="star" size={18} color={colors.success} />
            <Text style={[commonStyles.ratingText, { fontSize: 16 }]}>
              {pilot.rating}
            </Text>
            <Text style={[commonStyles.textLight, { color: colors.background, opacity: 0.8, marginLeft: 8 }]}>
              ({pilot.reviews.length} reviews)
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Icon name="location" size={18} color={colors.background} />
            <Text style={[commonStyles.text, { color: colors.background, marginLeft: 6, opacity: 0.9 }]}>
              {pilot.distance} • {pilot.location}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1, marginTop: -20 }} showsVerticalScrollIndicator={false}>
        {/* Bio Card */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={[commonStyles.cardElevated, { marginTop: 20 }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>About</Text>
            <Text style={[commonStyles.text, { lineHeight: 24 }]}>{pilot.bio}</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={commonStyles.cardElevated}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Quick Stats</Text>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Icon name="time" size={24} color={colors.primary} backgroundColor={colors.surfaceAlt} padding={8} />
                <Text style={[commonStyles.subtitleMedium, { marginTop: 8, marginBottom: 4 }]}>
                  {pilot.experience}
                </Text>
                <Text style={commonStyles.textMuted}>Experience</Text>
              </View>
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Icon name="airplane" size={24} color={colors.secondary} backgroundColor={colors.surfaceAlt} padding={8} />
                <Text style={[commonStyles.subtitleMedium, { marginTop: 8, marginBottom: 4 }]}>
                  {pilot.totalFlightHours.toLocaleString()}
                </Text>
                <Text style={commonStyles.textMuted}>Flight Hours</Text>
              </View>
              
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Icon name="calendar" size={24} color={colors.accent} backgroundColor={colors.surfaceAlt} padding={8} />
                <Text style={[commonStyles.subtitleMedium, { marginTop: 8, marginBottom: 4 }]}>
                  Available
                </Text>
                <Text style={commonStyles.textMuted}>{pilot.availability}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Certifications */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={commonStyles.cardElevated}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Certifications</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {pilot.certifications.map((cert, index) => (
                <View key={index} style={[
                  commonStyles.badge, 
                  { 
                    marginRight: 8, 
                    marginBottom: 8,
                    backgroundColor: index % 3 === 0 ? colors.primary : 
                                   index % 3 === 1 ? colors.secondary : colors.accent,
                  }
                ]}>
                  <Text style={commonStyles.badgeText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Aircraft */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={commonStyles.cardElevated}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Aircraft Fleet</Text>
            {pilot.aircraftOwned.map((aircraft, index) => (
              <View key={index} style={[
                { 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor: colors.surfaceAlt,
                  borderRadius: 12,
                  marginBottom: 8,
                }
              ]}>
                <Icon name="airplane" size={20} color={colors.primary} />
                <Text style={[commonStyles.textMedium, { marginLeft: 12, flex: 1 }]}>{aircraft}</Text>
                <Icon name="chevron-forward" size={16} color={colors.textMuted} />
              </View>
            ))}
          </View>
        </View>

        {/* Preferred Flight Types */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={commonStyles.cardElevated}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Specialties</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {pilot.preferredFlightTypes.map((type, index) => (
                <View key={index} style={[
                  commonStyles.badgeOutline, 
                  { 
                    marginRight: 8,
                    marginBottom: 8,
                    borderColor: colors.primary,
                  }
                ]}>
                  <Text style={[commonStyles.badgeTextDark, { color: colors.primary }]}>{type}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Reviews */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={commonStyles.cardElevated}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
              Reviews ({pilot.reviews.length})
            </Text>
            {pilot.reviews.map((review) => (
              <View key={review.id} style={[
                {
                  backgroundColor: colors.surfaceAlt,
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 12,
                }
              ]}>
                <View style={[commonStyles.row, { marginBottom: 8 }]}>
                  <Text style={[commonStyles.textMedium, { fontWeight: '600' }]}>{review.reviewer}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {renderStars(review.rating)}
                  </View>
                </View>
                <Text style={[commonStyles.text, { marginBottom: 8, lineHeight: 22 }]}>{review.comment}</Text>
                <Text style={commonStyles.textMuted}>{review.date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Buttons */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 40 }}>
          <Button
            text="Book a Flight ✈️"
            onPress={handleBookFlight}
            variant="gradient"
            size="large"
            style={{ marginBottom: 12 }}
          />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Button
              text="Call"
              onPress={() => handleContact('phone')}
              variant="secondary"
              style={{ flex: 1 }}
              icon={<Icon name="call" size={18} color={colors.background} />}
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
      </ScrollView>
    </View>
  );
}
