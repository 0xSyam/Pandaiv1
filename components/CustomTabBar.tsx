import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import TabBarBackground from './TabBarBackground';

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
  const activeRouteName = state.routes[state.index].name;

  if (activeRouteName === 'profile') {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row', height: 90 }}>
      <TabBarBackground />
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (route.name === 'scan') {
          return (
            <View
              key={route.key}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={onPress}
                style={{
                  backgroundColor: '#406AFF',
                  width: 79.787,
                  height: 79.787,
                  borderRadius: 93.867,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 70,
                  padding: 9.387,
                }}>
                <Image
                  source={require('~/assets/scan.png')}
                  style={{ width: 30, height: 30, tintColor: 'white' }}
                />
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <AntDesign
              name={
                label === 'Home'
                  ? 'home'
                  : label === 'Learn'
                  ? 'book'
                  : label === 'Calendar'
                  ? 'calendar'
                  : 'user'
              }
              size={28}
              color={isFocused ? '#406AFF' : '#757575'}
            />
            <Text style={{ color: isFocused ? '#406AFF' : '#757575', fontSize: 12 }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;