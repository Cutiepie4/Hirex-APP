import React from "react";
import { SafeAreaView, Image, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';


const ViewImage = () => {

    const images = [
        require('../../assets/coffee.png'),
        require('../../assets/coffee3.png'),
        require('../../assets/coffee2.png')
    ];

    const navigation = useNavigation();

    const handleViewReviews = () => {
        navigation.navigate('Review')
    }

    return (
        <SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.buttonBack} onPress={handleViewReviews}>
                        <Ionicons name="arrow-back-outline" size={24} color="black" />
                    </TouchableOpacity>
                    <Swiper loop={false} horizontal={true} index={0}>
                        {images.map((image, index) => (
                            <View style={styles.slide} key={index}>
                                <Image source={image} style={styles.image} resizeMode="contain" />
                            </View>
                        ))}
                    </Swiper>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        flex: 1,
    },

    buttonBack: {
        zIndex: 99,
        position: 'absolute',
        top: 10,
        left: 10
    }
})

export default ViewImage
