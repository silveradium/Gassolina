import * as React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Button } from 'react-native';
import { useState } from 'react';
import { auth } from '../../firebaseSetup';
import { createUserWithEmailAndPassword } from "firebase/auth";
import GetStartedButton from '../../assets/components/MyButton';


export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState({uid: "", email: "", password: ""});

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('Registered with:', user.email);
            console.log('Registered with:', user.uid);
            setUserInfo({uid: user.uid, email: email, password: password})

        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        })
    }

    const handlePrint = () => {
        console.log(userInfo);   
        Keyboard.dismiss();
        setEmail('');
        setPassword('');
        navigation.navigate('Wifi', {
            itemId: userInfo,
            otherParam: 'anything you want here',
          });
    }

    return ( <KeyboardAvoidingView style={styles.container} behavior="height">
        <Image source={require('../../assets/background.png')} style={ styles.background } />
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
            {/* <TouchableOpacity style={styles.button} 
            onPress={handleSignUp}
            >
            <View>
                <Text style={styles.getstarted}>Get Started</Text>
            </View>
            </TouchableOpacity> */}
            <GetStartedButton text="Sign-up" onPress={handlePrint} width={210}/>
    
        </View> 
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

    middle: {
        backgroundColor: 'white',
        width: '80%',
        height: 'auto',
        alignItems: 'center',
        borderRadius: 35,
    },
    signuo: {
        color: 'black',
        fontSize: 30,
        marginTop: 50,
        marginBottom: 50,
        fontFamily: 'Poppins-Medium',
    },
    // button: {
    //     marginTop: 25,
    //     marginBottom: 40,
    //     width: '80%',
    //     height: 45,
    //     borderRadius: '14px',
    //     backgroundColor: '#5C94F7',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   },
      input: {
        width: '80%',
        height: 45,
        borderRadius: 14,
        backgroundColor: '#F5F5F5',
        marginBottom: 10,
        paddingLeft: 20,
      },
} );