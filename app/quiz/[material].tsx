import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions, Modal, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { quizData } from '../../data/quizData';

const { width } = Dimensions.get('window');

export default function QuizScreen() {
  const router = useRouter();
  const { material } = useLocalSearchParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const materialKey = material as keyof typeof quizData;
  const quiz = quizData[materialKey] || quizData['zat-dan-perubahannya'];

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      handleQuizComplete();
    }
  }, [timeLeft, quizStarted, quizCompleted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(quiz.timeLimit * 60); // Convert to seconds
    setAnswers(new Array(quiz.questions.length).fill(null));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (showExplanation) {
      setShowExplanation(false);
      setSelectedAnswer(null);
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1]);
      } else {
        handleQuizComplete();
      }
    } else {
      if (selectedAnswer !== null) {
        setShowExplanation(true);
      } else {
        Alert.alert('Pilih Jawaban', 'Silakan pilih jawaban terlebih dahulu');
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setShowExplanation(false);
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const handleQuizComplete = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const renderStartScreen = () => (
    <View style={styles.startContainer}>
      <View style={styles.startCard}>
        <Icon name="Trophy" size={64} color="#4F46E5" />
        <Text style={styles.startTitle}>{quiz.title}</Text>
        <Text style={styles.startDescription}>{quiz.description}</Text>
        
        <View style={styles.quizInfo}>
          <View style={styles.infoRow}>
            <Icon name="clockcircleo" size={20} color="#6B7280" />
            <Text style={styles.infoText}>{quiz.timeLimit} menit</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="questioncircleo" size={20} color="#6B7280" />
            <Text style={styles.infoText}>{quiz.totalQuestions} pertanyaan</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="star" size={20} color="#6B7280" />
            <Text style={styles.infoText}>Nilai lulus: {quiz.passingScore}%</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton} onPress={startQuiz}>
          <Text style={styles.startButtonText}>Mulai Quiz</Text>
          <Icon name="arrowright" size={16} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderResultScreen = () => (
    <View style={styles.resultContainer}>
      <View style={styles.resultCard}>
        <Icon 
          name={score >= quiz.passingScore ? "checkcircle" : "closecircle"} 
          size={64} 
          color={score >= quiz.passingScore ? "#10B981" : "#EF4444"} 
        />
        <Text style={styles.resultTitle}>
          {score >= quiz.passingScore ? "Selamat!" : "Coba Lagi"}
        </Text>
        <Text style={styles.scoreText}>{score}%</Text>
        <Text style={styles.resultDescription}>
          {score >= quiz.passingScore 
            ? "Anda telah lulus quiz ini dengan baik!" 
            : "Belajar lagi dan coba sekali lagi!"
          }
        </Text>

        <View style={styles.resultStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{answers.filter((answer, index) => answer === quiz.questions[index].correctAnswer).length}</Text>
            <Text style={styles.statLabel}>Benar</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{answers.filter((answer, index) => answer !== quiz.questions[index].correctAnswer).length}</Text>
            <Text style={styles.statLabel}>Salah</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{quiz.totalQuestions}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>

        <View style={styles.resultButtons}>
          <TouchableOpacity 
            style={styles.reviewButton} 
            onPress={() => {
              setQuizCompleted(false);
              setCurrentQuestion(0);
              setShowExplanation(true);
            }}
          >
            <Text style={styles.reviewButtonText}>Review Jawaban</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.retryButton} onPress={() => {
            setQuizStarted(false);
            setQuizCompleted(false);
            setCurrentQuestion(0);
            setSelectedAnswer(null);
            setAnswers(new Array(quiz.questions.length).fill(null));
            setShowExplanation(false);
            setScore(0);
          }}>
            <Text style={styles.retryButtonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderQuestion = () => {
    const question = quiz.questions[currentQuestion];
    
    return (
      <View style={styles.questionContainer}>
        {/* Header */}
        <View style={styles.quizHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="left" size={20} color="#333" />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentQuestion + 1} / {quiz.totalQuestions}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestion + 1) / quiz.totalQuestions) * 100}%` }
                ]} 
              />
            </View>
          </View>
          <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
        </View>

        <ScrollView style={styles.questionContent} showsVerticalScrollIndicator={false}>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.question}</Text>
            
            <View style={styles.optionsContainer}>
              {question.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.selectedOption,
                    showExplanation && index === question.correctAnswer && styles.correctOption,
                    showExplanation && selectedAnswer === index && index !== question.correctAnswer && styles.wrongOption
                  ]}
                  onPress={() => !showExplanation && handleAnswerSelect(index)}
                  disabled={showExplanation}
                >
                  <View style={styles.optionContent}>
                    <View style={[
                      styles.optionIndicator,
                      selectedAnswer === index && styles.selectedIndicator,
                      showExplanation && index === question.correctAnswer && styles.correctIndicator,
                      showExplanation && selectedAnswer === index && index !== question.correctAnswer && styles.wrongIndicator
                    ]}>
                      <Text style={[
                        styles.optionLetter,
                        (selectedAnswer === index || (showExplanation && index === question.correctAnswer)) && styles.selectedLetter
                      ]}>
                        {String.fromCharCode(65 + index)}
                      </Text>
                    </View>
                    <Text style={[
                      styles.optionText,
                      selectedAnswer === index && styles.selectedOptionText,
                      showExplanation && index === question.correctAnswer && styles.correctOptionText
                    ]}>
                      {option}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {showExplanation && (
              <View style={styles.explanationContainer}>
                <View style={styles.explanationHeader}>
                  <Icon name="infocirlceo" size={20} color="#4F46E5" />
                  <Text style={styles.explanationTitle}>Penjelasan</Text>
                </View>
                <Text style={styles.explanationText}>{question.explanation}</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity 
            style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
            onPress={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <Text style={[styles.navButtonText, currentQuestion === 0 && styles.disabledButtonText]}>
              Sebelumnya
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {showExplanation 
                ? (currentQuestion === quiz.questions.length - 1 ? 'Selesai' : 'Selanjutnya')
                : 'Jawab'
              }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (!quizStarted) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        {renderStartScreen()}
      </>
    );
  }

  if (quizCompleted) {
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        {renderResultScreen()}
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      {renderQuestion()}
    </>
  );
}

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    padding: 20,
  },
  startCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  startTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  startDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  quizInfo: {
    width: '100%',
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 8,
  },
  startButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  questionContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  quizHeader: {
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
  progressContainer: {
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
    backgroundColor: '#4F46E5',
    borderRadius: 2,
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  questionContent: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 26,
    marginBottom: 24,
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
    borderColor: '#4F46E5',
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
    backgroundColor: '#4F46E5',
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
    fontSize: 16,
    color: '#374151',
    lineHeight: 22,
  },
  selectedOptionText: {
    color: '#4F46E5',
    fontWeight: '500',
  },
  correctOptionText: {
    color: '#10B981',
    fontWeight: '500',
  },
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4F46E5',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
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
  nextButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    padding: 20,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  resultStats: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  resultButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  reviewButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4F46E5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  reviewButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '600',
  },
  retryButton: {
    flex: 1,
    backgroundColor: '#4F46E5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
