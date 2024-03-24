import React from "react";
import { Image, View, Dimensions, Text, StyleSheet, SafeAreaView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome, EvilIcons, Feather, FontAwesome6 } from '@expo/vector-icons';
import Search from "./constaints/Search";
import BoxList from "./constaints/BoxList";
import BoxJob from "./constaints/BoxJob";

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;
const SearchJob = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/bg.png')} style={styles.backgroundImage}></Image>
            <View style={{ marginHorizontal: 15, marginVertical: 20, rowGap: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 16 }}>
                        Hi, Orlando Diggs
                    </Text>
                    <View style={{ flexDirection: 'row', columnGap: 10 }}>
                        <View>
                            <FontAwesome name="bell-o" size={20} color="#ffffff" />
                            <View style={{ position: 'absolute', backgroundColor: 'red', width: 10, height: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end' }}>
                                <Text style={{ fontSize: 7, color: '#fff' }} >2</Text>
                            </View>
                        </View>
                        <Image source={require('../../assets/avata2.png')} style={{ width: 45, height: 45 }}></Image>
                    </View>
                </View>
                <Text style={{ color: '#fff', fontSize: 22, width: '60%', lineHeight: 35 }}>Tìm công việc mơ ước của bạn ở đây!</Text>
                <View style={styles.header}>
                    <Search
                        width={'90%'}
                        text={'Tìm kiếm.....'}
                        button={<EvilIcons name="search" size={26} color="gray" style={{ marginLeft: 6 }} />
                        }>
                    </Search>
                    <View style={styles.boxSlider}>
                        <Feather name="sliders" size={22} color="white" />
                    </View>
                </View>
                <View style={{ marginTop: heightScreen / 30, rowGap: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ color: '#150B3D', fontSize: 18, fontWeight: '500' }}>Chuyên môn</Text>
                        <Text style={{ color: '#AAA6B9' }}>View all</Text>
                    </View>
                    <View style={styles.specialization}>
                        {[...Array(6)].map((_, index) => (
                            <BoxList
                                text={''}
                                quantity={''}
                                height={heightScreen / 6.9}
                                width={'31%'}
                                key={index}
                                rowGap={3}
                                borderRadius={15}>
                            </BoxList>
                        ))}
                    </View>
                </View>
                <View style={{ rowGap: 20 }}>
                    <Text style={{ color: '#150B3D', fontSize: 18, fontWeight: '500' }}>Đề xuất công việc</Text>
                    <ScrollView style={{ height: heightScreen / 4 }}>
                        {[...Array(3)].map((_, index) => (
                            <BoxJob></BoxJob>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? 45 : 0,
    },

    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: widthScreen,
        height: heightScreen / 3.5,
    },


    header: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'center',
        columnGap: 10
    },

    boxSlider: {
        width: heightScreen / 19,
        height: heightScreen / 19,
        borderRadius: 10,
        backgroundColor: '#FCA34D',
        justifyContent: 'center',
        alignItems: 'center'
    },

    specialization: {
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        rowGap: 16,
    },
});

export default SearchJob