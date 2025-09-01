import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { subjectDetails } from '../../data/subjectDetailData';

export default function SubjectDetail() {
  const router = useRouter();
  const { subject } = useLocalSearchParams();
  
  const subjectKey = subject as keyof typeof subjectDetails;
  const subjectData = subjectDetails[subjectKey] || subjectDetails.fisika;

  const handleTopicPress = (topicTitle: string) => {
    // Convert topic title to material key
    let materialKey = '';
    switch(topicTitle.toLowerCase()) {
      case 'zat dan perubahannya':
        materialKey = 'zat-dan-perubahannya';
        break;
      case 'suhu, kalor, dan pemuaian':
        materialKey = 'suhu-kalor-pemuaian';
        break;
      default:
        materialKey = 'zat-dan-perubahannya';
    }
    router.push(`/material/${materialKey}` as any);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Icon name="left" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{subjectData.title}</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Icon name="search1" size={20} color="#BEC0C7" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#BEC0C7"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="filter" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>{subjectData.subtitle}</Text>

          <ScrollView style={styles.topicsContainer} showsVerticalScrollIndicator={false}>
            {subjectData.topics.map((topic: any) => (
              <TouchableOpacity 
                key={topic.id} 
                style={styles.topicCard}
                onPress={() => handleTopicPress(topic.title)}
                activeOpacity={0.7}
              >
                <View style={styles.cardContent}>
                  {/* Header with title and progress percentage */}
                  <View style={styles.cardHeader}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.topicTitle}>{topic.title}</Text>
                      <View style={styles.progressBadge}>
                        <Text style={styles.progressBadgeText}>{topic.progress}%</Text>
                        {topic.progress === 100 && (
                          <Icon name="checkcircle" size={12} color="#10B981" style={{marginLeft: 4}} />
                        )}
                      </View>
                    </View>
                    <Icon name="arrowright" size={16} color="#9CA3AF" />
                  </View>

                  {/* Stats row */}
                  <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                      <Icon name="book" size={14} color="#6B7280" />
                      <Text style={styles.statText}>{topic.lessons} halaman</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Icon name="edit" size={14} color="#6B7280" />
                      <Text style={styles.statText}>{topic.exercises} latihan</Text>
                    </View>
                  </View>

                  {/* Progress bar */}
                  <View style={styles.progressSection}>
                    <View style={styles.progressBarBackground}>
                      <View 
                        style={[
                          styles.progressBarFill, 
                          { 
                            width: `${topic.progress}%`,
                            backgroundColor: topic.progress === 100 ? '#10B981' : 
                                          topic.progress >= 50 ? '#406AFF' : 
                                          topic.progress > 0 ? '#F59E0B' : '#E5E7EB'
                          }
                        ]} 
                      />
                    </View>
                  </View>

                  {/* Action buttons */}
                  <View style={styles.actionRow}>
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.primaryAction]}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleTopicPress(topic.title);
                      }}
                    >
                      <Icon name="play" size={14} color="white" />
                      <Text style={styles.primaryActionText}>
                        {topic.progress === 0 ? 'Mulai' : topic.progress === 100 ? 'Review' : 'Lanjutkan'}
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.secondaryAction]}
                      onPress={(e) => e.stopPropagation()}
                    >
                      <Icon name="download" size={14} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  topicsContainer: {
    flex: 1,
  },
  topicCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  progressBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#406AFF',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 12,
    gap: 6,
  },
  primaryAction: {
    backgroundColor: '#406AFF',
    flex: 1,
    paddingHorizontal: 16,
  },
  primaryActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  secondaryAction: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
  },
  secondaryActionText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
});
