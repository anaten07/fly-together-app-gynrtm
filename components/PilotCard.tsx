
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
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
    <TouchableOpacity style={commonStyles.card} onPress={onPress}>
      <View style={commonStyles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Image
            source={{ uri: pilot.avatar }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              marginRight: 15,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={[commonStyles.subtitle, { marginBottom: 4, fontSize: 18 }]}>
              {pilot.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Icon name="airplane" size={16} />
              <Text style={[commonStyles.textLight, { marginLeft: 5 }]}>
                {pilot.aircraft}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
              <Icon name="location" size={16} />
              <Text style={[commonStyles.textLight, { marginLeft: 5 }]}>
                {pilot.distance} • {pilot.location}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="star" size={16} />
              <Text style={[commonStyles.textLight, { marginLeft: 5 }]}>
                {pilot.rating} • {pilot.experience} experience
              </Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Icon name="chevron-forward" size={20} />
        </View>
      </View>
      
      {/* Certifications */}
      <View style={{ flexDirection: 'row', marginTop: 10, flexWrap: 'wrap' }}>
        {pilot.certifications.map((cert, index) => (
          <View key={index} style={[commonStyles.badge, { marginRight: 5, marginBottom: 5 }]}>
            <Text style={commonStyles.badgeText}>{cert}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}
