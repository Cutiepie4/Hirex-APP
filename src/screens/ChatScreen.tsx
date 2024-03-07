import { SafeAreaView, Text, View, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Container from '../components/Container'
import { titleFontSize } from '../styles/styles'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from '../../firebaseConfig'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { GiftedChat, IChatMessage } from 'react-native-gifted-chat'

const ChatScreen = () => {
    const db = getFirestore(app);
    const [messages, setMessages] = useState<IChatMessage[]>([]);

    const fetchData = async () => {
        const data = await getDocs(collection(db, "messages"));
        data.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        })
    }

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT',
                createdAt: new Date(),
                quickReplies: {
                    type: 'radio', // or 'checkbox',
                    keepIt: true,
                    values: [
                        {
                            title: '😋 Yes',
                            value: 'yes',
                        },
                        {
                            title: '📷 Yes, let me show you with a picture!',
                            value: 'yes_picture',
                        },
                        {
                            title: '😞 Nope. What?',
                            value: 'no',
                        },
                    ],
                },
                user: {
                    _id: 2,
                    name: 'React Native',
                },
            },
            {
                _id: 2,
                text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
                createdAt: new Date(),
                quickReplies: {
                    type: 'checkbox', // or 'radio',
                    values: [
                        {
                            title: 'Yes',
                            value: 'yes',
                        },
                        {
                            title: 'Yes, let me show you with a picture!',
                            value: 'yes_picture',
                        },
                        {
                            title: 'Nope. What?',
                            value: 'no',
                        },
                    ],
                },
                user: {
                    _id: 2,
                    name: 'React Native',
                },
            }
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    return (
        <Container>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                    name: 'Jonash',
                }}
                isCustomViewBottom={true}
                textInputProps={{
                    placeholder: "Enter your message..."
                }}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 20,
    },
    input: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderColor: '#dbdbdb',
        padding: 10,
    },
});


export default ChatScreen;
