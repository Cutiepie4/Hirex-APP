import { SafeAreaView, Text, View, FlatList, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Button, Keyboard, Dimensions, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../components/Container'
import { deepPurple, orange, regularPadding, titleFontStyle } from '../../styles/styles'
import { Bubble, Composer, ComposerProps, GiftedChat, IChatMessage, InputToolbar, MessageImage, Send, TEST_ID } from 'react-native-gifted-chat'
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

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface Message {
    id: string,
    content: string,
    sentAt: FirebaseFirestoreTypes.Timestamp,
    sentBy: string,
    image?: string,
};

export interface ChatRoom {
    participants: string[],
    messages: Message[],
};

const ChatScreen = (props) => {
    const { phoneNumber } = useSelector((state: RootReducer) => state.authReducer);
    const { messages: initMessages, participants: initParticipants, chatFriendPhone } = props.route.params.data;
    const [participants, setParticipants] = useState(initParticipants);
    const [messages, setMessages] = useState<IChatMessage[]>(
        initMessages?.map((item) => {
            return {
                ...item,
                _id: item.id,
                sentAt: item.sentAt,
                user: {
                    _id: item.sentBy
                }
            }
        }) || []
    );
    const dispatch = useDispatch();
    const [sendLoading, setSendLoading] = useState(false);

    const convertMessageToSave = (array: IChatMessage[] | [{ user: { _id: string }, image: string }]) => {
        return array.map(message => ({
            content: message.text ?? '',
            sentAt: firestore.Timestamp.fromDate(new Date()),
            sentBy: message.user._id,
            image: message.image ?? ''
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

    const onSend = async (messages: IChatMessage[] = [], image?: string) => {
        setSendLoading(true);
        try {
            const messageData = convertMessageToSave(image
                ? [
                    {
                        user: {
                            _id: phoneNumber,
                        },
                        image: image,
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
    };

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
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

    const renderInputToolbar = (props) => {
        return <InputToolbar
            {...props}
            primaryStyle={{
                alignItems: 'center',
            }}
            containerStyle={{
                backgroundColor: 'white',
                marginHorizontal: regularPadding,
                alignContent: 'center',
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
                            marginRight: 10
                        }}
                    >
                        <FontAwesome name="image" size={20} color={deepPurple} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickDocument}>
                        <FontAwesome name="file-pdf-o" size={18} color="black" />
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
                    resizeMode: 'contain'
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
            <Text>Khong co tin nhan</Text>
        </View>
    );

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                console.log('Document picked:', result.assets);
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

    return (
        <Container
            backgroundColor={'white'}
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
                    flex: 1
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
                        backgroundColor: '#f8f8f8'
                    }}
                    isCustomViewBottom={true}
                    textInputProps={{
                        placeholder: "Enter your message...",
                    }}
                    alwaysShowSend
                    renderBubble={renderBubble}
                    renderInputToolbar={renderInputToolbar}
                    renderSend={renderSend}
                    renderMessageImage={renderMessageImage}
                    renderChatEmpty={renderChatEmpty}
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
