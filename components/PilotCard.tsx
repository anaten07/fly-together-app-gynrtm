
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows, gradients } from '../styles/commonStyles';
import Icon from './Icon';

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
  return (
    <TouchableOpacity 
      style={[commonStyles.cardElevated, { overflow: 'hidden' }]} 
      onPress={onPress}
      activeOpacity={0.95}
    >
      {/* Subtle gradient background */}
      <LinearGradient
        colors={['rgba(99, 102, 241, 0.02)', 'rgba(139, 92, 246, 0.02)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: 24 }]}
      />
      
      <View style={commonStyles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: pilot.avatar }}
              style={[
                {
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  marginRight: 16,
                },
                commonStyles.avatar
              ]}
            />
            {/* Online status indicator */}
            <View style={{
              position: 'absolute',
              bottom: 2,
              right: 14,
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: colors.success,
              borderWidth: 2,
              borderColor: colors.background,
            }} />
          </View>
          
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.subtitleMedium, { marginBottom: 6, fontSize: 19 }]}>
              {pilot.name}
            </Text>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Icon name="airplane" size={16} color={colors.primary} />
              <Text style={[commonStyles.textLight, { marginLeft: 6, fontWeight: '500' }]}>
                {pilot.aircraft}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Icon name="location" size={16} color={colors.secondary} />
              <Text style={[commonStyles.textLight, { marginLeft: 6 }]}>
                {pilot.distance} • {pilot.location}
              </Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={commonStyles.ratingContainer}>
                <Icon name="star" size={14} color={colors.success} />
                <Text style={commonStyles.ratingText}>{pilot.rating}</Text>
              </View>
              <Text style={[commonStyles.textMuted, { marginLeft: 8 }]}>
                {pilot.experience} experience
              </Text>
            </View>
          </View>
        </View>
        
        <View style={{ 
          alignItems: 'center',
          backgroundColor: colors.surfaceAlt,
          borderRadius: 20,
          padding: 8,
        }}>
          <Icon name="chevron-forward" size={20} color={colors.primary} />
        </View>
      </View>
      
      {/* Certifications */}
      <View style={{ flexDirection: 'row', marginTop: 16, flexWrap: 'wrap' }}>
        {pilot.certifications.slice(0, 3).map((cert, index) => (
          <View key={index} style={[
            commonStyles.badge, 
            { 
              marginRight: 6, 
              marginBottom: 6,
              backgroundColor: index === 0 ? colors.primary : 
                             index === 1 ? colors.secondary : colors.accent,
            }
          ]}>
            <Text style={commonStyles.badgeText}>{cert}</Text>
          </View>
        ))}
        {pilot.certifications.length > 3 && (
          <View style={[commonStyles.badgeOutline, { marginBottom: 6 }]}>
            <Text style={[commonStyles.badgeTextDark, { color: colors.primary }]}>
              +{pilot.certifications.length - 3}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
