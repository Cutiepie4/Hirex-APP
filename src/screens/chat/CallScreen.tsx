// import React, { useState, useEffect } from "react";
// import { View } from "react-native";

// // import {
// //     RTCPeerConnection,
// //     RTCView,
// //     mediaDevices,
// //     RTCIceCandidate,
// //     RTCSessionDescription,
// //     MediaStream,
// // } from "react-native-webrtc";
// import { db } from "../../../firebaseConfig";
// import {
//     addDoc,
//     collection,
//     doc,
//     setDoc,
//     getDoc,
//     updateDoc,
//     onSnapshot,
//     deleteField,
// } from "firebase/firestore";

// import CallActionBox from "./CallActionBox";
// import Container from "../../components/Container";
// import RootNavigation from "../../route/RootNavigation";
// import { Octicons } from '@expo/vector-icons';

// const configuration = {
//     iceServers: [
//         {
//             urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
//         },
//     ],
//     iceCandidatePoolSize: 10,
// };

// export default function CallScreen(props) {
//     const { roomId } = props.route.params;
//     const [localStream, setLocalStream] = useState<MediaStream>(null);
//     const [remoteStream, setRemoteStream] = useState<MediaStream>(null);
//     const [cachedLocalPC, setCachedLocalPC] = useState<RTCPeerConnection>();

//     const [isMuted, setIsMuted] = useState<boolean>(false);
//     const [isOffCam, setIsOffCam] = useState<boolean>(false);

//     useEffect(() => {
//         startLocalStream();
//     }, []);

//     useEffect(() => {
//         if (localStream && roomId) {
//             startCall(roomId);
//         }
//     }, [localStream, roomId]);

//     //End call button
//     async function endCall() {
//         if (cachedLocalPC) {
//             const senders = cachedLocalPC.getSenders();
//             senders.forEach((sender) => {
//                 cachedLocalPC.removeTrack(sender);
//             });
//             cachedLocalPC.close();
//         }

//         const roomRef = doc(db, "room", roomId);
//         await updateDoc(roomRef, { answer: deleteField() });

//         setLocalStream(null);
//         setRemoteStream(null);
//         setCachedLocalPC(null);
//         RootNavigation.pop();
//     }

//     //start local webcam on your device
//     const startLocalStream = async () => {
//         const isFront = true;
//         const devices = await mediaDevices.enumerateDevices();

//         const facing = isFront ? "front" : "environment";
//         const videoSourceId = devices.find(
//             (device) => device.kind === "videoinput" && device.facing === facing
//         );
//         const facingMode = isFront ? "user" : "environment";
//         const constraints = {
//             audio: true,
//             video: {
//                 mandatory: {
//                     minWidth: 500, // Provide your own width, height and frame rate here
//                     minHeight: 300,
//                     minFrameRate: 30,
//                 },
//                 facingMode,
//                 optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
//             },
//         };
//         const newStream = await mediaDevices.getUserMedia(constraints);
//         setLocalStream(newStream);
//     };

//     const startCall = async (id) => {
//         const localPC = new RTCPeerConnection(configuration);
//         localStream.getTracks().forEach((track) => {
//             localPC.addTrack(track, localStream);
//         });

//         const roomRef = doc(db, "room", id);
//         const callerCandidatesCollection = collection(roomRef, "callerCandidates");
//         const calleeCandidatesCollection = collection(roomRef, "calleeCandidates");

//         localPC.addEventListener("icecandidate", (e) => {
//             if (!e.candidate) {
//                 console.log("Got final candidate!");
//                 return;
//             }
//             addDoc(callerCandidatesCollection, e.candidate.toJSON());
//         });

//         localPC.ontrack = (e) => {
//             const newStream = new MediaStream();
//             e.streams[0].getTracks().forEach((track) => {
//                 newStream.addTrack(track);
//             });
//             setRemoteStream(newStream);
//         };

//         const offer = await localPC.createOffer();
//         await localPC.setLocalDescription(offer);

//         await setDoc(roomRef, { offer, connected: false }, { merge: true });

//         // Listen for remote answer
//         onSnapshot(roomRef, (doc) => {
//             const data = doc.data();
//             if (!localPC.currentRemoteDescription && data.answer) {
//                 const rtcSessionDescription = new RTCSessionDescription(data.answer);
//                 localPC.setRemoteDescription(rtcSessionDescription);
//             } else {
//                 setRemoteStream();
//             }
//         });

//         onSnapshot(calleeCandidatesCollection, (snapshot) => {
//             snapshot.docChanges().forEach((change) => {
//                 if (change.type === "added") {
//                     let data = change.doc.data();
//                     localPC.addIceCandidate(new RTCIceCandidate(data));
//                 }
//             });
//         });

//         setCachedLocalPC(localPC);
//     };

//     const switchCamera = () => {
//         localStream.getVideoTracks().forEach((track) => track._switchCamera());
//     };

//     // Mutes the local's outgoing audio
//     const toggleMute = () => {
//         if (!remoteStream) {
//             return;
//         }
//         localStream.getAudioTracks().forEach((track) => {
//             track.enabled = !track.enabled;
//             setIsMuted(!track.enabled);
//         });
//     };

//     const toggleCamera = () => {
//         localStream.getVideoTracks().forEach((track) => {
//             track.enabled = !track.enabled;
//             setIsOffCam(!isOffCam);
//         });
//     };

//     return (
//         <Container >
//             <View
//                 style={{
//                     flex: 1
//                 }}
//             >
//                 {!remoteStream && (
//                     <RTCView
//                         style={{
//                             flex: 1
//                         }}
//                         streamURL={localStream && localStream.toURL()}
//                         objectFit={"cover"}
//                     />
//                 )}

//                 {remoteStream && (
//                     <>
//                         <RTCView
//                             style={{
//                                 flex: 1
//                             }}
//                             streamURL={remoteStream && remoteStream.toURL()}
//                             objectFit={"cover"}
//                         />
//                         {!isOffCam && (
//                             <RTCView
//                                 style={{
//                                     flex: 1
//                                 }}
//                                 streamURL={localStream && localStream.toURL()}
//                             />
//                         )}
//                     </>
//                 )}
//             </View>

//             <CallActionBox
//                 switchCamera={switchCamera}
//                 toggleMute={toggleMute}
//                 toggleCamera={toggleCamera}
//                 endCall={endCall}
//             />
//         </Container>
//     );
// }
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CallScreen = () => {
  return (
    <View>
      <Text>CallScreen</Text>
    </View>
  )
}

export default CallScreen

const styles = StyleSheet.create({})