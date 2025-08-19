
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

const freeFeatures = [
  {
    id: 'weather',
    title: 'Advanced Weather',
    description: 'Real-time radar, turbulence forecasts, and detailed aviation weather reports',
    icon: 'cloud-outline',
    color: colors.primary,
  },
  {
    id: 'safety',
    title: 'AI Safety Score',
    description: 'Machine learning powered safety analysis for every flight and pilot',
    icon: 'shield-checkmark-outline',
    color: colors.success,
  },
  {
    id: 'network',
    title: 'Elite Pilot Network',
    description: 'Access to our most experienced and highly-rated pilots',
    icon: 'star-outline',
    color: colors.warning,
  },
  {
    id: 'booking',
    title: 'Unlimited Bookings',
    description: 'Book as many flights as you want with no restrictions',
    icon: 'calendar-outline',
    color: colors.secondary,
  },
  {
    id: 'history',
    title: 'Flight History',
    description: 'Track all your flights and build your aviation portfolio',
    icon: 'time-outline',
    color: colors.primary,
  },
  {
    id: 'community',
    title: 'Pilot Community',
    description: 'Connect with aviation enthusiasts and share experiences',
    icon: 'people-outline',
    color: colors.secondary,
  },
];

export default function PremiumScreen() {
  const renderFeatureCard = (feature: typeof freeFeatures[0]) => (
    <View key={feature.id} style={[commonStyles.card, {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      borderLeftWidth: 4,
      borderLeftColor: feature.color,
    }]}>
      <View style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: `${feature.color}20`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <Icon name={feature.icon as any} size={28} color={feature.color} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <Text style={[commonStyles.subtitleMedium, {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            flex: 1,
          }]}>
            {feature.title}
          </Text>
          <View style={{
            backgroundColor: colors.success,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
          }}>
            <Text style={[commonStyles.textMuted, {
              color: colors.textInverse,
              fontSize: 10,
              fontWeight: '700',
            }]}>
              FREE
            </Text>
          </View>
        </View>
        <Text style={[commonStyles.textLight, {
          fontSize: 14,
          color: colors.textLight,
          lineHeight: 20,
        }]}>
          {feature.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[commonStyles.headerGradient, { paddingTop: 60, paddingBottom: 40 }]}
        >
          <View style={{ alignItems: 'center' }}>
            <Icon name="heart" size={48} color={colors.textInverse} />
            <Text style={[commonStyles.titleLarge, {
              color: colors.textInverse,
              fontSize: 32,
              fontWeight: '800',
              marginTop: 16,
              marginBottom: 8,
            }]}>
              Fly Encore is Free!
            </Text>
            <Text style={[commonStyles.text, {
              color: colors.textInverse,
              textAlign: 'center',
              fontSize: 16,
              opacity: 0.9,
              paddingHorizontal: 20,
            }]}>
              All features are completely free. Connect with pilots and enjoy flying without any costs.
            </Text>
          </View>
        </LinearGradient>

        {/* Free Features */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <Text style={[commonStyles.subtitle, {
            fontSize: 24,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 20,
            textAlign: 'center',
          }]}>
            Everything is Free
          </Text>

          {freeFeatures.map(renderFeatureCard)}
        </View>

        {/* Community Message */}
        <View style={{ paddingHorizontal: 20, marginTop: 40, marginBottom: 100 }}>
          <View style={[commonStyles.card, {
            backgroundColor: `${colors.primary}10`,
            borderWidth: 2,
            borderColor: colors.primary,
            alignItems: 'center',
            padding: 30,
          }]}>
            <Icon name="people" size={48} color={colors.primary} />
            <Text style={[commonStyles.subtitle, {
              fontSize: 22,
              fontWeight: '800',
              color: colors.text,
              marginTop: 16,
              marginBottom: 12,
              textAlign: 'center',
            }]}>
              Built by Pilots, for Pilots
            </Text>
            <Text style={[commonStyles.text, {
              fontSize: 16,
              color: colors.textLight,
              textAlign: 'center',
              lineHeight: 24,
              marginBottom: 20,
            }]}>
              Our mission is to make aviation accessible to everyone. That's why we've made Fly Encore completely free - no hidden fees, no premium tiers, just pure flying passion.
            </Text>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.success,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}>
              <Icon name="checkmark-circle" size={20} color={colors.textInverse} />
              <Text style={[commonStyles.textMedium, {
                color: colors.textInverse,
                marginLeft: 8,
                fontWeight: '700',
              }]}>
                Always Free, Always Yours
              </Text>
            </View>
          </View>

          {/* Support Message */}
          <View style={[commonStyles.card, {
            marginTop: 20,
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,
          }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon name="heart-outline" size={24} color={colors.primary} />
              <Text style={[commonStyles.subtitleMedium, {
                fontSize: 18,
                fontWeight: '700',
                color: colors.text,
                marginLeft: 12,
              }]}>
                Love Fly Encore?
              </Text>
            </View>
            <Text style={[commonStyles.text, {
              fontSize: 14,
              color: colors.textLight,
              lineHeight: 20,
              marginBottom: 16,
            }]}>
              Help us spread the word! Share the app with fellow pilots and aviation enthusiasts. Your support helps us keep everything free for the community.
            </Text>
            
            <Button
              text="Share with Friends"
              onPress={() => console.log('Share app')}
              variant="outline"
              size="medium"
              icon={<Icon name="share-outline" size={18} color={colors.primary} />}
              iconPosition="left"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
