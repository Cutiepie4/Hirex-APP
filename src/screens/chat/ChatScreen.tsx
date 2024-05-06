import { SafeAreaView, Text, View, FlatList, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Button, Keyboard, Dimensions, ActivityIndicator, Linking } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../components/Container'
import { deepPurple, orange, regularPadding, titleFontStyle } from '../../styles/styles'
import { Bubble, BubbleProps, Composer, ComposerProps, GiftedAvatarProps, GiftedChat, GiftedChatProps, IChatMessage, InputToolbar, MessageImage, MessageText, Send, TEST_ID } from 'react-native-gifted-chat'
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import RootNavigation from '../../route/RootNavigation';
import AVATAR from '../../assets/images/avt.png'
import { ParseConversationId } from '../../utils/utils';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/slice/authSlice';
import { RootReducer } from '@/redux/store/reducer';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Message {
    id: string,
    content: string,
    sentAt: FirebaseFirestoreTypes.Timestamp,
    sentBy: string,
    image?: string,
    file?: AttachedFile,
};

export interface ChatRoom {
    participants: string[],
    messages: Message[],
};

export interface AttachedFile {
    type: string,
    url: string,
    fileName: string
};

const ChatScreen = (props) => {
    const { phoneNumber } = useSelector((state: RootReducer) => state.authReducer);
    const { messages: initMessages, participants: initParticipants, chatFriendPhone } = props.route.params.data;
    const [participants, setParticipants] = useState(initParticipants);
    const [sendLoading, setSendLoading] = useState(false);
    const [messages, setMessages] = useState<IChatMessage[]>(
        initMessages?.map((item) => {
            return {
                _id: item.id,
                sentAt: item.sentAt,
                user: {
                    _id: item.sentBy
                },
                ...item,
            }
        }) || []
    );

    const convertMessageToSave = (array: IChatMessage[] | [{ user: { _id: string }, image: string, file: AttachedFile }]) => {
        return array.map(message => ({
            content: message.text ?? '',
            sentAt: firestore.Timestamp.fromDate(new Date()),
            sentBy: message.user._id,
            image: message.image ?? '',
            file: message.file
        }));
    };

    const convertMessageToRender = (array: ChatRoom) => {
        const sortedMessages = array.messages.sort((a, b) => b.sentAt.toMillis() - a.sentAt.toMillis());

        return sortedMessages.map((message: Message) => ({
            _id: message.id ?? '',
            text: message.content ?? '',
            createdAt: message.sentAt?.toDate?.(),
            user: {
                _id: message.sentBy,
                name: message.sentBy
            },
            image: message.image ?? '',
            file: message.file?.url && message.file
        }));
    };

    const fetchData = useCallback(() => {
        const unsubscribe = firestore()
            .collection('conversations_col')
            .doc(ParseConversationId(participants))
            .onSnapshot((docSnapshot) => {
                if (docSnapshot.exists) {
                    setParticipants(docSnapshot.data().participants);
                    setMessages(convertMessageToRender(docSnapshot.data() as ChatRoom));
                }
            });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = fetchData();
        return () => {
            unsubscribe();
        };
    }, [fetchData]);

    const onSend = useCallback(async (messages: IChatMessage[] = [], image?: string, file?: AttachedFile) => {
        setSendLoading(true);
        try {
            console.log('image', image)
            console.log('attached file', file)
            console.log('all', [
                {
                    user: {
                        _id: phoneNumber,
                    },
                    image: image,
                    file: file
                },
            ])
            const messageData = convertMessageToSave(image || file?.url
                ? [
                    {
                        user: {
                            _id: phoneNumber,
                        },
                        image: image ?? '',
                        file: file ?? {
                            type: '',
                            fileName: '',
                            url: ''
                        }
                    },
                ]
                : messages
            );
            const conversationId = ParseConversationId(participants);
            const conversationRef = firestore().collection('conversations_col').doc(conversationId);

            await firestore().runTransaction(async (transaction) => {
                const docSnapshot = await transaction.get(conversationRef);
                const currentMessages: any[] = docSnapshot?.data()?.messages || [];
                const updatedMessages = currentMessages.concat(
                    messageData.map((message) => ({
                        ...message,
                        id: firestore().collection('dummy').doc().id,
                    }))
                );
                transaction.update(conversationRef, { messages: updatedMessages });
            });
        } catch (error) {
            console.log('error', error)
            Toast.show({
                type: 'error',
                props: {
                    title: 'Đã có lỗi xảy ra',
                    content: 'Không thể gửi tin nhắn',
                },
            });
        } finally {
            setSendLoading(false);
        }
    }, []);

    const openPdf = async (pdfUri) => {
        try {
            const supported = await Linking.canOpenURL(pdfUri);
            if (supported) {
                await Linking.openURL(pdfUri);
            } else {
                console.error('Cannot open PDF: ', pdfUri);
            }
        } catch (error) {
            console.error('Error opening PDF: ', error);
        }
    };

    const renderBubble = (props) => {
        const { currentMessage } = props;
        const file: AttachedFile = currentMessage.file;

        return (
            <Bubble
                {...props}
                renderCustomView={() => {
                    if (file?.url)
                        return (
                            <View style={{
                                paddingHorizontal: regularPadding,
                                paddingVertical: regularPadding,
                                flexDirection: 'row',
                                alignItems: 'center',
                                borderRadius: 10,
                                marginHorizontal: 10,
                                marginVertical: regularPadding / 2,
                                backgroundColor: '#f5f5f5'
                            }}>
                                <TouchableOpacity
                                    onPress={() => file?.url && openPdf(file.url)}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: deepPurple,
                                        borderRadius: 20,
                                        width: 40,
                                        height: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <FontAwesome name="cloud-download" size={24} color={deepPurple} />
                                </TouchableOpacity>
                                <Text style={{
                                    color: deepPurple,
                                    marginLeft: 12
                                }}>
                                    {file.fileName ?? 'Không có tên file'}
                                </Text>
                            </View>
                        )
                    return null;
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: deepPurple
                    },
                    left: {
                        backgroundColor: '#fae7e2',
                    }
                }}
            />
        );
    };

    const renderChatFooter = () => {
        return <View style={{ height: 24 }} />;
    };

    const renderInputToolbar = (props) => {
        return <InputToolbar
            {...props}
            primaryStyle={{
                alignItems: 'center',
            }}
            containerStyle={{
                backgroundColor: 'white',
                paddingHorizontal: regularPadding,
                paddingVertical: 6,
                alignContent: 'center',
                marginHorizontal: regularPadding / 2,
                borderRadius: 20,
                marginBottom: 10,
                borderTopWidth: 0
            }}
            renderComposer={(composerProps) => (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={pickImage}
                        style={{
                            marginRight: regularPadding
                        }}
                    >
                        <FontAwesome name="image" size={20} color={deepPurple} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickDocument}>
                        <MaterialIcons name="attachment" size={24} color={deepPurple} />
                    </TouchableOpacity>
                    <Composer
                        {...composerProps}
                        placeholder="Write a message..."
                        placeholderTextColor="lightgray"
                        textInputStyle={{
                            fontSize: 14,
                            borderColor: 'lightgray',
                            width: '80%',
                            paddingLeft: 10
                        }}
                    />
                </View>
            )}
        />
    }

    const renderSend = (props) => {
        return <Send
            {...props}
            disabled={sendLoading}
            containerStyle={{
                justifyContent: 'center',
            }}
        >
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 8,
                paddingVertical: 8,
                borderRadius: 10,
                backgroundColor: deepPurple
            }}>
                {sendLoading
                    ? <ActivityIndicator size={18} />
                    : <Ionicons name="send" size={18} color={'white'} />
                }
            </View>
        </Send>;
    };

    const renderMessageImage = (props) => {
        return (
            <MessageImage
                {...props}
                imageStyle={{
                    resizeMode: 'cover'
                }}
            />
        )
    };

    const renderChatEmpty = () => (
        <View style={{
            flex: 1,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text>Không có tin nhắn</Text>
        </View>
    );

    const pickDocument = async () => {
        try {
            const result: DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                console.log('Document picked:', result);
                const { uri, name } = result.assets[0];
                await uploadFile(uri, name);
            } else {
                console.log('Document picking cancelled');
            }
        } catch (error) {
            console.error('Error picking document:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 0.3,
        });

        if (!result.canceled) {
            await uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri: string) => {
        setSendLoading(true);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const storageRef = storage().ref(`images/${new Date().getTime()}`);
            await storageRef.put(blob);
            const downloadURL = await storageRef.getDownloadURL();
            await onSend([], downloadURL);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setSendLoading(false);
        }
    };

    const uploadFile = async (uri: string, originalFileName: string) => {
        setSendLoading(true);
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const fileType = originalFileName.split('.').pop();
            const storageRef = storage().ref(`pdfs/${originalFileName}_${new Date().getTime()}.${fileType}`);
            await storageRef.put(blob);
            const downloadURL = await storageRef.getDownloadURL();
            await onSend([], '', {
                type: fileType,
                url: downloadURL,
                fileName: originalFileName
            });
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setSendLoading(false);
        }
    };

    return (
        <Container
            backgroundColor={'transparent'}
            statusBarColor='white'
            statusBarContentColor='dark'
        >
            <Header
                leftHeaderComponent={
                    <>
                        <Image source={AVATAR} style={styles.imageBox} />
                        <Text style={[titleFontStyle, { fontSize: 16 }]}>{chatFriendPhone}</Text>
                    </>
                }
                backArrow
                rightHeaderComponent={< Feather name="video" size={24} color={orange} />}
                rightHeaderCallback={() => RootNavigation.navigate('CallScreen', { calleePhone: chatFriendPhone })}
                style={{
                    backgroundColor: 'white'
                }}
            />

            <TouchableOpacity
                style={{
                    flex: 1,
                    paddingHorizontal: regularPadding / 2
                }}
                activeOpacity={1}
                onPress={Keyboard.dismiss}
            >
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: phoneNumber,
                        name: phoneNumber,
                    }}
                    messagesContainerStyle={{
                        backgroundColor: 'transparent'
                    }}
                    textInputProps={{
                        placeholder: "Enter your message...",
                    }}
                    alwaysShowSend
                    renderBubble={renderBubble}
                    renderInputToolbar={renderInputToolbar}
                    renderSend={renderSend}
                    renderMessageImage={renderMessageImage}
                    renderChatEmpty={renderChatEmpty}
                    renderAvatarOnTop
                    renderChatFooter={renderChatFooter}
                />
            </TouchableOpacity>
        </Container >
    )
}

const styles = StyleSheet.create({
    imageBox: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 20,
    }
});


export default ChatScreen;
