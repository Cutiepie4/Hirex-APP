import { SafeAreaView, Text, View, FlatList, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Button, Keyboard, Dimensions, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Container from '../components/Container'
import { backgroundColor, deepPurple, orange, regularPadding, titleFontSize, titleFontStyle } from '../styles/styles'
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, runTransaction } from "firebase/firestore";
import app, { db, storage } from '../../firebaseConfig'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Bubble, Composer, ComposerProps, GiftedChat, IChatMessage, InputToolbar, InputToolbarProps, MessageImage, Send, TEST_ID } from 'react-native-gifted-chat'
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import RootNavigation from '../config/RootNavigation';
import AVATAR from '../assets/images/avt.png'
import { ParseConversationId } from '../utils/utils';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome6 } from '@expo/vector-icons';
import { getDownloadURL, ref, uploadBytes, uploadString } from 'firebase/storage';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/slice/authSlice';
import { RootReducer } from '../redux/store/reducer';

interface Message {
    id: string,
    content: string,
    sentAt: Timestamp,
    sentBy: string,
    image?: string,
}

interface MessagesCollection {
    participants: string[],
    messages: Message[],
}

const Message = () => {
    const { isLoading } = useSelector((state: RootReducer) => state.authReducer);
    const [data, setData] = useState<MessagesCollection>();
    const [participants, setParticipants] = useState(['user1', 'user2']);
    const [messages, setMessages] = useState<IChatMessage[]>([]);
    const dispatch = useDispatch();
    const [sendLoading, setSendLoading] = useState(false);

    const convertMessageToSave = (array: IChatMessage[] | [{ user: { _id: string }, image: string }]) => {
        return array.map(message => ({
            content: message.text ?? '',
            sentAt: Timestamp.fromDate(new Date()),
            sentBy: message.user._id,
            image: message.image ?? ''
        }));
    };

    const convertMessageToRender = (array: MessagesCollection) => {
        const sortedMessages = array.messages.sort((a, b) => b.sentAt.toMillis() - a.sentAt.toMillis());

        return sortedMessages.map((message: Message) => ({
            _id: message.id ?? '',
            text: message.content ?? '',
            createdAt: message.sentAt.toDate(),
            user: {
                _id: message.sentBy,
                name: 'name sender'
            },
            image: message.image ?? '',
        }));
    };

    useEffect(() => {
        data?.messages && setMessages(convertMessageToRender(data));
        data?.participants && setParticipants(data.participants);
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'conversations_col', ParseConversationId(participants));
            const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    setData(docSnapshot.data() as MessagesCollection);
                } else {
                    console.log("No such document!");
                }
            });
            return unsubscribe;
        };
        dispatch(showLoading());
        fetchData();
        dispatch(hideLoading());
    }, [participants]);

    const onSend = async (messages: IChatMessage[] = [], image?: string) => {
        setSendLoading(true);
        try {
            const messageData = convertMessageToSave(image ? [{ user: { _id: 'user1' }, image: image }] : messages);
            const conversationId = ParseConversationId(participants);
            const conversationRef = doc(db, 'conversations_col', conversationId);
            await runTransaction(db, async (transaction) => {
                const docSnapshot = await transaction.get(conversationRef);
                if (!docSnapshot.exists()) {
                    throw new Error('Conversation document does not exist');
                }

                const currentMessages: any[] = docSnapshot.data()?.messages || [];
                const updatedMessages = currentMessages.concat(messageData.map((message) => ({
                    ...message,
                    id: doc(collection(db, 'dummy')).id,
                })));
                transaction.update(conversationRef, { messages: updatedMessages });
            });
        } catch (error) {
            console.error("Error sending message: ", error);
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
                        <FontAwesome6 name="file-pdf" size={18} color={deepPurple} />
                    </TouchableOpacity>
                    <Composer
                        {...composerProps}
                        placeholder="Write a message..."
                        placeholderTextColor="lightgray"
                        textInputStyle={{
                            fontSize: 14,
                            paddingTop: 8,
                            borderColor: 'lightgray',
                            width: '80%'
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
                {sendLoading ? <ActivityIndicator size={18} /> : <Ionicons name="send" size={18} color={'white'} />}
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
            quality: 1,
        });

        if (!result.canceled) {
            await uploadImage(result.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        setSendLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${new Date().getTime()}`);
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await onSend([], downloadURL);
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
                        <Text style={[titleFontStyle, { fontSize: 16 }]}>Orion</Text>
                    </>
                }
                backArrow
                rightHeaderComponent={< Feather name="video" size={24} color={orange} />}
                rightHeaderCallback={() => RootNavigation.navigate('CallScreen')}
                style={{
                    backgroundColor: 'white'
                }}
            />

            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 'user2',
                    name: 'Jonash',
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
            />
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


export default Message;
