import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';

export default function Learn() {
  return (
    <>
      <Stack.Screen options={{ title: 'Learn' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Pilih Ruang</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/exam-room')}>
          <Text style={styles.buttonText}>Ruang Ujian</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/classroom')}>
          <Text style={styles.buttonText}>Ruang Kelas</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#2E90FA',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 20,
    width: 220,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
