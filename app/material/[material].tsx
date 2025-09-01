import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { materialContent } from '../../data/materialContentData';

const { width } = Dimensions.get('window');

export default function MaterialDetail() {
  const router = useRouter();
  const { material } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('content');
  
  const materialKey = material as keyof typeof materialContent;
  const materialData = materialContent[materialKey] || materialContent['zat-dan-perubahannya'];

  const handleStartQuiz = () => {
    router.push(`/quiz/${material}` as any);
  };

  const handleStartExercise = () => {
    router.push(`/exercise/${material}` as any);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'content':
        return renderMainContent();
      case 'summary':
        return renderSummary();
      case 'quiz':
        return renderQuiz();
      default:
        return renderMainContent();
    }
  };

  const renderMainContent = () => (
    <View style={styles.contentContainer}>
      {/* Progress Card */}
      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Progress Pembelajaran</Text>
          <Text style={styles.progressPercentage}>{materialData.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${materialData.progress}%` }]} />
        </View>
        <View style={styles.progressInfo}>
          <View style={styles.infoItem}>
            <Icon name="clockcircleo" size={14} color="#6B7280" />
            <Text style={styles.infoText}>{materialData.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="star" size={14} color="#6B7280" />
            <Text style={styles.infoText}>{materialData.difficulty}</Text>
          </View>
        </View>
      </View>

      {/* Content Sections */}
      {materialData.sections.map((section: any) => (
        <View key={section.id} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          
          <Text style={styles.sectionContent}>{section.content}</Text>
          
          {section.subsections && section.subsections.map((subsection: any, index: number) => (
            <View key={index} style={styles.subsection}>
              <Text style={styles.subsectionTitle}>{subsection.title}</Text>
              
              {subsection.points.map((point: any, pointIndex: number) => (
                <View key={pointIndex} style={styles.pointContainer}>
                  <View style={styles.pointHeader}>
                    <View style={styles.bullet} />
                    <Text style={styles.pointTitle}>{point.title}</Text>
                  </View>
                  <Text style={styles.pointDescription}>{point.description}</Text>
                  
                  {point.examples && point.examples.length > 0 && (
                    <View style={styles.examplesContainer}>
                      <Text style={styles.examplesLabel}>Contoh:</Text>
                      {point.examples.map((example: string, exIndex: number) => (
                        <Text key={exIndex} style={styles.exampleText}>• {example}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const renderSummary = () => (
    <View style={styles.contentContainer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Poin-Poin Penting</Text>
        {materialData.keyPoints.map((point: string, index: number) => (
          <View key={index} style={styles.keyPointItem}>
            <View style={styles.keyPointBullet} />
            <Text style={styles.keyPointText}>{point}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderQuiz = () => (
    <View style={styles.contentContainer}>
      <View style={styles.quizCard}>
        <View style={styles.quizHeader}>
          <Icon name="Trophy" size={32} color="#406AFF" />
          <Text style={styles.quizTitle}>Uji Pemahaman</Text>
        </View>
        
        <View style={styles.quizStats}>
          <View style={styles.quizStatItem}>
            <Text style={styles.quizStatNumber}>{materialData.quiz.questions}</Text>
            <Text style={styles.quizStatLabel}>Pertanyaan</Text>
          </View>
          <View style={styles.quizStatItem}>
            <Text style={styles.quizStatNumber}>{materialData.quiz.timeLimit}</Text>
            <Text style={styles.quizStatLabel}>Menit</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.startQuizButton} onPress={handleStartQuiz}>
          <Text style={styles.startQuizText}>Mulai Quiz</Text>
          <Icon name="arrowright" size={16} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.exerciseCard}>
        <Text style={styles.exerciseTitle}>Latihan Soal</Text>
        <Text style={styles.exerciseDescription}>
          {materialData.exercises.count} soal latihan tersedia
        </Text>
        
        <View style={styles.exerciseTypes}>
          {materialData.exercises.types.map((type: string, index: number) => (
            <View key={index} style={styles.exerciseTypeChip}>
              <Text style={styles.exerciseTypeText}>{type}</Text>
            </View>
          ))}
        </View>
        
        <TouchableOpacity style={styles.startExerciseButton} onPress={handleStartExercise}>
          <Text style={styles.startExerciseText}>Mulai Latihan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Icon name="left" size={20} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{materialData.title}</Text>
            <Text style={styles.headerSubtitle}>{materialData.subtitle}</Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'content' && styles.activeTab]}
            onPress={() => setActiveTab('content')}
          >
            <Text style={[styles.tabText, activeTab === 'content' && styles.activeTabText]}>
              Materi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'summary' && styles.activeTab]}
            onPress={() => setActiveTab('summary')}
          >
            <Text style={[styles.tabText, activeTab === 'summary' && styles.activeTabText]}>
              Ringkasan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'quiz' && styles.activeTab]}
            onPress={() => setActiveTab('quiz')}
          >
            <Text style={[styles.tabText, activeTab === 'quiz' && styles.activeTabText]}>
              Latihan
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {renderContent()}
        </ScrollView>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#406AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: '#406AFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  contentContainer: {
    padding: 20,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressPercentage: {
    fontSize: 16,
    fontWeight: '700',
    color: '#406AFF',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#406AFF',
    borderRadius: 4,
  },
  progressInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: '#6B7280',
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  sectionContent: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
    marginBottom: 16,
  },
  subsection: {
    marginBottom: 20,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  pointContainer: {
    marginBottom: 16,
    paddingLeft: 8,
  },
  pointHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#406AFF',
    marginRight: 12,
  },
  pointTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  pointDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
    marginLeft: 18,
    marginBottom: 8,
  },
  examplesContainer: {
    marginLeft: 18,
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#406AFF',
  },
  examplesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#406AFF',
    marginBottom: 6,
  },
  exampleText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  keyPointItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  keyPointBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 12,
    marginTop: 6,
  },
  keyPointText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: '#1F2937',
  },
  quizCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quizHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 8,
  },
  quizStats: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 24,
  },
  quizStatItem: {
    alignItems: 'center',
  },
  quizStatNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#406AFF',
  },
  quizStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  startQuizButton: {
    backgroundColor: '#406AFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  startQuizText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  exerciseTypes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  exerciseTypeChip: {
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  exerciseTypeText: {
    fontSize: 12,
    color: '#406AFF',
    fontWeight: '500',
  },
  startExerciseButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  startExerciseText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
});
