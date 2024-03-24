import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, View, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Text, Image, FlatList, Dimensions, ScrollView, ImageBackground } from 'react-native';
import { EvilIcons, FontAwesome6, FontAwesome, Octicons, AntDesign, Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

enum ChosenButton {
    FAVOURITE = 0,
    RECENT = 1,
    FOLLOW = 2,
}

enum ChosenScreen {
    HOME = 0,
    LIKE = 1,
    SUGGEST = 2,
    SELF = 3
}

const SearchScreen = () => {
    const [selectedButton, setSelectedButton] = useState<ChosenButton>(ChosenButton.FAVOURITE);
    const [selectedButtonNav, setSelectedButtonNav] = useState<ChosenScreen>(ChosenScreen.SUGGEST);
    const [isPressed, setIsPressed] = useState({});
    const [handleButtonFavourite, setHandleButtonFavourite] = useState(true)

    const [isBoxVisible, setIsBoxVisible] = useState(false);

    const DeleteBox = () => {
        setIsBoxVisible(!isBoxVisible);
    };


    const handlePress = (buttonId) => {
        setIsPressed(prevState => ({
            ...prevState,
            [buttonId]: !prevState[buttonId]
        }));
    };

    const navigation = useNavigation();


    const handleViewReView = () => {
        navigation.navigate('Review')
    }

    const handleButtonPress = (index) => {
        setSelectedButtonNav(index);
    };

    const [dlt, setDlt] = useState(false);

    const deleteBox = () => {
        setIsBoxVisible(false)
        setDlt(!dlt)
    };

    const handlePressButton = (button) => {
        setSelectedButton(button);
        setHandleButtonFavourite(!handleButtonFavourite);
    };

    const images = [
        {
            anh: require('../../assets/coffee.png'),
            name: 'Nola Cafe',
            quantity: '1.200',
            rating: '5.0',
        },

        {
            anh: require('../../assets/coffee1.png'),
            name: 'Highlands Coffee',
            quantity: '429',
            rating: 4.9,
        },

        {
            anh: require('../../assets/coffee2.png'),
            name: 'Home Coffee Roasters',
            quantity: '999',
            rating: 4.8,
        },

        {
            anh: require('../../assets/coffee3.png'),
            name: 'Haus Cafe',
            quantity: '666',
            rating: 4.7,
        }
    ];

    return (
        <View style={styles.heightScreens}>
            <ScrollView style={styles.heightScroll}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.title}>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Image source={require('../../assets/avata2.png')} style={{ width: 50, height: 50 }}></Image>
                        </View>
                        <View style={{ width: '65%' }}>
                            <Text style={{ fontSize: 25, fontWeight: '600', color: '#003B40' }}>Tìm kiếm quán Coffee ở mọi nơi</Text>
                        </View>
                        <View style={styles.header}>
                            <View style={styles.search}>
                                <EvilIcons name="search" size={26} color="gray" style={{ marginLeft: 6 }} />
                                <TextInput
                                    placeholder='Tìm kiếm...'
                                    style={{
                                        width: '70%',
                                        height: heightScreen / 15,
                                        marginLeft: 3
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={styles.buttonSlider}>
                                <FontAwesome6 name="sliders" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.touchableSelect}>
                        <TouchableOpacity style={[styles.buttonSelect, selectedButton === ChosenButton.FAVOURITE && styles.selectedButton]} onPress={() => handlePressButton(ChosenButton.FAVOURITE)}>
                            <Text style={[styles.textSelect, selectedButton === ChosenButton.FAVOURITE && styles.textSelectedButton]}>Yêu thích</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.buttonSelect, selectedButton === ChosenButton.RECENT && styles.selectedButton]} onPress={() => handlePressButton(ChosenButton.RECENT)}>
                            <Text style={[styles.textSelect, selectedButton === ChosenButton.RECENT && styles.textSelectedButton]}>Gần đây</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.buttonSelect, selectedButton === ChosenButton.FOLLOW && styles.selectedButton]} onPress={() => handlePressButton(ChosenButton.FOLLOW)}>
                            <Text style={[styles.textSelect, selectedButton === ChosenButton.FOLLOW && styles.textSelectedButton]}>Theo dõi</Text>
                        </TouchableOpacity>
                    </View>


                    <View style={[styles.boxRow, { marginBottom: (selectedButton === ChosenButton.FAVOURITE ? heightScreen / 30 : 0) }]}>
                        {selectedButton === ChosenButton.FAVOURITE && (
                            images.map((image, index) => {
                                return (
                                    <View style={[{ width: '46%' }, index % 2 === 0 ? null : { marginTop: 30 }]} key={index}>
                                        <Image source={image.anh} style={styles.image} />
                                        <View style={styles.buttonHeart}>
                                            <TouchableOpacity onPress={() => handlePress(index)}>
                                                <AntDesign name={isPressed[index] ? "heart" : "hearto"} size={18} color={isPressed[index] ? "red" : "#003B40"} />
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity onPress={handleViewReView}>
                                            <Text style={styles.textNameCafe}>{images[index].name}</Text>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                            <FontAwesome name="star" size={14} color="#FDCB6E" />
                                            <Text style={styles.distance}>{image.rating}</Text>
                                            <Text style={styles.quantity}> {image.quantity} đánh giá</Text>
                                        </View>
                                        <Text style={styles.distance}>3.8 miles</Text>
                                    </View>
                                );
                            })
                        )}

                        {(!dlt&&selectedButton === ChosenButton.RECENT) && (
                            <View style={{ width: '100%', backgroundColor: '#ffffff', borderRadius: 15, paddingBottom: 10 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
                                    {/* <Text>s</Text> */}
                                    <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                                        <Image source={require('../../assets/avtcf1.png')} style={{ width: 60, height: 60, borderRadius: 50 }}></Image>

                                    </View>
                                    <TouchableOpacity onPress={DeleteBox}>
                                        <Entypo name="dots-three-vertical" size={20} color="#524B6B" />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ rowGap: 10 }}>
                                    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#003B40' }}>HighLands Coffee</Text>
                                        <Text>Hà Đông, Hà Nội</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', columnGap: 20, marginHorizontal: 10 }}>
                                        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#f2f1ed', borderRadius: 10 }}>
                                            <Text style={{ color: '#003B40' }}>Chi Tiết</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#f2f1ed', borderRadius: 10 }}>
                                            <Text style={{ color: '#003B40' }}>Vị trí</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ paddingHorizontal: 20, paddingVertical: 5, backgroundColor: '#f2f1ed', borderRadius: 10 }}>
                                            <Text style={{ color: '#003B40' }}>Đánh giá người dùng</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ color: '#AAA6B9', fontSize: 10, fontStyle: 'italic', alignSelf: 'flex-end', marginRight: 30 }}>
                                        25 phút trước
                                    </Text>
                                </View>
                            </View>
                        )}
                        {(isBoxVisible && selectedButton === ChosenButton.RECENT) && (
                            <View style={styles.box}>
                                <View style={{height: 6, width: 65,  backgroundColor: '#9B9B9B',alignSelf: 'center', borderRadius: 6}}></View>
                                <View style={{ flexDirection: 'row', margin: 10 }}>
                                    <Image source={require('../../assets/avtcf1.png')} style={{ width: 60, height: 60, borderRadius: 50 }}></Image>
                                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#003B40', alignSelf: 'center', marginLeft: 5 }}>HighLands Coffee</Text>
                                </View>
                                <View style={styles.blurLine}></View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center',marginLeft: 20, marginTop: 10 }} onPress={deleteBox}>
                                    <View style={{width: 40, height: 40, backgroundColor: '#dedede', justifyContent: 'center', alignItems: 'center', borderRadius: 50, marginRight: 5}}>
                                        <Entypo name="trash" size={20} color="black" />
                                    </View>
                                    <View>
                                        <Text style={{fontWeight: '600'}}>Xoá</Text>
                                        <Text style={{color: '#AAA6B9'}}>Gỡ khỏi lịch sử tìm kiếm của bạn</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', alignContent: 'center',marginLeft: 20, marginTop: 15 }}>
                                    <View style={{width: 40, height: 40, backgroundColor: '#dedede', justifyContent: 'center', alignItems: 'center', borderRadius: 50, marginRight: 5}}>
                                        <Entypo name="pin" size={20} color="black" />
                                    </View>
                                    <View>
                                        <Text style={{fontWeight: '600'}}>Ghim nội dung tìm kiếm này</Text>
                                        <Text style={{color: '#AAA6B9'}}>Bạn chỉ có thể ghim 3 nội dung</Text>
                                    </View>
                                </View>
                            </View>
                        )}

                    </View>

                </SafeAreaView>
            </ScrollView>
            <View style={styles.navbar}>
                <TouchableOpacity
                    style={[styles.navbarItem, selectedButtonNav === ChosenScreen.HOME && styles.selectedButton2]}
                    onPress={() => handleButtonPress(ChosenScreen.HOME)}
                >
                    <Ionicons name="home" size={26} color={selectedButtonNav == ChosenScreen.HOME ? "#03DAC6" : "#003B40"} />
                    {selectedButtonNav == ChosenScreen.HOME ?
                        <View style={styles.indicator} />
                        : <Text style={styles.navbarItemText}>Home</Text>}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navbarItem, selectedButtonNav === ChosenScreen.LIKE && styles.selectedButton2]}
                    onPress={() => handleButtonPress(ChosenScreen.LIKE)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <AntDesign name="heart" size={26} color={selectedButtonNav == ChosenScreen.LIKE ? "#03DAC6" : "#003B40"} />
                        {selectedButtonNav == ChosenScreen.LIKE ?
                            <View style={styles.indicator} />
                            : <Text style={styles.navbarItemText}>Yêu thích</Text>}
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navbarItem, selectedButtonNav === ChosenScreen.SUGGEST && styles.selectedButton2]}
                    onPress={() => handleButtonPress(2)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <FontAwesome5 name="lightbulb" size={26} color={selectedButtonNav == ChosenScreen.SUGGEST ? "#03DAC6" : "#003B40"} />
                        {selectedButtonNav == ChosenScreen.SUGGEST ?
                            <View style={styles.indicator} />
                            : <Text style={styles.navbarItemText}>Gợi ý</Text>}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navbarItem, selectedButtonNav === 3 && styles.selectedButton2]}
                    onPress={() => handleButtonPress(3)}
                >
                    <View style={{ alignItems: 'center' }}>
                        <FontAwesome name="user" size={26} color={selectedButtonNav == ChosenScreen.SELF ? "#03DAC6" : "#003B40"} />
                        {selectedButtonNav == ChosenScreen.SELF ?
                            <View style={styles.indicator} />
                            : <Text style={styles.navbarItemText}>Bản thân</Text>}
                    </View>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        paddingHorizontal: 10,
        backgroundColor: '#F5F5F5',
        marginHorizontal: 10,
        // paddingBottom: heightScreen / 30
    },

    title: {
        margin: 10
    },

    heightScreens: {
        height: heightScreen + heightScreen / 18
    },

    heightScroll: {
        height: '98%'
    },

    header: {
        marginTop: 25,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center'
    },

    search: {
        flexDirection: 'row',
        borderRadius: 20,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    buttonSlider: {
        width: heightScreen / 15 + 2,
        height: heightScreen / 15,
        backgroundColor: '#003B20',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginLeft: 10
    },

    touchableSelect: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: heightScreen / 40,
        marginTop: heightScreen / 50,
        marginBottom: heightScreen / 40
    },

    buttonSelect: {
        width: heightScreen / 8,
        height: heightScreen / 17,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        // backgroundColor: '#C67C4E'
        backgroundColor: 'white'
    },

    textSelect: {
        fontSize: 15,
        color: '#2F4B4E',
        fontWeight: '500'
    },

    buttonHeart: {
        position: 'absolute',
        zIndex: 1,
        right: -10,
        top: -10,
        backgroundColor: '#EDF0EF',
        padding: 5,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#ffffff'
    },

    boxRow: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: heightScreen / 1.5,
        // marginBottom: heightScreen / 60
    },

    image: {
        width: '100%',
        height: heightScreen / 4,
        borderRadius: 20,
    },

    boxImage2: {
        width: '46%',
        marginTop: 35,
    },

    textNameCafe: {
        fontSize: 16,
        fontWeight: '500',
        color: '#003B40'
    },

    selectedButton: {
        backgroundColor: '#C67C4E'
    },

    textSelectedButton: {
        color: '#ffffff'
    },

    quantity: {
        color: '#B7C1C2',
        fontSize: 10,
        alignSelf: 'flex-end'
    },

    distance: {
        color: '#003B40',
        fontWeight: '500'
    },

    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: heightScreen / 14,
        borderTopWidth: 0,
        borderTopColor: '#ccc',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -20,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
        overflow: 'hidden',
    },

    navbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    navbarItemText: {
        fontSize: 10,
        color: '#003B40'
    },

    selectedButton2: {
        position: 'relative',
    },

    indicator: {
        width: 6,
        height: 6,
        backgroundColor: '#03DAC6',
        borderRadius: 10,
        marginTop: 4,
    },

    box: {
        position: 'absolute',
        left: -20,
        bottom: 0,
        width: widthScreen+ 10,
        height: heightScreen / 3,
        backgroundColor: 'white',
        elevation: 5,
    },

    blurLine: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#9B9B9B',
    },
});

export default SearchScreen;
