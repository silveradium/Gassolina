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

    const { username, cylinderWeight } = route.params;

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    const [weight, setWeight] = useState(0);
    const [percentageWeight, setPercentageWeight] = useState(0);  
    const marginTop = useSharedValue(0);
    const heightTop = useSharedValue(0);
    const heightBottom = useSharedValue(180);
    const [endDate, setEndDate] = useState(null);
    const [batteryLevel, setBatteryLevel] = useState([]);
    const user = useFirebase();

    // console.log("first data",user);


    useEffect(() => {
      const unsubscribe = firestore().collection('7nNXGvfQT4bHKC3iF8htlkjSJ6W2').orderBy("timestamp", "asc").onSnapshot(
        (querySnapshot) => {
          const usersList = [];
//          let newWeightsArray =
          let weightArray = [];
          let timestampArray = [];
          let previousWeight = null;
          querySnapshot.forEach((doc) => {
            usersList.push({ id: doc.id, ...doc.data() });

            // newWeightsArray.push({ weight: doc.data().myInteger, timestamp: doc.data().timestamp });
            weightArray.push(doc.data().myInteger - cylinderWeight);
            timestampArray.push(doc.data().timestamp.seconds);

            if (previousWeight !== null && previousWeight < doc.data().myInteger - 10) {
              weightArray.length = 0;
              timestampArray.length = 0;
              weightArray.push(doc.data().myInteger);
              timestampArray.push(doc.data().timestamp.seconds);
            }

            previousWeight = doc.data().myInteger - cylinderWeight;
          });
          


          setUsers(usersList);
          console.log('Got Users collection result:', usersList);
          console.log(weightArray.length);
          setPercentageWeight(Math.round((previousWeight - cylinderWeight)/(40 - cylinderWeight)*100));
          console.log("weight", (previousWeight - cylinderWeight));
          console.log(weightArray);
          console.log(timestampArray);

          //regression function
          const ss = require('simple-statistics');

          const xValues = weightArray;
          const yValues = timestampArray;

          const regressionLine = ss.linearRegressionLine(ss.linearRegression(xValues.map((x, i) => [x, yValues[i]])));
          setEndDate();
          console.log(new Date(Math.round(regressionLine(0)*1000)));

        },
        (error) => {
          console.error('Error getting Users collection:', error);
        },
      );
  
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }, []);

    marginTop.value = withSpring((0));

      heightTop.value = withSpring(((1-percentageWeight/100)*180));
      heightBottom.value = withSpring((percentageWeight/100)*180);


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
                    height: heightTop,
                    backgroundColor: '#FAFAFA',
                  }}
                />
                <Animated.View
                  style={{
                    height: heightBottom,               
                    backgroundColor: '#5C94F7',
                  
                  }}
                />
              </MaskedView>
              <Text style={styles.weight}>{percentageWeight}%</Text>
            </View>
            <View style={styles.bottom}>
              <View style={styles.bottomTopBox}>
                <Text>Top Box</Text>
                <Text>hi</Text>
              </View>
              <View style={styles.bottomDownBox}>
                <View style={styles.leftBox}></View>
                <View style={styles.rightBox}></View>
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
        height: 180,
        width: 300,
      },
      weight: {
        position: 'absolute',
        paddingTop: 20,  
        fontFamily: "Poppins-Semibold",
        fontSize: 26,
        fontWeight: 600,
        color: "#F7F7F7",
        textShadowColor: '#1914FF', // Stroke color
        textShadowOffset: { width: 0, height: 0 }, // Stroke offset
        textShadowRadius: 2, // Stroke radius
        
      },
      maskContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      bottom: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
        // justifyContent: 'center',
      },
      bottomTopBox: {
        width: 300,
        height: 90,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        padding: 15,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.5,
        elevation: 2,
      },
      bottomDownBox: {
        width: 300,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      leftBox: {
        width: 145,
        height: 90,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.5,
        elevation: 2,
      },
      rightBox: {
        width: 145,
        height: 90,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.5,
        elevation: 2,
      },
  })