import React from "react";
import { View, Platform, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Text } from 'react-native';
import { EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import BoxList from "./constaints/BoxList";
import Search from "./constaints/Search";

const heightScreen = Dimensions.get('window').height;

const AddJobDetail = () => {
    return (
        <SafeAreaView style={styles.screen}>
            <TouchableOpacity style={{ marginHorizontal: 20 }}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.header}>
                <Search
                    width={'70%'}
                    text={'Tìm kiếm.....'}
                    button={<EvilIcons name="search" size={26} color="gray" style={{ marginLeft: 6 }} />
                    }>
                </Search>
                <View style={styles.boxSlider}>
                    <Feather name="sliders" size={22} color="white" />
                </View>
            </View>
            <Text style={styles.text}>Chuyên môn</Text>
            <View style={styles.container}>
                {[...Array(6)].map((_, index) => (
                    <BoxList
                        text={''}
                        quantity={''}
                        height={heightScreen / 4}
                        width={'47%'}
                        rowGap={5}
                        borderRadius={25}
                        key={index}>
                    </BoxList>
                ))}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        rowGap: 28,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
    },

    header: {
        flexDirection: 'row',
        marginHorizontal: 10,
        justifyContent: 'center',
        columnGap: 10
    },

    container: {
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        rowGap: 16,
    },

    boxSlider: {
        width: heightScreen / 20,
        height: heightScreen / 20,
        borderRadius: 15,
        backgroundColor: '#FCA34D',
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 18,
        fontWeight: '500',
        color: '#150A33',
        marginHorizontal: 20
    }
})

export default AddJobDetail