import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
// import GetStartedButton from '../components/Get-started-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';  

export default function StartUp({ navigation}) {

 
  const pressHandler = () => {
    navigation.navigate('SignUp');
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const keys = ['@isLogged', '@username', '@cylinderWeight'];
        const result = await AsyncStorage.multiGet(keys);
        const values = Object.fromEntries(result);

        if (values['@isLogged'] === "true") {
          console.log("User is logged in");
          navigation.navigate('Main', {
            username: values['@username'] || 'Unknown',
            cylinderWeight: parseFloat(values['@cylinderWeight']) || 0.0,
          });
        }
      } catch (e) {
        console.log("Error reading value from AsyncStorage:", e);
      }
    };

    checkLoginStatus();
  }, []);

    return (
      <View style={styles.container}> 
        <View style={styles.heading}>
            <Text style={ styles.powered}>Powered By</Text>
            <Image source={require('../../assets/rysera-logo.png')} style={ styles.rysera } />
        </View>
        <Image source={require('../../assets/background.png')} style={ styles.background } />
       
        <View style={styles.middle}>
          <View style={styles.top}><Text style={styles.title}>GASSOLINA</Text></View>
          <View style={styles.bottom}>
            <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
          />
            <Text style={styles.logoText}>Productions</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={pressHandler}>
            <View>
                <Text style={styles.getstarted}>Get Started</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    logoText: {
        color: 'rgba(0, 0, 0, 0.43)',
        fontSize: 11,
    },
    heading: {
        position: 'absolute', 
        top: 20,
        left: 20,
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    powered: {
        color: '#4E4B4F',
        fontSize: 10,
        fontWeight: 400,
        letterSpacing: 1.2,
        fontStyle: 'normal',
        marginBottom: -40,
    }, 
    rysera: {
        marginTop: 0,
        width: 70,
        height: 100,
        resizeMode: 'contain',
    },
    middle: {
      width: '100%',
      height: '50%',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: 30, 
    },
    top: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottom: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30,
    },
    logo:{
      width: 110,
      height: 100,
      resizeMode: 'contain',
      marginBottom: 10,
    },
    title:{
        color: '#4E4B4F',   
        fontFamily: "Poppins-SemiBold",
        fontSize: 40,
        fontWeight: 400,
        letterSpacing: 4.2,
        fontStyle: 'bold',
    },
    button: {
      position: 'absolute',
      bottom: 50,
      width: 258,
      height: 45,
      borderRadius: 14,
      backgroundColor: '#5C94F7',
      alignItems: 'center',
      justifyContent: 'center',
    },
    getstarted: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 600,
    }

  });