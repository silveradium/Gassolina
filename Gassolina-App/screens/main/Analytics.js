import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BarChart } from "react-native-gifted-charts";

function Daily() {
    const barData = [
        {value: 250, label: 'M'},
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

function Weekly() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>

    </View>
  );
}

function Monthly() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, }}>
      <Text>monthly</Text>
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
                            width: "30%",
                            marginLeft:5,
                            marginBottom: 4,
                            borderRadius:10,
                            backgroundColor: "#D9D9D9", // This removes the underline
                          },
                          
          
                        }}>
            <Tab.Screen name="Daily" component={Daily} />
            <Tab.Screen name="Weekly" component={Weekly} />
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
  },
  tabContainer: {
    flex: 1,
    marginTop: Dimensions.get('window').height / 4, // Adjust this value to control the vertical position of the tab bar
    borderRadius:10,
  },
});





