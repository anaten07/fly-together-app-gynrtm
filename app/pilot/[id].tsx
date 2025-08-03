
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
    bio: 'Commercial pilot with extensive experience in recreational flying. I love sharing the joy of aviation with fellow enthusiasts and helping new pilots build confidence in the cockpit.',
    certifications: ['PPL', 'IFR', 'Commercial'],
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@flyencore.com',
    totalFlights: 2847,
    safetyRecord: '100%',
    languages: ['English', 'Spanish'],
    specialties: ['Scenic Tours', 'Flight Training', 'Cross Country'],
    aircraftDetails: {
      model: 'Cessna 172 Skyhawk',
      year: '2018',
      registration: 'N172SJ',
      features: ['GPS Navigation', 'Glass Cockpit', 'Autopilot'],
    },
    reviews: [
      {
        id: '1',
        author: 'Mike Chen',
        rating: 5,
        comment: 'Amazing flight over the Golden Gate! Sarah is an excellent pilot and great company.',
        date: '2024-01-15',
      },
      {
        id: '2',
        author: 'Lisa Rodriguez',
        rating: 5,
        comment: 'Professional, safe, and fun. Highly recommend for anyone wanting to experience flying.',
        date: '2024-01-10',
      },
    ],
  },
  // Add other pilots as needed
};

