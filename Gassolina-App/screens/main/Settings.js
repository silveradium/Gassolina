import * as React from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Settings({ navigation }) {

  const logout = async () => {
    try {
      await AsyncStorage.setItem('@isLogged', "false" );
      navigation.pop(7);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };


  return (
    <View style={styles.container}> 
        <Image source={require('../../assets/background.png')} style={ styles.background } />
        <View style={styles.top}>
            <Text style={styles.name}>Settings </Text>
            <View style={styles.content}>
              <View style={styles.heading}>
                <Text style={styles.general}>General</Text>
              </View>
              <View style={styles.item}>
                <View style={styles.title}>
                  <Text style={styles.itemText}>Account</Text>
                  <Image
                  source={require('../../assets/icons/settings/profile.png')}
                  resizeMode="contain"
                  style={{
                    width: 22,
                    height: 29,
                    tintColor: '#4E4B4F',
                  }}
                />
                
                </View>
              </View>
              <TouchableOpacity style={styles.field} onPress={logout}>
                
                    <Image
                    source={require('../../assets/icons/settings/logout.png')}
                    resizeMode="contain"
                    style={{
                      width: 16,
                      height: 29,
                      tintColor: '#4E4B4F',
                    }}
                  />
                  <Text style={styles.descriptionText}>Logout</Text>
              </TouchableOpacity>
              <View style={styles.item}>
                <View style={styles.title}>
                  <Text style={styles.itemText}>Notifications</Text>
                  <Image
                      source={require('../../assets/icons/settings/notifications.png')}
                      resizeMode="contain"
                      style={{
                        width: 22,
                        height: 29,
                        tintColor: '#4E4B4F',
                      }}
                  />
                </View>
              </View>
              <TouchableOpacity style={styles.field}>
                <Image
                source={require('../../assets/icons/settings/notifications_on.png')}
                resizeMode="contain"
                style={{
                  width: 16,
                  height: 29,
                  tintColor: '#4E4B4F',
                }}
              />
              <Text style={styles.descriptionText}>Turn on notifications</Text>
          </TouchableOpacity>
            </View>
        </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  background: {
      position: 'absolute',
      resizeMode: 'cover',
      width: '100%',
      height: '100%',
      zIndex: -1,
  },
  top: {
      marginTop: 70,
      justifyContent: 'center',
      alignItems: 'center',
  },
  name: {
      color: '#4E4B4F',
      fontFamily: "Poppins-Medium",
      fontSize: 30,
      lineHeight: 'normal',
  },
  nameDescription: {
      color: 'rgba(0, 0, 0, 0.43)',
      //fontFamily: "MontserratAlternates-Semibold",
      fontSize: 11,
      letterSpacing: 0.44,
  },
  content: {
      marginTop: 40,
      width: '85%',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 20,
      borderRadius: 24,
      backgroundColor: '#FFF',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: -1,
      },
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 2,
  },
  heading: {
      width: '100%',
      paddingTop: 15,
      paddingLeft: 25,
  },
  general: {
      color: '#4E4B4F',
      fontFamily: "MontserratAlternates-bold",
      fontSize: 15,
      paddingBottom: 10,
  },
  item: {
      width: '85%',
      padding: 5,
      paddingLeft: -5,
      flexDirection: 'column',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#D8D8D8',
  },
  title: {
      flexDirection: 'row',
      alignItems: 'center',
  },  
  itemText: {
      paddingLeft: 3,
      paddingRight: 5,
      color: '#4E4B4F',
      fontFamily: "Poppins-semiBold",
      fontSize: 14,
  },
  field: {
      width: '100%',
      height: 40,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginLeft: 70,
  },
  descriptionText: {
      color: '#4E4B4F',
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      marginLeft: 10,
  },
});