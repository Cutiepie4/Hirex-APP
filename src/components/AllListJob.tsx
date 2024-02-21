import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Platform, SafeAreaView, Text, Image, FlatList, Dimensions } from 'react-native';
import { EvilIcons, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';

const { height: heightScreen } = Dimensions.get('window');

const AllListJob = () => {
    const [selectedButton, setSelectedButton] = useState(true);

    const data1 = [
        { key: '1', title: 'Google', position: 'Lead Product Manager' },
        { key: '2', title: 'Item 2', position: 'Lead Product Manager' },
        { key: '3', title: 'Item 3', position: 'Lead Product Manager' },
        { key: '4', title: 'Item 4', position: 'Lead Product Manager' },
        { key: '5', title: 'Item 5', position: 'Lead Product Manager' },
        { key: '6', title: 'Item 6', position: 'Lead Product Manager' },
        { key: '7', title: 'Item 6', position: 'Lead Product Manager' },
        { key: '8', title: 'Item 6', position: 'Lead Product Manager' },
        { key: '9', title: 'Item 6', position: 'Lead Product Manager' },
        { key: '10', title: 'Item 6', position: 'Lead Product Manager' },
    ];

    const data2 = [
        
    ]

    const renderItem2 = ({ item }) => {
        return (
            <TouchableOpacity style={styles.item}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginHorizontal: '5%', justifyContent: 'center' }}>
                        <Image source={require('../../assets/facebook.png')} style={{ width: 50, height: 50 }}></Image>
                    </View>
                    <View style={{ justifyContent: 'center', width: '50%' }}>
                        <Text style={{color: 'gray'}}>{item.title}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>UI/UX Designer</Text>
                        <Text style={{ color: 'gray' }}>Full time</Text>
                    </View>
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={{ color: 'gray' }}>$4500/m</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>

                <View>
                    <Text style={styles.textHeader}>Search</Text>
                </View>
                <View></View>
            </View>
            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ marginBottom: 25, flexDirection: 'row', alignSelf: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', borderRadius: 10, alignSelf: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                        <EvilIcons name="search" size={24} color="lightgray" />
                        <TextInput
                            placeholder='Search here...'
                            style={{
                                width: '70%',
                                height: 50,
                                marginLeft: 5
                            }}
                        >
                        </TextInput>
                    </View>
                    <TouchableOpacity style={{ width: 48, height: 48, backgroundColor: '#03DAC6', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginLeft: 10 }}>
                        <AntDesign name="filter" size={20} color="#F5F5F5" />
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: '4%' }}>
                    <Text style={{ fontSize: 17 }}>35 Job Opportunity</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '4%', marginBottom: '5%' }}>
                    <TouchableOpacity
                        style={{ width: '47%' }}
                        onPress={() => setSelectedButton(true)}>
                        <View 
                            style={[styles.mostList, selectedButton === true ? { backgroundColor: '#7ac5cd' } : {backgroundColor: '#eeeeee'} ]}
                            // style={styles.mostList}
                            >
                            <Text>Most Relevent</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ width: '47%' }} 
                        onPress={() => setSelectedButton(false)}>
                        <View 
                            style={[styles.mostList, selectedButton === false ? { backgroundColor: '#7ac5cd' } : {backgroundColor: '#eeeeee'} ]}
                        >
                            <Text>Most Recent</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View >
                    <FlatList
                        data={selectedButton ? data1 : data2}
                        renderItem={renderItem2}
                        keyExtractor={(item) => item.key}
                        horizontal={false}
                        // initialNumToRender={Math.ceil(Dimensions.get('window').height / 100)}
                        // onEndReached={data1}
                        // onEndReachedThreshold={0.1}
                    />
                </View>
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
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },

    textHeader: {
        fontSize: 23,
        fontWeight: 'bold'
    },

    mostList: {
        paddingVertical: '14%',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 15,
        overflow: 'hidden'
    },

    item: {
        width: '90%',
        height: heightScreen / 9.5,
        backgroundColor: 'white',
        margin: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.1,
        elevation: 6,
    },
})

export default AllListJob