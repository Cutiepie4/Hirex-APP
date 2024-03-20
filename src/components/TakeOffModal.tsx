import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const TakeOffModal = ({ visible, onRequestClose, onTakeOff }) => {
    const [reason, setReason] = useState('');

    const handleTakeOff = () => {
        onTakeOff(reason);
        setReason('');
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onRequestClose}
        >
            <TouchableWithoutFeedback onPress={onRequestClose}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Lý do</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập lý do..."
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={reason}
                            onChangeText={setReason}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleTakeOff}>
                            <Text style={styles.buttonText}>Gửi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        width: '85%',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        borderColor: '#007BFF',
        borderWidth: 2,
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        color: '#333',
        height: 150, // Auto adjust height based on content
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#34C759', // iOS green color
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default TakeOffModal;