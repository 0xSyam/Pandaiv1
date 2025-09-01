import { Stack, useRouter } from 'expo-router';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { learnSubjects, difficultyLevels } from '../../data/learnData';

export default function Learn() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleSubjectPress = (item: any) => {
    router.push(`/subject/${item.key}` as any);
  };

  const handleGenerate = () => {
    // Logic untuk generate roadmap
    console.log('Generating roadmap for:', subject, 'Difficulty:', selectedDifficulty);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Icon name="left" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Generate Roadmap</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your subject"
              placeholderTextColor="#BEC0C7"
              value={subject}
              onChangeText={setSubject}
            />
          </View>

          <View style={styles.difficultyContainer}>
            <Text style={styles.difficultyLabel}>Difficulty Level</Text>
            <View style={styles.difficultyOptions}>
              {difficultyLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.difficultyOption,
                    selectedDifficulty === level.id && styles.selectedDifficulty
                  ]}
                  onPress={() => setSelectedDifficulty(level.id)}
                >
                  <View style={[
                    styles.radioButton,
                    selectedDifficulty === level.id && styles.radioButtonSelected
                  ]} />
                  <Text style={[
                    styles.difficultyText,
                    selectedDifficulty === level.id && styles.selectedDifficultyText
                  ]}>
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
            <Text style={styles.generateButtonText}>Generate</Text>
          </TouchableOpacity>

          <View style={styles.subjectsContainer}>
            {learnSubjects.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.subjectCard}
                onPress={() => handleSubjectPress(item)}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.backgroundColor }]}>
                  <View style={styles.iconWrapper}>
                    <Icon name="book" size={24} color={item.color} />
                  </View>
                </View>
                <Text style={styles.subjectTitle}>{item.title}</Text>
                <Icon name="right" size={16} color="#BEC0C7" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
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
    padding: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  difficultyContainer: {
    marginBottom: 32,
  },
  difficultyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  difficultyOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedDifficulty: {
    backgroundColor: '#F0F0FF',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  radioButtonSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#4F46E5',
  },
  difficultyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  selectedDifficultyText: {
    color: '#4F46E5',
    fontWeight: '500',
  },
  generateButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  subjectsContainer: {
    gap: 16,
  },
  subjectCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconWrapper: {
    padding: 4,
  },
  subjectTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});