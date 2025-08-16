import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import AntDesign from "@react-native-vector-icons/ant-design";

const ClassPicker = () => {
  const placeholder = {
    label: 'Pilih kelas...',
    value: null,
    color: '#FFFFFF',
  };

  const options = [
    { label: 'Kelas 1 SD', value: '1 SD' },
    { label: 'Kelas 2 SD', value: '2 SD' },
    { label: 'Kelas 3 SD', value: '3 SD' },
    { label: 'Kelas 4 SD', value: '4 SD' },
    { label: 'Kelas 5 SD', value: '5 SD' },
    { label: 'Kelas 6 SD', value: '6 SD' },
    { label: 'Kelas 1 SMP', value: '1 SMP' },
    { label: 'Kelas 2 SMP', value: '2 SMP' },
    { label: 'Kelas 3 SMP', value: '3 SMP' },
    { label: 'Kelas 1 SMA', value: '1 SMA' },
    { label: 'Kelas 2 SMA', value: '2 SMA' },
    { label: 'Kelas 3 SMA', value: '3 SMA' },
  ];

  return (
    <RNPickerSelect
      placeholder={placeholder}
      items={options}
      onValueChange={(value) => console.log(value)}
      style={pickerSelectStyles}
      useNativeAndroidPickerStyle={false}
      Icon={() => {
        return <AntDesign name="down" size={24} color="gray" />;
      }}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  viewContainer: {
    justifyContent: 'center',
  },
  inputIOS: {
    fontSize: 16,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    color: 'black',
    paddingRight: 50, // Push native icon off-screen
  },
  iconContainer: {
    top: '50%',
    marginTop: -12,
    right: 15,
  },
});

export default ClassPicker;