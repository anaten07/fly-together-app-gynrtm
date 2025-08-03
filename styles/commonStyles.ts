
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#5441cc',        // Modern indigo - Fly Encore brand color
  primaryLight: '#6366F1',   // Lighter indigo
  primaryDark: '#4F46E5',    // Darker indigo
  secondary: '#06B6D4',      // Cyan
  secondaryLight: '#67E8F9', // Light cyan
  accent: '#F59E0B',         // Amber
  accentLight: '#FCD34D',    // Light amber
  background: '#FFFFFF',     // White
  backgroundAlt: '#F8FAFC',  // Very light gray
  backgroundDark: '#0F172A', // Dark slate
  surface: '#FFFFFF',        // White surface
  surfaceAlt: '#F1F5F9',     // Light surface
  text: '#1E293B',           // Dark slate
  textLight: '#64748B',      // Slate
  textMuted: '#94A3B8',      // Light slate
  grey: '#E2E8F0',           // Light grey
  greyDark: '#475569',       // Dark grey
  card: '#FFFFFF',           // White card background
  border: '#E2E8F0',         // Border color
  borderLight: '#F1F5F9',    // Light border
  success: '#10B981',        // Emerald
  successLight: '#6EE7B7',   // Light emerald
  warning: '#F59E0B',        // Amber
  warningLight: '#FCD34D',   // Light amber
  danger: '#EF4444',         // Red
  dangerLight: '#FCA5A5',    // Light red
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.2)',
};

export const gradients = {
  primary: ['#6366F1', '#8B5CF6'],
  secondary: ['#06B6D4', '#67E8F9'],
  accent: ['#F59E0B', '#FCD34D'],
  success: ['#10B981', '#6EE7B7'],
  sunset: ['#FF6B6B', '#FFE66D'],
  ocean: ['#667eea', '#764ba2'],
  sky: ['#74b9ff', '#0984e3'],
  flyEncore: ['#667eea', '#764ba2', '#5441cc'], // Fly Encore brand gradient
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  colored: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  flyEncore: {
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 7,
  },
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
    ...shadows.medium,
  },
  primaryGradient: {
    alignSelf: 'center',
    width: '100%',
    ...shadows.colored,
  },
  secondary: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
    ...shadows.medium,
  },
  accent: {
    backgroundColor: colors.accent,
    alignSelf: 'center',
    width: '100%',
    ...shadows.medium,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  ghost: {
    backgroundColor: colors.surfaceAlt,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.backgroundDark,
    alignSelf: 'center',
    width: '100%',
    ...shadows.medium,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  titleLarge: {
    fontSize: 36,
    fontWeight: '900',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 12,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  subtitleMedium: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
    letterSpacing: -0.2,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  textMedium: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  textLight: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textLight,
    lineHeight: 20,
  },
  textMuted: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textMuted,
    lineHeight: 18,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    marginVertical: 8,
    width: '100%',
    ...shadows.medium,
  },
  cardElevated: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    marginVertical: 12,
    width: '100%',
    ...shadows.large,
  },
  cardCompact: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    width: '100%',
    ...shadows.small,
  },
  cardFlyEncore: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 28,
    marginVertical: 16,
    width: '100%',
    ...shadows.flyEncore,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.primary,
  },
  iconLarge: {
    width: 32,
    height: 32,
    tintColor: colors.primary,
  },
  mapContainer: {
    width: '100%',
    height: 300,
    borderRadius: 20,
    overflow: 'hidden',
    marginVertical: 16,
    ...shadows.medium,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginVertical: 12,
    ...shadows.medium,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    fontWeight: '400',
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    ...shadows.small,
  },
  badgeSecondary: {
    backgroundColor: colors.secondary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    ...shadows.small,
  },
  badgeOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  badgeText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  badgeTextDark: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerGradientFlyEncore: {
    paddingTop: 70,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.large,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
    width: '100%',
  },
  avatar: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.background,
    ...shadows.medium,
  },
  avatarLarge: {
    borderRadius: 75,
    borderWidth: 4,
    borderColor: colors.background,
    ...shadows.large,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
});
