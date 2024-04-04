
import React, { ReactNode, useMemo } from 'react';
import { Image, View, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import TOAST_PASSWORD from '../assets/images/toast_password.png';
import { StatusBar, StatusBarStyle } from 'expo-status-bar';
import { backgroundColor } from '../styles/styles';

const toastConfig = {
    requestSuccess: ({ props }) => {
        const { isSuccess = true } = props;

        return (
            <View
                style={[
                    styles.toast,
                    isSuccess
                        ? {}
                        : { backgroundColor: 'red' }
                ]}
            >
                <Image source={TOAST_PASSWORD} />
                <View style={styles.contentToast}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                        {props.title}
                    </Text>
                    <Text
                        style={{
                            color: 'white',
                            paddingRight: 20,
                            marginTop: 2,
                            fontSize: 16,
                        }}
                    >
                        {props.content}
                    </Text>
                </View>
            </View>
        );
    }
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
        isPaddingTop = true,
        isShowToast = false,
        backgroundColor = '#F9F9F9',
        statusBarContentColor = 'dark'
    } = props;

    const toastUI = useMemo(() => {
        return <Toast config={toastConfig} />;
    }, []);

    const inset = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <StatusBar
                backgroundColor={statusBarColor}
                style={statusBarContentColor}
            />
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
                {isShowToast && toastUI}
            </View>
        </View>
    );
};

const styles: any = {
    container: {
        flex: 1,
    },
    contentToast: {
        marginLeft: 16,
        lex: 1,
        backgroundColor: 'transparent'
    },
    toast: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#1DB9C3',
        paddingHorizontal: 8,
        paddingVertical: 8
    }
};

export { toastConfig }

export default Container;