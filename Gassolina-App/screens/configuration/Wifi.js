import * as React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Button, ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { BleManager } from "react-native-ble-plx";
import { atob, btoa } from "react-native-quick-base64";
import { Buffer } from 'buffer';

const bleManager = new BleManager();

let pass_characteristic = "3de7b790-66bf-4a80-80ae-5970ead46097"
let user_characteristic = "7e05e450-b517-403c-8a04-376285ac631d"
let network_characteristic = "449d19d2-ac08-43ac-921d-4347f5ec86c6"
let scan_characteristic = "3de7b790-66bf-4a80-80ae-5970e6d46097"
let deviceId = "4F93D44E-0796-37A0-09D5-62371E492927"
let serviceUUID = "68544538-7148-4fc4-b555-a029b320b33e"



const WifiCard = ({ item, expanded, onPress }) => {


const [password, setPassword] = useState('');

const sendWifiToGassolina = (ssid, password) => {
  const encodedWifi = btoa(ssid + "@wifi");// Base64 encode the data if needed
  const encodedPassword = btoa(password + "@wifi");// Base64 encode the data if needed
  bleManager.writeCharacteristicWithResponseForDevice(deviceId, "68544538-7148-4fc4-b555-a029b320b33e", user_characteristic, encodedWifi)
  .then(() => {
    bleManager.writeCharacteristicWithResponseForDevice(deviceId, "68544538-7148-4fc4-b555-a029b320b33e", pass_characteristic, encodedPassword)
  })
  .then(() => {
    console.log("Data written to characteristic successfully");
  })
  .catch((error) => {
    console.log("Error writing data to characteristic:", error);
  });
};

//when password is submitted
const onSubmitPassword = () => {
  sendWifiToGassolina(item.name, password); //didnt check this function yet
  Keyboard.dismiss();
  console.log(password);
  setPassword('');


}
  return (
    <KeyboardAvoidingView style={styles.wifiGroup}>
      <TouchableWithoutFeedback style={styles.displayName} onPress= {onPress}>
        <Image source={require('../../assets/wifi-icon.png')} style={ styles.wifiIconFlatlist } />
        <Text style={styles.wifiNames} >{item.name}</Text>
      </TouchableWithoutFeedback>
      {expanded && (<View style={{flexDirection: 'row', justifyContent: 'space-between'}}><TextInput style={styles.input} 
      placeholder='Wifi Password'
      value = {password}
      onChangeText={(text) => setPassword(text)}
      /><Button title=">" onPress={onSubmitPassword} style={{fontFamily: 'Poppins-Light'}}/></View>)}
      
    </KeyboardAvoidingView>
  )
}

export default function Wifi({ navigation }) {

  // Log route params to debug
  const [wifi, setWifi] = useState([]);
  const [emails, setEmails] = useState(['']);
  const [expandedId, setExpandedId] = useState(null);

  const renderItem = ({ item }) => {
    const isExpanded = item.id === expandedId;
    return (
      <WifiCard
        item={item}
        expanded={isExpanded}
        onPress={() => setExpandedId(isExpanded ? null : item.id)}
      />
    );
  };

  const navigateToBluetooth = () => {
    navigation.navigate('Profile');
  }

  const sendScanToGassolina = () => {
    const encodedData = btoa("5");// Base64 encode the data if needed
    bleManager.writeCharacteristicWithResponseForDevice(deviceId, "68544538-7148-4fc4-b555-a029b320b33e", scan_characteristic, encodedData)
    .then(() => {
      console.log("Data written to characteristic successfully");
    })
    .catch((error) => {
      console.log("Error writing data to characteristic:", error);
    });
  };




  const readCharacteristicValue = async () => {
    try {
      // Connect to the device
      const device = await bleManager.connectToDevice(deviceId);
      console.log(`Connected to device: ${device.name}`);

      await device.discoverAllServicesAndCharacteristics();
      console.log('Services and characteristics discovered');
  
      // Read the characteristic value
      const characteristic = await device.readCharacteristicForService(serviceUUID, network_characteristic);
      const value = Buffer.from(characteristic.value, 'base64').toString('utf-8');

      // Split the string by '>>' and filter out any empty strings
      const wifiArray = value.split('>>').filter(ssid => ssid && ssid !== '!!');
      // Create a JSON object
      const wifi = wifiArray.map((name, index) => ({ id: index+1, name, password: null }));
      setWifi(wifi);

      console.log(wifi);
      console.log(`Characteristic value: ${value}`);
  
      return value;
    } catch (error) {
      console.error('Error reading characteristic value:', error);
    } 
  };

  const displayWifi = () => {
    // sendScanToGassolina();
    setTimeout(() => {
        readCharacteristicValue();
      }, 4000);
  }

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image source={require('../../assets/background.png')} style={ styles.background } />
      
      <Text style={styles.steps}>Step 1/5</Text>
      <View style={styles.top}>
        <Text style={styles.heading}>Connect Gassolina to Wifi</Text>
        <Text style={styles.description}>Please select a wifi to connect with gassolina</Text>
        <TouchableOpacity style={styles.searchbutton} onPress={displayWifi}>
            <Text style={styles.search}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchbutton} onPress={navigateToBluetooth}>
            <Text style={styles.search}>Next</Text>
        </TouchableOpacity>
        <Text style={styles.searchdes}>Please turn on your Wifi.....</Text>
      </View>
      
      
      <View style={styles.middle}>
      <Image source={require('../../assets/wifi-icon.png')} style={ styles.wifiIcon } />
      </View>
      <View style={styles.bottom}> 
        <Text style={styles.connectionDescription}>Tap to select and enter password</Text>
        <FlatList
            style={{width: '90%'}}
            data={wifi}
            keyExtractor={item => item.id}
            renderItem={ renderItem }
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    alignItems: 'center',
    // justifyContent: 'center',
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
    width: '90%',
  },
  heading: {
    color: "#4E4B4F",
    fontFamily: "Poppins-Medium",
    fontSize: 32,
    lineHeight: "140.97%", /* 45.11px */
},
description:{
  color: '#4E4B4F',
  fontFamily: "Poppins-Light",
    fontSize: 18,
  marginBottom: 20,
},
searchbutton: {
  color: '#4E4B4F',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'auto',
  width: 104,
  borderRadius: 14, 
  marginBottom: 10,
},
search: {
  display: 'block ',
  padding: 7,
  color: '#4E4B4F',
  fontFamily: "Poppins-Light",
  fontSize: 15,
},
searchdes: {
  color: '#4E4B4F',
  fontFamily: "Poppins-Light",
  fontSize: 14,
},

middle: {
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 2,
},
  bottom: {
    flex: 1,
    width: '90%',
    height: 'auto', 
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  wifiGroup: {
    width: '100%',
    borderRadius: 14,
    padding: 3,
  },
  displayName: {
    flexDirection: 'row',
    alignItems: "center"
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  wifiIconFlatlist: {
    width: 25,
    height: 25,
    marginRight: 10,
    tintColor: '#4E4B4F'
  },
  wifiNames: {
    fontFamily: "Poppins-Light",
    color: "#4E4B4F",
  },
  flatlistTitle: {
    fontFamily: "Poppins-Regular",
    color: "#4E4B4F",
    fontSize: 15,
    marginTop:5,
    marginBottom: 12
  },
  connectionDescription: {
    color: '#4E4B4F',
    fontFamily: "Poppins-Light",
    fontSize: 15,
    marginBottom: 10,
  },
});