import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Animated, Button, LayoutAnimation, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Container from '../../components/Container';
import RootNavigation from '../../route/RootNavigation';
import { deepPurple, purple } from '../../styles/styles';
import { Feather } from '@expo/vector-icons';
import { doc, updateDoc, deleteField, collection, addDoc, setDoc, onSnapshot } from 'firebase/firestore';
import Draggable from '@ngenux/react-native-draggable-view';
import { db } from '../../../firebaseConfig';
import {
    RTCPeerConnection,
    RTCView,
    mediaDevices,
    RTCIceCandidate,
    RTCSessionDescription,
    MediaStream,
} from "react-native-webrtc";
import CallActionBox from './CallActionBox';

const configuration = {
    iceServers: [
        {
            urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
        },
    ],
    iceCandidatePoolSize: 10,
};

const VideoCall = (props) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef();

    const { roomId } = props.route.params;
    const [localStream, setLocalStream] = useState<MediaStream>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream>(null);
    const [cachedLocalPC, setCachedLocalPC] = useState<RTCPeerConnection>();

    const [isMuted, setIsMuted] = useState<boolean>(false);
    const [isOffCam, setIsOffCam] = useState<boolean>(false);

    //End call button
    async function endCall() {
        if (cachedLocalPC) {
            const senders = cachedLocalPC.getSenders();
            senders.forEach((sender) => {
                cachedLocalPC.removeTrack(sender);
            });
            cachedLocalPC.close();
        }

        const roomRef = doc(db, "room", roomId);
        await updateDoc(roomRef, { answer: deleteField() });

        setLocalStream(null);
        setRemoteStream(null);
        setCachedLocalPC(null);
        RootNavigation.pop();
    }

    //start local webcam on your device
    const startLocalStream = async () => {
        const isFront = true;
        const devices = await mediaDevices.enumerateDevices();

        const facing = isFront ? "front" : "environment";
        const videoSourceId = devices.find(
            (device) => device.kind === "videoinput" && device.facing === facing
        );
        const facingMode = isFront ? "user" : "environment";
        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    minWidth: 500, // Provide your own width, height and frame rate here
                    minHeight: 300,
                    minFrameRate: 30,
                },
                facingMode,
                optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
            },
        };
        const newStream = await mediaDevices.getUserMedia(constraints);
        setLocalStream(newStream);
    };

    const startCall = async (id) => {
        const localPC = new RTCPeerConnection(configuration);
        localStream.getTracks().forEach((track) => {
            localPC.addTrack(track, localStream);
        });

        const roomRef = doc(db, "room", id);
        const callerCandidatesCollection = collection(roomRef, "callerCandidates");
        const calleeCandidatesCollection = collection(roomRef, "calleeCandidates");

        localPC.addEventListener("icecandidate", (e) => {
            if (!e.candidate) {
                console.log("Got final candidate!");
                return;
            }
            addDoc(callerCandidatesCollection, e.candidate.toJSON());
        });

        localPC.ontrack = (e) => {
            const newStream = new MediaStream(undefined);
            e.streams[0].getTracks().forEach((track) => {
                newStream.addTrack(track);
            });
            setRemoteStream(newStream);
        };

        const offer = await localPC.createOffer();
        await localPC.setLocalDescription(offer);

        await setDoc(roomRef, { offer, connected: false }, { merge: true });

        // Listen for remote answer
        onSnapshot(roomRef, (doc) => {
            const data = doc.data();
            if (!localPC.currentRemoteDescription && data.answer) {
                const rtcSessionDescription = new RTCSessionDescription(data.answer);
                localPC.setRemoteDescription(rtcSessionDescription);
            } else {
                setRemoteStream(null);
            }
        });

        onSnapshot(calleeCandidatesCollection, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    let data = change.doc.data();
                    localPC.addIceCandidate(new RTCIceCandidate(data));
                }
            });
        });

        setCachedLocalPC(localPC);
    };

    const switchCamera = () => {
        localStream.getVideoTracks().forEach((track) => track._switchCamera());
    };

    // Mutes the local's outgoing audio
    const toggleMute = () => {
        if (!remoteStream) {
            return;
        }
        localStream.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
            setIsMuted(!track.enabled);
        });
    };

    const toggleCamera = () => {
        localStream.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
            setIsOffCam(!isOffCam);
        });
    };

    useEffect(() => {
        startLocalStream();
    }, []);

    useEffect(() => {
        if (localStream && roomId) {
            startCall(roomId);
        }
    }, [localStream, roomId]);

    return (
        <View style={styles.container}>
            <Draggable
                edgeSpacing={2}
                shouldStartDrag={true}
                initialOffsetX={0}
                initialOffsetY={0}
                // orientation="landscape"
                ref={ref => (draggableRef.current = ref)}
                viewStyle={{
                    borderRadius: 20,
                    width: 100,
                    height: 150,
                    backgroundColor: 'red'
                }}
            >
                <View style={{
                    borderRadius: 20,
                    flex: 1,
                }}>
                    <RTCView
                        style={{
                            flex: 1,
                            borderRadius: 20,
                        }}
                        streamURL={localStream && localStream.toURL()}
                    />
                </View>
                <TouchableOpacity style={{
                    position: 'absolute',
                    width: 30,
                    height: 30,
                    backgroundColor: deepPurple,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15,
                    alignSelf: 'center',
                    bottom: -15
                }}>
                    <MaterialIcons name="flip-camera-android" size={18} color='white' />
                </TouchableOpacity>
            </Draggable>

            <RTCView
                style={{
                    flex: 1
                }}
                streamURL={localStream && localStream.toURL()}
            />

            <CallActionBox
                toggleMute={toggleMute}
                toggleCamera={toggleCamera}
                endCall={endCall}
                switchCamera={switchCamera}
            />
        </View>
    );
};

export default VideoCall;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginBottom: 64,
        paddingHorizontal: 50,
        width: '100%',
        justifyContent: 'space-between'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'red',
        borderRadius: 25,
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    draggableContainer: {
        position: 'absolute',
        width: 100,
        height: 150,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderRadius: 10,
    },
    draggableContent: {
        borderRadius: 10,
    },
});