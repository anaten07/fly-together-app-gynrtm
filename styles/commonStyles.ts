
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  secondary: '#64748b',
  accent: '#f59e0b',
  background: '#ffffff',
  backgroundAlt: '#f1f5f9',
  surface: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b',
  textSecondary: '#64748b',
  textLight: '#94a3b8',
  textMuted: '#9ca3af',
  textInverse: '#ffffff',
  border: '#e2e8f0',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  shadowDark: '#000000',
};

export const gradients = {
  primary: ['#3b82f6', '#2563eb'],
  secondary: ['#64748b', '#475569'],
  accent: ['#f59e0b', '#d97706'],
  success: ['#10b981', '#059669'],
  warning: ['#f59e0b', '#d97706'],
  error: ['#ef4444', '#dc2626'],
};

export const shadows = {
  small: {
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    elevation: 2,
  },
  medium: {
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
    elevation: 4,
  },
  large: {
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
    elevation: 8,
  },
  orange: {
    boxShadow: '0 4px 6px rgba(245, 158, 11, 0.3), 0 2px 4px rgba(245, 158, 11, 0.2)',
    elevation: 4,
  },
};

export const commonStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 6,
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: colors.background,
  },
  // Weather styles
  weatherCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  weatherStation: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  weatherCategory: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  weatherTemp: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  weatherWind: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  // Pilot card styles
  pilotCard: {
    marginBottom: 16,
  },
  pilotCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pilotAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  pilotInfo: {
    flex: 1,
  },
  pilotName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  pilotLocation: {
    fontSize: 14,
    color: colors.textSecondary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pilotActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  pilotDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  certificationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  certificationBadge: {
    backgroundColor: colors.primary + '20',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  certificationText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  moreCertifications: {
    fontSize: 12,
    color: colors.textSecondary,
    alignSelf: 'center',
  },
  pilotBio: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  pilotCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickBookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  quickBookText: {
    fontSize: 14,
    color: colors.background,
    fontWeight: '500',
    marginLeft: 6,
  },
  viewProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewProfileText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
  // Map styles
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  // Additional text styles
  subtitleMedium: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  textLight: {
    fontSize: 14,
    color: colors.textLight,
  },
  textMedium: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  // Flight log styles
  flightLogCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    ...shadows.small,
  },
  flightLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  flightLogRoute: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  flightLogAircraft: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  flightLogDuration: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  flightLogDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  flightLogTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  flightLogBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  flightLogBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  // App connection styles
  appCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...shadows.small,
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  appDescription: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  appStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  appStatusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  appFeatures: {
    marginBottom: 12,
  },
  appFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  appFeatureText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 6,
  },
  appActions: {
    flexDirection: 'row',
    gap: 8,
  },
  // Statistics styles
  statsCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statsLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
