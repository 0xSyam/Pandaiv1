import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Learn() {
  return (
    <>
      <Stack.Screen options={{ title: 'Learn' }} />
      <View style={styles.container}>
        <ScreenContent path="app/(tabs)/learn.tsx" title="Learn" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});