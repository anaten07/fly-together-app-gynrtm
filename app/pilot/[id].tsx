
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
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
};

export default function PilotProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const pilot = mockPilotDetails[id as keyof typeof mockPilotDetails];

  if (!pilot) {
    return (
      <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={commonStyles.title}>Pilot not found</Text>
        <Button
          text="Go Back"
          onPress={() => router.back()}
          style={buttonStyles.backButton}
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

  return (
    <View style={commonStyles.container}>
      {/* Header with back button */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 10,
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: colors.backgroundAlt,
            marginRight: 15,
          }}
        >
          <Icon name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={[commonStyles.subtitle, { flex: 1 }]}>Pilot Profile</Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Image
            source={{ uri: pilot.avatar }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 15,
            }}
          />
          <Text style={commonStyles.title}>{pilot.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
            <Icon name="star" size={18} />
            <Text style={[commonStyles.text, { marginLeft: 5 }]}>
              {pilot.rating} ({pilot.reviews.length} reviews)
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Icon name="location" size={18} />
            <Text style={[commonStyles.textLight, { marginLeft: 5 }]}>
              {pilot.distance} • {pilot.location}
            </Text>
          </View>
        </View>

        {/* Bio */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={commonStyles.subtitle}>About</Text>
          <Text style={[commonStyles.text, { lineHeight: 22 }]}>{pilot.bio}</Text>
        </View>

        {/* Flight Details */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={commonStyles.card}>
            <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Flight Details</Text>
            
            <View style={[commonStyles.row, { marginBottom: 10 }]}>
              <Text style={commonStyles.textLight}>Experience:</Text>
              <Text style={commonStyles.text}>{pilot.experience}</Text>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 10 }]}>
              <Text style={commonStyles.textLight}>Total Flight Hours:</Text>
              <Text style={commonStyles.text}>{pilot.totalFlightHours.toLocaleString()}</Text>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 10 }]}>
              <Text style={commonStyles.textLight}>Availability:</Text>
              <Text style={commonStyles.text}>{pilot.availability}</Text>
            </View>
            
            <View style={{ marginTop: 10 }}>
              <Text style={[commonStyles.textLight, { marginBottom: 8 }]}>Certifications:</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {pilot.certifications.map((cert, index) => (
                  <View key={index} style={[commonStyles.badge, { marginRight: 5, marginBottom: 5 }]}>
                    <Text style={commonStyles.badgeText}>{cert}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Aircraft */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={commonStyles.card}>
            <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Aircraft</Text>
            {pilot.aircraftOwned.map((aircraft, index) => (
              <View key={index} style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="airplane" size={18} />
                <Text style={[commonStyles.text, { marginLeft: 10 }]}>{aircraft}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Preferred Flight Types */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={commonStyles.card}>
            <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Preferred Flight Types</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {pilot.preferredFlightTypes.map((type, index) => (
                <View key={index} style={[commonStyles.badge, { 
                  backgroundColor: colors.backgroundAlt,
                  marginRight: 5,
                  marginBottom: 5,
                }]}>
                  <Text style={[commonStyles.badgeText, { color: colors.text }]}>{type}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Reviews */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 15 }]}>Reviews</Text>
          {pilot.reviews.map((review) => (
            <View key={review.id} style={[commonStyles.card, { marginBottom: 10 }]}>
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>{review.reviewer}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="star" size={16} />
                  <Text style={[commonStyles.textLight, { marginLeft: 4 }]}>{review.rating}</Text>
                </View>
              </View>
              <Text style={[commonStyles.text, { marginBottom: 8 }]}>{review.comment}</Text>
              <Text style={commonStyles.textLight}>{review.date}</Text>
            </View>
          ))}
        </View>

        {/* Contact Buttons */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 30 }}>
          <Button
            text="Book a Flight"
            onPress={handleBookFlight}
            style={[buttonStyles.primary, { marginBottom: 10 }]}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button
              text="Call"
              onPress={() => handleContact('phone')}
              style={[buttonStyles.secondary, { flex: 1 }]}
            />
            <Button
              text="Email"
              onPress={() => handleContact('email')}
              style={[buttonStyles.secondary, { flex: 1 }]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
