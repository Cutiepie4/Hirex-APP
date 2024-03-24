import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Text, Image, FlatList, Dimensions } from 'react-native';
import { AntDesign, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'react-native-video';

const { height: heightScreen } = Dimensions.get('window');

const AddReview = () => {
    // const [image, setImage] = useState(null);
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
        setRating(value);
    };

    const maxVisibleImages = 3;

    const navigation = useNavigation();

    const handleViewAllReviews = () => {
        navigation.navigate('AllReview');
    };

    const [images, setImages] = useState([]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedImages = result.assets.map((asset) => asset.uri);
            setImages(prevImages => [...prevImages, ...selectedImages]);
        }
    };

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewBack}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleViewAllReviews}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.titleScreen}>
                        Thêm đánh giá
                    </Text>
                    <View></View>
                </View>
                <View>
                    <Text style={styles.textTitle}>Tên</Text>
                    <TextInput
                        placeholder='Gõ tên của bạn'
                        style={styles.textInputName}
                    >
                    </TextInput>
                </View>
                <View>
                    <Text style={styles.textTitle}>Trải nghiệm của bạn thế nào</Text>
                    <TextInput
                        placeholder='Mô tả của bạn'
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical='top'
                        style={styles.textInputDescribe}
                    >
                    </TextInput>
                </View>
                <View>
                    <Text style={styles.textTitle}>Đánh giá</Text>
                    <View style={styles.viewStar}>
                        <View style={{ flexDirection: 'row' }}>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <TouchableOpacity
                                    key={value}
                                    onPress={() => handleRating(value)}
                                    style={{ marginHorizontal: 4 }}
                                >
                                    <AntDesign
                                        name={value <= rating ? 'star' : 'staro'}
                                        size={28}
                                        color={value <= rating ? '#e3bf10' : '#6b6960'}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
                <View >
                    <Text style={styles.textTitle}>Ảnh</Text>
                    <View style={styles.viewImage}>

                        <View style={styles.container2}>
                            {images.slice(0, maxVisibleImages).map((image, index) => {
                                if (index === maxVisibleImages - 1 && images.length > maxVisibleImages) {
                                    const remainingImages = images.length - maxVisibleImages;
                                    return (
                                        <View key={image} style={styles.imageContainer}>
                                            <Image source={{ uri: image }} style={styles.image2} />
                                            <View style={[styles.overlay, { width: 80, height: 80 }]}>
                                                <Text style={styles.text}>+{remainingImages}</Text>
                                            </View>
                                        </View>
                                    );
                                } else {
                                    return (
                                        <View key={image}>
                                            <Image key={image} source={{ uri: image }} style={styles.image2} />
                                            <TouchableOpacity style={styles.removeButton} onPress={() => removeImage(index)}>
                                                <Text style={{ color: 'red' }}>&times;</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                }
                            })}
                        </View>

                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={pickImage}
                        >
                            <View style={styles.buttonAddReview}>
                                <Ionicons name="add" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.confirm}>
                <TouchableOpacity style={styles.buttonConfirm}>
                    <Text style={styles.textConfirm}>Xác nhận đánh giá</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        paddingHorizontal: 10,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
    },

    viewBack: {
        margin: 10
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: heightScreen / 26
    },

    titleScreen: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1D1E20',
        alignSelf: 'center'
    },

    textTitle: {
        fontSize: 16,
        color: '#1D1E20',
        fontWeight: '500'
    },

    textInputName: {
        width: '100%',
        height: heightScreen / 15,
        backgroundColor: '#ede8e8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        marginTop: 10
    },

    textInputDescribe: {
        width: '100%',
        height: heightScreen / 5,
        backgroundColor: '#ede8e8',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        marginTop: 10
    },

    viewStar: {
        backgroundColor: '#ede8e8',
        height: heightScreen / 14,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10
    },

    buttonAddReview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: heightScreen / 11,
        width: heightScreen / 10,
    },

    viewImage: {
        marginTop: 10,
        height: heightScreen / 10,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        // justifyContent: 'center'
        alignItems: 'center'
    },

    image: {
        flex: 1,
        resizeMode: 'contain',
    },

    confirm: {
        height: heightScreen / 16,
        backgroundColor: '#f58153',
        borderRadius: 8
    },

    textConfirm: {
        fontSize: 18,
        color: '#ffffff'
    },

    buttonConfirm: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    removeButton: {
        position: 'absolute',
        top: -8,
        right: 2,
        // backgroundColor: 'rgba(255, 255, 255, 0.7)',
        // padding: 5,
        borderRadius: 50,
    },

    container2: {
        flexDirection: 'row',
        marginHorizontal: 2
    },

    imageContainer: {
        position: 'relative',
    },

    image2: {
        width: 80,
        height: 80,
        marginRight: 5,
        borderRadius: 5
    },

    overlay: {
        // ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 5
    },

    text: {
        color: 'white',
        fontSize: 20,
    },
})

export default AddReview