import React, { useLayoutEffect } from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '../screens/welcome/Welcome';
import Banner from '../screens/welcome/Banner';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../redux/store/reducer';
import Messages from '../screens/chat/Messages';
import CallActionBox from '../screens/chat/CallActionBox';
import CallScreen from '../screens/chat/CallScreen';
import { hideTabBar, showTabBar } from '../redux/slice/authSlice';
import { Home, Description, UploadCV, UploadCVSuccess } from '@/screens/Home';
import ChatScreen from '../screens/chat/ChatScreen';
import Setting from '../screens/setting/Setting';
import { Profile, AboutMeScreen, Experience, Education, Certification, Skill } from '../screens';
import Account from '../screens/setting/Account';
import UpdatePassword from '../screens/setting/UpdatePassword';
import Login from '../screens/login/Login';
import IncomingCall from '@/screens/chat/IncomingCall';
import JoinScreen from '@/screens/chat/JoinScreen';

const homeScreenStack = {
    Home: Home,
    Description: Description,
    UploadCV: UploadCV,
    UploadCVSuccess: UploadCVSuccess,

}

const chatScreenStack = {
    Messages: Messages,
    ChatScreen: ChatScreen,
    CallActionBox: CallActionBox,
    CallScreen: CallScreen,
    IncomingCall: IncomingCall,
    JoinScreen: JoinScreen
}

const pofileScreenStack = {
    Profile,
    AboutMeScreen,
    Experience,
    Education,
    Certification,
    Skill
}

const settingScreenStack = {
    Setting: Setting,
    Account: Account,
    UpdatePassword: UpdatePassword,
    Login: Login
}

const Stack = createStackNavigator();

const HomeStack = ({ navigation, route }: any) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'Home' || routeName == undefined) {
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
                <Stack.Screen key={name} name={name} component={component} />
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
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );

};


const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {Object.entries(pofileScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
};

const SettingStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {Object.entries(settingScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
};
export { HomeStack, ChatStack, ProfileStack, SettingStack }