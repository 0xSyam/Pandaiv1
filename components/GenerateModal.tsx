import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface GenerateModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectSpecific: () => void;
  onSelectFull: () => void;
}

export default function GenerateModal({ 
  visible, 
  onClose, 
  onSelectSpecific, 
  onSelectFull 
}: GenerateModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.iconWrapper}>
              <Icon name="bulb1" size={28} color="white" />
            </View>
          </View>
          
          <Text style={styles.title}>Generate Course</Text>
          <Text style={styles.subtitle}>pilih salah satu roadmap</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.specificButton} 
              onPress={onSelectSpecific}
            >
              <Text style={styles.specificButtonText}>Specific</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.fullButton} 
              onPress={onSelectFull}
            >
              <Text style={styles.fullButtonText}>Kurikulum Full</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#406AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  specificButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  specificButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
  fullButton: {
    flex: 1,
    backgroundColor: '#406AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  fullButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});
