import React from 'react';
import 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import Message from './src/screens/Message';
import { navigationRef } from './src/config/RootNavigation';
import Messages from './src/screens/Messages';
import Notifications from './src/screens/Notifications';
import VideoCall from './src/screens/VideoCall';

const listScreens = {
  HomeScreen: HomeScreen,
  Message: Message,
  Messages: Messages,
  Notifications: Notifications,
  VideoCall: VideoCall
}

const App = () => {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {Object.entries(listScreens).map(([name, component]) => (
              <Stack.Screen key={name} name={name} component={component} />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;