import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { BleManager } from "react-native-ble-plx";
import { useState, useEffect, useRef } from "react";
import { atob, btoa } from "react-native-quick-base64";

const bleManager = new BleManager();

export default function Bluetooth( {route, navigation}) {

    console.log(route.params);

    const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
    const USER_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

    const ssidCharacteriscit = "7e05e450-b517-403c-8a04-376285ac631d";
    const passCharacteriscit = "3de7b790-66bf-4a80-80ae-5970ead46097";

    const [deviceID, setDeviceID] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Searching...");

    const[discoveredDevices, setDiscoveredDevices] = useState([]);
    let services_arr = [];
    let characteristics_arr = [];
    let pass_characteristic = null
    let user_characteristic = null
    let network_characteristic = null

    const deviceRef = useRef(null);

    const searchAndConnectToDevice = () => {
        let tempDevices = [];
        bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            console.error(error);
            setConnectionStatus("Error searching for devices");
            return;
        }
        if (device && device.name !== null && !tempDevices.some(de => de.id === device.id)) {
          tempDevices.push(device);
      }
        });
        navigation.navigate('Profile')

        setTimeout(() => {
          bleManager.stopDeviceScan();
          setDiscoveredDevices(tempDevices);// them have to let user sleect the device onece selected rewoke the connectToDevice function
          console.log("Discovered devices:", tempDevices);
        }, 5000);
      };

    const consoleArrays = () => {
      console.log("sarray", services_arr);
      console.log("chararray", characteristics_arr);
      console.log("passwordCh", pass_characteristic);
      console.log("userCh", user_characteristic);
      console.log("networkCh", network_characteristic);
    };

    const connectToGassolina = (device) => {
      bleManager.connectToDevice(device.id)
      .then((device) => {
        setConnectionStatus("Connected");
        console.log("Connected to Gassolina");
        deviceRef.current = device;
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        return device.services();
      })
      .then((services) => {
        services.forEach((service) => {
          console.log("service uid", service.uuid);
          services_arr.push(service);
          service.characteristics().then((characteristics) => {
            characteristics.forEach((characteristic) => {
              console.log("charcteristic", characteristic.uuid);
              characteristics_arr.push(characteristic);
              characteristic.readDescriptor().then((descriptor) => {
                console.log(descriptor.value);
                switch (descriptor.value) {
                  case "pass":
                    pass_characteristic = characteristic.uuid;
                    break;
                  case "user":
                    user_characteristic = characteristic.uuid;
                    break;
                  case "networks":
                    network_characteristic = characteristic.uuid;
                    break;
                  default:
                    break;
                }
              });
            });
          });
        });
      })
    }

    const readDataFromCharacteristic = (characteristic) => {
      bleManager.readCharacteristicForDevice(deviceRef.current.id, characteristic.serviceUUID, characteristic.uuid)
      .then((data) => {
        console.log("Data read from characteristic:", data);
      })
    }

    const writeDataToCharacteristic = (characteristic, data) => {
      bleManager.writeCharacteristicWithResponseForDevice(deviceRef.current.id, characteristic.serviceUUID, characteristic.uuid, data)
      .then(() => {
        console.log("Data written to characteristic successfully");
      })
      .catch((error) => {
        console.log("Error writing data to characteristic:", error);
      });
    }

    const sendUserInfoToGassolina = () => {
      const encodedData = btoa("heyyyyy@");// Base64 encode the data if needed
      bleManager.writeCharacteristicWithResponseForDevice("2C38AE11-697D-F0C6-32CD-F061407AD0F1", "68544538-7148-4fc4-b555-a029b320b33e", "7e05e450-b517-403c-8a04-376285ac631d", encodedData)
      .then(() => {
        console.log("Data written to characteristic successfully");
      })
      .catch((error) => {
        console.log("Error writing data to characteristic:", error);
      });

    
    };

    const sendScan = () => {
      const encodedData = btoa("5");// Base64 encode the data if needed
      bleManager.writeCharacteristicWithResponseForDevice("2C38AE11-697D-F0C6-32CD-F061407AD0F1", "68544538-7148-4fc4-b555-a029b320b33e", "3de7b790-66bf-4a80-80ae-5970e6d46097", encodedData)
      .then(() => {
        console.log("Data written to characteristic successfully");
      })
      .catch((error) => {
        console.log("Error writing data to characteristic:", error);
      });


    }

    const readData = () => {
      bleManager.readCharacteristicForDevice("2C38AE11-697D-F0C6-32CD-F061407AD0F1", "68544538-7148-4fc4-b555-a029b320b33e", "449d19d2-ac08-43ac-921d-4347f5ec86c6")
      .then((data) => {
        console.log("Data read from characteristic:", data);
      })
    }
      // const sendDataToCharacteristic = (characteristic, data) => {
        
      //   const encodedData = btoa(data);// Base64 encode the data if needed
      //   characteristic.writeWithResponse(encodedData) // or .writeWithoutResponse(encodedData) depending on your requirement
      //   .then(() => {
      //     console.log("Data sent successfully");
      //   })
      //   .catch((error) => {
      //     console.log("Error sending data:", error);
      //   });

      // };

    return (
      <View style={styles.container}>
      <Image source={require('../../assets/background.png')} style={ styles.background } />
      
      <Text style={styles.steps}>Step 1/5</Text>
      <View style={styles.top}>
        {/* <Text style={styles.heading}>Pair with Gassolina</Text> */}
        {/* <Text style={styles.description}>Please pair with Gassolina for a short period while we transfer the data</Text> */}
        <Button title="sendScan" onPress={sendScan} />
        <Button title="readData" onPress={readData} />
        <Button title="sendFire" onPress={sendUserInfoToGassolina} />
        <Button title="connect" onPress={consoleArrays} />
        <Text style={styles.searchdes}>Please turn on Gassolina’s BT by pressing the Bluetooth button</Text>
      </View>
      <View style={styles.middle}>
      <Image source={require('../../assets/ble-icon.png')} style={ styles.wifiIcon } />
      </View>
        <Button title="connect" onPress={searchAndConnectToDevice} />
        <ScrollView>
          {discoveredDevices.map((device) =>  (
            <Button key={device.id} title={device.name} onPress={() => connectToGassolina(device)} />
            ))}
        </ScrollView>
        <Text style={styles.connectionStatus}>{connectionStatus}</Text>
    </View>
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
      //backgroundColor: 'white',
      marginTop: 70,
      //alignItems: 'center',
      width: '90%',
      //marginLeft: 30,
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
        //width: '80%',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35,
        shadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    emailgroup: {
      width: '80%',
      //height: 200,
      backgroundColor: 'white',
      borderRadius: 14,
      padding: 10,
    },
  });