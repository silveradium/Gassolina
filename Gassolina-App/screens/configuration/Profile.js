import { StyleSheet, Text, View, Image, Button, TouchableOpacity, TextInput } from 'react-native';
// import GetStartedButton from '../components/Get-started-button';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


export default function StartUp({ route, navigation}) {

  const { userUuid } = route.params;////

  const [username, setUsername] = useState('');
  const [cylinderWeight, setCylinderWeight] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [expanded, setExpanded] = useState(false);
 
  const pressHandler = async () => {
    try {
      await AsyncStorage.multiSet([
        ['@username', username],
        ['@cylinderWeight', cylinderWeight.toString()],
      ]);
      navigation.navigate('Main', {
        username: username,
        cylinderWeight: cylinderWeight,
        userUuid: userUuid,
      });
    } catch (e) {
      console.log("Error saving data to AsyncStorage:", e);
    }
  };
  
  const handlePress = (option) => {
    setSelectedOption(option);
  };

  const expandImage = () => {
    setExpanded(!expanded);
  }

    return (
      <ScrollView style={styles.scrollView}>
      <View style={styles.container}> 
        <Image source={require('../../assets/background.png')} style={ styles.background } />
        <Text style={styles.steps}>Step 1/5</Text>
        <View style={styles.top}>
            <Text style={styles.heading}>Settings Up Your Profile</Text>
        </View>
        <View style={styles.middle}>
          <View style={styles.name}>
            <Text style={styles.questions}>What's your name?</Text>
            <TextInput style={styles.input} 
            placeholder='Your Name' 
            value = {username}
            onChangeText = {(text) => setUsername(text)}
            required
            />
          </View>
          <View style={styles.gasCylinder}>
            <Text style={styles.questions}>Pick your gas cylinder</Text>
            <Text style={styles.description}>Please select your gas cylinder from the ones below</Text>
            <Text style={styles.instruction}>(The weight mentioned at the bottom of the gas tank) 
            <TouchableOpacity style={styles.searchbutton} onPress={expandImage}>
                <Text style={styles.search}>See example</Text>
            </TouchableOpacity>
            </Text>
            {expanded && <Image source={require('../../assets/gas-demonstration.png')} style={ styles.gasDemonstration } />}
            <View style={styles.cylinders}>
              <TouchableOpacity style={[styles.box,selectedOption === 'option1' && styles.selected,]} onPress={() => {setCylinderWeight(2.0), handlePress("option1")}}><Text style={styles.weights}>2.0kg</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.box,selectedOption === 'option2' && styles.selected,]} onPress={() => {setCylinderWeight(4.6), handlePress("option2")}}><Text style={styles.weights}>2.3kg</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.box,selectedOption === 'option3' && styles.selected,]} onPress={() => {setCylinderWeight(8.6), handlePress("option3")}}><Text style={styles.weights}>5.0kg</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.box,selectedOption === 'option4' && styles.selected,]} onPress={() => {setCylinderWeight(12.9), handlePress("option4")}}><Text style={styles.weights}>12.5kg</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.box,selectedOption === 'option5' && styles.selected,]} onPress={() => {setCylinderWeight(37.5), handlePress("option5")}}><Text style={styles.weights}>37.5kg</Text></TouchableOpacity>
            </View>
            <View style={styles.bottom}>
              <TouchableOpacity style={styles.button} onPress={pressHandler}>
                <Text style={styles.done}>Done</Text>
              </TouchableOpacity>
            </View>    
          </View>
          </View>
      </View>
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      //justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    steps: {
        position: 'absolute',
        top: 30, 
        left: 20,
        color: '#4E4B4F',
        fontFamily: 'Poppins-Light',
    },
    top: {
      marginTop: 70,
      marginBottom: 10,
      alignItems: 'center',
      width: '90%',
    },
    heading: {
      color: "#4E4B4F",
      fontFamily: "Poppins-Medium",
      textAlign: 'center',
      fontSize: 30,
      lineHeight: "140.97%", /* 45.11px */
    },
    middle: {
      width: '88%',
      borderRadius: 25,
      padding: 20,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    name: {
      marginTop: 10,
      marginBottom: 10,
    },
    questions: {
      color: '#4E4B4F',
      fontFamily: 'Poppins-Regular',
      fontSize: 14,
      marginBottom: 5,
    },
    gasCylinder: {
      
    },
    input: {
      width: '95%',
      height: 35,
      marginBottom: 10,
      paddingLeft: 20,
      borderBottomColor: '#D8D8D8',
      borderBottomWidth: 1,
    },
    description: {
      color: '#4E4B4F',
      fontFamily: 'Poppins-Regular',
      fontSize: 11,
      marginTop: 10,
      marginBottom: 10,
      width: '95%',
    },
    cylinders: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      //justifyContent: 'space-between',
      gap: 18,
      flexWrap: 'wrap',
      marginTop: 10,
      width: '90%',
    },
    box: {
      width: 60,
      height: 30,
      backgroundColor: '#F6F6F6',
      borderWidth: 0.5,
      borderColor: '#D0D0D0',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -5,
    },
    selected: {
      backgroundColor: '#5C94F7',
      color: '#FFF',
    },
    weights: {
      fontFamily: 'Poppins-Regular',
      fontSize: 12,
    },
    bottom: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginBottom: 10,
    }, 
    button: {
      width: 200,
      height: 37,
      borderRadius: 14,
      backgroundColor: '#5C94F7',
      alignItems: 'center',
      justifyContent: 'center',
    },
    done: {
        color: '#FFF',
        fontFamily: 'Poppins-Regular',
        fontSize: 13,
        fontWeight: 600,
    },
    gasDemonstration: {
      width: 150,
      height: 200,
      marginLeft: 10,
    },
    search: {
      display: 'block',
      color: '#5C94F7',
      fontFamily: "Poppins-Light",
      fontSize: 11,
    },
    searchbutton: {
      color: '#4E4B4F',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      width: 104,
    },
    instruction: {
      color: '#4E4B4F',
      fontFamily: 'Poppins-Regular',
      fontSize: 11,
      marginTop: 10,
      marginBottom: 10,
      width: '95%',
    },


  });



