import '../global.css';

import { Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('hasCompletedOnboarding');
        if (value !== null) {
          setHasCompletedOnboarding(true);
          if (window.location.pathname !== '/leaderboard') {
            router.replace('/(tabs)');
          }
        } else {
          router.replace('/(onboarding)');
        }
      } catch (e) {
        // error reading value
      }
    };

    checkOnboardingStatus();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9FE' }}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: 'transparent' },
          headerStyle: { backgroundColor: '#F9F9FE' },
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="notification" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
