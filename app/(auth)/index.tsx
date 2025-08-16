import { Link, router } from 'expo-router';
import { Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from '~/components/Button';
export default function AuthScreen() {
  return (
    <View className="flex-1 justify-center p-6">
      <View className="mb-10">
        <Text className="text-4xl font-bold text-center text-gray-800">Hello Again!</Text>
        <Text className="text-lg text-center text-gray-500">Welcome Back You&apos;ve been missed</Text>
      </View>

      <View className="mb-5">
        <View className="flex-row items-center gap-3 rounded-[18px] bg-white px-3 py-4">
          <Icon name="envelope" size={20} color="gray" />
          <TextInput
            placeholder="Enter your email"
            className="flex-1 text-lg"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="mb-5">
        <View className="flex-row items-center gap-3 rounded-[18px] bg-white px-3 py-4">
          <Icon name="lock" size={20} color="gray" />
          <TextInput
            placeholder="Enter your password"
            className="flex-1 text-lg"
            secureTextEntry
          />
        </View>
      </View>

      <View className="items-end mb-5">
        <Link href="./">
          <Text className="text-blue-500">Forgot Password?</Text>
        </Link>
      </View>

      <Button title="Sign In" className="w-full" onPress={() => router.replace('/(tabs)')} />

      <View className="flex-row items-center my-5">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">Or</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      <Button title="Sign With Google" className="w-full bg-gray-200" />

      <View className="flex-row justify-center mt-5">
        <Text className="text-gray-500">Dont Have Account? </Text>
        <Link href="../(tabs)">
          <Text className="text-blue-500">Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}