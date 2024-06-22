import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import SvgComponent from '../../assets/components/Svg';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';





export default function Home({route, navigation}) {

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    const [weight, setWeight] = useState(0);
    const marginTop = useSharedValue(0);

    useEffect(() => {
        const subscriber = firestore()
          .collection('7nNXGvfQT4bHKC3iF8htlkjSJ6W2')
          .orderBy("timestamp", "desc")
          .onSnapshot(querySnapshot => {
            const users = [];
      
            querySnapshot.forEach(documentSnapshot => {
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
      
            setUsers(users);
            setLoading(false);
          });
      
        // Unsubscribe from events when no longer in use
        return () => subscriber();
      }, []);
    
    //   if (users.length > 0) {
    //     console.log(users[0].myInteger);
    //     setWeight(users[0].myInteger);
    //   }
    setWeight(50);
    
    marginTop.value = withSpring(-(weight / 100 * 300));

    const { username, cylinderWeight } = route.params;

      return (
        <View style={styles.container}> 
            <Image source={require('../../assets/background.png')} style={ styles.background } />
            <View style={styles.top}>
                <Text style={styles.name}>Hi {username}</Text>
                <Text style={styles.nameDescription}>Litro Gas Cylinder, {cylinderWeight}kg</Text>
            </View>

            <MaskedView
          style={styles.maskedView}
          maskElement={
            // <View style={styles.maskContainer}>
            //   <Text style={styles.maskText}>Masked Text</Text>
            // </View>
            <SvgComponent style={styles.gas}/>
          }
        >
            
             <Animated.View
        style={{
            flex: 1,
          height: 200,
          backgroundColor: '#324376',
          marginTop
        }}
      />
            <Animated.View
        style={{
            flex: 1,
          height: 200,
          backgroundColor: '#5C94F7',
        
        }}
      />
          {/* <View style={styles.background} /> */}
        </MaskedView>
        <Text style={styles.weight}>{weight}%</Text>
        {/* <View style={styles.button}>
        <Button onPress={handlePress} title="Click me"/>
        </View> */}

        </View>
      );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        //gay
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
        //fontFamily: "MontserratAlternates-Semibold",
        fontSize: 11,
        letterSpacing: 0.44,
    },
    maskedView: {
        display: 'flex',
        height: 300,
        width: 300,
        flexDirection: 'column',
        left: 77,
    
      },
      weight: {
        marginTop: -220,
        color: 'white',
        fontSize: 20,
        fontWeight: 600,
      },
      
      button: {
        marginTop: 50,
        color: 'red',
      },
      maskContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
})