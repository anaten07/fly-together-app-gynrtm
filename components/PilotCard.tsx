
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
          marginVertical: 10,
          backgroundColor: colors.background,
          borderColor: colors.border,
          paddingVertical: 24,
          paddingHorizontal: 20,
          ...shadows.medium,
        }
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Header Section - Avatar, Name, Rating */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
        {/* Avatar */}
        <View style={{
          borderRadius: 35,
          borderWidth: 2,
          borderColor: colors.primary,
          marginRight: 16,
        }}>
          <Image
            source={{ uri: pilot.avatar }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 33,
            }}
          />
        </View>

        {/* Name and Rating */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={[commonStyles.subtitleMedium, { 
            fontSize: 20, 
            fontWeight: '700',
            color: colors.text,
            marginBottom: 8,
            lineHeight: 24,
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
            alignSelf: 'flex-start',
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
              {renderStars(pilot.rating)}
            </View>
            <Text style={[commonStyles.textMuted, { 
              fontWeight: '700',
              color: colors.textInverse,
              fontSize: 14,
            }]}>
              {pilot.rating}
            </Text>
          </View>
        </View>

        {/* Distance Badge */}
        <View style={{
          backgroundColor: colors.secondary,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={[commonStyles.badgeText, { 
            fontSize: 12, 
            fontWeight: '700',
            color: colors.textInverse,
          }]}>
            {pilot.distance}
          </Text>
        </View>
      </View>

      {/* Stats Section - Experience and Aircraft */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 16,
        backgroundColor: colors.backgroundAlt,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="time" size={16} color={colors.primary} />
          <Text style={[commonStyles.textLight, { 
            marginLeft: 8,
            fontWeight: '600',
            color: colors.text,
            fontSize: 15,
          }]}>
            {pilot.experience}
          </Text>
        </View>
        
        <View style={{ 
          width: 1, 
          height: 20, 
          backgroundColor: colors.border, 
          marginHorizontal: 16 
        }} />
        
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="airplane" size={16} color={colors.primary} />
          <Text style={[commonStyles.textLight, { 
            marginLeft: 8,
            fontWeight: '600',
            color: colors.text,
            fontSize: 15,
          }]}>
            {pilot.aircraft}
          </Text>
        </View>
      </View>

      {/* Location Section */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 16,
        backgroundColor: colors.surfaceAlt,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <Icon name="location" size={16} color={colors.primary} />
        <Text style={[commonStyles.textLight, { 
          flex: 1,
          marginLeft: 8,
          fontWeight: '500',
          color: colors.text,
          fontSize: 15,
        }]}>
          {pilot.location}
        </Text>
      </View>

      {/* Certifications Section */}
      <View style={{ marginBottom: 16 }}>
        <Text style={[commonStyles.textMuted, { 
          fontSize: 13,
          fontWeight: '600',
          color: colors.textLight,
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }]}>
          Certifications
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {pilot.certifications.map((cert, index) => (
            <View key={index} style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: colors.primary,
            }}>
              <Text style={[commonStyles.badgeText, { 
                color: colors.textInverse, 
                fontSize: 12,
                fontWeight: '600',
              }]}>
                {cert}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bio Section */}
      <View style={{
        backgroundColor: colors.backgroundAlt,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 8,
      }}>
        <Text style={[commonStyles.textMuted, { 
          fontSize: 13,
          fontWeight: '600',
          color: colors.textLight,
          marginBottom: 6,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }]}>
          About
        </Text>
        <Text style={[commonStyles.textLight, { 
          lineHeight: 22,
          fontSize: 15,
          color: colors.text,
          fontWeight: '400',
        }]}>
          {pilot.bio}
        </Text>
      </View>

      {/* Action Indicator */}
      <View style={{
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: colors.primary,
        borderRadius: 18,
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        ...shadows.small,
      }}>
        <Icon name="chevron-forward" size={18} color={colors.textInverse} />
      </View>
    </TouchableOpacity>
  );
}
