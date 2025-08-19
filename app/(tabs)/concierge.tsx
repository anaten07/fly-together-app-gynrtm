
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

interface ConciergeService {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  available: boolean;
}

interface ConciergeRequest {
  id: string;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  date: string;
  description: string;
}

const conciergeServices: ConciergeService[] = [
  {
    id: 'flight-planning',
    title: 'Flight Planning',
    description: 'Custom route planning with weather analysis and airport recommendations',
    icon: 'map-outline',
    color: colors.primary,
    available: true,
  },
  {
    id: 'ground-transport',
    title: 'Ground Transportation',
    description: 'Luxury car service to and from airports, hotels, and destinations',
    icon: 'car-outline',
    color: colors.secondary,
    available: true,
  },
  {
    id: 'accommodation',
    title: 'Hotel Booking',
    description: 'Premium hotel reservations and special aviation guest rates',
    icon: 'bed-outline',
    color: colors.warning,
    available: true,
  },
  {
    id: 'dining',
    title: 'Restaurant Reservations',
    description: 'Fine dining reservations at destination cities and airports',
    icon: 'restaurant-outline',
    color: colors.success,
    available: true,
  },
  {
    id: 'weather',
    title: 'Weather Briefing',
    description: 'Detailed weather analysis and flight condition reports',
    icon: 'cloud-outline',
    color: colors.primary,
    available: true,
  },
  {
    id: 'emergency',
    title: 'Emergency Assistance',
    description: '24/7 emergency support for any flight-related issues',
    icon: 'medical-outline',
    color: colors.danger,
    available: true,
  },
];

const mockRequests: ConciergeRequest[] = [
  {
    id: '1',
    title: 'Flight to Napa Valley',
    status: 'in-progress',
    date: '2024-01-15',
    description: 'Planning scenic route with wine country landing options',
  },
  {
    id: '2',
    title: 'Hotel Reservation - Monterey',
    status: 'completed',
    date: '2024-01-12',
    description: 'Booked oceanview suite at The Lodge at Pebble Beach',
  },
  {
    id: '3',
    title: 'Weather Analysis - Lake Tahoe',
    status: 'pending',
    date: '2024-01-18',
    description: 'Detailed mountain weather forecast for weekend trip',
  },
];

