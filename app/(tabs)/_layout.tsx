import { Tabs, useRouter } from 'expo-router';
import { Image, TouchableOpacity } from 'react-native';

import CustomTabBar from '~/components/CustomTabBar';

export default function TabLayout() {
  const router = useRouter();
  return (
    <Tabs tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Image
                source={require('~/assets/profile/arrow-left-02.svg')}
                style={{ width: 24, height: 24, marginLeft: 20 }}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity>
              <Image
                source={require('~/assets/profile/setting-2.svg')}
                style={{ width: 24, height: 24, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#F8F8F8',
          },
          headerShadowVisible: false,
        }}
      />
    </Tabs>
  );
}
