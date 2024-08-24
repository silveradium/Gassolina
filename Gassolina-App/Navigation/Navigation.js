import StartUp from '../screens/configuration/Start-up';
import SignUp from '../screens/configuration/Sign-up';
import Bluetooth from '../screens/configuration/Bluetooth';
import BluetoothProper from '../screens/configuration/BluetoothProper';
import Wifi from '../screens/configuration/Wifi';
import Profile from '../screens/configuration/Profile';
import Login from '../screens/configuration/Login';
import Main from './Main';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator initialRouteName="startup">
        <Stack.Screen name="startup" component={StartUp} options={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="BluetoothProper" component={BluetoothProper} options={{headerShown: false}}/>
        <Stack.Screen name="Wifi" component={Wifi} options={{headerShown: false}}/>
        <Stack.Screen name="Bluetooth" component={Bluetooth} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="Main" component={Main} options={{headerShown: false, gestureEnabled: true }}/>
    </Stack.Navigator>
  );
}