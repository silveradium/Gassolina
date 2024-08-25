import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView } from 'react-native';
import { BleManager } from "react-native-ble-plx";
import { useState, useEffect, useRef } from "react";
import { atob, btoa } from "react-native-quick-base64";

const bleManager = new BleManager();

export default function BluetoothProper( {route, navigation}) {

    console.log(route.params);
    const { username, password, userUuid } = route.params;////


    const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
    const USER_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";


    const [deviceID, setDeviceID] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("Search");
    const [deviceFoundStatus, setDeviceFoundStatus] = useState("Gassolinas will appear here");
    const [isFound, setIsFound] = useState(false);
    const [isConnected, setIsConnected] = useState("Not connected");   

    const[discoveredDevice, setDiscoveredDevice] = useState([]);
    let services_arr = [];
    let characteristics_arr = [];
    let pass_characteristic = "3de7b790-66bf-4a80-80ae-5970ead46097"
    let user_characteristic = "7e05e450-b517-403c-8a04-376285ac631d"
    let network_characteristic = "449d19d2-ac08-43ac-921d-4347f5ec86c6"
    let scan_characteristic = "3de7b790-66bf-4a80-80ae-5970e6d46097"
    let uuid_characteristic = "ea473a3d-912b-41aa-9414-d9cbd20674aa"////
    let deviceId = "4F93D44E-0796-37A0-09D5-62371E492927"

    const deviceRef = useRef(null);

    const searchAndShowDevice = () => {
        let tempDevices = [];
        bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            console.error(error);
            setConnectionStatus("Error searching for devices");
            return;
        }
        if (device && device.localName === "Gasolina101") {
            setConnectionStatus("Searching.....");
            setTimeout(() => {
                  bleManager.stopDeviceScan();
                  setIsFound(true);
                  console.log("Found Gassolina");
                  console.log("Discovered devices:", device.id);
                  setDiscoveredDevice(device);
                  console.log("Discovered devices full thing:", discoveredDevice);
                  console.log("Discovered devices:", device);
                  setConnectionStatus("Search");
                  setDeviceFoundStatus("Tap to connect")
                }, 3000);
        }
        });
        // navigation.navigate('Profile')

        // setTimeout(() => {
        //   bleManager.stopDeviceScan();
        //   setDiscoveredDevices(tempDevices);// them have to let user sleect the device onece selected rewoke the connectToDevice function
        //   console.log("Discovered devices:", tempDevices);
        // }, 5000);
      };

    const consoleArrays = () => {
      console.log("sarray", services_arr);
      console.log("chararray", characteristics_arr);
      console.log("passwordCh", pass_characteristic);
      console.log("userCh", user_characteristic);
      console.log("networkCh", network_characteristic);
    };

    const connectToGassolina = (device) => {
        setIsConnected("Connecting pls wait");
      bleManager.connectToDevice(device.id)
      .then((device) => {
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
            //   setIsConnected("Connected");
              characteristics_arr.push(characteristic);
              });
            });
          });
        }).then(() => {
            console.log("yoo");

      
            // Update the isConnected state and execute sendPassToGassolina
            setIsConnected("Connected");
            sendSsidToGassolina(username);
            sendPassToGassolina(password);
            sendUuidToGassolina(userUuid);//////
          }).then(() => {
            navigation.navigate('Wifi', {
              userUuid: userUuid,
            });
          })
          .catch((error) => {
            console.error("Error connecting to device:", error);
          });
      };
    

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

          
    const writeDataToCharacteristic = (characteristic, data) => {
      bleManager.writeCharacteristicWithResponseForDevice(deviceRef.current.id, characteristic.serviceUUID, characteristic.uuid, data)
      .then(() => {
        console.log("Data written to characteristic successfully");
      })
      .catch((error) => {
        console.log("Error writing data to characteristic:", error);
      });
    }

    const sendSsidToGassolina = (data) => {
      const encodedData = btoa(data + "@fire");// Base64 encode the data if needed
      bleManager.writeCharacteristicWithResponseForDevice(deviceId, "68544538-7148-4fc4-b555-a029b320b33e", user_characteristic, encodedData)
      .then(() => {
        console.log("Data written to characteristic successfully");
      })
      .catch((error) => {
        console.log("Error writing data to characteristic:", error);
      });
    };

    const sendUuidToGassolina = (data) => {
      const encodedData = btoa(data);// Base64 encode the data if needed
      bleManager.writeCharacteristicWithResponseForDevice(deviceId, "68544538-7148-4fc4-b555-a029b320b33e", uuid_characteristic, encodedData)
      .then(() => {
        console.log("Data written to characteristic successfully");
      })
      .catch((error) => {
        console.log("Error writing data to characteristic:", error);
      });
    };

    const sendPassToGassolina = (data) => {
        const encodedData = btoa(data + "@fire");// Base64 encode the data if needed
        bleManager.writeCharacteristicWithResponseForDevice(deviceId, "68544538-7148-4fc4-b555-a029b320b33e", pass_characteristic, encodedData)
        .then(() => {
          console.log("Data written to characteristic successfully");
        })
        .catch((error) => {
          console.log("Error writing data to characteristic:", error);
        });
      };


  
    const readData = () => {
      bleManager.readCharacteristicForDevice(deviceId, "68544538-7148-4fc4-b555-a029b320b33e", network_characteristic)
      .then((data) => {
        console.log("Data read from characteristic:", data);
      })
    }
  
    const displayWifi = () => {
      sendScanToGassolina();
      setTimeout(() => {
          readData();
        }, 4000);
      // console.log(username, password);
    }
    const yo = () => {

    }

    const next = () => {
        navigation.navigate('Wifi', {
          userUuid: userUuid,
        });
    }

    return (
      <View style={styles.container}>
        <Image source={require('../../assets/background.png')} style={ styles.background } />
        <Text style={styles.steps}>Step 1/5</Text>
        {/* <Button title="next" onPress={next} />
        <Button title="scan" onPress={displayWifi} /> */}
        <View style={styles.top}>
            <Text style={styles.heading}>Pair with Gassolina</Text>
            <Text style={styles.description}>Please pair with Gassolina for a short period while we transfer the data</Text>
                <TouchableOpacity style={styles.searchbutton} onPress={searchAndShowDevice}>
                    <Text style={styles.search}>{connectionStatus}</Text>
                </TouchableOpacity>
            <Text style={styles.searchdes}>Please turn on Gassolina’s BT by pressing the Bluetooth button</Text>
        </View>
        <View style={styles.middle}>
            <Image source={require('../../assets/ble-icon.png')} style={ styles.wifiIcon } />
        </View>
        <View style={styles.instruction}>
            <Text style={styles.deviceFoundStatus}>{deviceFoundStatus}</Text>
        </View>
        {isFound && 
        <TouchableOpacity style={styles.deviceShow} onPress={() => connectToGassolina(discoveredDevice)}>
        <Text style={styles.deviceShowName}>Gassolina</Text>
        <Text style={styles.deviceShowStatus}>{isConnected}</Text>
</TouchableOpacity>
}
        
    </View>
    );
  }
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'plum',
      alignItems: 'center',
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
      fontSize: 30,
      lineHeight: "140.97%", /* 45.11px */
  },
  description:{
    color: '#4E4B4F',
    fontFamily: "Poppins-Light",
      fontSize: 16,
    marginBottom: 20,
  },
  searchbutton: {
    color: '#4E4B4F',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: 32,
    width: 104,
    borderRadius: 10, 
    marginBottom: 10,
  },
  search: {
    display: 'block',
    padding: 7,
    color: '#4E4B4F',
    fontFamily: "Poppins-Light",
    fontSize: 15,
  },
  wifiIcon: {
    width: 150,
    height: 150,
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
        borderRadius: 35,
        shadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    emailgroup: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 10,
    },
    deviceFoundStatus: {
      color: '#4E4B4F',
      fontFamily: 'Poppins-Light',

    },
    instruction: {
      marginTop: 20,
      width: '90%',
      alignItems: 'right',
    },

    deviceShow: {
      marginTop: 10,
      width: '90%',
      backgroundColor: 'white',
      borderRadius: 14,
      padding: 10,
      alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    deviceShowName: {
      color: '#4E4B4F',
      fontFamily: 'Poppins-Semibold',
      fontSize: 15,
      marginLeft: 5,
    },

  });