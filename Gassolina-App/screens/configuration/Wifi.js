import * as React from 'react';
import { Button, View, Text, StyleSheet, Image } from 'react-native';




export default function Wifi({ navigation}) {

  
      return (
        <View style={styles.container}> 

          <Image source={require('../../assets/background.png')} style={ styles.background } />
          <Text>Wifi</Text>
      <Button
        title="Go to Bluetooth"
        onPress={() => navigation.navigate('Bluetooth')}
      />

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
          }})