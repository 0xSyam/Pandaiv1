import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { exerciseData } from '../../data/quizData';

export default function ExerciseScreen() {
  const router = useRouter();
  const { material } = useLocalSearchParams();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const materialKey = material as keyof typeof exerciseData;
  const exercise = exerciseData[materialKey] || exerciseData['zat-dan-perubahannya'];

  // Filter exercises by category if selected
  const filteredExercises = selectedCategory 
    ? exercise.exercises.filter(ex => ex.category === selectedCategory)
    : exercise.exercises;

  const categories = [...new Set(exercise.exercises.map(ex => ex.category))];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setCurrentExercise(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleAnswerChange = (answer: any) => {
    const newAnswers = [...answers];
    newAnswers[currentExercise] = answer;
    setAnswers(newAnswers);
  };

  const checkAnswer = () => {
    if (!answers[currentExercise]) {
      Alert.alert('Jawaban Kosong', 'Silakan isi jawaban terlebih dahulu');
      return;
    }
    setShowResult(true);
  };

  const nextExercise = () => {
    if (currentExercise < filteredExercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setShowResult(false);
    }
  };

  const previousExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setShowResult(false);
    }
  };

  const renderCategorySelection = () => (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Latihan Soal</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.introCard}>
          <Icon name="edit" size={48} color="#406AFF" />
          <Text style={styles.introTitle}>{exercise.title}</Text>
          <Text style={styles.introDescription}>{exercise.description}</Text>
        </View>

        <Text style={styles.categoryTitle}>Pilih Kategori Soal</Text>
        
        <View style={styles.categoryGrid}>
          {categories.map((category, index) => {
            const categoryCount = exercise.exercises.filter(ex => ex.category === category).length;
            return (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() => handleCategorySelect(category)}
              >
                <View style={styles.categoryIcon}>
                  <Icon 
                    name={
                      category === 'Pilihan Ganda' ? 'checksquare' :
                      category === 'Essay' ? 'edit' :
                      category === 'Benar/Salah' ? 'checkcircle' : 'questioncircle'
                    } 
                    size={24} 
                    color="#406AFF" 
                  />
                </View>
                <Text style={styles.categoryName}>{category}</Text>
                <Text style={styles.categoryCount}>{categoryCount} soal</Text>
                <Icon name="arrowright" size={16} color="#6B7280" />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity 
          style={styles.allExerciseButton}
          onPress={() => handleCategorySelect('')}
        >
          <Text style={styles.allExerciseText}>Kerjakan Semua Soal ({exercise.exercises.length})</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderMultipleChoice = (exercise: any) => (
    <View style={styles.optionsContainer}>
      {exercise.options.map((option: string, index: number) => {
        const isSelected = answers[currentExercise] === index;
        const isCorrect = index === exercise.correctAnswer;
        const showCorrect = showResult && isCorrect;
        const showWrong = showResult && isSelected && !isCorrect;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              isSelected && styles.selectedOption,
              showCorrect && styles.correctOption,
              showWrong && styles.wrongOption
            ]}
            onPress={() => !showResult && handleAnswerChange(index)}
            disabled={showResult}
          >
            <View style={styles.optionContent}>
              <View style={[
                styles.optionIndicator,
                isSelected && styles.selectedIndicator,
                showCorrect && styles.correctIndicator,
                showWrong && styles.wrongIndicator
              ]}>
                <Text style={[
                  styles.optionLetter,
                  (isSelected || showCorrect) && styles.selectedLetter
                ]}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={[
                styles.optionText,
                isSelected && styles.selectedOptionText,
                showCorrect && styles.correctOptionText
              ]}>
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderTrueFalse = (exercise: any) => (
    <View style={styles.trueFalseContainer}>
      {[true, false].map((value, index) => {
        const isSelected = answers[currentExercise] === value;
        const isCorrect = value === exercise.correctAnswer;
        const showCorrect = showResult && isCorrect;
        const showWrong = showResult && isSelected && !isCorrect;

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.trueFalseButton,
              isSelected && styles.selectedTrueFalse,
              showCorrect && styles.correctTrueFalse,
              showWrong && styles.wrongTrueFalse
            ]}
            onPress={() => !showResult && handleAnswerChange(value)}
            disabled={showResult}
          >
            <Icon 
              name={value ? "checkcircle" : "closecircle"} 
              size={24} 
              color={
                showCorrect ? "#10B981" :
                showWrong ? "#EF4444" :
                isSelected ? "#406AFF" : "#6B7280"
              } 
            />
            <Text style={[
              styles.trueFalseText,
              isSelected && styles.selectedTrueFalseText,
              showCorrect && styles.correctTrueFalseText,
              showWrong && styles.wrongTrueFalseText
            ]}>
              {value ? "Benar" : "Salah"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderEssay = () => (
    <View style={styles.essayContainer}>
      <TextInput
        style={styles.essayInput}
        placeholder="Tulis jawaban Anda di sini..."
        placeholderTextColor="#9CA3AF"
        multiline
        numberOfLines={8}
        value={answers[currentExercise] || ''}
        onChangeText={(text) => handleAnswerChange(text)}
        textAlignVertical="top"
        editable={!showResult}
      />
      {showResult && (
        <View style={styles.sampleAnswerContainer}>
          <Text style={styles.sampleAnswerTitle}>Contoh Jawaban:</Text>
          <Text style={styles.sampleAnswerText}>{filteredExercises[currentExercise].sampleAnswer}</Text>
        </View>
      )}
    </View>
  );

  const renderExerciseContent = () => {
    const exercise = filteredExercises[currentExercise];
    
    return (
      <ScrollView style={styles.container}>
        <View style={styles.exerciseHeader}>
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <Icon name="left" size={20} color="#333" />
          </TouchableOpacity>
          <View style={styles.exerciseProgress}>
            <Text style={styles.progressText}>
              {currentExercise + 1} / {filteredExercises.length}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentExercise + 1) / filteredExercises.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
          </View>
        </View>

        <View style={styles.exerciseContent}>
          <View style={styles.exerciseCard}>
            <View style={styles.exerciseCardHeader}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{exercise.category}</Text>
              </View>
            </View>
            
            <Text style={styles.questionText}>{exercise.question}</Text>
            
            {exercise.type === 'multiple-choice' && renderMultipleChoice(exercise)}
            {exercise.type === 'true-false' && renderTrueFalse(exercise)}
            {exercise.type === 'essay' && renderEssay()}

            {showResult && exercise.explanation && (
              <View style={styles.explanationContainer}>
                <View style={styles.explanationHeader}>
                  <Icon name="infocirlceo" size={20} color="#406AFF" />
                  <Text style={styles.explanationTitle}>Penjelasan</Text>
                </View>
                <Text style={styles.explanationText}>{exercise.explanation}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[styles.navButton, currentExercise === 0 && styles.disabledButton]}
            onPress={previousExercise}
            disabled={currentExercise === 0}
          >
            <Text style={[styles.navButtonText, currentExercise === 0 && styles.disabledButtonText]}>
              Sebelumnya
            </Text>
          </TouchableOpacity>
          
          {!showResult ? (
            <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
              <Text style={styles.checkButtonText}>Periksa Jawaban</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.nextButton, currentExercise === filteredExercises.length - 1 && styles.finishButton]}
              onPress={currentExercise === filteredExercises.length - 1 ? () => setSelectedCategory(null) : nextExercise}
            >
              <Text style={styles.nextButtonText}>
                {currentExercise === filteredExercises.length - 1 ? 'Selesai' : 'Selanjutnya'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {selectedCategory === null ? renderCategorySelection() : renderExerciseContent()}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
  },
  content: {
    padding: 20,
  },
  introCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  introDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoryGrid: {
    gap: 12,
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  allExerciseButton: {
    backgroundColor: '#406AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  allExerciseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseProgress: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#406AFF',
    borderRadius: 2,
  },
  difficultyBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#D97706',
  },
  exerciseContent: {
    flex: 1,
    padding: 20,
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
  exerciseCardHeader: {
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#406AFF',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 24,
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: 'white',
  },
  selectedOption: {
    borderColor: '#406AFF',
    backgroundColor: '#EEF2FF',
  },
  correctOption: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  wrongOption: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedIndicator: {
    backgroundColor: '#406AFF',
  },
  correctIndicator: {
    backgroundColor: '#10B981',
  },
  wrongIndicator: {
    backgroundColor: '#EF4444',
  },
  optionLetter: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedLetter: {
    color: 'white',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  selectedOptionText: {
    color: '#406AFF',
    fontWeight: '500',
  },
  correctOptionText: {
    color: '#10B981',
    fontWeight: '500',
  },
  trueFalseContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  trueFalseButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    gap: 8,
  },
  selectedTrueFalse: {
    borderColor: '#406AFF',
    backgroundColor: '#EEF2FF',
  },
  correctTrueFalse: {
    borderColor: '#10B981',
    backgroundColor: '#ECFDF5',
  },
  wrongTrueFalse: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  trueFalseText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedTrueFalseText: {
    color: '#406AFF',
  },
  correctTrueFalseText: {
    color: '#10B981',
  },
  wrongTrueFalseText: {
    color: '#EF4444',
  },
  essayContainer: {
    gap: 16,
  },
  essayInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#374151',
    backgroundColor: 'white',
    minHeight: 120,
  },
  sampleAnswerContainer: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#406AFF',
  },
  sampleAnswerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#406AFF',
    marginBottom: 8,
  },
  sampleAnswerText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#406AFF',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#406AFF',
    marginLeft: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  disabledButton: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  disabledButtonText: {
    color: '#9CA3AF',
  },
  checkButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#406AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  finishButton: {
    backgroundColor: '#10B981',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
