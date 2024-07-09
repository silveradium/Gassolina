import * as React from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import SvgComponent from '../../assets/components/Svg';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useFirebase } from '../../Firebase/firebase';





export default function Home({route, navigation}) {
//i
    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    const [weight, setWeight] = useState(0);
    const marginTop = useSharedValue(0);
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const user = useFirebase();

    console.log("first data",user);


    // useEffect(() => {
    //   const unsubscriber = firestore()
    //   .collection("7nNXGvfQT4bHKC3iF8htlkjSJ6W2")
    //   .orderBy("timestamp", "desc")
    //     .onSnapshot(querySnapshot => {
    //       const users = [];
    
    //       querySnapshot.forEach(documentSnapshot => {
    //         users.push({
    //           ...documentSnapshot.data(),
    //           key: documentSnapshot.id,
    //         });
    //       });
    
    //       setUsers(users);
    //       setLoading(false);
    //     });
    //     if (users.length > 0){
    //       console.log(users[0].myInteger);
    //       setWeight(users[0].myInteger);
    //       setShouldUpdate(true);
    //     }

    //   // Unsubscribe from events when no longer in use
    //   return () => unsubscriber();
    // }, []);

    // if (loading) {
    //   return <ActivityIndicator />;
    // }

    useEffect(() => {
      const unsubscribe = firestore().collection('7nNXGvfQT4bHKC3iF8htlkjSJ6W2').orderBy("timestamp", "desc").onSnapshot(
        (querySnapshot) => {
          const usersList = [];
          querySnapshot.forEach((doc) => {
            usersList.push({ id: doc.id, ...doc.data() });
          });
          setUsers(usersList);
          console.log('Got Users collection result:', usersList);
          setWeight(usersList[0].myInteger);
          console.log(weight)
        },
        (error) => {
          console.error('Error getting Users collection:', error);
        }
      );
  
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }, []);

    marginTop.value = withSpring(-(weight / 100 * 300));

    const { username, cylinderWeight } = route.params;

    // username = "John Doe";
    // cylinderWeight = 12.5;

      return (
        <View style={styles.container}> 
            <Image source={require('../../assets/background.png')} style={ styles.background } />
            <View style={styles.top}>
                <Text style={styles.name}>Hi {username}</Text>
                <Text style={styles.nameDescription}>Litro Gas Cylinder, {cylinderWeight}kg</Text>
            </View>


            <View style={styles.middle}>
              <MaskedView
                style={styles.maskedView}
                maskElement={
                  <SvgComponent style={styles.gas}/>
                }
              >
              
                <Animated.View
                  style={{
                      flex: 1,
                    height: 200,
                    backgroundColor: '#FAFAFA',
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
              </MaskedView>
              <Text style={styles.weight}>{Math.round(weight)}%</Text>
            </View>
            <FlatList style={styles.flatlist}>
              <View style={styles.box}></View>
              <View style={styles.box}></View>
              <View style={styles.box}></View>
              <View style={styles.box}></View>
            </FlatList>
   
 

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
    middle: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'plum',
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: -1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    maskedView: {
        //display: 'flex',
        height: 180,
        width: 300,
      },
      weight: {
        position: 'absolute',
        paddingTop: 20,  
        fontFamily: "Poppins-Semibold",
        fontSize: 25,
        fontWeight: 600,
        color: "#F7F7F7",
        
      },
      maskContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      // flatlist: {
      //   display: 'flex',
      //   flexDirection: 'row',
      //   alignItems: 'flex-start',
      //   //justifyContent: 'space-between',
      //   gap: 18,
      //   flexWrap: 'wrap',
      // },
      // box: {
      //   backgroundColor: "white",
      //   width: 50,
      //   height: 50,
      // }
})