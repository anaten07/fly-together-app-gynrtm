
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import { useLocalSearchParams, router } from 'expo-router';
import Icon from '../../components/Icon';
import { View, Text, ScrollView, Image, TouchableOpacity, Linking, StatusBar, Alert } from 'react-native';
import FlightBooking from '../../components/FlightBooking';
import { supabase } from '../integrations/supabase/client';
import type { Tables } from '../integrations/supabase/types';
import { useFlightRequests } from '../../hooks/useFlightRequests';

type Pilot = Tables<'pilots'>;

export default function PilotProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pilot, setPilot] = useState<Pilot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  const { createFlightRequest } = useFlightRequests();

  useEffect(() => {
    if (id) {
      fetchPilot();
    }
  }, [id]);

  const fetchPilot = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('pilots')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching pilot:', fetchError);
        setError(fetchError.message);
        return;
      }

      console.log('Fetched pilot:', data);
      setPilot(data);
    } catch (err) {
      console.error('Error in fetchPilot:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (type: 'phone' | 'email') => {
    if (!pilot) return;

    if (type === 'phone' && pilot.phone) {
      Linking.openURL(`tel:${pilot.phone}`);
    } else if (type === 'email') {
      Linking.openURL(`mailto:${pilot.email}`);
    }
  };

  const handleBookFlight = async (flightType: string) => {
    if (!pilot) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        Alert.alert('Authentication Required', 'Please sign in to book a flight.');
        return;
      }

      await createFlightRequest({
        student_id: user.id,
        pilot_id: pilot.id,
        flight_type: flightType,
        status: 'pending',
        message: `Flight request for ${flightType}`
      });

      Alert.alert('Success', 'Your flight request has been sent to the pilot!');
      setShowBooking(false);
    } catch (err) {
      console.error('Error booking flight:', err);
      Alert.alert('Error', 'Failed to send flight request. Please try again.');
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={16} color={colors.warning} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={16} color={colors.warning} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-outline" size={16} color={colors.textSecondary} />
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={commonStyles.text}>Loading pilot profile...</Text>
      </View>
    );
  }

  if (error || !pilot) {
    return (
      <View style={[commonStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Icon name="alert-circle" size={48} color={colors.error} />
        <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
          {error || 'Pilot not found'}
        </Text>
        <Button
          text="Go Back"
          onPress={() => router.back()}
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={[commonStyles.header, { paddingTop: 50 }]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{ marginRight: 16 }}
          >
            <Icon name="arrow-back" size={24} color={colors.background} />
          </TouchableOpacity>
          <Text style={[commonStyles.headerTitle, { color: colors.background, flex: 1 }]}>
            Pilot Profile
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            source={{ uri: pilot.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }} 
            style={{ width: 80, height: 80, borderRadius: 40, marginRight: 16 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: colors.background, marginBottom: 4 }}>
              {pilot.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              {renderStars(pilot.rating || 0)}
              <Text style={{ color: colors.background, marginLeft: 8, opacity: 0.9 }}>
                {(pilot.rating || 0).toFixed(1)} • {pilot.total_flights || 0} flights
              </Text>
            </View>
            <Text style={{ color: colors.background, opacity: 0.9 }}>
              <Icon name="location" size={14} color={colors.background} />
              {' '}{pilot.location}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={commonStyles.content}>
        {/* Contact Actions */}
        <View style={[commonStyles.card, { flexDirection: 'row', justifyContent: 'space-around' }]}>
          <TouchableOpacity 
            style={{ alignItems: 'center', flex: 1 }}
            onPress={() => handleContact('phone')}
          >
            <View style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 24, 
              backgroundColor: colors.success + '20', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: 8
            }}>
              <Icon name="call" size={24} color={colors.success} />
            </View>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Call</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ alignItems: 'center', flex: 1 }}
            onPress={() => handleContact('email')}
          >
            <View style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 24, 
              backgroundColor: colors.primary + '20', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: 8
            }}>
              <Icon name="mail" size={24} color={colors.primary} />
            </View>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={{ alignItems: 'center', flex: 1 }}
            onPress={() => setShowBooking(true)}
          >
            <View style={{ 
              width: 48, 
              height: 48, 
              borderRadius: 24, 
              backgroundColor: colors.accent + '20', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: 8
            }}>
              <Icon name="calendar" size={24} color={colors.accent} />
            </View>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>Book</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.cardTitle}>About</Text>
          <Text style={[commonStyles.text, { lineHeight: 24 }]}>
            {pilot.bio || 'No bio available.'}
          </Text>
        </View>

        {/* Experience & Aircraft */}
        <View style={commonStyles.card}>
          <Text style={commonStyles.cardTitle}>Experience & Aircraft</Text>
          <View style={{ marginTop: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon name="time" size={20} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12 }]}>
                {pilot.experience} of flying experience
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon name="airplane" size={20} color={colors.primary} />
              <Text style={[commonStyles.text, { marginLeft: 12 }]}>
                {pilot.aircraft}
              </Text>
            </View>
            {pilot.hourly_rate && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="card" size={20} color={colors.primary} />
                <Text style={[commonStyles.text, { marginLeft: 12 }]}>
                  ${pilot.hourly_rate}/hour
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Certifications */}
        {pilot.certifications && pilot.certifications.length > 0 && (
          <View style={commonStyles.card}>
            <Text style={commonStyles.cardTitle}>Certifications</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 12 }}>
              {pilot.certifications.map((cert, index) => (
                <View key={index} style={commonStyles.certificationBadge}>
                  <Text style={commonStyles.certificationText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Book Flight Button */}
        <Button
          text="Book a Flight"
          onPress={() => setShowBooking(true)}
          variant="gradient"
          size="large"
          style={{ marginTop: 20, marginBottom: 40 }}
        />
      </ScrollView>

      <FlightBooking
        visible={showBooking}
        onClose={() => setShowBooking(false)}
        pilotName={pilot.name}
        onBookFlight={handleBookFlight}
      />
    </View>
  );
}
