
import React, { ReactNode, useMemo } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast, { BaseToast, ErrorToast, SuccessToast } from 'react-native-toast-message';
import TOAST_PASSWORD from '../assets/images/toast_password.png';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { backgroundColor, regularPadding } from '../styles/styles';
import { AntDesign } from '@expo/vector-icons';

interface ToastProps {
    title: string;
    content: string;
}

const toastConfig = {
    success: ({ props }: { props: ToastProps }) => {
        const { title = '', content = '' } = props;
        return (
            <View style={[styles.toast,]}>
                <AntDesign name="circledown" size={30} color="white" />
                <View style={styles.contentToast}>
                    <Text style={styles.titleText}>
                        {title}
                    </Text>
                    <Text style={[styles.contentText]}>
                        {content}
                    </Text>
                </View>
            </View>
        );
    },
    error: ({ props }: { props: ToastProps }) => {
        const { title = '', content = '' } = props;
        return (
            <View style={[styles.toast, { backgroundColor: 'red' }]}>
                <AntDesign name="closecircle" size={30} color="white" />
                <View style={styles.contentToast}>
                    <Text style={styles.titleText}>
                        {title}
                    </Text>
                    <Text style={[styles.contentText]}>
                        {content}
                    </Text>
                </View>
            </View>
        );
    },
};

const Container = (props: {
    statusBarColor?: string,
    isPaddingTop?: boolean,
    isShowToast?: boolean,
    backgroundColor?: string,
    statusBarContentColor?: StatusBarStyle,
    children: ReactNode
}) => {
    const {
        statusBarColor = '#F9F9F9',
        backgroundColor = '#F9F9F9',
        statusBarContentColor = 'dark'
    } = props;

    const toastUI = useMemo(() => {
        return <Toast config={toastConfig} />;
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <StatusBar
                backgroundColor={statusBarColor}
                style={statusBarContentColor}
            />
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
            </View>
            {toastUI}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'transparent' },
    contentToast: { marginLeft: regularPadding, flex: 1, backgroundColor: 'transparent' },
    toast: {
        flexDirection: 'row',
        backgroundColor: '#1DB9C3',
        paddingHorizontal: regularPadding,
        paddingVertical: 12,
        marginHorizontal: regularPadding,
        borderRadius: 10
    },
    contentText: {
        color: 'white',
        fontSize: 13,
        marginTop: 5
    },
    titleText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default Container;