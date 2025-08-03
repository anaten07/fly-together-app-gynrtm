
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';
import { commonStyles, colors, shadows, gradients } from '../styles/commonStyles';

interface Pilot {
  id: string;
  name: string;
  experience: string;
  aircraft: string;
  location: string;
  rating: number;
  distance: string;
  avatar: string;
  bio: string;
  certifications: string[];
}

interface PilotCardProps {
  pilot: Pilot;
  onPress: () => void;
}

export default function PilotCard({ pilot, onPress }: PilotCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={14} color={colors.accent} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={14} color={colors.accent} />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-outline" size={14} color={colors.textMuted} />
      );
    }

    return stars;
  };

  return (
    <TouchableOpacity
      style={[
        commonStyles.cardElevated,
        {
          marginVertical: 12,
          borderRadius: 24,
          overflow: 'hidden',
          ...shadows.large,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.95}
    >
      {/* Subtle gradient overlay */}
      <LinearGradient
        colors={['rgba(102, 126, 234, 0.02)', 'rgba(118, 75, 162, 0.02)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Avatar with enhanced styling */}
        <View style={{
          borderRadius: 35,
          borderWidth: 3,
          borderColor: colors.background,
          ...shadows.medium,
          marginRight: 16,
        }}>
          <Image
            source={{ uri: pilot.avatar }}
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
            }}
          />
        </View>

        {/* Pilot Info */}
        <View style={{ flex: 1 }}>
          {/* Name and Rating */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={[commonStyles.subtitleMedium, { 
              fontSize: 18, 
              fontWeight: '700',
              color: colors.text,
              flex: 1,
              marginRight: 8,
            }]}>
              {pilot.name}
            </Text>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.surfaceAlt,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              ...shadows.small,
            }}>
              {renderStars(pilot.rating)}
              <Text style={[commonStyles.textMuted, { 
                marginLeft: 6, 
                fontWeight: '700',
                color: colors.text,
                fontSize: 13,
              }]}>
                {pilot.rating}
              </Text>
            </View>
          </View>

          {/* Experience and Aircraft */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Icon name="time" size={16} color={colors.primary} />
            <Text style={[commonStyles.textLight, { 
              marginLeft: 6, 
              fontWeight: '600',
              color: colors.textLight,
            }]}>
              {pilot.experience}
            </Text>
            <View style={{ 
              width: 4, 
              height: 4, 
              borderRadius: 2, 
              backgroundColor: colors.textMuted, 
              marginHorizontal: 12 
            }} />
            <Icon name="airplane" size={16} color={colors.secondary} />
            <Text style={[commonStyles.textLight, { 
              marginLeft: 6, 
              fontWeight: '600',
              color: colors.textLight,
            }]}>
              {pilot.aircraft}
            </Text>
          </View>

          {/* Location and Distance */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Icon name="location" size={16} color={colors.accent} />
            <Text style={[commonStyles.textLight, { 
              marginLeft: 6, 
              flex: 1,
              fontWeight: '500',
            }]}>
              {pilot.location}
            </Text>
            <View style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              ...shadows.small,
            }}>
              <Text style={[commonStyles.badgeText, { 
                fontSize: 11, 
                fontWeight: '700',
                color: colors.background,
              }]}>
                {pilot.distance}
              </Text>
            </View>
          </View>

          {/* Certifications */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
            {pilot.certifications.slice(0, 3).map((cert, index) => (
              <View key={index} style={{
                backgroundColor: colors.surfaceAlt,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.borderLight,
              }}>
                <Text style={[commonStyles.badgeText, { 
                  color: colors.text, 
                  fontSize: 10,
                  fontWeight: '600',
                }]}>
                  {cert}
                </Text>
              </View>
            ))}
            {pilot.certifications.length > 3 && (
              <View style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 10,
              }}>
                <Text style={[commonStyles.badgeText, { 
                  fontSize: 10,
                  fontWeight: '600',
                  color: colors.background,
                }]}>
                  +{pilot.certifications.length - 3}
                </Text>
              </View>
            )}
          </View>

          {/* Bio Preview */}
          <Text style={[commonStyles.textLight, { 
            lineHeight: 20,
            fontSize: 14,
            color: colors.textLight,
          }]} numberOfLines={2}>
            {pilot.bio}
          </Text>
        </View>
      </View>

      {/* Action Indicator */}
      <View style={{
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(84, 65, 204, 0.1)',
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon name="chevron-forward" size={16} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
}
