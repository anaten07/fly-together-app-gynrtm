
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import { Platform } from 'react-native';

// Import tab screens
import HomeScreen from './index';
import PremiumScreen from './premium';
import ConciergeScreen from './concierge';
import InsuranceScreen from './insurance';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap;

          switch (route.name) {
            case 'index':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'premium':
              iconName = focused ? 'diamond' : 'diamond-outline';
              break;
            case 'concierge':
              iconName = focused ? 'person-circle' : 'person-circle-outline';
              break;
            case 'insurance':
              iconName = focused ? 'shield-checkmark' : 'shield-checkmark-outline';
              break;
            case 'profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'home-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 10,
          height: Platform.OS === 'ios' ? 90 : 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
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
        name="concierge" 
        component={ConciergeScreen}
        options={{
          title: 'Concierge',
        }}
      />
      <Tab.Screen 
        name="insurance" 
        component={InsuranceScreen}
        options={{
          title: 'Insurance',
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
