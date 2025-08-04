
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';
import Button from './Button';
import { commonStyles, colors, shadows } from '../styles/commonStyles';

interface FlightType {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  icon: string;
  popular?: boolean;
}

const flightTypes: FlightType[] = [
  {
    id: 'scenic',
    title: 'Scenic Tour',
    description: 'Beautiful aerial views of the Bay Area',
    duration: '45 min',
    price: '$299',
    icon: 'camera',
    popular: true,
  },
  {
    id: 'training',
    title: 'Flight Training',
    description: 'Learn to fly with certified instructors',
    duration: '60 min',
    price: '$399',
    icon: 'school',
  },
  {
    id: 'transport',
    title: 'Point-to-Point',
    description: 'Fast travel between destinations',
    duration: '30 min',
    price: '$499',
    icon: 'navigate',
  },
  {
    id: 'aerobatic',
    title: 'Aerobatic Experience',
    description: 'Thrilling aerobatic maneuvers',
    duration: '30 min',
    price: '$599',
    icon: 'refresh',
  },
];

interface FlightBookingProps {
  visible: boolean;
  onClose: () => void;
  pilotName: string;
  onBookFlight: (flightType: string) => void;
}

export default function FlightBooking({ visible, onClose, pilotName, onBookFlight }: FlightBookingProps) {
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [showInsurance, setShowInsurance] = useState(false);

  const handleBookFlight = () => {
    if (selectedFlight) {
      console.log('Booking flight:', selectedFlight);
      onBookFlight(selectedFlight);
      onClose();
    }
  };

  const renderFlightType = (flight: FlightType) => (
    <TouchableOpacity
      key={flight.id}
      style={[
        {
          backgroundColor: selectedFlight === flight.id ? colors.primary : colors.background,
          borderRadius: 16,
          padding: 20,
          marginVertical: 8,
          borderWidth: 2,
          borderColor: selectedFlight === flight.id ? colors.primary : colors.border,
          ...shadows.medium,
        }
      ]}
      onPress={() => setSelectedFlight(flight.id)}
      activeOpacity={0.8}
    >
      {flight.popular && (
        <View style={{
          position: 'absolute',
          top: -1,
          right: -1,
          backgroundColor: colors.accent,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderTopRightRadius: 16,
          borderBottomLeftRadius: 12,
          ...shadows.small,
        }}>
          <Text style={[commonStyles.textMuted, {
            color: colors.textInverse,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.5,
          }]}>
            POPULAR
          </Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          backgroundColor: selectedFlight === flight.id ? 'rgba(255, 255, 255, 0.2)' : `${colors.primary}15`,
          borderRadius: 12,
          padding: 12,
          marginRight: 16,
        }}>
          <Icon 
            name={flight.icon as any} 
            size={24} 
            color={selectedFlight === flight.id ? colors.textInverse : colors.primary} 
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[commonStyles.subtitleMedium, {
            fontSize: 16,
            fontWeight: '700',
            color: selectedFlight === flight.id ? colors.textInverse : colors.text,
            marginBottom: 4,
          }]}>
            {flight.title}
          </Text>
          
          <Text style={[commonStyles.textLight, {
            fontSize: 13,
            color: selectedFlight === flight.id ? 'rgba(255, 255, 255, 0.8)' : colors.textLight,
            marginBottom: 8,
          }]}>
            {flight.description}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{
              backgroundColor: selectedFlight === flight.id ? 'rgba(255, 255, 255, 0.2)' : colors.surfaceAlt,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              marginRight: 8,
            }}>
              <Text style={[commonStyles.textMuted, {
                fontSize: 11,
                fontWeight: '600',
                color: selectedFlight === flight.id ? colors.textInverse : colors.text,
              }]}>
                {flight.duration}
              </Text>
            </View>

            <Text style={[commonStyles.subtitleMedium, {
              fontSize: 16,
              fontWeight: '800',
              color: selectedFlight === flight.id ? colors.textInverse : colors.primary,
            }]}>
              {flight.price}
            </Text>
          </View>
        </View>

        <View style={{
          backgroundColor: selectedFlight === flight.id ? 'rgba(255, 255, 255, 0.2)' : colors.surfaceAlt,
          borderRadius: 12,
          padding: 8,
        }}>
          <Icon 
            name={selectedFlight === flight.id ? 'checkmark' : 'add'} 
            size={16} 
            color={selectedFlight === flight.id ? colors.textInverse : colors.text} 
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[commonStyles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[commonStyles.headerGradient, { paddingTop: 60, paddingBottom: 30 }]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 12,
                padding: 8,
              }}
            >
              <Icon name="close" size={24} color={colors.textInverse} />
            </TouchableOpacity>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={[commonStyles.subtitleMedium, {
                fontSize: 20,
                fontWeight: '800',
                color: colors.textInverse,
                textAlign: 'center',
              }]}>
                Book Flight
              </Text>
              <Text style={[commonStyles.textLight, {
                fontSize: 14,
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
              }]}>
                with {pilotName}
              </Text>
            </View>

            <View style={{ width: 40 }} />
          </View>
        </LinearGradient>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {/* Flight Types */}
          <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
            <Text style={[commonStyles.subtitle, {
              fontSize: 18,
              fontWeight: '700',
              color: colors.text,
              marginBottom: 16,
            }]}>
              Choose Your Flight Experience
            </Text>

            {flightTypes.map(renderFlightType)}
          </View>

          {/* Insurance Option */}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: showInsurance ? colors.primary : colors.background,
                  borderRadius: 16,
                  padding: 20,
                  borderWidth: 2,
                  borderColor: showInsurance ? colors.primary : colors.border,
                  ...shadows.medium,
                }
              ]}
              onPress={() => setShowInsurance(!showInsurance)}
              activeOpacity={0.8}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: showInsurance ? 'rgba(255, 255, 255, 0.2)' : `${colors.warning}15`,
                  borderRadius: 12,
                  padding: 12,
                  marginRight: 16,
                }}>
                  <Icon 
                    name="umbrella" 
                    size={24} 
                    color={showInsurance ? colors.textInverse : colors.warning} 
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={[commonStyles.subtitleMedium, {
                    fontSize: 16,
                    fontWeight: '700',
                    color: showInsurance ? colors.textInverse : colors.text,
                    marginBottom: 4,
                  }]}>
                    Flight Insurance
                  </Text>
                  
                  <Text style={[commonStyles.textLight, {
                    fontSize: 13,
                    color: showInsurance ? 'rgba(255, 255, 255, 0.8)' : colors.textLight,
                    marginBottom: 8,
                  }]}>
                    Comprehensive coverage for peace of mind
                  </Text>

                  <Text style={[commonStyles.subtitleMedium, {
                    fontSize: 14,
                    fontWeight: '700',
                    color: showInsurance ? colors.textInverse : colors.warning,
                  }]}>
                    +$29
                  </Text>
                </View>

                <View style={{
                  backgroundColor: showInsurance ? 'rgba(255, 255, 255, 0.2)' : colors.surfaceAlt,
                  borderRadius: 12,
                  padding: 8,
                }}>
                  <Icon 
                    name={showInsurance ? 'checkmark' : 'add'} 
                    size={16} 
                    color={showInsurance ? colors.textInverse : colors.text} 
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Safety Features */}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text style={[commonStyles.subtitle, {
              fontSize: 18,
              fontWeight: '700',
              color: colors.text,
              marginBottom: 16,
            }]}>
              Safety Features Included
            </Text>

            <View style={[commonStyles.card, {
              backgroundColor: colors.backgroundAlt,
              borderColor: colors.success,
              borderWidth: 2,
            }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Icon name="shield-checkmark" size={24} color={colors.success} />
                <Text style={[commonStyles.subtitleMedium, {
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.text,
                  marginLeft: 12,
                }]}>
                  Safety Guaranteed
                </Text>
              </View>

              <View style={{ gap: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={[commonStyles.textLight, {
                    fontSize: 14,
                    color: colors.textLight,
                    marginLeft: 8,
                  }]}>
                    Pre-flight safety inspection
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={[commonStyles.textLight, {
                    fontSize: 14,
                    color: colors.textLight,
                    marginLeft: 8,
                  }]}>
                    Real-time weather monitoring
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={[commonStyles.textLight, {
                    fontSize: 14,
                    color: colors.textLight,
                    marginLeft: 8,
                  }]}>
                    Emergency response protocol
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="checkmark-circle" size={16} color={colors.success} />
                  <Text style={[commonStyles.textLight, {
                    fontSize: 14,
                    color: colors.textLight,
                    marginLeft: 8,
                  }]}>
                    24/7 flight tracking
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom Action */}
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
          <Button
            text={selectedFlight ? 'Book Flight' : 'Select Flight Type'}
            onPress={handleBookFlight}
            disabled={!selectedFlight}
            variant="gradient"
            size="large"
          />
        </View>
      </View>
    </Modal>
  );
}
