import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/config/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/components/HomeScreen';
import { Login, Signup } from './src/screens';

const listScreens = {
  // HomeScreen: HomeScreen,
  Login: Login,
  Signup: Signup
}

const App = () => {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
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