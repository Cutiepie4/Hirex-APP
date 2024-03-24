import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Text, Image, FlatList, Dimensions, ScrollView } from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const { height: heightScreen } = Dimensions.get('window');

const AllReview = () => {

    const images = [
        require('../../assets/anh2.jpg'),
        require('../../assets/anh4.jpg'),
        require('../../assets/anh5.jpg')
    ];

    const navigation = useNavigation();

    const handleReviews = () => {
        navigation.navigate('Review'); 
    };

    const handleAddRate = () => {
        navigation.navigate('AddReview'); 
    };

    const maxVisibleImages = 2;

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.viewBack}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={handleReviews}>
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.titleScreen}>
                            Đánh giá
                        </Text>
                        <View></View>
                    </View>
                </View>
                <View style={styles.quantityRecommend}>
                    <View>
                        <Text style={styles.textQuantityRecommend}>245 Đánh giá</Text>
                        <View style={styles.quantityStar}>
                            <Text>4.8</Text>
                            {[...Array(5)].map((_, index) => (
                                <FontAwesome
                                    key={index}
                                    style={{ marginLeft: 1 }}
                                    name="star"
                                    size={13}
                                    color="#FBBE21"
                                />
                            ))}
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleAddRate} style={styles.buttonAddReview}>
                        <FontAwesome name="pencil-square-o" size={17} color="white" />
                        <Text style={{ color: 'white' }}> Thêm đánh giá</Text>
                    </TouchableOpacity>
                </View>
                {[...Array(3)].map((_, index) => (
                    <View style={styles.boxRecommend} key={index}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '100%' }}>
                                <View style={styles.headerRecommend}>
                                    <View style={{ flexDirection: 'row', marginVertical: 6 }}>
                                        <Image source={require('../../assets/avata.png')} style={styles.avataUser}></Image>
                                        <View>
                                            <Text style={styles.textUser}>Nguyễn Văn A</Text>
                                            <View style={styles.boxTime}>
                                                <AntDesign name="clockcircleo" size={10} color="#8F959E" />
                                                <Text style={styles.textRecommend}> 13, Sep, 2024</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.rating}>
                                            <Text style={{ fontSize: 18 }}>4.8</Text>
                                            <Text style={styles.textRecommend}> rating</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            {[...Array(5)].map((_, index) => (
                                                <FontAwesome
                                                    key={index}
                                                    style={{ marginLeft: 1 }}
                                                    name="star"
                                                    size={12}
                                                    color="#FBBE21"
                                                />
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={{ width: '100%', textAlign: 'justify', color: '#9B9B9B' }}>Không gian quán rất đẹp, thanh lịch, các món ăn thực vật theo phong cách cao cấp nhưng giá cả vô cùng hợp lý.</Text>
                        <View style={styles.container2}>
                            {images.slice(0, maxVisibleImages).map((image, index) => {
                                if (index === maxVisibleImages - 1 && images.length > maxVisibleImages) {
                                    const remainingImages = images.length - maxVisibleImages;
                                    return (
                                        <View key={image} style={styles.imageContainer}>
                                            <Image source={image} style={styles.image2} />
                                            <View style={[styles.overlay, { width: 90, height: 90 }]}>
                                                <Text style={styles.text}>+{remainingImages}</Text>
                                            </View>
                                        </View>
                                    );
                                } else {
                                    return (
                                        <Image key={image} source={image} style={styles.image2} />
                                    );
                                }
                            })}
                        </View>
                    </View>
                ))}
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        paddingHorizontal: 20,
        backgroundColor: '#F5F5F5',
        // justifyContent: 'space-between',
    },

    viewBack: {
        margin: 10
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: heightScreen / 40
    },

    titleScreen: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1D1E20',
        alignSelf: 'center'
    },

    quantityRecommend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 6,
        marginBottom: 20
    },

    textQuantityRecommend: {
        fontSize: 15,
        fontWeight: '500'
    },

    quantityStar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    boxRecommend: {
        backgroundColor: '#f7f2f0',
        borderRadius: 6,
        paddingBottom: 6,
        paddingHorizontal: 6
    },

    buttonAddReview: {
        backgroundColor: '#FF7043',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    avataUser: {
        width: 30,
        height: 30,
        marginRight: 3
    },

    headerRecommend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    boxTime: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    container2: {
        flexDirection: 'row',
    },

    imageContainer: {
        position: 'relative',
    },

    image2: {
        marginTop: 5,
        width: 90,
        height: 90,
        marginRight: 5,
    },

    overlay: {
        // ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    text: {
        color: 'white',
        fontSize: 20,
    },

    textRecommend: {
        fontSize: 10,
        color: '#8F959E'
    },

    textUser: {
        fontWeight: '500',
        marginLeft: 1,
        marginBottom: 3
    },

    rating: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
})

export default AllReview