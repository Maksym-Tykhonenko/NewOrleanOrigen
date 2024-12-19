import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal } from "react-native"

const WelcomeModal = ({ visible, onClose }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={[styles.modalText, {color: '#f69809', fontWeight: '800', marginBottom: 15, fontSize: 20}]}>Welcome! 🌟</Text>
                    <Text style={styles.modalText}>Discover the rich history, iconic landmarks, and captivating stories that make this city truly unique. Dive into quizzes, explore legendary sites, and uncover the secrets of New Orleans' vibrant past.</Text>
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Text style={styles.closeBtnText}>Start your journey !</Text>
                    </TouchableOpacity>
                </View>
            </View>
    </Modal>
    )
};

const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },

    modalContent: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 20,
            height: 20,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    modalText: {
        fontSize: 18,
        fontWeight: '400',
        color: '#3C3C3B',
        textAlign: 'center',
        lineHeight: 21
    },

    closeBtn: {
        padding: 8,
        width: '100%',
        backgroundColor: '#ece096',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        borderWidth: 2,
        borderColor: '#5109ae'
    },

    closeBtnText: {
        fontSize: 16,
        fontWeight: '800',
        color: '#5109ae',
    }

})


export default WelcomeModal;