import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export default function Home({route, navigation}) {

    const { username, cylinderWeight } = route.params;
      return (
        <View style={styles.container}> 
            <Image source={require('../../assets/background.png')} style={ styles.background } />
            <View style={styles.top}>
                <Text style={styles.name}>Hi {username}</Text>
                <Text style={styles.nameDescription}>Litro Gas Cylinder, {cylinderWeight}kg</Text>
            </View>
            

        </View>
      );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    top: {
        marginTop: 50,
        marginLeft: 20,
    },
    name: {
        color: '#4E4B4F',
        fontFamily: "Poppins-Medium",
        fontSize: 30,
        lineHeight: 'normal',
    },
    nameDescription: {
        color: 'rgba(0, 0, 0, 0.43)',
        fontFamily: "MontserratAlternates-Semibold",
        fontSize: 11,
        letterSpacing: 0.44,
    }
})