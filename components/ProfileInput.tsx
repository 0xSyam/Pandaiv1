import React from 'react';
import { View, TextInput, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface ProfileInputProps {
  icon?: ImageSourcePropType;
  vectorIcon?: React.ReactNode;
  value: string;
  placeholder: string;
  editable?: boolean;
}

const ProfileInput: React.FC<ProfileInputProps> = ({
  icon,
  vectorIcon,
  value,
  placeholder,
  editable,
}) => {
  return (
    <View style={styles.container}>
      {icon && <Image source={icon} style={styles.icon} />}
      {vectorIcon}
      <TextInput style={styles.input} value={value} placeholder={placeholder} editable={editable} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: 325,
    height: 58,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    marginTop: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default ProfileInput;