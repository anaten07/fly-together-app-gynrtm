
import React from 'react';
import { View, Text, Platform } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';

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
  // Since react-native-maps doesn't support web in Natively, we'll show a placeholder
  if (Platform.OS === 'web') {
    return (
      <View style={[commonStyles.mapContainer, { 
        backgroundColor: colors.backgroundAlt,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
      }]}>
        <Text style={[commonStyles.text, { textAlign: 'center', color: colors.textLight }]}>
          📍 Map View
        </Text>
        <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 5 }]}>
          Maps are not supported on web in Natively.{'\n'}
          {pilots.length} pilots found in your area.
        </Text>
      </View>
    );
  }

  // For mobile platforms, we would use react-native-maps here
  // But since we're keeping it simple for now, we'll use the same placeholder
  return (
    <View style={[commonStyles.mapContainer, { 
      backgroundColor: colors.backgroundAlt,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    }]}>
      <Text style={[commonStyles.text, { textAlign: 'center', color: colors.textLight }]}>
        📍 Map View
      </Text>
      <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 5 }]}>
        Interactive map showing {pilots.length} pilots in your area.
      </Text>
    </View>
  );
}
