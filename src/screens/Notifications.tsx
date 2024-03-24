import { FlatList, Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Container from '../components/Container'
import Header from '../components/Header'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { deepPurple, orange, placeholderFontStyle, placeholderTextColor, regularPadding, titleFontStyle } from '../styles/styles'
import GOOGLE from '../assets/images/google_logo.png'
import RootNavigation from '../config/RootNavigation'

interface Notification {
    id: any,
    title?: string,
    description?: string,
    time?: string
}

const Notifications = () => {
    const width = useWindowDimensions().width;
    const [noti, setNoti] = useState<Notification[]>([
        { title: 'Application sent', id: 123, description: 'Applications for Google companies have entered for company review', time: '25 minutes ago' },
        { title: 'Application sent', id: 123, description: 'Applications for Google companies have entered for company review', time: '25 minutes ago' },
        { title: 'Application sent', id: 123, description: 'Applications for Google companies have entered for company review', time: '25 minutes ago' },
        { title: 'Application sent', id: 123, description: 'Applications for Google companies have entered for company review', time: '25 minutes ago' },
        { title: 'Application sent', id: 123, description: 'Applications for Google companies have entered for company review', time: '25 minutes ago' },
        { title: 'Application sent', id: 123, description: 'Applications for Google companies have entered for company review', time: '25 minutes ago' },
        { title: 'Application sent', id: 123, description: 'Applications for Google companies have entered for company review', time: '25 minutes ago' },
        { title: 'Application sent', id: 123, description: 'Applications for Google companies have entered for company review', time: '25 minutes ago' },
        { title: 'Application sent', id: 123, description: 'Applications for Google companies have entered for company review', time: '25 minutes ago' },
    ]);

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            style={{
                flexDirection: 'row',
                paddingVertical: 16,
                paddingHorizontal: 12,
                backgroundColor: 'white',
                borderRadius: 20,
                marginTop: 10,
                marginHorizontal: regularPadding,
                width: width - regularPadding * 2,
            }}
        // onPress={() => RootNavigation.navigate('VideoCall')}
        >
            <View style={{
                width: '20%',
                justifyContent: 'center',
                marginRight: 8,
                alignItems: 'center'
            }}>
                <Image source={GOOGLE} />
            </View>
            <View style={{
                flex: 1
            }}>
                <Text style={[titleFontStyle]}>{item?.title}</Text>
                <Text style={{
                    color: '#524B6B',
                    marginTop: 4,
                }}>{item?.description}</Text>
                <Text style={[placeholderFontStyle, { marginTop: 10 }]}>{item?.time}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <Container>
            <Header
                title='Notifications'
                leftHeader
                rightHeaderComponent={
                    <TouchableOpacity>
                        <Text style={{
                            color: orange
                        }}>
                            Read all
                        </Text>
                    </TouchableOpacity>
                }
            />
            <FlatList
                data={noti}
                renderItem={renderItem}
                style={{
                    height: '100%'
                }}
            />
        </Container>
    )
}

export default Notifications

const styles = StyleSheet.create({})