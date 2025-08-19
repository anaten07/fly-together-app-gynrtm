
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';
import { commonStyles, colors, shadows } from '../styles/commonStyles';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const features: Feature[] = [
  {
    id: 'weather',
    title: 'Real-Time Weather',
    description: 'Live weather updates and flight conditions for safe flying',
    icon: 'cloud',
    color: colors.primary,
  },
  {
    id: 'safety',
    title: 'Safety Score',
    description: 'AI-powered safety ratings based on pilot history and conditions',
    icon: 'shield-checkmark',
    color: colors.success,
  },
  {
    id: 'booking',
    title: 'Easy Booking',
    description: 'Simple and fast flight booking with instant confirmations',
    icon: 'calendar',
    color: colors.secondary,
  },
  {
    id: 'community',
    title: 'Pilot Community',
    description: 'Connect with aviation enthusiasts and share experiences',
    icon: 'people',
    color: colors.secondary,
  },
  {
    id: 'history',
    title: 'Flight History',
    description: 'Track all your flights and build your aviation portfolio',
    icon: 'time',
    color: colors.primary,
  },
  {
    id: 'support',
    title: 'Community Support',
    description: 'Get help from our amazing pilot community',
    icon: 'help-circle',
    color: colors.warning,
  },
];

interface PremiumFeaturesProps {
  onFeaturePress: (featureId: string) => void;
}

export default function PremiumFeatures({ onFeaturePress }: PremiumFeaturesProps) {
  const renderFeatureCard = (feature: Feature) => (
    <TouchableOpacity
      key={feature.id}
      style={[
        {
          backgroundColor: colors.background,
          borderRadius: 20,
          padding: 20,
          marginRight: 16,
          width: 280,
          borderWidth: 1,
          borderColor: colors.border,
          ...shadows.medium,
        }
      ]}
      onPress={() => onFeaturePress(feature.id)}
      activeOpacity={0.8}
    >
      <View style={{
        position: 'absolute',
        top: -1,
        right: -1,
        backgroundColor: colors.success,
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
          FREE
        </Text>
      </View>

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
          backgroundColor: colors.success,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Icon 
            name="checkmark" 
            size={12} 
            color={colors.textInverse} 
          />
          <Text style={[commonStyles.textMuted, {
            color: colors.textInverse,
            marginLeft: 4,
            fontSize: 11,
            fontWeight: '600',
          }]}>
            Free
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
            colors={[colors.success, colors.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              borderRadius: 12,
              padding: 8,
              marginRight: 12,
            }}
          >
            <Icon name="heart" size={20} color={colors.textInverse} />
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
          All features are completely free - no hidden costs, no premium tiers
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {features.map(renderFeatureCard)}
      </ScrollView>

      {/* Community CTA */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.background,
            borderRadius: 20,
            padding: 20,
            borderWidth: 2,
            borderColor: colors.success,
            ...shadows.medium,
          }}
          onPress={() => onFeaturePress('community')}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.success, colors.primary]}
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
                <Icon name="people" size={20} color={colors.success} />
                <Text style={[commonStyles.subtitleMedium, {
                  fontSize: 18,
                  fontWeight: '700',
                  color: colors.text,
                  marginLeft: 8,
                }]}>
                  Join Our Community
                </Text>
              </View>
              
              <Text style={[commonStyles.textLight, {
                fontSize: 14,
                color: colors.textLight,
                lineHeight: 20,
              }]}>
                Connect with pilots, share experiences, and help us keep everything free
              </Text>
            </View>
            
            <View style={{
              backgroundColor: colors.success,
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
