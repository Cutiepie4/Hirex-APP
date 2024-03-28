import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, LayoutAnimation, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Container from '../components/Container';
import RootNavigation from '../config/RootNavigation';
import { deepPurple, purple } from '../styles/styles';
import { Feather } from '@expo/vector-icons';

export default function VideoCall() {
    const [cameraOn, setCameraOn] = useState(true);
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [dragging, setDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (_, gestureState) => {
                setDragging(true);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setPosition({
                    x: gestureState.x0 - position.x,
                    y: gestureState.y0 - position.y,
                });
            },
            onPanResponderMove: (_, gestureState) => {
                setPosition({
                    x: gestureState.dx,
                    y: gestureState.dy,
                });
            },
            onPanResponderRelease: () => {
                setDragging(false);
            },
        })
    ).current;

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant permission" />
            </View>
        );
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    return (
        <View style={styles.container}>

            <View
                style={[
                    styles.draggableContainer,
                    {
                        zIndex: 9999,
                        transform: [{ translateX: position.x }, { translateY: position.y }],
                    },
                ]}
                {...panResponder.panHandlers}
            >

                <View style={styles.draggableContent}>
                </View>
                <TouchableOpacity style={{
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
            </View>

            <Camera style={styles.camera} type={type}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        color: 'white',
                        alignSelf: 'flex-end',
                        position: 'absolute',
                        bottom: 0,
                        flex: 1,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        09:12
                    </Text>
                </View>
                <View style={{
                    height: '20%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 50
                }}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'white' }]} onPress={() => setCameraOn(prev => !prev)}>
                        <Feather name="video" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Ionicons name="call" size={24} color="white" onPress={() => RootNavigation.pop()} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <FontAwesome name="microphone" size={24} color="white" />
                    </TouchableOpacity>
                </View>

            </Camera>
        </View>
    );
}

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
        flex: 1,
        borderRadius: 10,
    },
});
