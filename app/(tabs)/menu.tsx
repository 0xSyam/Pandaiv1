import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';

// Circular Progress Component (Simplified)
const CircularProgress = ({
  progress,
  size = 80,
  strokeWidth = 8,
  color = '#4F46E5',
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  return (
    <View style={[styles.circularProgressContainer, { width: size, height: size }]}>
      {/* Background Circle */}
      <View
        style={[
          styles.circularProgressBackground,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: '#E5E7EB',
          },
        ]}
      />
      {/* Progress Indicator - Simple approach */}
      <View
        style={[
          styles.circularProgressIndicator,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: 'transparent',
            borderTopColor: color,
            borderRightColor: progress > 25 ? color : 'transparent',
            borderBottomColor: progress > 50 ? color : 'transparent',
            borderLeftColor: progress > 75 ? color : 'transparent',
            transform: [{ rotate: `-${90 - progress * 3.6}deg` }],
          },
        ]}
      />
    </View>
  );
};

// Activity Bar Component
const ActivityBar = ({
  height,
  day,
  isActive,
}: {
  height: number;
  day: string;
  isActive: boolean;
}) => (
  <View style={styles.activityBarContainer}>
    <View style={styles.activityBarBackground}>
      <View
        style={[
          styles.activityBar,
          {
            height: `${height}%`,
            backgroundColor: isActive ? '#4F46E5' : '#E5E7EB',
          },
        ]}
      />
    </View>
    <Text style={styles.activityDay}>{day}</Text>
  </View>
);

export default function Menu() {
  const activityData = [
    { day: 'Sun', height: 60, isActive: true },
    { day: 'Mon', height: 80, isActive: true },
    { day: 'Tue', height: 90, isActive: true },
    { day: 'Wed', height: 70, isActive: true },
    { day: 'Thu', height: 95, isActive: true },
    { day: 'Fri', height: 75, isActive: true },
    { day: 'Sat', height: 50, isActive: true },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>See How Far You've Already{'\n'}Come!</Text>
          </View>

          {/* Quiz Stats Card */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.statsTextContainer}>
                <Text style={styles.statsText}>You Have Played a</Text>
                <Text style={styles.statsText}>
                  total <Text style={styles.highlightNumber}>20 quizzes</Text>
                </Text>
                <Text style={styles.statsText}>this month!</Text>
              </View>
              <View style={styles.circularContainer}>
                <CircularProgress progress={67} size={100} />
                <View style={styles.circularLabel}>
                  <Text style={styles.circularNumber}>20</Text>
                  <Text style={styles.circularSubtext}>/30</Text>
                  <Text style={styles.circularDescription}>quiz played</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Average Score Card */}
          <View style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.statsTextContainer}>
                <Text style={styles.scoreTitle}>Average Score</Text>
                <Text style={styles.scoreNumber}>75.00</Text>
                <Text style={styles.scoreSubtext}>in 20 days</Text>
              </View>
              <View style={styles.circularContainer}>
                <CircularProgress progress={75} size={100} color="#4F46E5" />
                <View style={styles.circularLabel}>
                  <Text style={styles.circularPercentage}>75%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Activity Chart */}
          <View style={styles.card}>
            <Text style={styles.activityTitle}>Activity</Text>
            <View style={styles.activityChart}>
              {activityData.map((item, index) => (
                <ActivityBar
                  key={index}
                  height={item.height}
                  day={item.day}
                  isActive={item.isActive}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 36,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsTextContainer: {
    flex: 1,
    paddingRight: 16,
  },
  statsText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  highlightNumber: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  scoreTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 4,
  },
  scoreSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
  circularContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressBackground: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  circularProgressIndicator: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  circularLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  circularNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  circularSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  circularDescription: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  circularPercentage: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4F46E5',
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 24,
  },
  activityChart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingBottom: 5,
  },
  activityBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  activityBarBackground: {
    width: 20,
    height: 145,
    backgroundColor: '#F1F3F4',
    borderRadius: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  activityBar: {
    width: '100%',
    borderRadius: 10,
    minHeight: 8,
  },
  activityDay: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    fontWeight: '500',
  },
});
