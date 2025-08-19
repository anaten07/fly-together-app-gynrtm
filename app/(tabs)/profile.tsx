
import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, colors, shadows } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  totalFlights: number;
  favoriteAircraft: string;
  avatar: string;
  isPremium: boolean;
}

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  hasNotification?: boolean;
}

const mockProfile: UserProfile = {
  name: 'John Anderson',
  email: 'john.anderson@email.com',
  phone: '+1 (555) 123-4567',
  memberSince: '2023',
  totalFlights: 24,
  favoriteAircraft: 'Cessna 172',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  isPremium: true,
};

const menuItems: MenuItem[] = [
  {
    id: 'flights',
    title: 'Flight History',
    icon: 'airplane-outline',
    color: colors.primary,
  },
  {
    id: 'favorites',
    title: 'Favorite Pilots',
    icon: 'heart-outline',
    color: colors.danger,
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'settings-outline',
    color: colors.textMuted,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'notifications-outline',
    color: colors.warning,
    hasNotification: true,
  },
  {
    id: 'support',
    title: 'Help & Support',
    icon: 'help-circle-outline',
    color: colors.success,
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    icon: 'shield-outline',
    color: colors.secondary,
  },
];

const achievements = [
  {
    id: 'first-flight',
    title: 'First Flight',
    description: 'Completed your first flight',
    icon: 'trophy',
    color: colors.warning,
    earned: true,
  },
  {
    id: 'frequent-flyer',
    title: 'Frequent Flyer',
    description: 'Completed 10+ flights',
    icon: 'airplane',
    color: colors.primary,
    earned: true,
  },
  {
    id: 'safety-first',
    title: 'Safety First',
    description: 'Perfect safety record',
    icon: 'shield-checkmark',
    color: colors.success,
    earned: true,
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visited 5+ different airports',
    icon: 'map',
    color: colors.secondary,
    earned: false,
  },
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'profile' | 'achievements'>('profile');

  const handleMenuPress = (menuId: string) => {
    console.log('Menu item pressed:', menuId);
    // Handle menu navigation here
  };

  const handleEditProfile = () => {
    console.log('Edit profile pressed');
    // Handle edit profile logic here
  };

  const handleLogout = () => {
    console.log('Logout pressed');
    // Handle logout logic here
  };

  const renderMenuItem = (item: MenuItem) => (
    <TouchableOpacity
      key={item.id}
      style={[commonStyles.card, {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingVertical: 16,
      }]}
      onPress={() => handleMenuPress(item.id)}
      activeOpacity={0.8}
    >
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: `${item.color}20`,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}>
        <Icon name={item.icon as any} size={20} color={item.color} />
      </View>

      <Text style={[commonStyles.textMedium, {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
      }]}>
        {item.title}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {item.hasNotification && (
          <View style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.danger,
            marginRight: 12,
          }} />
        )}
        <Icon name="chevron-forward" size={16} color={colors.textMuted} />
      </View>
    </TouchableOpacity>
  );

  const renderAchievement = (achievement: typeof achievements[0]) => (
    <View
      key={achievement.id}
      style={[commonStyles.card, {
        alignItems: 'center',
        opacity: achievement.earned ? 1 : 0.5,
        borderColor: achievement.earned ? achievement.color : colors.border,
        backgroundColor: achievement.earned ? `${achievement.color}10` : colors.backgroundAlt,
        minWidth: 140,
        marginRight: 16,
      }]}
    >
      <View style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: achievement.earned ? achievement.color : colors.textMuted,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
      }}>
        <Icon name={achievement.icon as any} size={24} color={colors.textInverse} />
      </View>

      <Text style={[commonStyles.subtitleMedium, {
        fontSize: 14,
        fontWeight: '700',
        color: colors.text,
        textAlign: 'center',
        marginBottom: 4,
      }]}>
        {achievement.title}
      </Text>

      <Text style={[commonStyles.textLight, {
        fontSize: 12,
        color: colors.textLight,
        textAlign: 'center',
        lineHeight: 16,
      }]}>
        {achievement.description}
      </Text>
    </View>
  );

  return (
    <View style={commonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
      
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[commonStyles.headerGradient, { paddingTop: 60, paddingBottom: 40 }]}
        >
          <View style={{ alignItems: 'center' }}>
            <View style={{ position: 'relative', marginBottom: 16 }}>
              <Image
                source={{ uri: mockProfile.avatar }}
                style={[commonStyles.avatarLarge, {
                  width: 100,
                  height: 100,
                }]}
              />
              {mockProfile.isPremium && (
                <View style={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  backgroundColor: colors.warning,
                  borderRadius: 15,
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 3,
                  borderColor: colors.textInverse,
                }}>
                  <Icon name="diamond" size={16} color={colors.textInverse} />
                </View>
              )}
            </View>

            <Text style={[commonStyles.titleLarge, {
              color: colors.textInverse,
              fontSize: 28,
              fontWeight: '800',
              marginBottom: 4,
            }]}>
              {mockProfile.name}
            </Text>

            <Text style={[commonStyles.text, {
              color: colors.textInverse,
              fontSize: 16,
              opacity: 0.9,
              marginBottom: 16,
            }]}>
              {mockProfile.email}
            </Text>

            <View style={{
              flexDirection: 'row',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
            }}>
              <Icon name="calendar" size={16} color={colors.textInverse} />
              <Text style={[commonStyles.textMedium, {
                color: colors.textInverse,
                marginLeft: 8,
                fontSize: 14,
              }]}>
                Member since {mockProfile.memberSince}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={{ paddingHorizontal: 20, marginTop: -25, zIndex: 1 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={[commonStyles.card, {
              flex: 1,
              alignItems: 'center',
              backgroundColor: colors.background,
              ...shadows.medium,
            }]}>
              <Text style={[commonStyles.titleLarge, {
                fontSize: 32,
                fontWeight: '900',
                color: colors.primary,
                marginBottom: 4,
              }]}>
                {mockProfile.totalFlights}
              </Text>
              <Text style={[commonStyles.textLight, {
                fontSize: 12,
                color: colors.textMuted,
                textAlign: 'center',
              }]}>
                Total Flights
              </Text>
            </View>

            <View style={[commonStyles.card, {
              flex: 1,
              alignItems: 'center',
              backgroundColor: colors.background,
              ...shadows.medium,
            }]}>
              <Icon name="airplane" size={32} color={colors.secondary} style={{ marginBottom: 8 }} />
              <Text style={[commonStyles.textLight, {
                fontSize: 12,
                color: colors.textMuted,
                textAlign: 'center',
              }]}>
                Favorite Aircraft
              </Text>
              <Text style={[commonStyles.textMedium, {
                fontSize: 14,
                fontWeight: '600',
                color: colors.text,
                textAlign: 'center',
              }]}>
                {mockProfile.favoriteAircraft}
              </Text>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
          <View style={{
            flexDirection: 'row',
            backgroundColor: colors.surfaceAlt,
            borderRadius: 16,
            padding: 4,
            marginBottom: 30,
          }}>
            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                },
                activeTab === 'profile' && {
                  backgroundColor: colors.background,
                  ...shadows.small,
                }
              ]}
              onPress={() => setActiveTab('profile')}
            >
              <Text style={[commonStyles.textMedium, {
                color: activeTab === 'profile' ? colors.text : colors.textMuted,
                fontWeight: '600',
              }]}>
                Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                {
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                },
                activeTab === 'achievements' && {
                  backgroundColor: colors.background,
                  ...shadows.small,
                }
              ]}
              onPress={() => setActiveTab('achievements')}
            >
              <Text style={[commonStyles.textMedium, {
                color: activeTab === 'achievements' ? colors.text : colors.textMuted,
                fontWeight: '600',
              }]}>
                Achievements
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
          {activeTab === 'profile' ? (
            <>
              {/* Premium Status */}
              {mockProfile.isPremium && (
                <View style={[commonStyles.card, {
                  backgroundColor: colors.warning,
                  alignItems: 'center',
                  marginBottom: 30,
                  ...shadows.orange,
                }]}>
                  <Icon name="diamond" size={32} color={colors.textInverse} />
                  <Text style={[commonStyles.subtitleMedium, {
                    color: colors.textInverse,
                    marginTop: 8,
                    fontSize: 18,
                    fontWeight: '700',
                  }]}>
                    Premium Member
                  </Text>
                  <Text style={[commonStyles.textLight, {
                    color: colors.textInverse,
                    textAlign: 'center',
                    opacity: 0.9,
                  }]}>
                    Enjoy exclusive benefits and priority support
                  </Text>
                </View>
              )}

              {/* Menu Items */}
              <Text style={[commonStyles.subtitle, {
                fontSize: 20,
                fontWeight: '700',
                color: colors.text,
                marginBottom: 20,
              }]}>
                Account
              </Text>

              {menuItems.map(renderMenuItem)}

              {/* Action Buttons */}
              <View style={{ marginTop: 30, gap: 12 }}>
                <Button
                  text="Edit Profile"
                  onPress={handleEditProfile}
                  variant="outline"
                  icon={<Icon name="create-outline" size={20} color={colors.primary} />}
                  iconPosition="left"
                />

                <Button
                  text="Sign Out"
                  onPress={handleLogout}
                  variant="ghost"
                  icon={<Icon name="log-out-outline" size={20} color={colors.danger} />}
                  iconPosition="left"
                  textStyle={{ color: colors.danger }}
                />
              </View>
            </>
          ) : (
            <>
              <Text style={[commonStyles.subtitle, {
                fontSize: 20,
                fontWeight: '700',
                color: colors.text,
                marginBottom: 20,
              }]}>
                Your Achievements
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {achievements.map(renderAchievement)}
              </ScrollView>

              <View style={[commonStyles.card, {
                alignItems: 'center',
                marginTop: 30,
                backgroundColor: colors.backgroundAlt,
              }]}>
                <Icon name="trophy-outline" size={48} color={colors.textMuted} />
                <Text style={[commonStyles.subtitle, {
                  marginTop: 16,
                  color: colors.textMuted,
                  fontSize: 18,
                }]}>
                  More achievements coming soon!
                </Text>
                <Text style={[commonStyles.textLight, {
                  textAlign: 'center',
                  marginTop: 8,
                  color: colors.textLight,
                }]}>
                  Keep flying to unlock new achievements
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
