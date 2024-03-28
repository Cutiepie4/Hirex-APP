import React from 'react';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import { Provider, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import Message from './src/screens/Message';
import { navigationRef } from './src/config/RootNavigation';
import Messages from './src/screens/Messages';
import Notifications from './src/screens/Notifications';
import VideoCall from './src/screens/VideoCall';
import NotificationDetail from './src/screens/NotificationDetail';
import { ActivityIndicator } from 'react-native';
import { RootReducer } from './src/redux/store/reducer';
import LoadingOverlay from './src/components/LoadingOverlay';
import CallScreen from './src/screens/CallScreen';

const listScreens = {
  HomeScreen: HomeScreen,
  Message: Message,
  Messages: Messages,
  Notifications: Notifications,
  VideoCall: VideoCall,
  NotificationDetail: NotificationDetail,
  CallScreen: CallScreen

}

const App = () => {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <LoadingOverlay>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {Object.entries(listScreens).map(([name, component]) => (
                <Stack.Screen key={name} name={name} component={component} />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </LoadingOverlay>
      </PersistGate>
    </Provider>
  );
};

export default App;