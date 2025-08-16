import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LeaderboardScreen = () => {
  const users = [
    { id: 1, name: 'Terraform', rank: 1, image: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 2, name: 'Moonbirds', rank: 2, image: 'https://i.pravatar.cc/150?u=a042581f4e29026704e' },
    { id: 3, name: 'genuine Undead', rank: 3, image: 'https://i.pravatar.cc/150?u=a042581f4e29026704f' },
    { id: 4, name: 'Digital Tycoons Club (Tykes)', rank: 4, image: 'https://i.pravatar.cc/150?u=a042581f4e29026704a' },
    { id: 5, name: 'MutantApeYachtClub', rank: 5, image: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
    { id: 6, name: 'Otherdeed', rank: 6, image: 'https://i.pravatar.cc/150?u=a042581f4e29026704c' },
    { id: 7, name: 'Zafar', rank: 7, image: 'https://i.pravatar.cc/150?u=a042581f4e29026704g' },
    { id: 8, name: 'Kevin', rank: 8, image: 'https://i.pravatar.cc/150?u=a042581f4e29026704h' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
      </View>
      <ScrollView>
        {users.map((user) => (
          <View key={user.id} style={styles.userContainer}>
            <Text style={styles.rank}>{user.rank}</Text>
            <Image source={{ uri: user.image }} style={styles.avatar} />
            <Text style={styles.name}>{user.name}</Text>
          </View>
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
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#111111',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 15,
  },
  rank: {
    fontSize: 18,
    fontWeight: '500',
    width: 40,
    textAlign: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 15,
  },
  name: {
    fontSize: 17,
    fontWeight: '600',
  },
});

export default LeaderboardScreen;