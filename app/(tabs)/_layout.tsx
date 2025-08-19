
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import { Platform, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import tab screens
import HomeScreen from './index';
import PremiumScreen from './premium';
import ProfileScreen from './profile';
import PilotLogScreen from './pilotlog';

const Tab = createBottomTabNavigator();

// Define unique colors for each tab
const tabColors = {
  index: {
    active: '#FF6B35',
    inactive: '#FFB74D',
    gradient: ['#FF6B35', '#FF8A65'],
    background: 'rgba(255, 107, 53, 0.1)',
  },
  premium: {
    active: '#9C27B0',
    inactive: '#CE93D8',
    gradient: ['#9C27B0', '#BA68C8'],
    background: 'rgba(156, 39, 176, 0.1)',
  },
  pilotlog: {
    active: '#2196F3',
    inactive: '#90CAF9',
    gradient: ['#2196F3', '#42A5F5'],
    background: 'rgba(33, 150, 243, 0.1)',
  },
  profile: {
    active: '#FF5722',
    inactive: '#FFAB91',
    gradient: ['#FF5722', '#FF8A65'],
    background: 'rgba(255, 87, 34, 0.1)',
  },
};

// Custom tab bar icon component with gradient background
const TabIcon = ({ route, focused, size }: { route: any, focused: boolean, size: number }) => {
  let iconName: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;
  const tabColor = tabColors[route.name as keyof typeof tabColors];

  switch (route.name) {
    case 'index':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'premium':
      iconName = focused ? 'diamond' : 'diamond-outline';
      break;
    case 'pilotlog':
      iconName = focused ? 'book' : 'book-outline';
      break;
    case 'profile':
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = 'home-outline';
  }

  if (focused) {
    return (
      <View style={{
        width: size + 20,
        height: size + 20,
        borderRadius: (size + 20) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tabColor.background,
        shadowColor: tabColor.active,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}>
        <LinearGradient
          colors={tabColor.gradient}
          style={{
            width: size + 16,
            height: size + 16,
            borderRadius: (size + 16) / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={iconName} size={size} color={colors.textInverse} />
        </LinearGradient>
      </View>
    );
  }

  return <Icon name={iconName} size={size} color={tabColor.inactive} />;
};

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <TabIcon route={route} focused={focused} size={size} />
        ),
        tabBarActiveTintColor: tabColors[route.name as keyof typeof tabColors]?.active || colors.primary,
        tabBarInactiveTintColor: tabColors[route.name as keyof typeof tabColors]?.inactive || colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: 'transparent',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 25 : 15,
          paddingTop: 15,
          height: Platform.OS === 'ios' ? 100 : 80,
          shadowColor: colors.shadowDark,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          position: 'absolute',
          left: 10,
          right: 10,
          bottom: Platform.OS === 'ios' ? 10 : 5,
          marginHorizontal: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 6,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
        },
        tabBarItemStyle: {
          paddingVertical: 5,
          borderRadius: 15,
          marginHorizontal: 2,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.9)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            }}
          />
        ),
      })}
    >
      <Tab.Screen 
        name="index" 
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen 
        name="premium" 
        component={PremiumScreen}
        options={{
          title: 'Premium',
        }}
      />
      <Tab.Screen 
        name="pilotlog" 
        component={PilotLogScreen}
        options={{
          title: 'Pilot Log',
        }}
      />
      <Tab.Screen 
        name="profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
}
