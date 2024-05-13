import Toast from 'react-native-toast-message';

type ToastProps = {
    type?: 'success' | 'error' | 'info'
    title?: string
    content?: string
}

export const toastResponse = (res: ToastProps) => {
    return Toast.show({
        type: res?.type || 'info',
        props: {
            title: res?.title || "Thông báo",
            content: res?.content
        },
    });
}