export default function PilotProfileScreen() {
  const { id } = useLocalSearchParams();
  const pilot = mockPilotData[id as string] || mockPilotData['1'];

  const handleContact = (type: 'phone' | 'email') => {
    if (type === 'phone') {
      Linking.openURL(`tel:${pilot.phone}`);
    } else {
      Linking.openURL(`mailto:${pilot.email}`);
    }
  };

  const handleBookFlight = () => {
    console.log('Booking flight with pilot:', pilot.name);
    // In a real app, this would navigate to a booking screen
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={16} color={colors.accent} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={16} color={colors.accent} />
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
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Enhanced Header with Gradient */}
        <LinearGradient
          colors={['#667eea', '#764ba2', '#5441cc']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingTop: 60, paddingBottom: 40, paddingHorizontal: 20 }}
        >
          {/* Back Button */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 60,
              left: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              borderRadius: 25,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              ...shadows.medium,
            }}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color={colors.background} />
          </TouchableOpacity>

          {/* Pilot Header Info */}
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <View style={{
              borderRadius: 75,
              borderWidth: 4,
              borderColor: colors.background,
              ...shadows.large,
              marginBottom: 16,
            }}>
              <Image
                source={{ uri: pilot.avatar }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 70,
                }}
              />
            </View>
            
            <Text style={[commonStyles.titleLarge, {
              color: colors.background,
              fontSize: 28,
              fontWeight: '800',
              textAlign: 'center',
              marginBottom: 8,
              textShadowColor: 'rgba(0,0,0,0.3)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }]}>
              {pilot.name}
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              {renderStars(pilot.rating)}
              <Text style={{
                color: colors.background,
                fontSize: 16,
                fontWeight: '700',
                marginLeft: 8,
                textShadowColor: 'rgba(0,0,0,0.2)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}>
                {pilot.rating}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="location" size={16} color={colors.background} />
              <Text style={{
                color: colors.background,
                fontSize: 16,
                fontWeight: '600',
                marginLeft: 6,
                opacity: 0.9,
              }}>
                {pilot.location} • {pilot.distance}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Stats Cards */}
        <View style={{ paddingHorizontal: 20, marginTop: -20, zIndex: 1 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={[commonStyles.cardCompact, { flex: 1, alignItems: 'center', ...shadows.large }]}>
              <Text style={[commonStyles.subtitleMedium, { fontSize: 20, fontWeight: '800', color: colors.primary }]}>
                {pilot.experience}
              </Text>
              <Text style={[commonStyles.textMuted, { fontWeight: '600' }]}>Experience</Text>
            </View>
            
            <View style={[commonStyles.cardCompact, { flex: 1, alignItems: 'center', ...shadows.large }]}>
              <Text style={[commonStyles.subtitleMedium, { fontSize: 20, fontWeight: '800', color: colors.secondary }]}>
                {pilot.totalFlights}
              </Text>
              <Text style={[commonStyles.textMuted, { fontWeight: '600' }]}>Total Flights</Text>
            </View>
            
            <View style={[commonStyles.cardCompact, { flex: 1, alignItems: 'center', ...shadows.large }]}>
              <Text style={[commonStyles.subtitleMedium, { fontSize: 20, fontWeight: '800', color: colors.success }]}>
                {pilot.safetyRecord}
              </Text>
              <Text style={[commonStyles.textMuted, { fontWeight: '600' }]}>Safety</Text>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 25 }}>
          <View style={[commonStyles.cardElevated, { ...shadows.large }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16, fontSize: 20, fontWeight: '700' }]}>
              About {pilot.name.split(' ')[0]}
            </Text>
            <Text style={[commonStyles.text, { lineHeight: 26, fontSize: 16 }]}>
              {pilot.bio}
            </Text>
          </View>
        </View>

        {/* Aircraft Details */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={[commonStyles.cardElevated, { ...shadows.large }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16, fontSize: 20, fontWeight: '700' }]}>
              Aircraft Details
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Icon name="airplane" size={24} color={colors.primary} backgroundColor={colors.surfaceAlt} padding={8} />
              <View style={{ marginLeft: 16, flex: 1 }}>
                <Text style={[commonStyles.textMedium, { fontSize: 18, fontWeight: '600' }]}>
                  {pilot.aircraftDetails.model}
                </Text>
                <Text style={[commonStyles.textLight, { fontSize: 14 }]}>
                  {pilot.aircraftDetails.year} • {pilot.aircraftDetails.registration}
                </Text>
              </View>
            </View>

            <Text style={[commonStyles.textMedium, { marginBottom: 12, fontWeight: '600' }]}>
              Features:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {pilot.aircraftDetails.features.map((feature, index) => (
                <View key={index} style={[commonStyles.badge, { backgroundColor: colors.surfaceAlt }]}>
                  <Text style={[commonStyles.badgeText, { color: colors.text, fontSize: 12 }]}>
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Certifications & Specialties */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={[commonStyles.cardElevated, { ...shadows.large }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16, fontSize: 20, fontWeight: '700' }]}>
              Certifications & Specialties
            </Text>
            
            <Text style={[commonStyles.textMedium, { marginBottom: 12, fontWeight: '600' }]}>
              Certifications:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {pilot.certifications.map((cert, index) => (
                <View key={index} style={[commonStyles.badge, { backgroundColor: colors.primary }]}>
                  <Text style={[commonStyles.badgeText, { fontSize: 12 }]}>
                    {cert}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={[commonStyles.textMedium, { marginBottom: 12, fontWeight: '600' }]}>
              Specialties:
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {pilot.specialties.map((specialty, index) => (
                <View key={index} style={[commonStyles.badge, { backgroundColor: colors.secondary }]}>
                  <Text style={[commonStyles.badgeText, { fontSize: 12 }]}>
                    {specialty}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <View style={[commonStyles.cardElevated, { ...shadows.large }]}>
            <Text style={[commonStyles.subtitle, { marginBottom: 16, fontSize: 20, fontWeight: '700' }]}>
              Recent Reviews
            </Text>
            
            {pilot.reviews.map((review) => (
              <View key={review.id} style={{ marginBottom: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: colors.borderLight }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <Text style={[commonStyles.textMedium, { fontWeight: '600', flex: 1 }]}>
                    {review.author}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    {renderStars(review.rating)}
                  </View>
                </View>
                <Text style={[commonStyles.text, { lineHeight: 22, marginBottom: 8 }]}>
                  {review.comment}
                </Text>
                <Text style={[commonStyles.textMuted, { fontSize: 12 }]}>
                  {new Date(review.date).toLocaleDateString()}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Buttons */}
        <View style={{ paddingHorizontal: 20, marginTop: 20, paddingBottom: 40 }}>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <Button
              text="Call"
              onPress={() => handleContact('phone')}
              variant="outline"
              style={{ flex: 1 }}
              icon={<Icon name="call" size={20} color={colors.primary} />}
              iconPosition="left"
            />
            <Button
              text="Email"
              onPress={() => handleContact('email')}
              variant="ghost"
              style={{ flex: 1 }}
              icon={<Icon name="mail" size={20} color={colors.text} />}
              iconPosition="left"
            />
          </View>
          
          <Button
            text="Book Flight Experience"
            onPress={handleBookFlight}
            variant="gradient"
            size="large"
            icon={<Icon name="airplane" size={24} color={colors.background} />}
            iconPosition="left"
          />
        </View>
      </ScrollView>
    </View>
  );
}