export default function ConciergeScreen() {
  const [activeTab, setActiveTab] = useState<'services' | 'requests'>('services');
  const [requestText, setRequestText] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const handleServicePress = (serviceId: string) => {
    console.log('Service selected:', serviceId);
    setShowRequestForm(true);
  };

  const handleSubmitRequest = () => {
    console.log('Submitting request:', requestText);
    setRequestText('');
    setShowRequestForm(false);
    // Handle request submission logic here
  };

  const getStatusColor = (status: ConciergeRequest['status']) => {
    switch (status) {
      case 'pending':
        return colors.warning;
      case 'in-progress':
        return colors.primary;
      case 'completed':
        return colors.success;
      default:
        return colors.textMuted;
    }
  };

  const getStatusIcon = (status: ConciergeRequest['status']) => {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'in-progress':
        return 'sync-outline';
      case 'completed':
        return 'checkmark-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const renderServiceCard = (service: ConciergeService) => (
    <TouchableOpacity
      key={service.id}
      style={[commonStyles.card, {
        opacity: service.available ? 1 : 0.6,
        borderColor: service.available ? colors.border : colors.textMuted,
      }]}
      onPress={() => service.available && handleServicePress(service.id)}
      activeOpacity={0.8}
      disabled={!service.available}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: `${service.color}20`,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 16,
        }}>
          <Icon name={service.icon as any} size={28} color={service.color} />
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[commonStyles.subtitleMedium, {
              fontSize: 18,
              fontWeight: '700',
              color: colors.text,
              marginBottom: 4,
            }]}>
              {service.title}
            </Text>
            {service.available && (
              <View style={{
                backgroundColor: colors.success,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
              }}>
                <Text style={[commonStyles.textMuted, {
                  color: colors.textInverse,
                  fontSize: 10,
                  fontWeight: '600',
                }]}>
                  AVAILABLE
                </Text>
              </View>
            )}
          </View>
          
          <Text style={[commonStyles.textLight, {
            fontSize: 14,
            color: colors.textLight,
            lineHeight: 20,
          }]}>
            {service.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRequestCard = (request: ConciergeRequest) => (
    <View key={request.id} style={[commonStyles.card, { marginBottom: 16 }]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Text style={[commonStyles.subtitleMedium, {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 4,
          }]}>
            {request.title}
          </Text>
          
          <Text style={[commonStyles.textLight, {
            fontSize: 14,
            color: colors.textLight,
            marginBottom: 12,
            lineHeight: 20,
          }]}>
            {request.description}
          </Text>

          <Text style={[commonStyles.textMuted, {
            fontSize: 12,
            color: colors.textMuted,
          }]}>
            Requested: {new Date(request.date).toLocaleDateString()}
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: `${getStatusColor(request.status)}20`,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
          marginLeft: 12,
        }}>
          <Icon name={getStatusIcon(request.status) as any} size={16} color={getStatusColor(request.status)} />
          <Text style={[commonStyles.textMuted, {
            marginLeft: 6,
            fontSize: 12,
            fontWeight: '600',
            color: getStatusColor(request.status),
            textTransform: 'capitalize',
          }]}>
            {request.status.replace('-', ' ')}
          </Text>
        </View>
      </View>
    </View>
  );

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
            <Icon name="person-circle" size={48} color={colors.textInverse} />
            <Text style={[commonStyles.titleLarge, {
              color: colors.textInverse,
              fontSize: 32,
              fontWeight: '800',
              marginTop: 16,
              marginBottom: 8,
            }]}>
              24/7 Concierge
            </Text>
            <Text style={[commonStyles.text, {
              color: colors.textInverse,
              textAlign: 'center',
              fontSize: 16,
              opacity: 0.9,
            }]}>
              Your personal flight assistant for any request
            </Text>
          </View>
        </LinearGradient>

        {/* Tab Navigation */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <View style={{
            flexDirection: 'row',
            backgroundColor: colors.surfaceAlt,
            borderRadius: 16,
            padding: 4,
            marginBottom: 30,
          }}>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                },
                activeTab === 'services' && {
                  backgroundColor: colors.background,
                  ...shadows.small,
                }
              ]}
              onPress={() => setActiveTab('services')}
            >
              <Text style={[commonStyles.textMedium, {
                color: activeTab === 'services' ? colors.text : colors.textMuted,
                fontWeight: '600',
              }]}>
                Services
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                },
                activeTab === 'requests' && {
                  backgroundColor: colors.background,
                  ...shadows.small,
                }
              ]}
              onPress={() => setActiveTab('requests')}
            >
              <Text style={[commonStyles.textMedium, {
                color: activeTab === 'requests' ? colors.text : colors.textMuted,
                fontWeight: '600',
              }]}>
                My Requests
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
          {activeTab === 'services' ? (
            <>
              <Text style={[commonStyles.subtitle, {
                fontSize: 20,
                fontWeight: '700',
                color: colors.text,
                marginBottom: 20,
              }]}>
                Available Services
              </Text>

              {conciergeServices.map(renderServiceCard)}

              {/* Quick Request Button */}
              <TouchableOpacity
                style={[commonStyles.card, {
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  marginTop: 20,
                  ...shadows.orange,
                }]}
                onPress={() => setShowRequestForm(true)}
                activeOpacity={0.8}
              >
                <Icon name="add-circle" size={32} color={colors.textInverse} />
                <Text style={[commonStyles.subtitleMedium, {
                  color: colors.textInverse,
                  marginTop: 12,
                  fontSize: 18,
                  fontWeight: '700',
                }]}>
                  Custom Request
                </Text>
                <Text style={[commonStyles.textLight, {
                  color: colors.textInverse,
                  textAlign: 'center',
                  opacity: 0.9,
                }]}>
                  Need something specific? Let us know!
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={[commonStyles.subtitle, {
                fontSize: 20,
                fontWeight: '700',
                color: colors.text,
                marginBottom: 20,
              }]}>
                Your Requests ({mockRequests.length})
              </Text>

              {mockRequests.map(renderRequestCard)}

              {mockRequests.length === 0 && (
                <View style={[commonStyles.card, {
                  alignItems: 'center',
                  paddingVertical: 40,
                  backgroundColor: colors.backgroundAlt,
                }]}>
                  <Icon name="document-text-outline" size={48} color={colors.textMuted} />
                  <Text style={[commonStyles.subtitle, {
                    marginTop: 16,
                    color: colors.textMuted,
                    fontSize: 18,
                  }]}>
                    No requests yet
                  </Text>
                  <Text style={[commonStyles.textLight, {
                    textAlign: 'center',
                    marginTop: 8,
                    color: colors.textLight,
                  }]}>
                    Start by requesting a service from the Services tab
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>

      {/* Request Form Modal */}
      {showRequestForm && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        }}>
          <View style={{
            backgroundColor: colors.background,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20,
            paddingBottom: 40,
            ...shadows.large,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
            }}>
              <Text style={[commonStyles.subtitle, {
                fontSize: 20,
                fontWeight: '700',
                color: colors.text,
              }]}>
                New Request
              </Text>
              <TouchableOpacity onPress={() => setShowRequestForm(false)}>
                <Icon name="close" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[commonStyles.card, {
                height: 120,
                textAlignVertical: 'top',
                fontSize: 16,
                color: colors.text,
              }]}
              placeholder="Describe your request in detail..."
              placeholderTextColor={colors.textMuted}
              value={requestText}
              onChangeText={setRequestText}
              multiline
            />

            <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
              <Button
                text="Cancel"
                onPress={() => setShowRequestForm(false)}
                variant="outline"
                style={{ flex: 1 }}
              />
              <Button
                text="Submit Request"
                onPress={handleSubmitRequest}
                variant="primary"
                style={{ flex: 1 }}
                disabled={requestText.trim().length === 0}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
