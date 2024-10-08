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

    const { username, cylinderWeight, userUuid } = route.params;

    const [loading, setLoading] = useState(true); // Set loading to true on component mount
    const [users, setUsers] = useState([]); // Initial empty array of users
    const [weight, setWeight] = useState(0);
    const [percentageWeight, setPercentageWeight] = useState(0);  
    const marginTop = useSharedValue(0);
    const heightTop = useSharedValue(0);
    const heightBottom = useSharedValue(180);
    const [daysRemaining, setDaysRemaining] = useState(null);
    const [batteryLevel, setBatteryLevel] = useState([]);
    const user = useFirebase();

    // console.log("first data",user);
    let firstToken = '7nNXGvfQT4bHKC3iF8htlkjSJ6W2'
    let Silicongmail = "R6cz6Uqd16hIBrY8pi4PuC1PWpW2"
    

   

    useEffect(() => {
      const unsubscribe = firestore().collection(Silicongmail).orderBy("timestamp", "asc").onSnapshot(
        (querySnapshot) => {
          const usersList = [];
          let weightArray = [];
          let timestampArray = [];
          let previousWeight = null;
          querySnapshot.forEach((doc) => {
            usersList.push({ id: doc.id, ...doc.data() });
//ugugugu
            // newWeightsArray.push({ weight: doc.data().myInteger, timestamp: doc.data().timestamp });
            weightArray.push(doc.data().myInteger - cylinderWeight);
            timestampArray.push(doc.data().timestamp.seconds);

            // if (previousWeight !== null && previousWeight < doc.data().myInteger ) {
            //   weightArray.length = 0;
            //   timestampArray.length = 0;
            //   weightArray.push(doc.data().myInteger);
            //   timestampArray.push(doc.data().timestamp.seconds);
            // }

            previousWeight = (doc.data().myInteger - cylinderWeight) < 0 ? "empty" : doc.data().myInteger - cylinderWeight;
          });
          


          setUsers(usersList);
          // console.log('Got Users collection result:', usersList);
          console.log(weightArray.length);
          setPercentageWeight(Math.round(((previousWeight)/(5)*100)));
          console.log("yo",previousWeight)
          console.log("yolo",percentageWeight)
          
          // setPercentageWeight(Math.round((previousWeight === "empty" ? 0 :(previousWeight - cylinderWeight)/(40 - cylinderWeight)*100)));
          setWeight(previousWeight);
          console.log("weight", (previousWeight - cylinderWeight));
          console.log(weightArray);
          console.log(timestampArray);



          // Initialize timestamp and weight
          // let currentTimestamp = new Date('2024-07-01T07:34:00');
          // let currentWeight = 25.9;

          //Function to send data to Firestore
          // const sendDataToFirestore = () => {
          //   const myInteger = currentWeight;
          //   const timestamp = currentTimestamp;

          //   firestore().collection(Silicongmail).add({
          //     myInteger,
          //     timestamp
          //   }).then(() => {
          //     console.log('Data sent to Firestore');
          //   }).catch((error) => {
          //     console.error('Error sending data to Firestore:', error);
          //   });

          //   // Update timestamp and weight
          //   currentTimestamp = new Date(currentTimestamp.getTime() + 7 * 60 * 60 * 1000); // Add 12 hours
          //   currentWeight = parseFloat((currentWeight - 0.06).toFixed(2)); // Decrease weight by 0.1 and round to 2 decimal places
          // };

          // const intervalId = setInterval(sendDataToFirestore, 4000);

          //regression function
          const ss = require('simple-statistics');

          const xValues = weightArray;
          const yValues = timestampArray;

          const regressionLine = ss.linearRegressionLine(ss.linearRegression(xValues.map((x, i) => [x, yValues[i]])));

            const timer = setTimeout(() => {
                const differenceMili = regressionLine(0) * 1000 - new Date().getTime();
                const days = Math.floor(differenceMili / (1000 * 60 * 60 * 24));
                console.log(days);
                const date = new Date(Math.round(regressionLine(0) * 1000));  
                setDaysRemaining(days);
            }, 1000);
    
            // Cleanup the timer if the component unmounts
            return () => clearTimeout(timer);

        },
        (error) => {
          console.error('Error getting Users collection:', error);
        },
      );
  
      // Clean up the listener when the component unmounts
      return () => {
        // clearInterval(intervalId);
        unsubscribe();
      };
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
                <Text style={styles.boxTitle}>Remaining Days Estimated:</Text>
                <Text style={styles.boxDescription}> {daysRemaining < 0 ? "not enough data" : daysRemaining === 1 ? daysRemaining + " day" : daysRemaining + " days"}</Text> 
              </View>
              <View style={styles.bottomDownBox}>
                <View style={styles.leftBox}>
                <Text style={styles.boxTitleBottom}>Current Weight:</Text>
                <Text style={styles.boxDescription}>{weight}{weight === "empty" ? "" : "kg"}</Text>
                </View>
                <View style={styles.rightBox}>
                <Text style={styles.boxTitleBottom}>Battery Level:</Text>
                <Text style={styles.boxDescription}>80%</Text>
                </View>
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
        marginTop: 40,
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
        marginTop: 30,
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
        height: 155,
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
        marginTop: 20,
        // justifyContent: 'center',
      },
      bottomTopBox: {
        width: 300,
        height: 85,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        padding: 15,
        paddingLeft: 20,
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
        height: 85,
        padding: 10,
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
        height: 85,
        padding: 10,
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
      boxTitle: {
        color: '#4E4B4F',
        fontFamily: "Poppins-Regular",
        fontSize: 17,
        lineHeight: 'normal',
      },
      boxTitleBottom: {
        color: '#4E4B4F',
        fontFamily: "Poppins-Regular",
        fontSize: 17,
        lineHeight: 'normal',
      },
      boxDescription: {
        color: "#4E4B4F",
        marginTop: 5,
        marginLeft: 5,
        fontFamily: "MontserratAlternates-bold",
        fontSize: 24,
        lineHeight: 'normal',
      },

  })