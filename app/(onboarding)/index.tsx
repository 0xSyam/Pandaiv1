import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Dimensions } from 'react-native';
import { useState } from 'react';
import OnboardingScreenComponent from '~/components/OnboardingScreen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const onboardingData = [
  {
    id: '1',
    imageSource: require('~/assets/onboarding/1/image.png'),
    subtitle: 'Pembimbing Andalan Berbasis Artificial Intelligence',
    buttonTitle: 'Get Started',
  },
  {
    id: '2',
    imageSource: require('~/assets/onboarding/2/image.png'),
    title: 'Your Learning Assistant 24/7',
    subtitle: 'No need to wait for a tutor, PANDAI is ready to help anytime',
    buttonTitle: 'Next',
  },
  {
    id: '3',
    imageSource: require('~/assets/onboarding/3/image.png'),
    title: 'Learn the Way You Like',
    subtitle: 'Everyone has a unique way of learning. Discover yours with PANDAI!',
    buttonTitle: 'Next',
  },
  {
    id: '4',
    imageSource: require('~/assets/onboarding/4/image.png'),
    title: 'Being Smart is a Choice',
    subtitle: 'Let’s Be PANDAI!\nStart your journey with PANDAI and learn smarter today',
    buttonTitle: 'Start Now',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const translateX = useSharedValue(0);
  const { width } = Dimensions.get('window');

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleGetStarted = async () => {
    translateX.value = withTiming(-width, { duration: 300 }, (isFinished) => {
      if (isFinished) {
        if (currentStep < onboardingData.length - 1) {
          runOnJS(setCurrentStep)(currentStep + 1);
          translateX.value = width;
          translateX.value = withTiming(0, { duration: 300 });
        } else {
          try {
            AsyncStorage.setItem('hasCompletedOnboarding', 'true');
            runOnJS(router.replace)('/(auth)');
          } catch (e) {
            // saving error
          }
        }
      }
    });
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
      router.replace('/(auth)');
    } catch (e) {
      // saving error
    }
  };

  const currentOnboardingData = onboardingData[currentStep];

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        <OnboardingScreenComponent
          imageSource={currentOnboardingData.imageSource}
          title={currentOnboardingData.title}
          subtitle={currentOnboardingData.subtitle}
          handleGetStarted={handleGetStarted}
          handleSkip={handleSkip}
          isFirstScreen={currentStep === 0}
          buttonTitle={currentOnboardingData.buttonTitle}
        />
      </Animated.View>
    </View>
  );
}