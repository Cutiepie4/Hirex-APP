import React, { useLayoutEffect } from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/Welcome';
import Banner from '../screens/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../redux/store/reducer';
import HomeScreen from '../screens/HomeScreen';
import Messages from '../screens/chat/Messages';
import Message from '../screens/chat/Message';
import VideoCall from '../screens/chat/VideoCall';
import CallActionBox from '../screens/chat/CallActionBox';
import CallScreen from '../screens/chat/CallScreen';
import DraggableCameraView from '../screens/chat/DraggableCameraView';
import { hideTabBar, showTabBar } from '../redux/slice/authSlice';

const homeScreenStack = {
    HomeScreen: HomeScreen,

}

const chatScreenStack = {
    Messages: Messages,
    Message: Message,
    VideoCall: VideoCall,
    CallActionBox: CallActionBox,
    CallScreen: CallScreen,
    DraggableCameraView: DraggableCameraView,
}

const Stack = createStackNavigator();

const HomeStack = ({ navigation, route }: any) => {

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'HomeScreen' || routeName == undefined) {
            dispatch(showTabBar());
        } else {
            dispatch(hideTabBar());
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {Object.entries(homeScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} options={{
                    title: name
                }} />
            ))}
        </Stack.Navigator>
    );
};

const ChatStack = ({ navigation, route }: any) => {

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'Messages' || routeName == undefined) {
            dispatch(showTabBar());
        } else {
            dispatch(hideTabBar());
        }
    }, [navigation, route]);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {Object.entries(chatScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} options={{
                    title: name
                }} />
            ))}
        </Stack.Navigator>
    );

};

export { HomeStack, ChatStack }