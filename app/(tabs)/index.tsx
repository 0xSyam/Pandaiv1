import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

// Dummy data for the cards
const recommendedData = [
  {
    title: 'Matematika',
    subtitle: 'Dasar Aljabar',
    tags: ['Full Time', 'Intensif'],
    icon: '⭐️', // Placeholder for icon
  },
  {
    title: 'Biologi',
    subtitle: 'Sistem Ekresi',
    tags: ['Full Time'],
    icon: '⭐️', // Placeholder for icon
  },
];

const recentData = [
    {
        title: 'Biologi',
        subtitle: 'Fotosintensis',
        image: require('../../assets/icon.png'), // Placeholder for image
    }
]

export default function Home() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Create A Better Future{'\n'}For Your Self Today</Text>
          <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/notification')}>
            <Text>📄</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Cari Materi"
              placeholderTextColor="#BEC0C7"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Text>📊</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rekomendasi untuk Anda</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendedData.map((item, index) => (
              <View key={index} style={styles.recommendedCard}>
                <View style={styles.cardIconContainer}>
                  <Text>{item.icon}</Text>
                </View>
                <View style={styles.cardTags}>
                  {item.tags.map((tag, tagIndex) => (
                    <View key={tagIndex} style={styles.cardTag}>
                      <Text style={styles.cardTagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                <TouchableOpacity style={styles.cardButton}>
                  <Text style={styles.cardButtonText}>Belajar Sekarang</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Learner</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentData.map((item, index) => (
            <View key={index} style={styles.recentCard}>
              <Image source={item.image} style={styles.recentCardImage} />
              <View>
                <Text style={styles.recentCardTitle}>{item.title}</Text>
                <Text style={styles.recentCardSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FE',
  },
  content: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 40,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#090F24',
  },
  notificationButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#406AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 15,
    marginRight: 15,
    height: 60,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterButton: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#090F24',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#090F24',
  },
  seeAllText: {
    fontSize: 16,
    color: '#FFFFFF',
    backgroundColor: '#090F24',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  recommendedCard: {
    width: 280,
    height: 335,
    backgroundColor: '#2C3659',
    borderRadius: 25,
    padding: 25,
    marginRight: 15,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#434F76',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTags: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  cardTag: {
    backgroundColor: '#434F76',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  cardTagText: {
    color: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  cardButton: {
    backgroundColor: '#406AFF',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
  },
  recentCardImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 15,
  },
  recentCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#090F24',
  },
  recentCardSubtitle: {
    fontSize: 14,
    color: '#BEC0C7',
  },
});
