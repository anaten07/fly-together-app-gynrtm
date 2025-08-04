
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';
import { commonStyles, colors, shadows } from '../styles/commonStyles';

interface PremiumFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  premium: boolean;
}

const premiumFeatures: PremiumFeature[] = [
  {
    id: 'weather',
    title: 'Real-Time Weather',
    description: 'Live weather updates and flight conditions for safe flying',
    icon: 'cloud',
    color: colors.primary,
    premium: false,
  },
  {
    id: 'safety',
    title: 'Safety Score',
    description: 'AI-powered safety ratings based on pilot history and conditions',
    icon: 'shield-checkmark',
    color: colors.success,
    premium: true,
  },
  {
    id: 'insurance',
    title: 'Flight Insurance',
    description: 'Comprehensive coverage for every flight you book',
    icon: 'umbrella',
    color: colors.warning,
    premium: true,
  },
  {
    id: 'concierge',
    title: 'Flight Concierge',
    description: '24/7 support for flight planning and emergency assistance',
    icon: 'headset',
    color: colors.primary,
    premium: true,
  },
  {
    id: 'rewards',
    title: 'Fly Rewards',
    description: 'Earn points for every flight and unlock exclusive experiences',
    icon: 'gift',
    color: colors.accent,
    premium: false,
  },
  {
    id: 'community',
    title: 'Pilot Community',
    description: 'Connect with aviation enthusiasts and share experiences',
    icon: 'people',
    color: colors.secondary,
    premium: false,
  },
];

interface PremiumFeaturesProps {
  onFeaturePress: (featureId: string) => void;
}

export default function PremiumFeatures({ onFeaturePress }: PremiumFeaturesProps) {
  const renderFeatureCard = (feature: PremiumFeature) => (
    <TouchableOpacity
      key={feature.id}
      style={[
        {
          backgroundColor: colors.background,
          borderRadius: 20,
          padding: 20,
          marginRight: 16,
          width: 280,
          borderWidth: feature.premium ? 2 : 1,
          borderColor: feature.premium ? colors.primary : colors.border,
          ...shadows.medium,
        }
      ]}
      onPress={() => onFeaturePress(feature.id)}
      activeOpacity={0.8}
    >
      {feature.premium && (
        <View style={{
          position: 'absolute',
          top: -1,
          right: -1,
          backgroundColor: colors.primary,
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderTopRightRadius: 20,
          borderBottomLeftRadius: 12,
          ...shadows.small,
        }}>
          <Text style={[commonStyles.textMuted, {
            color: colors.textInverse,
            fontSize: 10,
            fontWeight: '700',
            letterSpacing: 0.5,
          }]}>
            PREMIUM
          </Text>
        </View>
      )}

      <View style={{
        backgroundColor: `${feature.color}15`,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        width: 64,
        height: 64,
      }}>
        <Icon name={feature.icon as any} size={32} color={feature.color} />
      </View>

      <Text style={[commonStyles.subtitleMedium, {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 8,
      }]}>
        {feature.title}
      </Text>

      <Text style={[commonStyles.textLight, {
        fontSize: 14,
        color: colors.textLight,
        lineHeight: 20,
        marginBottom: 16,
      }]}>
        {feature.description}
      </Text>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <View style={{
          backgroundColor: feature.premium ? colors.primary : colors.success,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Icon 
            name={feature.premium ? 'star' : 'checkmark'} 
            size={12} 
            color={colors.textInverse} 
          />
          <Text style={[commonStyles.textMuted, {
            color: colors.textInverse,
            marginLeft: 4,
            fontSize: 11,
            fontWeight: '600',
          }]}>
            {feature.premium ? 'Premium' : 'Free'}
          </Text>
        </View>

        <Icon name="chevron-forward" size={16} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginVertical: 20 }}>
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 12,
              padding: 8,
              marginRight: 12,
            }}
          >
            <Icon name="diamond" size={20} color={colors.textInverse} />
          </LinearGradient>
          
          <Text style={[commonStyles.subtitle, {
            fontSize: 22,
            fontWeight: '800',
            color: colors.text,
          }]}>
            Fly Encore Features
          </Text>
        </View>
        
        <Text style={[commonStyles.textLight, {
          fontSize: 16,
          color: colors.textLight,
          lineHeight: 22,
        }]}>
          Discover what makes us different from other pilot connection apps
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {premiumFeatures.map(renderFeatureCard)}
      </ScrollView>

      {/* Premium CTA */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.background,
            borderRadius: 20,
            padding: 20,
            borderWidth: 2,
            borderColor: colors.primary,
            ...shadows.orange,
          }}
          onPress={() => onFeaturePress('upgrade')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.primary, colors.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              borderRadius: 20,
            }}
          />
          
          <View style={{
            backgroundColor: colors.background,
            borderRadius: 18,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Icon name="star" size={20} color={colors.primary} />
                <Text style={[commonStyles.subtitleMedium, {
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.text,
                  marginLeft: 8,
                }]}>
                  Upgrade to Premium
                </Text>
              </View>
              
              <Text style={[commonStyles.textLight, {
                fontSize: 14,
                color: colors.textLight,
                lineHeight: 20,
              }]}>
                Unlock safety scores, flight insurance, and 24/7 concierge support
              </Text>
            </View>
            
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 16,
              padding: 12,
              marginLeft: 16,
            }}>
              <Icon name="arrow-forward" size={20} color={colors.textInverse} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
