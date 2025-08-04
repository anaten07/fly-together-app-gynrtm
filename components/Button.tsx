
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients, shadows } from '../styles/commonStyles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 56,
    ...shadows.medium,
  },
  buttonSmall: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    minHeight: 44,
  },
  buttonLarge: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 35,
    minHeight: 64,
  },
  primary: {
    backgroundColor: colors.primary,
    ...shadows.orange,
  },
  secondary: {
    backgroundColor: colors.secondary,
    ...shadows.medium,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  ghost: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
  },
  gradient: {
    ...shadows.orange,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonTextSmall: {
    fontSize: 14,
    fontWeight: '700',
  },
  buttonTextLarge: {
    fontSize: 18,
    fontWeight: '800',
  },
  primaryText: {
    color: colors.textInverse,
  },
  secondaryText: {
    color: colors.textInverse,
  },
  outlineText: {
    color: colors.primary,
  },
  ghostText: {
    color: colors.text,
  },
  disabled: {
    backgroundColor: colors.grey,
    opacity: 0.6,
  },
  disabledText: {
    color: colors.textMuted,
  },
  iconContainer: {
    marginHorizontal: 6,
  },
});

export default function Button({ 
  text, 
  onPress, 
  style, 
  textStyle, 
  disabled = false,
  variant = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left'
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    if (size === 'small') baseStyle.push(styles.buttonSmall);
    if (size === 'large') baseStyle.push(styles.buttonLarge);
    
    if (!disabled) {
      switch (variant) {
        case 'primary':
          baseStyle.push(styles.primary);
          break;
        case 'secondary':
          baseStyle.push(styles.secondary);
          break;
        case 'outline':
          baseStyle.push(styles.outline);
          break;
        case 'ghost':
          baseStyle.push(styles.ghost);
          break;
        case 'gradient':
          baseStyle.push(styles.gradient);
          break;
      }
    } else {
      baseStyle.push(styles.disabled);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    if (size === 'small') baseStyle.push(styles.buttonTextSmall);
    if (size === 'large') baseStyle.push(styles.buttonTextLarge);
    
    if (!disabled) {
      switch (variant) {
        case 'primary':
          baseStyle.push(styles.primaryText);
          break;
        case 'secondary':
          baseStyle.push(styles.secondaryText);
          break;
        case 'outline':
          baseStyle.push(styles.outlineText);
          break;
        case 'ghost':
          baseStyle.push(styles.ghostText);
          break;
        case 'gradient':
          baseStyle.push(styles.primaryText);
          break;
      }
    } else {
      baseStyle.push(styles.disabledText);
    }
    
    return baseStyle;
  };

  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && (
        <View style={styles.iconContainer}>{icon}</View>
      )}
      <Text style={[getTextStyle(), textStyle].flat()}>{text}</Text>
      {icon && iconPosition === 'right' && (
        <View style={styles.iconContainer}>{icon}</View>
      )}
    </>
  );

  if (variant === 'gradient' && !disabled) {
    return (
      <TouchableOpacity
        style={[getButtonStyle(), style].flat()}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={gradients.blackToOrange}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: size === 'small' ? 25 : size === 'large' ? 35 : 30 }]}
        />
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style].flat()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}
