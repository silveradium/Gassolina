import * as React from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';



export default function Settings({ navigation }) {
  return (
    <View style={styles.container}> 
        <Image source={require('../../assets/background.png')} style={ styles.background } />
        <View style={styles.top}>
            <Text style={styles.name}>Settings </Text>
            <View style={styles.content}>
              <View style={styles.heading}>
                <Text style={styles.general}>General</Text>
              </View>
              <TouchableOpacity style={styles.item}>

                <Image
                  source={require('../../assets/icons/settings/profile.png')}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 29,
                    tintColor: '#4E4B4F',
                  }}
                />
                <Text style={styles.itemText}>Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Image
                    source={require('../../assets/icons/settings/pencil.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 29,
                      tintColor: '#4E4B4F',
                    }}
                />
                <Text style={styles.itemText}>Change cylinder type</Text>
                <View style={styles.arrow}></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Image
                    source={require('../../assets/icons/settings/add.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 29,
                      tintColor: '#4E4B4F',
                    }}
                />
                <Text style={styles.itemText}>Add new cylinder</Text>
                <View style={styles.arrow}></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Image
                    source={require('../../assets/icons/settings/wifi.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 29,
                      tintColor: '#4E4B4F',
                    }}
                />
                <Text style={styles.itemText}>Change WiFi</Text>
                <View style={styles.arrow}></View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Image
                    source={require('../../assets/icons/settings/notifications.png')}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 29,
                      tintColor: '#4E4B4F',
                    }}
                />
                <Text style={styles.itemText}>Notifications</Text>
                <View style={styles.arrow}></View>
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
      padding: 10,
      paddingLeft: -5,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#D8D8D8',
  },
  itemText: {
      paddingLeft: 14,
      color: '#4E4B4F',
      fontFamily: "Popins-Medium",
      fontSize: 15,
  },
});