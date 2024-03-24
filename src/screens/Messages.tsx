import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import SearchInput from '../components/SearchInput'
import { backgroundColor, orange, placeholderTextColor, regularPadding, titleFontStyle } from '../styles/styles'
import AVATAR from '../assets/images/avt.png'
import { ScrollView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import RootNavigation from '../config/RootNavigation'

const Messages = () => {

    const width = useWindowDimensions().width;

    const renderItem = ({ item, index }) => (
        <ScrollView
            horizontal
            pagingEnabled
            scrollToOverflowEnabled
            showsHorizontalScrollIndicator={false}
        >
            <View style={{
                flexDirection: 'row',
            }}>
                <TouchableOpacity
                    onPress={() => RootNavigation.navigate('Message')}
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 16,
                        paddingHorizontal: 12,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        marginTop: 10,
                        marginHorizontal: regularPadding,
                        width: width - regularPadding * 2,
                    }}>
                    <View style={{
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        marginRight: 12
                    }}>
                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 25,
                            }}
                            resizeMode='contain'
                            source={AVATAR}
                        />
                    </View>
                    <View style={[styles.inbox]}>
                        <View style={[styles.row]}>
                            <Text style={[titleFontStyle]}>{item.name}</Text>
                            <Text style={{
                                fontSize: 12,
                                color: placeholderTextColor
                            }}>5m</Text>
                        </View>
                        <View style={[styles.row, { marginTop: 8 }]}>
                            <View>
                                <Text>{item.content}</Text>
                            </View>
                            <View style={{
                                backgroundColor: orange,
                                width: 20,
                                height: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10
                            }}>
                                <Text style={[
                                    { color: backgroundColor },
                                ]}>
                                    {2}
                                </Text>
                            </View>
                        </View>
                    </View >
                </TouchableOpacity>

                <TouchableOpacity style={{
                    backgroundColor: '#fae7e2',
                    width: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: 10,
                    marginRight: regularPadding
                }}>
                    <Feather name="trash-2" size={24} color={orange} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )

    return (
        <Container backgroundColor={'#f9f9f9'}>
            <Header title='Messages' leftHeader />
            <View style={[styles.container]}>
                <SearchInput
                    placeholder="Search name..."
                    onChangeText={(text) => console.log(text)}
                    style={{
                        borderWidth: 0,
                        backgroundColor: 'white',
                        paddingVertical: 16,
                        borderRadius: 10,
                        marginHorizontal: 16
                    }}
                />
                <FlatList
                    data={[
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },
                        { name: 'ABC', content: 'di choi k ?', time: 2 },

                    ]}
                    renderItem={renderItem}
                    style={{
                        height: '100%'
                    }}
                />
            </View>
        </Container >
    )
}

export default Messages

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20,
        flexDirection: 'column',
    },
    inbox: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})