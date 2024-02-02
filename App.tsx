import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { View, Text, Card, Button, TextField } from 'react-native-ui-lib';

export default function App() {
  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>Welcome</Text>
      <TextField text50 placeholder="username" grey10 />
      <TextField text50 placeholder="password" secureTextEntry grey10 />
      <View marginT-100 center>
        <Button text70 white background-orange30 label="Login" />
        <Button link text70 orange30 label="Sign Up" marginT-20 />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
