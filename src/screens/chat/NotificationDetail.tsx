import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import GOOGLE from '../../assets/images/google_logo.png'
import { placeholderTextColor, regularPadding, titleFontStyle } from '../../styles/styles'
import Group from '../../components/Group'
import { Notification } from './Notifications'


const NotificationDetail = ({ route }) => {
    const { notification }: { notification: Notification } = route.params;
    let companyDetail = [];
    let jobDetail = [];

    try {
        companyDetail = JSON.parse(notification.notificationCompanyDetail);
        jobDetail = JSON.parse(notification.notificationJobDetail);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        companyDetail = [];
        jobDetail = [];
    }


    return (
        <Container>
            <Header title='Thông báo' backArrow />
            <Group>
                <Image source={GOOGLE} />
                <Text style={[titleFontStyle, { marginTop: regularPadding }]}>Thông tin công ty</Text>
                {companyDetail?.map?.((item, index) => (
                    <Text key={index} style={{ marginTop: 8, color: placeholderTextColor }}>* {item}</Text>
                ))}

                <Text style={[titleFontStyle, { marginTop: regularPadding }]}>Thông tin việc làm</Text>
                {jobDetail?.map?.((item, index) => (
                    <Text key={index} style={{ marginTop: 8, color: placeholderTextColor }}> * {item}</Text>
                ))}
            </Group>
        </Container>
    )
}

export default NotificationDetail

const styles = StyleSheet.create({})