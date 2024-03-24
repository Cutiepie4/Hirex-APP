import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Platform, Dimensions, TouchableOpacity, Text, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome6, AntDesign, Entypo, Feather, FontAwesome, Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ReadMore from 'react-native-read-more-text';
import { useNavigation } from '@react-navigation/native';


const { height: heightScreen } = Dimensions.get('window');

const ReView = () => {

    const basicColors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#FF00FF', '#00FFFF'];
    const [currentColorIndex, setCurrentColorIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentColorIndex((currentColorIndex + 1) % basicColors.length);
        }, 1000);

        return () => clearInterval(interval);
    }, [currentColorIndex]);

    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(prevState => !prevState);
    };

    const images = [
        require('../../assets/anh2.jpg'),
        require('../../assets/anh4.jpg'),
        require('../../assets/anh5.jpg')
    ];

    const navigation = useNavigation();

    const handleViewAllReviews = () => {
        navigation.navigate('AllReview')
    }

    const handleViewSearchScreen = () => {
        navigation.navigate('SearchScreen')
    }

    const handleViewImage = () => {
        navigation.navigate('ViewImage')
    }

    const maxVisibleImages = 2;

    const [showFullText, setShowFullText] = useState(false);

    const handleReadMorePress = () => {
        setShowFullText(!showFullText);
    };

    const renderText = () => {
        const fullText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sagittis dapibus mi, sed molestie elit tempor sit amet. Mauris tincidunt efficitur nisl, id fermentum enim cursus ac. Aliquam in pulvinar velit. Sed auctor, massa id facilisis eleifend, dui mauris posuere elit, eget egestas diam nulla vitae nunc.';

        if (showFullText) {
            return fullText;
        } else {
            return fullText.substring(0, 100) + '...';
        }
    };

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <Swiper loop={false} horizontal={true}>
                        {images.map((image, index) => (
                            <View style={styles.slide} key={index}>
                                <Image source={image} style={styles.image} resizeMode="contain" />
                            </View>
                        ))}
                    </Swiper>
                </View>
                <View style={styles.content}>
                    <View style={styles.textHeader}>
                        <View>
                            <Text style={styles.name}>Highlands Coffee</Text>
                            <View style={styles.ratingHeader}>
                                <MaterialIcons name="star-rate" size={18} color="#FDCB6E" />
                                <Text style={styles.textRating}>4.4</Text>
                                <Text style={styles.quantityReview}>429 đánh giá</Text>
                            </View>
                            <Text style={styles.address}>Hà Đông, Hà Nội</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.location}>
                                <Entypo name="location" size={20} color="#C67C4E" />
                            </View>
                            <View style={styles.location}>
                                {/* <FontAwesome5 name="location-arrow" size={16} color="#C67C4E" /> */}
                                <TouchableOpacity onPress={handlePress}>
                                    <Octicons name={isPressed ? "heart-fill" : "heart"} size={20} color={isPressed ? "red" : "#C67C4E"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.viewOpption}>
                        <View style={styles.box}>
                            <AntDesign name="rest" size={30} color="#003B40" />
                            <Text style={styles.textBox}>Coffee</Text>
                        </View>

                        <View style={styles.box}>
                            <Image source={require('../../assets/cup.png')} style={styles.imageBox} resizeMode='contain'></Image>
                            <Text style={styles.textBox}>Đồ uống</Text>
                        </View>

                        <View style={styles.box}>
                            <Image source={require('../../assets/bread.png')} style={styles.imageBox} resizeMode='contain'></Image>
                            <Text style={styles.textBox}>Đồ ăn</Text>
                        </View>
                    </View>

                    <View style={styles.blurLine}></View>
                    <View style={{ marginTop: heightScreen / 70 }}>
                        <Text style={styles.describe}>Mô tả</Text>
                        <View   >
                            <Text style={{ textAlign: 'justify' }}>
                                <Text style={{ color: '#9B9B9B' }}>{renderText()}</Text>
                                {showFullText ? (
                                    <Text style={{ color: '#C67C4E' }} onPress={handleReadMorePress}> rút gọn</Text>
                                ) : (
                                    <Text style={{ color: '#C67C4E' }} onPress={handleReadMorePress}>đọc thêm</Text>
                                )}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.blurLine2}></View>
                    <View style={styles.boxHeaderRecommend}>
                        <Text style={styles.describe}>Đánh giá khách hàng</Text>
                        <TouchableOpacity onPress={handleViewAllReviews}>
                            <View style={styles.bottonAllReview}>
                                <Text style={{ color: '#C67C4E' }}>Xem tất cả</Text>
                                <MaterialIcons name="navigate-next" size={24} color="#C67C4E" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    {[...Array(3)].map((_, index) => (
                        <View style={styles.boxRecommend} key={index}>
                            <Image source={require('../../assets/avata.png')} style={{ width: 25, height: 25, marginRight: 3, marginTop: 3 }}></Image>
                            <View style={{ width: '90%' }}>
                                <Text style={{ marginLeft: 1, fontWeight: '500' }}>Nguyễn Văn A</Text>
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
                                <Text style={{ textAlign: 'justify', color: '#9B9B9B' }}>Không gian quán rất đẹp, thanh lịch, các món ăn thực vật theo phong cách cao cấp nhưng giá cả vô cùng hợp lý.</Text>
                                <TouchableOpacity onPress={handleViewImage}>
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
                                </TouchableOpacity>
                                <View style={styles.viewTime}>
                                    <AntDesign name="clockcircleo" size={12} color="gray" />
                                    <Text style={{ fontSize: 10, color: 'gray' }}> 13, Sep, 2024</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity onPress={handleViewSearchScreen}>
                        <View style={styles.viewSuggest}>
                            {/* <MaterialCommunityIcons name="hand-pointing-right" size={24} color="#003B40" /> */}
                            <Text style={{ alignSelf: 'center', color: basicColors[currentColorIndex] }}>Có thể bạn cũng thích</Text>
                            <MaterialCommunityIcons name="hand-pointing-left" size={24} color={basicColors[currentColorIndex]} />
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        backgroundColor: '#F5F5F5',
    },

    header: {
        height: heightScreen / 3,
    },

    back: {
        zIndex: 999,
        backgroundColor: '#ffffff',
        width: 36,
        height: 36,
        position: 'absolute',
        left: 22,
        top: 10,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },

    slide: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        flex: 1
    },

    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 20,
        paddingBottom: 50
    },

    textHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },

    name: {
        fontSize: 25,
        fontWeight: '500',
        color: "#003B40"
    },

    ratingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2
    },

    textRating: {
        color: "#003B40",
        marginHorizontal: 2
    },

    quantityReview: {
        color: '#B7C1C2',
        fontSize: 11
    },

    address: {
        color: "#003B40",
        fontSize: 15
    },

    location: {
        width: 44,
        height: 44,
        backgroundColor: '#ffffff',
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.1,
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        marginHorizontal: 5
    },

    box: {
        width: heightScreen / 9,
        height: heightScreen / 9,
        backgroundColor: '#EDF0EF',
        marginHorizontal: 10,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center'
    },

    imageBox: {
        width: '29%',
        height: '28%',
        marginBottom: 1
    },

    textBox: {
        marginTop: 4,
        color: '#003B40'
    },

    blurLine: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#9B9B9B',
        marginTop: heightScreen / 35
    },

    viewOpption: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightScreen / 40
    },

    blurLine2: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#9B9B9B',
        marginTop: 15
    },

    boxHeaderRecommend: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },

    describe: {
        fontSize: 16,
        color: '#2F2D2C',
        fontWeight: '500'
    },

    bottonAllReview: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    boxRecommend: {
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: '#faf8f7',
        borderRadius: 10,
        width: '100%'
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

    viewTime: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 5
    },

    viewSuggest: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: heightScreen / 50,
        alignContent: 'center'
    },
});

export default ReView;
