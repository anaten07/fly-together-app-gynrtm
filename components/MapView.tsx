
import { View, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, gradients, shadows } from '../styles/commonStyles';
import Icon from './Icon';
import React from 'react';

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
    <View style={[commonStyles.mapContainer, { position: 'relative', overflow: 'hidden' }]}>
      <LinearGradient
        colors={gradients.sky}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { borderRadius: 20 }]}
      />
      
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
        <View style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 20,
          padding: 24,
          alignItems: 'center',
          ...shadows.medium,
        }}>
          <Icon name="map" size={48} color={colors.primary} />
          <Text style={[commonStyles.subtitle, { marginTop: 16, marginBottom: 8, textAlign: 'center' }]}>
            Interactive Map
          </Text>
          <Text style={[commonStyles.textLight, { textAlign: 'center', lineHeight: 20 }]}>
            {Platform.OS === 'web' 
              ? 'Maps are not supported on web in Natively. Use the mobile app for full map functionality.'
              : `Showing ${pilots.length} pilots in your area`
            }
          </Text>
          
          {Platform.OS !== 'web' && (
            <View style={{ marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
              {pilots.slice(0, 3).map((pilot, index) => (
                <View key={pilot.id} style={{
                  backgroundColor: colors.primary,
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  margin: 2,
                }}>
                  <Text style={[commonStyles.badgeText, { fontSize: 10 }]}>
                    {pilot.name.split(' ')[0]}
                  </Text>
                </View>
              ))}
              {pilots.length > 3 && (
                <View style={{
                  backgroundColor: colors.textMuted,
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  margin: 2,
                }}>
                  <Text style={[commonStyles.badgeText, { fontSize: 10 }]}>
                    +{pilots.length - 3}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      
      {/* Decorative elements */}
      <View style={{
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        padding: 8,
      }}>
        <Icon name="location" size={20} color={colors.background} />
      </View>
      
      <View style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 20,
        padding: 8,
      }}>
        <Icon name="airplane" size={20} color={colors.background} />
      </View>
    </View>
  );
}
