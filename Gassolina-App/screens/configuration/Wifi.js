import * as React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Button, ScrollView } from 'react-native';
import { useState } from 'react';


export default function Wifi({ navigation }) {
  const [emails, setEmails] = useState(['']);
  const [email, setEmail] = useState('');
  const addEmail = (email) => {
    setEmails([...emails, email]);
    setEmail('');
  }
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/background.png')} style={ styles.background } />
      
      <Text style={styles.steps}>Step 1/5</Text>
      <View style={styles.top}>
        <Text style={styles.heading}>Connect Gassolina to Wifi</Text>
        <Text style={styles.description}>Please select a wifi to connect with gassolina</Text>
        <TouchableOpacity style={styles.searchbutton} onPress={() => navigation.navigate('Bluetooth')}>
            <Text style={styles.search}>Search</Text>
        </TouchableOpacity>
        <Text style={styles.searchdes}>Please turn on your Wifi.....</Text>
      </View>
      
      
      <View style={styles.middle}>
      <Image source={require('../../assets/wifi-icon.png')} style={ styles.wifiIcon } />
      </View>
      <View style={styles.bottom}> 
      <TextInput style={styles.input} 
        placeholder='Email'
        value = {email}
        onChangeText = {(text) => setEmail(text)}
        /><Button title="Add Email" onPress={() => addEmail(email)} />
      <ScrollView style={styles.emailgroup}>
        { emails.map((email) => {
          return (
            <TouchableOpacity key={email} onPress={() => navigation.navigate('Wifi')}>
              <Text>{email}</Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    // alignItems: 'center',
    // justifyContent: 'center',
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
top: {
    marginTop: 70,
    //alignItems: 'center',
    width: '90%',
    marginLeft: 30,
  },
  heading: {
    color: "#4E4B4F",
    fontFamily: "Poppins-Medium",
    fontSize: 32,
    lineHeight: "140.97%", /* 45.11px */
},
description:{
  color: '#4E4B4F',
  fontFamily: "Poppins-Light",
    fontSize: 18,
  marginBottom: 20,
},
searchbutton: {
  color: '#4E4B4F',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'auto',
  width: 104,
  borderRadius: 14, 
  marginBottom: 10,
},
search: {
  display: 'block ',
  padding: 7,
  color: '#4E4B4F',
  fontFamily: "Poppins-Light",
  fontSize: 15,
},
searchdes: {
  color: '#4E4B4F',
  fontFamily: "Poppins-Light",
  fontSize: 14,
},

  middle: {
      //width: '80%',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 35,
      shadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  emailgroup: {
    width: '80%',
    //height: 200,
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 10,
  },
});