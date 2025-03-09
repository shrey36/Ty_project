import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const ReportModal = ({ isVisible, onClose, onReport }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Report Post</Text>

          <TouchableOpacity
            style={[styles.modalButton, styles.optionButton]}
            onPress={() => onReport('False Information')}
          >
            <Text style={styles.modalButtonText}>False Information</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, styles.optionButton]}
            onPress={() => onReport('Inappropriate Content')}
          >
            <Text style={styles.modalButtonText}>Inappropriate Content</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    width: '60%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333', // Darker text for the title
  },
  modalButton: {
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionButton: {
    backgroundColor: '#007BFF', // Modern blue shade
  },
  cancelButton: {
    backgroundColor: '#f5f5f5', // Light gray for cancel
    borderColor: '#ddd',
    borderWidth: 1,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff', // Default white text for options
  },
  cancelButtonText: {
    color: '#333', // Dark text for cancel button
  },
});

export default ReportModal;
