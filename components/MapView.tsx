
import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import Icon from './Icon';
import { commonStyles, colors, shadows } from '../styles/commonStyles';

interface Pilot {
  id: string;
  name: string;
  location: string;
  distance: string;
  latitude?: number;
  longitude?: number;
}

interface MapViewProps {
  pilots: Pilot[];
}

export default function MapView({ pilots }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);

  useEffect(() => {
    console.log('MapView mounted, platform:', Platform.OS);
    if (Platform.OS !== 'web') {
      requestLocationPermission();
    } else {
      setIsLoadingLocation(false);
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      console.log('Requesting location permission...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        console.log('Location permission denied');
        setLocationPermission(false);
        setIsLoadingLocation(false);
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to see your position on the map and find nearby pilots.',
          [{ text: 'OK' }]
        );
        return;
      }

      console.log('Location permission granted');
      setLocationPermission(true);
      getCurrentLocation();
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setIsLoadingLocation(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      console.log('Getting current location...');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      console.log('Current location:', location);
      setUserLocation(location);
      setIsLoadingLocation(false);
    } catch (error) {
      console.error('Error getting current location:', error);
      setIsLoadingLocation(false);
      Alert.alert(
        'Location Error',
        'Unable to get your current location. Please check your GPS settings.',
        [{ text: 'OK' }]
      );
    }
  };

  // For web platform, show the placeholder
  if (Platform.OS === 'web') {
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

  // For mobile platforms, show a simplified view since react-native-maps is not supported
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
          Maps are not supported in Natively right now.
          {'\n'}Coming soon with full pilot locations!
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
        
        {/* Location Status */}
        {isLoadingLocation ? (
          <View style={{
            marginTop: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            ...shadows.small,
          }}>
            <Icon name="location" size={16} color={colors.primary} />
            <Text style={[commonStyles.textMedium, {
              marginLeft: 6,
              fontSize: 12,
              color: colors.text,
              fontWeight: '600',
            }]}>
              Finding your location...
            </Text>
          </View>
        ) : locationPermission && userLocation ? (
          <View style={{
            marginTop: 16,
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            ...shadows.small,
          }}>
            <Icon name="checkmark-circle" size={16} color={colors.success} />
            <Text style={[commonStyles.textMedium, {
              marginLeft: 6,
              fontSize: 12,
              color: colors.success,
              fontWeight: '600',
            }]}>
              Location found
            </Text>
          </View>
        ) : (
          <View style={{
            marginTop: 16,
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            ...shadows.small,
          }}>
            <Icon name="warning" size={16} color={colors.warning} />
            <Text style={[commonStyles.textMedium, {
              marginLeft: 6,
              fontSize: 12,
              color: colors.warning,
              fontWeight: '600',
            }]}>
              Location permission needed
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
