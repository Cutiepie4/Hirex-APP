import { SafeAreaView, Text, View, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Container from '../components/Container'
import { backgroundColor, deepPurple, orange, regularPadding, titleFontSize } from '../styles/styles'
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from '../../firebaseConfig'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Bubble, Composer, ComposerProps, GiftedChat, IChatMessage, InputToolbar, InputToolbarProps, Send } from 'react-native-gifted-chat'
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import RootNavigation from '../config/RootNavigation';

const Message = () => {
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

                user: {
                    _id: 2,
                    name: 'React Native',
                },
            },
            {
                _id: 2,
                text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
                createdAt: new Date(),
                // quickReplies: {
                //     type: 'checkbox', // or 'radio',
                //     values: [
                //         {
                //             title: 'Yes',
                //             value: 'yes',
                //         },
                //         {
                //             title: 'Yes, let me show you with a picture!',
                //             value: 'yes_picture',
                //         },
                //         {
                //             title: 'Nope. What?',
                //             value: 'no',
                //         },
                //     ],
                // },
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
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => console.log('Attach button pressed')}>
                        <Feather name="paperclip" size={18} color={deepPurple} />
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
                <Ionicons name="send" size={18} color={'white'} />
            </View>
        </Send>;
    }

    return (
        <Container
            backgroundColor={'white'}
            statusBarColor='white'
            statusBarContentColor='dark'
        >
            <Header
                title='Messages'
                leftHeader
                rightHeaderComponent={<Feather name="video" size={24} color={orange} />}
                rightHeaderCallback={() => RootNavigation.navigate('VideoCall')}
                style={{
                    backgroundColor: 'white'
                }}
            />
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
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

            />
        </Container>
    )
}

const styles = StyleSheet.create({

});


export default Message;
