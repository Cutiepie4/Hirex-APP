import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Container from '../../components/Container'
import Header from '../../components/Header'
import SearchInput from '../../components/SearchInput'
import { backgroundColor, orange, placeholderTextColor, regularPadding, titleFontStyle } from '../../styles/styles'
import AVATAR from '../../assets/images/avt.png'
import NO_MESSAGES from '../../assets/images/no_messages.png'
import { ScrollView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons';
import RootNavigation from '../../route/RootNavigation'
import { db } from '../../../firebaseConfig'
import { Timestamp, collection, getDocs, query, where } from 'firebase/firestore'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/slice/authSlice'
import { RootReducer } from '../../redux/store/reducer'
import { SimpleLineIcons } from '@expo/vector-icons';
import { saveChatRoom } from '../../redux/slice/chatSlice'
import { ChatRoom } from './ChatScreen'

const Messages = () => {
    const dispatch = useDispatch();
    const { chatRoom: initChatRoom } = useSelector((state: RootReducer) => state.chatReducer);
    const [chatRoom, setChatRoom] = useState<ChatRoom[]>([]);
    const { phoneNumber, isLoading } = useSelector((state: RootReducer) => state.authReducer);
    const width = useWindowDimensions().width;

    useEffect(() => {
        setChatRoom(initChatRoom.map(item => {
            return {
                ...item,
                messages: item.messages.map(message => {
                    return {
                        ...message,
                        sentAt: Timestamp.fromDate(new Date(message.sentAt))
                    }
                })
            }
        }));
    }, [initChatRoom]);

    useFocusEffect(
        useCallback(() => {
            const initialize = async () => {
                dispatch(showLoading());
                let tempChatRoom = [];
                const fetchData = async () => {
                    const q = query(collection(db, 'conversations_col'), where('participants', 'array-contains', 'user1'));
                    const docs = await getDocs(q);
                    docs.forEach((doc) => {
                        const data = doc.data();
                        tempChatRoom = [
                            ...tempChatRoom,
                            {
                                ...data,
                                messages: data.messages.map(item => {
                                    return { ...item, sentAt: item.sentAt.toDate().toISOString() }
                                })
                            }
                        ];
                    });
                };
                await fetchData();
                dispatch(saveChatRoom(tempChatRoom));
                dispatch(hideLoading());
            };
            initialize();
        }, [])
    );

    const formatTimeDifference = (timestamp: Timestamp): string => {
        const timestampFromFirestore = timestamp.toDate();
        const currentTimestamp = new Date();

        const timeDifference = currentTimestamp.getTime() - timestampFromFirestore.getTime();
        const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);

        if (timeDifferenceInSeconds < 60) {
            return `${timeDifferenceInSeconds} seconds ago`;
        } else if (timeDifferenceInSeconds < 3600) {
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            return `${minutes} minutes ago`;
        } else if (timeDifferenceInSeconds < 86400) {
            const hours = Math.floor(timeDifferenceInSeconds / 3600);
            return `${hours} hours ago`;
        } else {
            const days = Math.floor(timeDifferenceInSeconds / 86400);
            return `${days} days ago`;
        }
    };

    const renderItem = ({ item, index }) => {
        const messages = item.messages;
        const chatFriend = item.participants.filter(item => item != phoneNumber)[0];

        return (
            <ScrollView
                horizontal
                pagingEnabled
                scrollToOverflowEnabled
                showsHorizontalScrollIndicator={false}
            >
                <View style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        onPress={() => RootNavigation.navigate('ChatScreen', { data: item })}
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 16,
                            paddingHorizontal: 12,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            marginTop: 10,
                            marginHorizontal: regularPadding,
                            width: width - regularPadding * 2,
                        }}>
                        <View style={{
                            width: 50,
                            height: 50,
                            justifyContent: 'center',
                            marginRight: 12
                        }}>
                            <Image
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 25,
                                }}
                                resizeMode='contain'
                                source={AVATAR}
                            />
                        </View>
                        <View style={[styles.inbox]}>
                            <View style={[styles.row]}>
                                <Text style={[titleFontStyle]}>
                                    {chatFriend}
                                </Text>
                                <Text style={{
                                    fontSize: 12,
                                    color: placeholderTextColor
                                }}>
                                    {formatTimeDifference(messages.length > 0 && messages[messages.length - 1].sentAt)}
                                </Text>
                            </View>
                            <View style={[styles.row, { marginTop: 8 }]}>
                                <View>
                                    <Text>
                                        {messages.length > 0 && messages[messages.length - 1].content}
                                    </Text>
                                </View>
                                <View style={{
                                    backgroundColor: orange,
                                    width: 20,
                                    height: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10
                                }}>
                                    <Text style={[
                                        { color: backgroundColor },
                                    ]}>
                                        {2}
                                    </Text>
                                </View>
                            </View>
                        </View >
                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        backgroundColor: '#fae7e2',
                        width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                        marginTop: 10,
                        marginRight: regularPadding
                    }}>
                        <Feather name="trash-2" size={24} color={orange} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    };

    return (
        <Container backgroundColor={'#f9f9f9'}>
            <Header
                title='Messages'
                rightHeaderComponent={<SimpleLineIcons name="options-vertical" size={16} color="black" />}
            />

            <FlatList
                data={chatRoom}
                renderItem={renderItem}
                style={{
                    height: '100%'
                }}
                ListHeaderComponent={
                    <View style={[styles.container]}>
                        <SearchInput
                            placeholder="Search name..."
                            onChangeText={(text) => console.log(text)}
                            style={{
                                borderWidth: 0,
                                backgroundColor: 'white',
                                paddingVertical: 16,
                                borderRadius: 10,
                                marginHorizontal: 16
                            }}
                        />
                    </View>
                }
                ListEmptyComponent={
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={NO_MESSAGES} />
                        <Text style={[titleFontStyle, { fontSize: 20 }]}>No messages</Text>
                        <Text style={{
                            marginTop: 20,
                            maxWidth: '70%',
                            textAlign: 'center',
                            marginBottom: 100
                        }}>You currently have no incoming messages thank you</Text>
                    </View>
                }
            />
        </Container >
    )
};

export default Messages;

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 20,
        flexDirection: 'column',
    },
    inbox: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});