import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import matematikaImg from '../../assets/icon/matematika.png';
import fisikaImg from '../../assets/icon/fisika.png';
import kimiaImg from '../../assets/icon/kimia.png';
import biologiImg from '../../assets/icon/biologi.png';
import bingImg from '../../assets/icon/bing.png';
import bindoImg from '../../assets/icon/bindo.png';

const SUBJECTS = [
  { id: 'math', name: 'Matematika', img: matematikaImg },
  { id: 'physics', name: 'Fisika', img: fisikaImg },
  { id: 'chem', name: 'Kimia', img: kimiaImg },
  { id: 'bio', name: 'Biologi', img: biologiImg },
  { id: 'en', name: 'Bahasa Inggris', img: bingImg },
  { id: 'id', name: 'Bahasa Indonesia', img: bindoImg },
];

function SubjectListItem({ item }: { item: (typeof SUBJECTS)[0] }) {
  const { name, img } = item;
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.iconWrap}>
        <Image source={img} style={{ width: 40, height: 40, resizeMode: 'contain' }} />
      </View>
      <Text style={styles.cardTitle}>{name}</Text>
      <Ionicons name="chevron-forward" size={28} color="#A0AEC0" style={styles.chevron} />
    </TouchableOpacity>
  );
}

export default function ExamRoom() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ruang Ujian</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.bg}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {SUBJECTS.map((item) => (
              <SubjectListItem key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#F4F7FE',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // Same width as back button to center the title
  },
  bg: {
    flex: 1,
    backgroundColor: '#F4F7FE',
    paddingTop: 24, // Add space between header and cards
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFF9EC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  chevron: {
    marginLeft: 8,
  },
});
