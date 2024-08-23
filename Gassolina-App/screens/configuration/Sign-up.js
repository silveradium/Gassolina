import * as React from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Button } from 'react-native';
import { useState } from 'react';
import GetStartedButton from '../../assets/components/MyButton';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState([]);


    // when signup is pressed
    const handleSignUp = () => {
        auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Registered with:', user.email);
            console.log('Registered with:', user.uid);
            setUserInfo([email, password, user.uid]);

        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
      
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
        })
        Keyboard.dismiss();
        setEmail('');
        setPassword('');
        console.log("userinfo", userInfo);
        console.log("email", email);
        console.log("password", password);
        navigation.navigate('BluetoothProper', {
            username: email,
            password: password,
          });
    }

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
        <Text style={styles.signuo}>Sign Up</Text>
        <TextInput style={styles.input} 
        placeholder='Email'
        value = {email}
        onChangeText = {(text) => setEmail(text)}
        />
        <TextInput style={styles.input} 
        placeholder='Password' 
        value = {password}
        onChangeText = {(text) => setPassword(text)}
        secureTextEntry
        />
        <GetStartedButton text="Sign-up" onPress={handleSignUp} width={210}/>

    </View>
    <Button title="Save Data" onPress={saveData} />
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
} );