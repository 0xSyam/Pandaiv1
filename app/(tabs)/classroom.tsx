import { Stack } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import matematikaImg from '../../assets/icon/matematika.png';
import fisikaImg from '../../assets/icon/fisika.png';
import kimiaImg from '../../assets/icon/kimia.png';
import biologiImg from '../../assets/icon/biologi.png';
import bingImg from '../../assets/icon/bing.png';
import bindoImg from '../../assets/icon/bindo.png';

const { height: screenHeight } = Dimensions.get('window');

type Subject = {
  id: string;
  name: string;
  progress: number; // 0..1
  img: any;
};

const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Matematika', progress: 0.0, img: matematikaImg },
  { id: 'physics', name: 'Fisika', progress: 0.4, img: fisikaImg },
  { id: 'chem', name: 'Kimia', progress: 0.4, img: kimiaImg },
  { id: 'bio', name: 'Biologi', progress: 0.4, img: biologiImg },
  { id: 'en', name: 'Bahasa Inggris', progress: 0.2, img: bingImg },
  { id: 'id', name: 'Bahasa Indonesia', progress: 0.15, img: bindoImg },
];

function ProgressBar({ value }: { value: number }) {
  return (
    <View style={styles.progressTrack}>
      <View
        style={[styles.progressFill, { width: `${Math.min(100, Math.max(0, value * 100))}%` }]}
      />
    </View>
  );
}

function SubjectCard({ item }: { item: Subject }) {
  const { name, progress, img } = item;
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.card}>
      <Text style={styles.cardTitle}>{name}</Text>

      <View style={styles.cardIconWrap}>
        <Image source={img} style={{ width: 74, height: 74, resizeMode: 'contain' }} />
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.percentText}>{Math.round(progress * 100)}%</Text>
        <ProgressBar value={progress} />
      </View>
    </TouchableOpacity>
  );
}

export default function Classroom() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Ruang Kelas',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 0, padding: 8 }}
              onPress={() => {
                // Add navigation back logic here if needed
                console.log('Back button pressed');
              }}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
      <SafeAreaView style={styles.container}>
        {/* Fixed Header with Greeting */}
        <View style={styles.fixedHeader}>
          <Text style={styles.sectionLabel}>
            👋 Hello <Text style={{ color: '#2E90FA', fontWeight: '700' }}>Lorem</Text>
          </Text>

          <Text style={styles.hero}>
            Which <Text style={styles.heroAccent}>topic</Text> would you{'\n'}
            like to <Text style={styles.heroAccent}>enhance</Text>?
          </Text>
        </View>

        {/* Main Subjects Card - This will cover the header when scrolled */}
        <View style={styles.subjectsCard}>
          <ScrollView
            style={styles.subjectsScrollView}
            contentContainerStyle={styles.subjectsContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.gridWrap}>
              <FlatList
                scrollEnabled={false}
                numColumns={2}
                columnWrapperStyle={{ gap: 16 }}
                data={SUBJECTS}
                keyExtractor={(s) => s.id}
                renderItem={({ item }) => <SubjectCard item={item} />}
                contentContainerStyle={{ gap: 16 }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  fixedHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 50,
    zIndex: 1,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
    fontWeight: '600',
  },
  hero: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 0,
  },
  heroAccent: {
    color: '#2E90FA',
  },
  subjectsCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 32,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  subjectsScrollView: {
    flex: 1,
  },
  subjectsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  gridWrap: {
    marginTop: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    minHeight: 160,
  },
  cardIconWrap: {
    marginVertical: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 0,
  },
  cardFooter: {
    width: '100%',
    marginTop: 'auto',
    gap: 8,
  },
  percentText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    textAlign: 'left',
  },
  progressTrack: {
    height: 6,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#2E90FA',
  },
});
