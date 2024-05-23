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
import { Home, Description, Description2, UploadCV, UploadCVSuccess, Appreciation, HomeHandler, Company as CompanyHome } from '@/screens/Home';
import ChatScreen from '../screens/chat/ChatScreen';
import Setting from '../screens/setting/Setting';
import { Profile, AboutMeScreen, Experience, Education, Certification, Skill } from '../screens';
import Account from '../screens/setting/Account';
import UpdatePassword from '../screens/setting/UpdatePassword';
import Login from '../screens/login/Login';
import IncomingCall from '@/screens/chat/IncomingCall';
import JoinScreen from '@/screens/chat/JoinScreen';
import Notifications from '@/screens/chat/Notifications';
import NotificationDetail from '@/screens/chat/NotificationDetail';
import Test from '@/screens/chat/Test';
import VideoStream from '@/screens/chat/VideoStream';
import ProfileHandler from '@/screens/profile/ProfileHandler';
import Company from '@/screens/profile/Company';
import CompanyDescription from '@/screens/Home/CompanyDescriptionScreen';
import Review from '@/screens/Home/ReviewScreen';
import ProfileReadonly from '@/screens/Home/ProfileReadonly';

const homeScreenStack = {
    HomeHandler: HomeHandler,
    Description: Description,
    Description2: Description2,
    UploadCV: UploadCV,
    UploadCVSuccess: UploadCVSuccess,
    ChatScreen: ChatScreen,
    Appreciation: Appreciation,
    ProfileReadonly: ProfileReadonly,
}

const companyScreenStack = {
    Company: CompanyHome,
    CompanyDescription: CompanyDescription,
    Review: Review,
    Description: Description,
    Description2: Description2,
    UploadCV: UploadCV,
    UploadCVSuccess: UploadCVSuccess,
}

const chatScreenStack = {
    Messages: Messages,
    ChatScreen: ChatScreen,
    CallActionBox: CallActionBox,
    CallScreen: CallScreen,
    IncomingCall: IncomingCall,
    JoinScreen: JoinScreen,
    Setting: Setting,
    Test: Test,
    VideoStream: VideoStream
}

const pofileScreenStack = {
    ProfileHandler,
    AboutMeScreen,
    Experience,
    Education,
    Certification,
    Skill,
    Company
}

const settingScreenStack = {
    Setting: Setting,
    Account: Account,
    UpdatePassword: UpdatePassword,
    Login: Login,
    Notifications: Notifications,
    NotificationDetail: NotificationDetail
}

const Stack = createStackNavigator();

const HomeStack = ({ navigation, route }: any) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'HomeHandler' || routeName == undefined) {
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

const CompanyStack = ({ navigation, route }: any) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'Company' || routeName == undefined) {
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
            {Object.entries(companyScreenStack).map(([name, component]) => (
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


const ProfileStack = ({ navigation, route }: any) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'ProfileHandler' || routeName == undefined) {
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
            {Object.entries(pofileScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
};

const SettingStack = ({ navigation, route }: any) => {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'Setting' || routeName == undefined) {
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
            {Object.entries(settingScreenStack).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
};
export { HomeStack, ChatStack, ProfileStack, SettingStack, CompanyStack }