import * as React from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Button } from 'react-native';
import { useState } from 'react';
import GetStartedButton from '../../assets/components/MyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // when login is pressed
    const handleLogin = () => {
        console.log('Attempting to log in with:', email, password); // Add logging here
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Logged in with:', user.email);
            console.log('Logged in with:', user.uid);
            navigation.navigate('BluetoothProper', {
                username: email,
                password: password,
              });
            saveData();
        })
        .catch(error => {
            console.log(error);
            setTimeout(() => {
                alert("Invalid credentials. Please try again.");
            });
        });

        Keyboard.dismiss();
        setEmail('');
        setPassword('');
    };

    const saveData = async () => {
      try {
        await AsyncStorage.setItem('@isLogged', "true" );
        logAsyncStorageData();
      } catch (e) {
        // saving error
        console.log(e);
      }
    };

    const logAsyncStorageData = async () => {
      try {
        const value = await AsyncStorage.getItem('@isLogged');
        if (value !== null) {
          console.log("Stored value:", value);
        } else {
          console.log("No value found in AsyncStorage for the key '@storage_key'");
        }
      } catch (e) {
        console.log("Error reading value from AsyncStorage:", e);
      }
    };

  return ( <KeyboardAvoidingView style={styles.container} behavior="height">
    <Image source={require('../../assets/background.png')} style={ styles.background } />
    <Text style={styles.steps}>Step 1/5</Text>
    <View style={styles.middle}>
        <Text style={styles.signuo}>Log In</Text>
        <Text style={styles.signupAdvice}>Please make sure to input the correct credentials</Text>
        <TextInput style={styles.input} 
        placeholder='Email'
        value = {email}
        onChangeText = {(text) => setEmail(text)}
        secureTextEntry={false}
        />
        <TextInput style={styles.input} 
        placeholder='Password' 
        value = {password}
        onChangeText = {(text) => setPassword(text)}
        secureTextEntry
        />
        <GetStartedButton text="Log-In" onPress={() => {
    handleLogin();
  }}  width={210}/>


    </View>
    {/* <Button title="Save Data" onPress={saveData} /> */}
  </KeyboardAvoidingView> );
  
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'plum',
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    steps: {
      position: 'absolute',
      top: 30, 
      left: 20,
      color: '#4E4B4F',
      fontFamily: 'Poppins-Light',
  },
    middle: {
        backgroundColor: 'white',
        width: '80%',
        height: 'auto',
        alignItems: 'center',
        borderRadius: 35,
        shadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    
    signuo: {
        color: 'black',
        fontSize: 30,
        marginTop: 50,
        marginBottom: 50,
        fontFamily: 'Poppins-SemiBold',
    },

      input: {
        width: '80%',
        height: 45,
        borderRadius: 14,
        backgroundColor: '#F5F5F5',
        marginBottom: 10,
        paddingLeft: 20,
      },
      loginField: {
        alignItems: 'center',
        marginTop: -40,
        marginBottom: 50,
      },
      loginText: {
        color: '#4E4B4F',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
      },
      loginButton: {
        color: '#5C94F7',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
      },
      signupAdvice: {
        color: '#4E4B4F',
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginBottom: 20,
        marginTop: -20,
        width: '80%',
      },
} );