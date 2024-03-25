import StackNavigator from './src/navigation/StackNavigator';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/config/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StackNavigator />
      </PersistGate>
    </Provider>
  );
}
