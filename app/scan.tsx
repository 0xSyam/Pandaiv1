import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function ScanScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  // Animation untuk gelombang suara
  const waveAnimations = useRef(
    Array.from({ length: 15 }, () => new Animated.Value(0.3))
  ).current;

  useEffect(() => {
    if (isAISpeaking) {
      startWaveAnimation();
    } else {
      stopWaveAnimation();
    }
  }, [isAISpeaking]);

  const startWaveAnimation = () => {
    const animations = waveAnimations.map((animation) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: Math.random() * 0.8 + 0.2,
            duration: 300 + Math.random() * 200,
            useNativeDriver: false,
          }),
          Animated.timing(animation, {
            toValue: Math.random() * 0.8 + 0.2,
            duration: 300 + Math.random() * 200,
            useNativeDriver: false,
          }),
        ])
      );
    });

    Animated.stagger(50, animations).start();
  };

  const stopWaveAnimation = () => {
    waveAnimations.forEach(animation => {
      animation.setValue(0.3);
    });
  };

  // Handle permission request
  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color="#406AFF" />
        <Text style={styles.permissionText}>Loading camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialIcons name="camera-alt" size={80} color="#9CA3AF" />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          Please allow camera access so AI can see and explain study materials
        </Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAIToggle = () => {
    setIsAISpeaking(!isAISpeaking);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleBack = () => {
    router.back();
  };

  const handleFavorite = () => {
    Haptics.selectionAsync();
    Alert.alert('Favorite', 'Added to favorites');
  };

  const handleActionButton = (action: string) => {
    Haptics.selectionAsync();
    
    if (action === 'Chat') {
      // Navigate to chat mode or open chat interface
      Alert.alert('Chat', 'Opening AI chat interface...');
    } else if (action === 'Camera') {
      // Toggle camera on/off
      Alert.alert('Camera', 'Camera toggle feature will be implemented');
    } else {
      Alert.alert(action, `${action} feature will be implemented`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Camera View */}
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
      >
        {/* Header */}
        <SafeAreaView style={styles.header}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            
            <Text style={styles.headerTitle}>Fotosintesis</Text>
            
            <TouchableOpacity style={styles.headerButton} onPress={handleFavorite}>
              <AntDesign name="staro" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {/* Center Animated Waveform */}
        <View style={styles.centerContainer}>
          <TouchableOpacity 
            style={styles.waveformContainer}
            onPress={handleAIToggle}
            activeOpacity={0.8}
          >
            {waveAnimations.map((animation, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.waveBar,
                  {
                    height: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [15, 80],
                    }),
                    backgroundColor: isAISpeaking ? '#EF4444' : '#FFFFFF',
                    opacity: isAISpeaking ? 0.9 : 0.6,
                  }
                ]}
              />
            ))}
          </TouchableOpacity>
        </View>

        {/* Right Side Vertical Action Buttons */}
        <View style={styles.rightSideActions}>
          <TouchableOpacity 
            style={styles.sideActionButton}
            onPress={() => handleActionButton('Chat')}
          >
            <MaterialIcons name="chat" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.sideActionButton}
            onPress={() => handleActionButton('Camera')}
          >
            <MaterialIcons name="videocam" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  permissionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  permissionButton: {
    backgroundColor: '#406AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  headerButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: '#406AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
    gap: 3,
    marginBottom: 30,
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
    minHeight: 15,
  },
  micContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  soundWave: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
  },
  wave1: {
    width: 100,
    height: 100,
    opacity: 0.8,
  },
  wave2: {
    width: 140,
    height: 140,
    opacity: 0.6,
  },
  wave3: {
    width: 180,
    height: 180,
    opacity: 0.4,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#406AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  micButtonActive: {
    backgroundColor: '#EF4444',
    transform: [{ scale: 1.1 }],
  },
  aiTextContainer: {
    maxWidth: width * 0.8,
    marginTop: 20,
  },
  micText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    lineHeight: 22,
  },
  rightSideActions: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    gap: 16,
  },
  sideActionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#406AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomCenterContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  aiButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#406AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  aiButtonActive: {
    backgroundColor: '#EF4444',
    transform: [{ scale: 1.1 }],
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 50,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    paddingHorizontal: 40,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#406AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
