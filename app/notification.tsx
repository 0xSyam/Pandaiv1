import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationCard from '../components/NotificationCard';

const NotificationScreen = () => {
  const router = useRouter();
  const notifications = [
    {
      id: 1,
      title: 'Materi Baru: Matematika Kelas 9',
      description: '3 topik baru telah ditambahkan',
      icon: 'book',
      read: false,
    },
    {
      id: 2,
      title: 'Rangkuman Materi Sejarah Kelas 9',
      description: '1 ringkasan siap dibaca',
      icon: 'summary',
      read: true,
    },
    {
      id: 3,
      title: 'Tugas Bahasa Indonesia Telah Dibuka',
      description: 'Selesaikan sebelum kehabisan waktu!',
      icon: 'assignment',
      read: true,
    },
    {
      id: 4,
      title: 'Latihan Soal IPA Kelas 9 sudah tersedia',
      description: 'Uji pemahamanmu tentang "Sistem Ekskresi" dengan 10 soal pilihan ganda.',
      icon: 'quiz',
      read: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require('~/assets/profile/arrow-left-02.svg')}
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView>
        {notifications.map((notification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#111111',
  },
});

export default NotificationScreen;