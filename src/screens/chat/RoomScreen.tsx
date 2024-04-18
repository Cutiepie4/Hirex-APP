import React, { useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import uuid from 'react-native-uuid';
import { db } from '../../../firebaseConfig'
import {
    addDoc,
    collection,
    doc,
    setDoc,
    getDoc,
    updateDoc,
    onSnapshot,
    deleteField,
} from "firebase/firestore";
import RootNavigation from "@/route/RootNavigation";

export default function RoomScreen() {
    const [roomId, setRoomId] = useState('');

    const onCallOrJoin = (screen) => {
        if (roomId.length > 0) {
            RootNavigation.navigate(screen, { roomId });
        }
    };

    useEffect(() => {
        setRoomId(String(uuid.v4()));
    }, []);

    const checkMeeting = async () => {
        if (roomId) {
            const roomRef = doc(db, "room", roomId);
            const roomSnapshot = await getDoc(roomRef);

            if (!roomSnapshot.exists() || roomId === "") {
                Alert.alert("Wait for your instructor to start the meeting.");
                return;
            } else {
                onCallOrJoin('JoinScreen');
            }
        } else {
            Alert.alert("Provide a valid Room ID.");
        }
    };

    return (
        <View>
            <Text style={{
                marginTop: 30
            }}>Enter Room ID:</Text>
            <TextInput
                style={{
                    marginLeft: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 10
                }}
                value={roomId}
                onChangeText={setRoomId}
            />
            <View>
                <TouchableOpacity
                    style={{
                        width: 100,
                        height: 50,
                        backgroundColor: 'red'
                    }}
                    onPress={() => onCallOrJoin('CallScreen')}
                >
                    <Text >
                        Start meeting
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: 100,
                        height: 50,
                    }}
                    onPress={() => checkMeeting()}
                >
                    <Text >
                        Join meeting
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}