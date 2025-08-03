
import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from './Icon';
import { commonStyles, colors, gradients, shadows } from '../styles/commonStyles';

interface Pilot {
  id: string;
  name: string;
  location: string;
  distance: string;
}

interface MapViewProps {
  pilots: Pilot[];
}

export default function MapView({ pilots }: MapViewProps) {
  return (
    <View style={[commonStyles.mapContainer, {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 2,
      borderColor: colors.border,
      ...shadows.large,
    }]}>
      <LinearGradient
        colors={['rgba(0, 0, 0, 0.05)', 'rgba(255, 107, 53, 0.05)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
      }}>
        {/* Map Icon */}
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 30,
          padding: 20,
          marginBottom: 20,
          ...shadows.orange,
        }}>
          <Icon name="map" size={40} color={colors.textInverse} />
        </View>
        
        {/* Title */}
        <Text style={[commonStyles.subtitleMedium, {
          fontSize: 22,
          fontWeight: '800',
          color: colors.text,
          textAlign: 'center',
          marginBottom: 12,
        }]}>
          Interactive Map
        </Text>
        
        {/* Description */}
        <Text style={[commonStyles.textLight, {
          textAlign: 'center',
          fontSize: 16,
          color: colors.textLight,
          lineHeight: 24,
          marginBottom: 20,
        }]}>
          Maps are not supported on web in Natively. 
          {'\n'}View pilot locations on mobile devices.
        </Text>
        
        {/* Pilot Count Badge */}
        <View style={{
          backgroundColor: colors.secondary,
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 25,
          flexDirection: 'row',
          alignItems: 'center',
          ...shadows.medium,
        }}>
          <Icon name="location" size={18} color={colors.textInverse} />
          <Text style={[commonStyles.textMedium, {
            color: colors.textInverse,
            marginLeft: 8,
            fontWeight: '700',
            fontSize: 16,
          }]}>
            {pilots.length} pilots nearby
          </Text>
        </View>
      </View>
    </View>
  );
}
