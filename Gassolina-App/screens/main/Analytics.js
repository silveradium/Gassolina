import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BarChart } from "react-native-gifted-charts";
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

function Daily() {
    const barData = [
        {value: 500, label: 'M'},
        {value: 500, label: 'T', frontColor: '#177AD5'},
        {value: 745, label: 'W', frontColor: '#177AD5'},
        {value: 320, label: 'T'},
        {value: 600, label: 'F', frontColor: '#177AD5'},
        {value: 256, label: 'S'},
        {value: 300, label: 'S'},
    ];
    // const [array, setArray] = useState([]);

    // const [percentageWeight, setPercentageWeight] = useState(0);  
    // const [daysRemaining, setDaysRemaining] = useState(null);
    // const [users, setUsers] = useState([]); // Initial empty array of users

//     useEffect(() => {
//       const unsubscribe = firestore().collection('7nNXGvfQT4bHKC3iF8htlkjSJ6W2').orderBy("timestamp", "asc").onSnapshot(
//         (querySnapshot) => {
//           const usersList = [];
//           let weightArray = [];
//           let timestampArray = [];
//           let newWeightsArray = [];
//           querySnapshot.forEach((doc) => {
//             usersList.push({ id: doc.id, ...doc.data() });

//             newWeightsArray.push({ weight: doc.data().myInteger, timestamp: new Date(doc.data().timestamp.seconds * 1000) });
//             // weightArray.push(doc.data().myInteger);
//             // timestampArray.push(new Date(doc.data().timestamp.seconds * 1000));

//           });
          


//           setUsers(usersList);
//           console.log('Got Users collection result:', usersList);
//           console.log(newWeightsArray.length);
// //

//           const timer = setTimeout(() => {
//             setArray(newWeightsArray);
//             console.log(new Date(array[array.length-1].timestamp).getDay());
//         }, 1000);
// //
//           // function to put the data in the days

//           // console.log(new Date(newWeightsArray[newWeightsArray.length].timestamp).getDate());
          
    
//             // Cleanup the timer if the component unmounts
//             return () => clearTimeout(timer);

//         },
//         (error) => {
//           console.error('Error getting Users collection:', error);
//         },
//       );
  
//       // Clean up the listener when the component unmounts
//       return () => unsubscribe();
//     }, []);
//

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
      <View>
                <BarChart
            barWidth={10}
            noOfSections={4}
            barBorderRadius={4}
            frontColor="lightgray"
            data={barData}
            yAxisThickness={0}
            xAxisThickness={0}
            isAnimated
            spacing={25}
        />
      </View>

    </View>
  );
}

function Weekly() {

  const barData = [
    {value: 500, label: 'M'},
    {value: 500, label: 'T', frontColor: '#177AD5'},
    {value: 745, label: 'W', frontColor: '#177AD5'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F', frontColor: '#177AD5'},
    {value: 256, label: 'S'},
    {value: 300, label: 'S'},
];

return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
    <View>
              <BarChart
          barWidth={10}
          noOfSections={4}
          barBorderRadius={4}
          frontColor="lightgray"
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          isAnimated
          spacing={25}
      />
    </View>

  </View>
);
}

function Monthly() {
  const barData = [
    {value: 500, label: 'Jan'},
    {value: 500, label: 'Feb', frontColor: '#177AD5'},
    {value: 745, label: 'Mar', frontColor: '#177AD5'},
    {value: 320, label: 'Apr'},
    {value: 600, label: 'May', frontColor: '#177AD5'},
    {value: 256, label: 'Jun'},
    {value: 300, label: 'Jul'},
    {value: 745, label: 'Aug', frontColor: '#177AD5'},
    {value: 320, label: 'Seot'},
    {value: 600, label: 'Oct', frontColor: '#177AD5'},
    {value: 256, label: 'Nov'},
    {value: 300, label: 'Dec'},
];

return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
    <View>
              <BarChart
          barWidth={7}
          noOfSections={4}
          barBorderRadius={4}
          frontColor="lightgray"
          fontSize={6}
          data={barData}
          yAxisThickness={0}
          xAxisThickness={0}
          isAnimated
          spacing={15}
      />
    </View>

  </View>
);
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true} >
      <View style={styles.container}>
      <Image source={require('../../assets/background.png')} style={ styles.background } />
      <View style={styles.heading}>
        <Text style={styles.gasLevel} >83% Gas Level</Text>
      </View>
        <View style={styles.tabContainer}>
          <Tab.Navigator 
                        screenOptions={{
                          
                          tabBarLabelStyle: { fontSize: 15, fontFamily: "Tiny5-Regular", },
                          tabBarStyle: { position: 'absolute',
                            top: 20,
                            left: 20,
                            right: 20,
                            height: 45,
                            borderRadius: 14,
                            backgroundColor: "#F0F0F0",
                            tabBarPressOpacity: 90,
                           },
                           tabBarIndicatorStyle: {
                            height: "80%",
                            width: "45%",
                            marginLeft:5,
                            marginBottom: 4,
                            borderRadius:10,
                            backgroundColor: "#D9D9D9", // This removes the underline
                          },
                          
          
                        }}>
            <Tab.Screen name="Daily" component={Daily} />
            <Tab.Screen name="Monthly" component={Monthly} />
          </Tab.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%', // Adjust this value as needed to control the height of the image
    top: 0,
  },
  heading: {
    position: "absolute",
    left: 100,
    top: 40,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 36,
  },
  gasLevel: {
    width: 170,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    fontSize: 36,
    marginLeft: -25,
  },
  tabContainer: {
    flex: 1,
    marginTop: Dimensions.get('window').height / 4, // Adjust this value to control the vertical position of the tab bar
    borderRadius:10,
  },
});





