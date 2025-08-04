
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

// Conditional import for react-native-maps
let MapViewNative: any = null;
let Marker: any = null;
let Circle: any = null;

if (Platform.OS !== 'web') {
  try {
    const maps = require('react-native-maps');
    MapViewNative = maps.default;
    Marker = maps.Marker;
    Circle = maps.Circle;
  } catch (error) {
    console.warn('react-native-maps not available:', error);
  }
}

export default function MapView({ pilots }: MapViewProps) {
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(true);

  useEffect(() => {
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

  // For mobile platforms, show the actual map
  if (!MapViewNative || !Marker || !Circle) {
    return (
      <View style={[commonStyles.mapContainer, {
        backgroundColor: colors.backgroundAlt,
        borderWidth: 2,
        borderColor: colors.border,
        ...shadows.large,
        alignItems: 'center',
        justifyContent: 'center',
      }]}>
        <Text style={[commonStyles.subtitle, { color: colors.text }]}>
          Map not available
        </Text>
      </View>
    );
  }

  return (
    <View style={[commonStyles.mapContainer, {
      backgroundColor: colors.backgroundAlt,
      borderWidth: 2,
      borderColor: colors.primary,
      ...shadows.large,
    }]}>
      {isLoadingLocation ? (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.backgroundAlt,
        }}>
          <View style={{
            backgroundColor: colors.primary,
            borderRadius: 30,
            padding: 20,
            marginBottom: 20,
            ...shadows.orange,
          }}>
            <Icon name="location" size={40} color={colors.textInverse} />
          </View>
          <Text style={[commonStyles.subtitleMedium, {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            textAlign: 'center',
            marginBottom: 8,
          }]}>
            Finding Your Location...
          </Text>
          <Text style={[commonStyles.textLight, {
            textAlign: 'center',
            fontSize: 14,
            color: colors.textLight,
          }]}>
            Please wait while we locate you
          </Text>
        </View>
      ) : !locationPermission ? (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.backgroundAlt,
          paddingHorizontal: 40,
        }}>
          <View style={{
            backgroundColor: colors.warning,
            borderRadius: 30,
            padding: 20,
            marginBottom: 20,
            ...shadows.medium,
          }}>
            <Icon name="warning" size={40} color={colors.textInverse} />
          </View>
          <Text style={[commonStyles.subtitleMedium, {
            fontSize: 18,
            fontWeight: '700',
            color: colors.text,
            textAlign: 'center',
            marginBottom: 12,
          }]}>
            Location Permission Required
          </Text>
          <Text style={[commonStyles.textLight, {
            textAlign: 'center',
            fontSize: 14,
            color: colors.textLight,
            lineHeight: 20,
          }]}>
            Enable location services to see your position and find nearby pilots
          </Text>
        </View>
      ) : (
        <MapViewNative
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userLocation?.coords.latitude || 37.7749,
            longitude: userLocation?.coords.longitude || -122.4194,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsScale={true}
          mapType="standard"
        >
          {/* User Location Circle */}
          {userLocation && (
            <Circle
              center={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
              }}
              radius={1000} // 1km radius
              strokeColor={colors.primary}
              strokeWidth={2}
              fillColor="rgba(255, 107, 53, 0.1)"
            />
          )}

          {/* Pilot Markers */}
          {pilots.map((pilot, index) => {
            // Generate mock coordinates around San Francisco Bay Area
            const baseLatitude = userLocation?.coords.latitude || 37.7749;
            const baseLongitude = userLocation?.coords.longitude || -122.4194;
            const latitude = baseLatitude + (Math.random() - 0.5) * 0.1;
            const longitude = baseLongitude + (Math.random() - 0.5) * 0.1;

            return (
              <Marker
                key={pilot.id}
                coordinate={{
                  latitude,
                  longitude,
                }}
                title={pilot.name}
                description={`${pilot.aircraft} • ${pilot.distance}`}
              >
                <View style={{
                  backgroundColor: colors.primary,
                  borderRadius: 20,
                  padding: 8,
                  borderWidth: 2,
                  borderColor: colors.textInverse,
                  ...shadows.orange,
                }}>
                  <Icon name="airplane" size={20} color={colors.textInverse} />
                </View>
              </Marker>
            );
          })}
        </MapViewNative>
      )}

      {/* Map Overlay Info */}
      <View style={{
        position: 'absolute',
        top: 16,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          ...shadows.medium,
        }}>
          <Icon name="location" size={16} color={colors.primary} />
          <Text style={[commonStyles.textMedium, {
            marginLeft: 6,
            fontSize: 12,
            color: colors.text,
            fontWeight: '600',
          }]}>
            {userLocation ? 'Location Found' : 'Locating...'}
          </Text>
        </View>

        <View style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          ...shadows.medium,
        }}>
          <Icon name="people" size={16} color={colors.textInverse} />
          <Text style={[commonStyles.textMedium, {
            marginLeft: 6,
            fontSize: 12,
            color: colors.textInverse,
            fontWeight: '600',
          }]}>
            {pilots.length} pilots
          </Text>
        </View>
      </View>
    </View>
  );
}
