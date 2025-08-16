import { AntDesign } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ClassPicker from '~/components/ClassPicker';
import ProfileInput from '~/components/ProfileInput';

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profile' }} />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            source={require('~/assets/profile/Ellipse 37.svg')}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Image
              source={require('~/assets/profile/edit-02.svg')}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Lorem</Text>
        <Text style={styles.status}>Student</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Your Email</Text>
          <ProfileInput
            vectorIcon={<AntDesign name="mail" size={24} color="black" />}
            value="Michaeli@gmail.com"
            placeholder="Enter your email"
            editable={false}
          />
          <Text style={styles.label}>Phone Number</Text>
          <ProfileInput
            icon={require('~/assets/profile/phone.svg')}
            value="0850892651"
            placeholder="Enter your phone number"
            editable={false}
          />
          <Text style={styles.label}>Kelas</Text>
          <View style={styles.pickerContainer}>
            <AntDesign name="mail" size={24} color="black" style={{ marginLeft: 10 }} />
            <View style={{ flex: 1 }}>
              <ClassPicker />
            </View>
          </View>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  profileContainer: {
    marginTop: 40,
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#406AFF',
    padding: 8,
    borderRadius: 20,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  name: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    marginTop: 4,
    fontSize: 16,
    color: '#888',
  },
  infoContainer: {
    marginTop: 32,
    width: 325,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 2,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
  },
  logoutButton: {
    display: 'flex',
    width: 126,
    height: 48,
    paddingVertical: 11,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: 15,
    backgroundColor: '#FF4C4C',
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
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
  logoutButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});