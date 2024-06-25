import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';


export default function App() {

  let [fontsLoaded] = useFonts({
    // 'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
    // 'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'MontserratAlternates-SemiBold': require('./assets/fonts/MontserratAlternates-SemiBold.ttf'),
    // 'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    // 'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    // 'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    // 'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
    
  );
}


