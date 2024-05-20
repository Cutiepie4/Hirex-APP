import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import { deepPurple, orange, placeholderFontStyle, placeholderTextColor, purple, regularPadding, titleFontStyle } from '../../styles/styles'
import GOOGLE from '../../assets/images/google_logo.png'
import NO_NOTIFICATIONS from '../../assets/images/no_notifications.png'
import RootNavigation from '../../route/RootNavigation'
import { BASE_API } from '@/services/BaseApi'

export interface Notification {
    id: number,
    notificationTitle: string,
    notificationContent: string,
    notificationCompanyDetail: string,
    notificationJobDetail: string,
    createdAt?: string,
    read?: boolean,
};

const Notifications = () => {
    const width = useWindowDimensions().width;
    const [noti, setNoti] = useState<Notification[]>([]);

    const formatTimeDifference = (timestampString) => {
        if (!timestampString) return '-';

        const timestamp = new Date(timestampString);
        const currentTimestamp = new Date();

        const timeDifference = currentTimestamp.getTime() - timestamp.getTime();
        const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);

        if (timeDifferenceInSeconds < 60) {
            return `${timeDifferenceInSeconds} giây`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes} phút`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours} giờ`;
        } else {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `${days} ngày`;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await BASE_API.get('/notifications');
            if (response.status == 200) {
                setNoti(response.data);
            }
        };

        fetchData();
    }, []);

    const renderItem = ({ item, index }: { item: Notification, index: number }) => (
        <TouchableOpacity
            key={index}
            style={[{
                flexDirection: 'row',
                paddingVertical: 16,
                paddingHorizontal: 12,
                backgroundColor: 'white',
                borderRadius: 20,
                marginTop: 10,
                marginHorizontal: regularPadding,
                width: width - regularPadding * 2,
            }, !item.read && styles.isRead]}
            onPress={() => RootNavigation.navigate('NotificationDetail', { notification: item })}
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
                <Text style={[titleFontStyle]}>{item?.notificationTitle}</Text>
                <Text style={{
                    color: '#524B6B',
                    marginTop: 4,
                }}>{item?.notificationContent}</Text>
                <Text style={[placeholderFontStyle, { marginTop: 10 }]}>{formatTimeDifference(item.createdAt)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <Container>
            <Header
                title='Thông báo'
                backArrow
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
            {noti.length > 0 ?
                <FlatList
                    data={noti}
                    renderItem={renderItem}
                    style={{
                        height: '100%'
                    }}
                /> : <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={NO_NOTIFICATIONS} />
                    <Text style={[titleFontStyle, { fontSize: 20 }]}>No notifications</Text>
                    <Text style={{
                        marginTop: 20,
                        maxWidth: '70%',
                        textAlign: 'center',
                        marginBottom: 100
                    }}>You have no notifications at this time thank you</Text>
                </View>
            }
        </Container>
    )
}

export default Notifications

const styles = StyleSheet.create({
    isRead: {
        backgroundColor: purple
    }
})