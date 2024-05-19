import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import GOOGLE from '../../assets/images/google_logo.png'
import { placeholderTextColor, regularPadding, titleFontStyle } from '../../styles/styles'
import Group from '../../components/Group'
import { Notification } from './Notifications'
import { BASE_API } from '@/services/BaseApi'


const NotificationDetail = ({ route }) => {
    const { notification }: { notification: Notification } = route.params;

    useEffect(() => {
        BASE_API.get(`/notifications/read/${notification.id}`);
    }, []);

    return (
        <Container>
            <Header title='Thông báo' backArrow />
            <Group>
                <Image source={GOOGLE} />
                <Text style={[titleFontStyle, { marginTop: regularPadding }]}>Thông tin công ty</Text>
                {notification.notificationCompanyDetail?.map?.((item, index) => (
                    <Text key={index} style={{ marginTop: 8, color: placeholderTextColor }}>* {item}</Text>
                ))}

                <Text style={[titleFontStyle, { marginTop: regularPadding }]}>Thông tin việc làm</Text>
                {notification.notificationJobDetail?.map?.((item, index) => (
                    <Text key={index} style={{ marginTop: 8, color: placeholderTextColor }}> * {item}</Text>
                ))}
            </Group>
        </Container>
    )
}

export default NotificationDetail;
