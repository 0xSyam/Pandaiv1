import { Text, View, Image, TouchableOpacity, SafeAreaView, ImageSourcePropType } from 'react-native';
import { Button } from '~/components/Button';

type OnboardingScreenProps = {
  imageSource: ImageSourcePropType;
  title?: string;
  subtitle: string;
  handleGetStarted?: () => void;
  handleSkip: () => void;
  isFirstScreen: boolean;
  buttonTitle: string;
};

export default function OnboardingScreen({
  imageSource,
  title = 'Welcome to\nPANDAI',
  subtitle,
  handleGetStarted,
  handleSkip,
  isFirstScreen,
  buttonTitle,
}: OnboardingScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#F8F8FD]">
      <View className="w-full items-end pt-12 px-4">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-base text-gray-500">Skip</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 justify-center items-center">
        {isFirstScreen && (
          <View className="w-full absolute top-16 px-8">
            <Text className="text-4xl text-left font-bold">{title}</Text>
          </View>
        )}

        <View className="items-center">
          <Image source={imageSource} className="w-64 h-64" resizeMode="contain" />
          {!isFirstScreen && title && (
            <Text className="text-2xl font-bold text-center mt-8 mx-8">{title}</Text>
          )}
          <View className="items-center px-8 mt-4">
            <Text className="text-lg text-center">{subtitle}</Text>
          </View>
        </View>
        <View className="w-full absolute bottom-12 px-8">
          {handleGetStarted && (
            <Button title={buttonTitle} onPress={handleGetStarted} className="self-center" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}