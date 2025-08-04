
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import FlightBooking from '../../components/FlightBooking';

// Mock data for pilot details
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
    bio: 'Commercial pilot with extensive experience in recreational flying. Love sharing the joy of aviation with fellow enthusiasts! I have been flying for over 15 years and have logged more than 5,000 flight hours across various aircraft types.',
    certifications: ['PPL', 'IFR', 'Commercial'],
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@flyencore.com',
    totalFlights: 1247,
    safetyScore: 9.8,
    responseTime: '< 2 hours',
    languages: ['English', 'Spanish'],
    specialties: ['Scenic Tours', 'Flight Training', 'Cross Country'],
    aircraftDetails: {
      model: 'Cessna 172',
      year: '2018',
      capacity: '3 passengers',
      equipment: ['GPS', 'Autopilot', 'Weather Radar'],
    },
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
    bio: 'Weekend warrior pilot who enjoys scenic flights and teaching others about aviation safety and techniques.',
    certifications: ['PPL', 'IFR'],
    phone: '+1 (555) 234-5678',
    email: 'mike.rodriguez@flyencore.com',
    totalFlights: 892,
    safetyScore: 9.5,
    responseTime: '< 4 hours',
    languages: ['English'],
    specialties: ['Scenic Tours', 'Photography Flights'],
    aircraftDetails: {
      model: 'Piper Cherokee',
      year: '2016',
      capacity: '3 passengers',
      equipment: ['GPS', 'Radio'],
    },
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
    bio: 'Aerobatic pilot and flight instructor. Always excited to share advanced flying techniques and aerobatic maneuvers.',
    certifications: ['PPL', 'IFR', 'CFI', 'Aerobatic'],
    phone: '+1 (555) 345-6789',
    email: 'emily.chen@flyencore.com',
    totalFlights: 1456,
    safetyScore: 9.9,
    responseTime: '< 1 hour',
    languages: ['English', 'Mandarin'],
    specialties: ['Aerobatic Training', 'Advanced Maneuvers', 'Flight Instruction'],
    aircraftDetails: {
      model: 'Cirrus SR22',
      year: '2020',
      capacity: '3 passengers',
      equipment: ['GPS', 'Autopilot', 'Parachute System', 'Weather Radar'],
    },
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
    bio: 'Retired airline pilot who loves sharing decades of aviation experience with fellow enthusiasts and new pilots.',
    certifications: ['PPL', 'IFR', 'Commercial', 'ATP'],
    phone: '+1 (555) 456-7890',
    email: 'david.thompson@flyencore.com',
    totalFlights: 2834,
    safetyScore: 9.9,
    responseTime: '< 30 minutes',
    languages: ['English', 'French'],
    specialties: ['Long Distance', 'Flight Training', 'Commercial Experience'],
    aircraftDetails: {
      model: 'Beechcraft Bonanza',
      year: '2019',
      capacity: '5 passengers',
      equipment: ['GPS', 'Autopilot', 'Weather Radar', 'TCAS'],
    },
  },
};

