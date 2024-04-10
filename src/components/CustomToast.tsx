import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { regularPadding } from '@/styles/styles';
import Toast from 'react-native-toast-message';

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

const CustomToast = () => {
    const toastUI = useMemo(() => {
        return <Toast config={toastConfig} />;
    }, []);

    return (
        <>
            {toastUI}
        </>
    )
}

export default CustomToast;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    contentToast: {
        marginLeft: regularPadding,
        flex: 1,
        backgroundColor: 'transparent'
    },
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