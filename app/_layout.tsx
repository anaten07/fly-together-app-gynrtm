
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { Stack, useGlobalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { commonStyles } from '../styles/commonStyles';
import { setupErrorLogging } from '../utils/errorLogger';

const STORAGE_KEY = 'emulated_device';

export default function RootLayout() {
  const actualInsets = useSafeAreaInsets();
  const { emulate } = useGlobalSearchParams<{ emulate?: string }>();
  const [storedEmulate, setStoredEmulate] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log('RootLayout mounted');
      // Set up global error logging
      setupErrorLogging();

      if (Platform.OS === 'web') {
        // If there's a new emulate parameter, store it
        if (emulate) {
          localStorage.setItem(STORAGE_KEY, emulate);
          setStoredEmulate(emulate);
          console.log('Stored emulate parameter:', emulate);
        } else {
          // If no emulate parameter, try to get from localStorage
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            setStoredEmulate(stored);
            console.log('Retrieved stored emulate parameter:', stored);
          }
        }
      }
    } catch (error) {
      console.error('Error in layout setup:', error);
    }
  }, [emulate]);

  let insetsToUse = actualInsets;

  if (Platform.OS === 'web') {
    const simulatedInsets = {
      ios: { top: 47, bottom: 20, left: 0, right: 0 },
      android: { top: 40, bottom: 0, left: 0, right: 0 },
    };

    // Use stored emulate value if available, otherwise use the current emulate parameter
    const deviceToEmulate = storedEmulate || emulate;
    insetsToUse = deviceToEmulate ? simulatedInsets[deviceToEmulate as keyof typeof simulatedInsets] || actualInsets : actualInsets;
  }

  console.log('RootLayout rendering with insets:', insetsToUse);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[commonStyles.wrapper, {
          paddingTop: insetsToUse.top,
          paddingBottom: insetsToUse.bottom,
          paddingLeft: insetsToUse.left,
          paddingRight: insetsToUse.right,
       }]}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'default',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="pilot/[id]" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
