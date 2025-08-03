
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from './Icon';
import { commonStyles, colors, shadows } from '../styles/commonStyles';

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
        <Icon key={i} name="star" size={12} color={colors.primary} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={12} color={colors.primary} />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-outline" size={12} color={colors.textMuted} />
      );
    }

    return stars;
  };

  return (
    <TouchableOpacity
      style={[
        commonStyles.card,
        {
          marginVertical: 8,
          backgroundColor: colors.background,
          borderColor: colors.border,
          ...shadows.medium,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Avatar */}
        <View style={{
          borderRadius: 30,
          borderWidth: 2,
          borderColor: colors.primary,
          marginRight: 16,
        }}>
          <Image
            source={{ uri: pilot.avatar }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 28,
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
            marginBottom: 8 
          }}>
            <Text style={[commonStyles.subtitleMedium, { 
              fontSize: 18, 
              fontWeight: '700',
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
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
            }}>
              {renderStars(pilot.rating)}
              <Text style={[commonStyles.textMuted, { 
                marginLeft: 6, 
                fontWeight: '600',
                color: colors.textInverse,
                fontSize: 12,
              }]}>
                {pilot.rating}
              </Text>
            </View>
          </View>

          {/* Experience and Aircraft */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Icon name="time" size={14} color={colors.textLight} />
            <Text style={[commonStyles.textLight, { 
              marginLeft: 6,
              fontWeight: '600',
              color: colors.textLight,
              fontSize: 14,
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
            
            <Icon name="airplane" size={14} color={colors.textLight} />
            <Text style={[commonStyles.textLight, { 
              marginLeft: 6,
              fontWeight: '600',
              color: colors.textLight,
              fontSize: 14,
            }]}>
              {pilot.aircraft}
            </Text>
          </View>

          {/* Location and Distance */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Icon name="location" size={14} color={colors.textLight} />
            <Text style={[commonStyles.textLight, { 
              flex: 1,
              marginLeft: 6,
              fontWeight: '500',
              color: colors.textLight,
              fontSize: 14,
            }]}>
              {pilot.location}
            </Text>
            <View style={{
              backgroundColor: colors.secondary,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
            }}>
              <Text style={[commonStyles.badgeText, { 
                fontSize: 11, 
                fontWeight: '600',
                color: colors.textInverse,
              }]}>
                {pilot.distance}
              </Text>
            </View>
          </View>

          {/* Certifications */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
            {pilot.certifications.slice(0, 3).map((cert, index) => (
              <View key={index} style={{
                backgroundColor: colors.backgroundAlt,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.border,
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
                  color: colors.textInverse,
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
        top: 16,
        right: 16,
        backgroundColor: colors.primary,
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon name="chevron-forward" size={16} color={colors.textInverse} />
      </View>
    </TouchableOpacity>
  );
}
