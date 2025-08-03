
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  // Primary brand colors - Black, White, Orange
  primary: '#FF6B35',           // Vibrant orange - main brand color
  primaryLight: '#FF8A65',      // Light orange
  primaryDark: '#E65100',       // Dark orange
  secondary: '#000000',         // Pure black
  secondaryLight: '#212121',    // Dark gray
  accent: '#FF6B35',            // Orange accent
  accentLight: '#FFB74D',       // Light orange accent
  
  // Background colors
  background: '#FFFFFF',        // Pure white
  backgroundAlt: '#FAFAFA',     // Very light gray
  backgroundDark: '#000000',    // Pure black
  surface: '#FFFFFF',           // White surface
  surfaceAlt: '#F5F5F5',        // Light gray surface
  surfaceDark: '#121212',       // Dark surface
  
  // Text colors
  text: '#000000',              // Black text
  textLight: '#424242',         // Dark gray text
  textMuted: '#757575',         // Medium gray text
  textInverse: '#FFFFFF',       // White text for dark backgrounds
  
  // Utility colors
  grey: '#E0E0E0',              // Light grey
  greyDark: '#424242',          // Dark grey
  card: '#FFFFFF',              // White card background
  cardDark: '#1A1A1A',          // Dark card background
  border: '#E0E0E0',            // Light border
  borderDark: '#333333',        // Dark border
  
  // Status colors
  success: '#4CAF50',           // Green
  successLight: '#81C784',      // Light green
  warning: '#FF9800',           // Orange warning
  warningLight: '#FFB74D',      // Light orange
  danger: '#F44336',            // Red
  dangerLight: '#EF5350',       // Light red
  
  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowMedium: 'rgba(0, 0, 0, 0.15)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
  shadowOrange: 'rgba(255, 107, 53, 0.3)',
};

export const gradients = {
  primary: ['#FF6B35', '#FF8A65'],
  secondary: ['#000000', '#212121'],
  accent: ['#FF6B35', '#FFB74D'],
  blackToOrange: ['#000000', '#FF6B35'],
  orangeToBlack: ['#FF6B35', '#000000'],
  whiteToOrange: ['#FFFFFF', '#FF6B35'],
  flyEncore: ['#000000', '#FF6B35', '#FFFFFF'],
  subtle: ['rgba(255, 107, 53, 0.1)', 'rgba(255, 107, 53, 0.05)'],
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
    shadowColor: colors.shadowMedium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  orange: {
    shadowColor: colors.shadowOrange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  flyEncore: {
    shadowColor: colors.primary,
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
    ...shadows.orange,
  },
  primaryGradient: {
    alignSelf: 'center',
    width: '100%',
    ...shadows.orange,
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
    ...shadows.orange,
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
    backgroundColor: colors.textInverse,
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
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardElevated: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    marginVertical: 12,
    width: '100%',
    ...shadows.large,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardCompact: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    width: '100%',
    ...shadows.small,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardFlyEncore: {
    backgroundColor: colors.card,
    borderRadius: 28,
    padding: 28,
    marginVertical: 16,
    width: '100%',
    ...shadows.flyEncore,
    borderWidth: 2,
    borderColor: colors.primary,
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
    borderWidth: 2,
    borderColor: colors.border,
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
    borderWidth: 2,
    borderColor: colors.border,
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
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
  },
  badgeText: {
    color: colors.textInverse,
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
    ...shadows.orange,
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
    borderColor: colors.primary,
    ...shadows.medium,
  },
  avatarLarge: {
    borderRadius: 75,
    borderWidth: 4,
    borderColor: colors.primary,
    ...shadows.large,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: colors.textInverse,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
});