export default function PilotProfileScreen() {
  const { id } = useLocalSearchParams();
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const pilot = mockPilotData[id as keyof typeof mockPilotData];

  if (!pilot) {
    return (
      <View style={[commonStyles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={commonStyles.subtitle}>Pilot not found</Text>
        <Button text="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  const handleContact = (type: 'phone' | 'email') => {
    console.log('Contact pilot:', type, pilot.name);
    if (type === 'phone') {
      Linking.openURL(`tel:${pilot.phone}`);
    } else {
      Linking.openURL(`mailto:${pilot.email}`);
    }
  };

  const handleBookFlight = (flightType: string) => {
    console.log('Flight booked:', flightType, 'with', pilot.name);
    // Handle flight booking logic here
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={14} color={colors.primary} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={14} color={colors.primary} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-outline" size={14} color={colors.textMuted} />
      );
    }

    return stars;
  };

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header with Pilot Info */}
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[commonStyles.headerGradient, { paddingTop: 60, paddingBottom: 40 }]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 12,
                padding: 8,
                marginRight: 16,
              }}
            >
              <Icon name="arrow-back" size={24} color={colors.textInverse} />
            </TouchableOpacity>
            
            <Text style={[commonStyles.subtitleMedium, {
              fontSize: 18,
              fontWeight: '700',
              color: colors.textInverse,
            }]}>
              Pilot Profile
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: pilot.avatar }}
              style={[commonStyles.avatarLarge, {
                width: 120,
                height: 120,
                marginBottom: 16,
              }]}
            />
            
            <Text style={[commonStyles.titleLarge, {
              fontSize: 28,
              fontWeight: '800',
              color: colors.textInverse,
              textAlign: 'center',
              marginBottom: 8,
            }]}>
              {pilot.name}
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View style={[commonStyles.ratingContainer, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                <Icon name="star" size={16} color={colors.textInverse} />
                <Text style={[commonStyles.ratingText, { color: colors.textInverse }]}>
                  {pilot.rating}
                </Text>
              </View>
              
              <View style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                marginLeft: 12,
              }}>
                <Text style={[commonStyles.textMedium, {
                  color: colors.textInverse,
                  fontSize: 14,
                  fontWeight: '600',
                }]}>
                  {pilot.experience} experience
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
          <View style={[commonStyles.card, {
            backgroundColor: colors.background,
            borderColor: colors.primary,
            borderWidth: 2,
            ...shadows.orange,
          }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ alignItems: 'center', flex: 1 }}>
                <Icon name="airplane" size={24} color={colors.primary} />
                <Text style={[commonStyles.subtitleMedium, {
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.text,
                  marginTop: 8,
                  marginBottom: 4,
                }]}>
                  {pilot.totalFlights}
                </Text>
                <Text style={[commonStyles.textMuted, {
                  fontSize: 12,
                  color: colors.textLight,
                }]}>
                  Total Flights
                </Text>
              </View>

              <View style={{ alignItems: 'center', flex: 1 }}>
                <Icon name="shield-checkmark" size={24} color={colors.success} />
                <Text style={[commonStyles.subtitleMedium, {
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.text,
                  marginTop: 8,
                  marginBottom: 4,
                }]}>
                  {pilot.safetyScore}
                </Text>
                <Text style={[commonStyles.textMuted, {
                  fontSize: 12,
                  color: colors.textLight,
                }]}>
                  Safety Score
                </Text>
              </View>

              <View style={{ alignItems: 'center', flex: 1 }}>
                <Icon name="time" size={24} color={colors.warning} />
                <Text style={[commonStyles.subtitleMedium, {
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.text,
                  marginTop: 8,
                  marginBottom: 4,
                }]}>
                  {pilot.responseTime}
                </Text>
                <Text style={[commonStyles.textMuted, {
                  fontSize: 12,
                  color: colors.textLight,
                }]}>
                  Response Time
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bio Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 16,
          }]}>
            About
          </Text>
          
          <View style={[commonStyles.card, {
            backgroundColor: colors.backgroundAlt,
            borderColor: colors.border,
          }]}>
            <Text style={[commonStyles.text, {
              fontSize: 16,
              color: colors.text,
              lineHeight: 24,
              marginBottom: 16,
            }]}>
              {pilot.bio}
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {pilot.languages.map((language, index) => (
                <View key={index} style={[commonStyles.badge, {
                  backgroundColor: colors.surfaceAlt,
                  borderWidth: 1,
                  borderColor: colors.border,
                }]}>
                  <Text style={[commonStyles.badgeText, {
                    color: colors.text,
                    fontSize: 12,
                  }]}>
                    {language}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Aircraft Details */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 16,
          }]}>
            Aircraft Details
          </Text>
          
          <View style={[commonStyles.card, {
            backgroundColor: colors.background,
            borderColor: colors.border,
          }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <Icon name="airplane" size={24} color={colors.primary} />
              <Text style={[commonStyles.subtitleMedium, {
                fontSize: 18,
                fontWeight: '700',
                color: colors.text,
                marginLeft: 12,
              }]}>
                {pilot.aircraftDetails.model}
              </Text>
            </View>

            <View style={{ gap: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[commonStyles.textLight, { color: colors.textLight }]}>
                  Year
                </Text>
                <Text style={[commonStyles.textMedium, { color: colors.text }]}>
                  {pilot.aircraftDetails.year}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[commonStyles.textLight, { color: colors.textLight }]}>
                  Capacity
                </Text>
                <Text style={[commonStyles.textMedium, { color: colors.text }]}>
                  {pilot.aircraftDetails.capacity}
                </Text>
              </View>

              <View style={[commonStyles.divider, { marginVertical: 8 }]} />

              <Text style={[commonStyles.textLight, {
                color: colors.textLight,
                marginBottom: 8,
              }]}>
                Equipment
              </Text>
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {pilot.aircraftDetails.equipment.map((item, index) => (
                  <View key={index} style={[commonStyles.badge, {
                    backgroundColor: colors.primary,
                  }]}>
                    <Text style={[commonStyles.badgeText, {
                      color: colors.textInverse,
                      fontSize: 11,
                    }]}>
                      {item}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Certifications & Specialties */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 16,
          }]}>
            Certifications & Specialties
          </Text>
          
          <View style={[commonStyles.card, {
            backgroundColor: colors.background,
            borderColor: colors.border,
          }]}>
            <Text style={[commonStyles.textLight, {
              color: colors.textLight,
              marginBottom: 12,
            }]}>
              Certifications
            </Text>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {pilot.certifications.map((cert, index) => (
                <View key={index} style={[commonStyles.badge, {
                  backgroundColor: colors.success,
                }]}>
                  <Text style={[commonStyles.badgeText, {
                    color: colors.textInverse,
                    fontSize: 12,
                  }]}>
                    {cert}
                  </Text>
                </View>
              ))}
            </View>

            <Text style={[commonStyles.textLight, {
              color: colors.textLight,
              marginBottom: 12,
            }]}>
              Specialties
            </Text>
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {pilot.specialties.map((specialty, index) => (
                <View key={index} style={[commonStyles.badgeOutline, {
                  borderColor: colors.primary,
                }]}>
                  <Text style={[commonStyles.badgeTextDark, {
                    color: colors.primary,
                    fontSize: 12,
                  }]}>
                    {specialty}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Reviews Section */}
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 20,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 16,
          }]}>
            Recent Reviews
          </Text>
          
          <View style={[commonStyles.card, {
            backgroundColor: colors.backgroundAlt,
            borderColor: colors.border,
          }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {renderStars(pilot.rating)}
              </View>
              <Text style={[commonStyles.textMedium, {
                color: colors.text,
                marginLeft: 8,
                fontSize: 16,
                fontWeight: '600',
              }]}>
                {pilot.rating} out of 5
              </Text>
            </View>
            
            <Text style={[commonStyles.textLight, {
              color: colors.textLight,
              fontSize: 14,
              fontStyle: 'italic',
            }]}>
              "Excellent pilot with great communication skills. Made the flight experience memorable and safe!"
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        ...shadows.large,
      }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.surfaceAlt,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
              ...shadows.small,
            }}
            onPress={() => handleContact('phone')}
            activeOpacity={0.8}
          >
            <Icon name="call" size={24} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: colors.surfaceAlt,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: colors.border,
              ...shadows.small,
            }}
            onPress={() => handleContact('email')}
            activeOpacity={0.8}
          >
            <Icon name="mail" size={24} color={colors.primary} />
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Button
              text="Book Flight"
              onPress={() => setShowBookingModal(true)}
              variant="gradient"
              size="large"
            />
          </View>
        </View>
      </View>

      {/* Flight Booking Modal */}
      <FlightBooking
        visible={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        pilotName={pilot.name}
        onBookFlight={handleBookFlight}
      />
    </View>
  );
}
