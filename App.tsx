import React from 'react';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import { Provider, useSelector, } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './src/route/RootNavigation';
import Login from './src/screens/Login'
import Signup from './src/screens/Signup'
import Banner from './src/screens/Banner';
import Welcome from './src/screens/Welcome';
import ChooseRole from './src/screens/ChooseRole';
import Information from './src/screens/Information';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { RootReducer } from './src/redux/store/reducer';
import HomeTab from './src/route/HomeTab';
import LoadingOverlay from './src/components/LoadingOverlay';
import { loadFonts } from '@/theme';

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
    HomeTab: HomeTab,
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

const EntryNavigation = () => {
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
                        </LoadingOverlay>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        </ActionSheetProvider>
    );
}

export default App;