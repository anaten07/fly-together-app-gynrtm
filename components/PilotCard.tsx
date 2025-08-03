
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
        <Icon key={i} name="star" size={14} color={colors.primary} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={14} color={colors.primary} />
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
          borderRadius: 28,
          overflow: 'hidden',
          backgroundColor: colors.background,
          borderWidth: 2,
          borderColor: colors.border,
          ...shadows.large,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.95}
    >
      {/* Subtle orange accent gradient */}
      <LinearGradient
        colors={['rgba(255, 107, 53, 0.03)', 'rgba(255, 107, 53, 0.01)']}
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
        {/* Enhanced Avatar */}
        <View style={{
          borderRadius: 40,
          borderWidth: 3,
          borderColor: colors.primary,
          ...shadows.orange,
          marginRight: 18,
        }}>
          <Image
            source={{ uri: pilot.avatar }}
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
            }}
          />
        </View>

        {/* Pilot Info */}
        <View style={{ flex: 1 }}>
          {/* Name and Rating */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: 10 
          }}>
            <Text style={[commonStyles.subtitleMedium, { 
              fontSize: 20, 
              fontWeight: '800',
              color: colors.text,
              flex: 1,
              marginRight: 12,
            }]}>
              {pilot.name}
            </Text>
            
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.primary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              ...shadows.small,
            }}>
              {renderStars(pilot.rating)}
              <Text style={[commonStyles.textMuted, { 
                marginLeft: 8, 
                fontWeight: '800',
                color: colors.textInverse,
                fontSize: 14,
              }]}>
                {pilot.rating}
              </Text>
            </View>
          </View>

          {/* Experience and Aircraft */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <View style={{
              backgroundColor: colors.secondary,
              borderRadius: 12,
              padding: 6,
              marginRight: 8,
            }}>
              <Icon name="time" size={16} color={colors.textInverse} />
            </View>
            <Text style={[commonStyles.textLight, { 
              fontWeight: '700',
              color: colors.text,
              fontSize: 15,
            }]}>
              {pilot.experience}
            </Text>
            
            <View style={{ 
              width: 6, 
              height: 6, 
              borderRadius: 3, 
              backgroundColor: colors.primary, 
              marginHorizontal: 16 
            }} />
            
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 12,
              padding: 6,
              marginRight: 8,
            }}>
              <Icon name="airplane" size={16} color={colors.textInverse} />
            </View>
            <Text style={[commonStyles.textLight, { 
              fontWeight: '700',
              color: colors.text,
              fontSize: 15,
            }]}>
              {pilot.aircraft}
            </Text>
          </View>

          {/* Location and Distance */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
            <View style={{
              backgroundColor: colors.backgroundAlt,
              borderRadius: 12,
              padding: 6,
              marginRight: 8,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <Icon name="location" size={16} color={colors.text} />
            </View>
            <Text style={[commonStyles.textLight, { 
              flex: 1,
              fontWeight: '600',
              color: colors.textLight,
              fontSize: 15,
            }]}>
              {pilot.location}
            </Text>
            <View style={{
              backgroundColor: colors.secondary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
              ...shadows.small,
            }}>
              <Text style={[commonStyles.badgeText, { 
                fontSize: 12, 
                fontWeight: '800',
                color: colors.textInverse,
              }]}>
                {pilot.distance}
              </Text>
            </View>
          </View>

          {/* Certifications */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {pilot.certifications.slice(0, 3).map((cert, index) => (
              <View key={index} style={{
                backgroundColor: colors.backgroundAlt,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
              }}>
                <Text style={[commonStyles.badgeText, { 
                  color: colors.text, 
                  fontSize: 11,
                  fontWeight: '700',
                }]}>
                  {cert}
                </Text>
              </View>
            ))}
            {pilot.certifications.length > 3 && (
              <View style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 12,
                ...shadows.small,
              }}>
                <Text style={[commonStyles.badgeText, { 
                  fontSize: 11,
                  fontWeight: '700',
                  color: colors.textInverse,
                }]}>
                  +{pilot.certifications.length - 3}
                </Text>
              </View>
            )}
          </View>

          {/* Bio Preview */}
          <Text style={[commonStyles.textLight, { 
            lineHeight: 22,
            fontSize: 15,
            color: colors.textLight,
            fontWeight: '500',
          }]} numberOfLines={2}>
            {pilot.bio}
          </Text>
        </View>
      </View>

      {/* Enhanced Action Indicator */}
      <View style={{
        position: 'absolute',
        top: 24,
        right: 24,
        backgroundColor: colors.primary,
        borderRadius: 18,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.orange,
      }}>
        <Icon name="chevron-forward" size={18} color={colors.textInverse} />
      </View>
    </TouchableOpacity>
  );
}
