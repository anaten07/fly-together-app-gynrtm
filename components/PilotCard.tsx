
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors, shadows } from '../styles/commonStyles';
import Icon from './Icon';
import React from 'react';

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
        <Icon key={i} name="star" size={14} color={colors.warning} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={14} color={colors.warning} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="star-outline" size={14} color={colors.textSecondary} />
      );
    }

    return stars;
  };

  return (
    <TouchableOpacity 
      style={[commonStyles.card, commonStyles.pilotCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={commonStyles.pilotCardHeader}>
        <Image 
          source={{ uri: pilot.avatar }} 
          style={commonStyles.pilotAvatar}
        />
        <View style={commonStyles.pilotInfo}>
          <Text style={commonStyles.pilotName}>{pilot.name}</Text>
          <View style={commonStyles.ratingContainer}>
            {renderStars(pilot.rating)}
            <Text style={commonStyles.ratingText}>
              {pilot.rating.toFixed(1)} ({pilot.distance})
            </Text>
          </View>
          <Text style={commonStyles.pilotLocation}>
            <Icon name="location" size={12} color={colors.textSecondary} />
            {' '}{pilot.location}
          </Text>
        </View>
        <View style={commonStyles.pilotActions}>
          <TouchableOpacity style={commonStyles.actionButton}>
            <Icon name="chatbubble" size={16} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.actionButton}>
            <Icon name="call" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={commonStyles.pilotDetails}>
        <View style={commonStyles.detailItem}>
          <Icon name="time" size={14} color={colors.textSecondary} />
          <Text style={commonStyles.detailText}>{pilot.experience}</Text>
        </View>
        <View style={commonStyles.detailItem}>
          <Icon name="airplane" size={14} color={colors.textSecondary} />
          <Text style={commonStyles.detailText}>{pilot.aircraft}</Text>
        </View>
      </View>

      {pilot.certifications.length > 0 && (
        <View style={commonStyles.certificationsContainer}>
          {pilot.certifications.slice(0, 3).map((cert, index) => (
            <View key={index} style={commonStyles.certificationBadge}>
              <Text style={commonStyles.certificationText}>{cert}</Text>
            </View>
          ))}
          {pilot.certifications.length > 3 && (
            <Text style={commonStyles.moreCertifications}>
              +{pilot.certifications.length - 3} more
            </Text>
          )}
        </View>
      )}

      {pilot.bio && (
        <Text style={commonStyles.pilotBio} numberOfLines={2}>
          {pilot.bio}
        </Text>
      )}

      <View style={commonStyles.pilotCardFooter}>
        <TouchableOpacity style={commonStyles.quickBookButton}>
          <Icon name="calendar" size={16} color={colors.background} />
          <Text style={commonStyles.quickBookText}>Quick Book</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.viewProfileButton}>
          <Text style={commonStyles.viewProfileText}>View Profile</Text>
          <Icon name="chevron-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
