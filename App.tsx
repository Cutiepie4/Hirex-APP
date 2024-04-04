import React from 'react';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import { Provider, useSelector, } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/route/HomeTab';
import ChatScreen from './src/screens/ChatScreen';
import { navigationRef } from './src/route/RootNavigation';
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'
import Banner from './src/screens/Banner';
import Welcome from './src/screens/Welcome';
import ChooseRole from './src/screens/ChooseRole';
import Information from './src/screens/Information';
import Profile from './src/screens/Profile';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AboutMeScreen from './src/screens/AboutMeScreen';
import Experience from './src/screens/Experience';
import Education from './src/screens/Education';
import Skill from './src/screens/Skill';
import Certification from './src/screens/Certification';
import Account from './src/screens/Account';
import Setting from './src/screens/Setting';
import UpdatePassword from './src/screens/UpdatePassword';
import { LogBox } from 'react-native';
import Navbar from './src/components/Navbar';
import Company from './src/screens/Company';
import { RootReducer } from './src/redux/store/reducer';
import HomeTab from './src/route/HomeTab';

const Stack = createStackNavigator();

const toHomeScreens = {
    Banner: Banner,
    HomeTab: HomeTab,
}

const authScreens = {
    Banner: Banner,
    Welcome: Welcome,
    Login: Login,
    SignUp: Signup,
    ChooseRole: ChooseRole,
    Information: Information,
}

const ToHomeScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {Object.entries(toHomeScreens).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
            ))}
        </Stack.Navigator>
    );
}

const FirstNavigation = () => {
    const { access_token } = useSelector((state: RootReducer) => state.authReducer);

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

const App = () => {
    return (
        <ActionSheetProvider>
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={null}>
                    <NavigationContainer ref={navigationRef}>
                        <FirstNavigation />
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        </ActionSheetProvider>
    );
}

export default App;