import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import { Provider, useDispatch, useSelector, } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './src/route/RootNavigation';
import Login from './src/screens/login/Login'
import Signup from './src/screens/signup/Signup'
import Banner from './src/screens/welcome/Banner';
import Welcome from './src/screens/welcome/Welcome';
import ChooseRole from './src/screens/signup/ChooseRole';
import Information from './src/screens/signup/Information';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Alert, LogBox, View, Text } from 'react-native';
import { RootReducer } from './src/redux/store/reducer';
import HomeTab from './src/route/HomeTab';
import LoadingOverlay from './src/components/LoadingOverlay';
import { loadFonts } from '@/theme';
import CustomToast from '@/components/CustomToast';
import messaging from '@react-native-firebase/messaging'
import { saveDeviceToken } from '@/redux/slice/authSlice';

const Stack = createStackNavigator();

const toHomeScreens = {
    Banner: Banner,
    HomeTab: HomeTab,
}

const authScreens = {
    Banner: Banner,
    Welcome: Welcome,
    Login: Login,
    Signup: Signup,
    ChooseRole: ChooseRole,
    Information: Information,
    HomeTab: HomeTab,
}

const ToHomeScreen = () => {

    const Stack = createStackNavigator();
    LogBox.ignoreLogs([
        'Non-serializable values were found in the navigation state',
    ]);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {Object.entries(toHomeScreens).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
}

const EntryNavigation = () => {
    const { access_token } = useSelector((state: RootReducer) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        const requestUserPermissions = async () => {
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL
            if (enabled) {
                console.log('Authorized status: ', authStatus);
            }
        };

        if (requestUserPermissions()) {
            messaging().getToken().then(token => { dispatch(saveDeviceToken(token)) })
        }
        else {
            console.log('Permission messaging not granted: ');
        }

        messaging().getInitialNotification().then(async (remoteMessage) => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state:', remoteMessage.notification)
            }
        })

        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('Notification caused app to oopen from background state: , ', remoteMessage.notification)
        })

        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('message handled in background, ', remoteMessage)
        })

        const unsubcribe = messaging().onMessage(async (remoteMessage) => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
        })

        return unsubcribe;
    }, [])

    if (access_token) {
        return <ToHomeScreen />;
    } else {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {Object.entries(authScreens).map(([name, component]) => (
                    <Stack.Screen key={name} name={name} component={component} />
                ))}
            </Stack.Navigator>
        );
    }
};

const Test = () => (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <Text>
            Testing
        </Text>
    </View>
)

const App = () => {
    const preload = async () => {
        await Promise.all([loadFonts()]);
    }

    React.useEffect(() => {
        preload();
    }, []);

    return (
        <ActionSheetProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <NavigationContainer ref={navigationRef}>
                        <LoadingOverlay>
                            <EntryNavigation />
                            {/* <Test /> */}
                        </LoadingOverlay>
                        <CustomToast />
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        </ActionSheetProvider>
    );
};

export default App;