
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: object;
  backgroundColor?: string;
  padding?: number;
}

export default function Icon({ 
  name, 
  size = 24, 
  color = colors.textLight, 
  style, 
  backgroundColor,
  padding = 0
}: IconProps) {
  const containerStyle = {
    ...styles.iconContainer,
    backgroundColor: backgroundColor || 'transparent',
    padding: padding,
    borderRadius: padding > 0 ? padding + size / 2 : 0,
  };

  return (
    <View style={[containerStyle, style]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
