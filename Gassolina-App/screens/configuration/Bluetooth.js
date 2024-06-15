import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { BleManager } from "react-native-ble-plx";
import { useState, useEffect, useRef } from "react";
import { atob, btoa } from "react-native-quick-base64";

const bleManager = new BleManager();

export default function Bluetooth( {navigation}) {

    const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
    const STEP_DATA_CHAR_UUID = "beefcafe-36e1-4688-b7f5-00000000000b";
    const ANOTHER_CHAR_UUID = "5248bd5c-ec57-443b-b249-5d5fb8da053d";
    const SSID_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
    const PASSWORD_UUID = "3235caec-c57e-41cb-a069-a22c49cb7a09";

    const [deviceID, setDeviceID] = useState(null);
    const [stepCount, setStepCount] = useState(0);
    const [another, setAnother] = useState(0);
    //const [stepDataChar, setStepDataChar] = useState(null); // Not Used
    const [connectionStatus, setConnectionStatus] = useState("Searching...");

    const deviceRef = useRef(null);

    const searchAndConnectToDevice = () => {
        bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
            console.error(error);
            setConnectionStatus("Error searching for devices");
            return;
        }
        if (device.name === "Step-Sense") {
            bleManager.stopDeviceScan();
            setConnectionStatus("Connecting...");
            connectToDevice(device);
        }
        });
    };

    // useEffect(() => {
    //     searchAndConnectToDevice();
    // }, []);

    const connectToDevice = (device) => {
        return device
          .connect()
          .then((device) => {
            setDeviceID(device.id);
            setConnectionStatus("Connected");
            deviceRef.current = device;
            return device.discoverAllServicesAndCharacteristics();
          })
          .then((device) => {
            return device.services();
          })
          .then((services) => {
            let service = services.find((service) => service.uuid === SERVICE_UUID);
            return service.characteristics();
          })
          .then((characteristics) => {
            let ssidCharacteristic = characteristics.find(
              (char) => char.uuid ===  SSID_UUID
            );
            sendDataToCharacteristic(ssidCharacteristic, "Dialog 4G");
            sendDataToCharacteristic(ssidCharacteristic, "password123");
          })
          .catch((error) => {
            console.log(error);
            setConnectionStatus("Error in Connection");
          });
      };

      const sendDataToCharacteristic = (characteristic, data) => {
        
        const encodedData = btoa(data);// Base64 encode the data if needed
        characteristic.writeWithResponse(encodedData) // or .writeWithoutResponse(encodedData) depending on your requirement
        .then(() => {
          console.log("Data sent successfully");
        })
        .catch((error) => {
          console.log("Error sending data:", error);
        });

      };

      useEffect(() => {
        const subscription = bleManager.onDeviceDisconnected(
          deviceID,
          (error, device) => {
            if (error) {
              console.log("Disconnected with error:", error);
            }
            setConnectionStatus("Disconnected");
            console.log("Disconnected device");
            setStepCount(0); // Reset the step count
            if (deviceRef.current) {
              setConnectionStatus("Reconnecting...");
              connectToDevice(deviceRef.current)
                .then(() => setConnectionStatus("Connected"))
                .catch((error) => {
                  console.log("Reconnection failed: ", error);
                  setConnectionStatus("Reconnection failed");
                });
            }
          }
        );
        return () => subscription.remove();
      }, [deviceID]);


    return (
      <View style={styles.container}>
        {/* <Image source={require('../assets/background.png')} style={ styles.background } /> */}
        <View style={styles.content}><Text style={styles.title}>Pair With Gassolina</Text>
            <Text style={styles.description}>Please pair with gassolina for a short period while we transfer the data</Text>
        </View>
        <View style={styles.bottomWrapper}>
        <Text style={styles.connectionStatus}>{connectionStatus}</Text>
      </View>
      <View style={styles.stepWrapper}>
              <Text style={styles.steps}>{stepCount}</Text>
        </View>
        {/* <View style={styles.stepWrapper}>
              <Text style={styles.steps}>{another}</Text>
        </View> */}
          
            {/* <Image
            source={require('../assets/logo.png')}
            style={styles.image}
          /> */}
          <Button title="Search" onPress={searchAndConnectToDevice} />
           
        <TouchableOpacity style={styles.button} >
            <View>
                <Text style={styles.getstarted}>Get Started</Text>
            </View>
        </TouchableOpacity>
      </View>
    );
  }

    const styles = StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: 'plum',
        alignItems: 'center',
        //justifyContent: 'center',
        flexDirection: 'column',
        },
        content: {
            width: '87%',
            //height: '50%',
            marginTop: 80,
            backgroundColor: 'white',
            //alignItems: 'center',
            //justifyContent: 'center',
        },
        title: {
            color: '#4E4B4F',
            fontFamily: 'Poppins',
            fontSize: '32px',
            marginBottom: 40,
            fontWeight: '500',
            },
        background: {
            position: 'absolute',
            resizeMode: 'cover',
            width: '100%',
            height: '100%',
            zIndex: -1,
        },
        description: {
            color: '#4E4B4F',
            fontFamily: 'Poppins',
            fontSize: '18px',
            fontStyle: 'normal',
            fontweight: 400,
        },
        // middle: {
        // width: '100%',
        // height: '50%',
        // //backgroundColor: 'plum',
        // alignItems: 'center',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // marginBottom: 30,
        
        image: {
        width: 100,
        height: 100,
        },
        button: {
            position: 'absolute',
            bottom: 50,
            width: 258,
            height: 45,
            borderRadius: '14px',
            backgroundColor: '#5C94F7',
            alignItems: 'center',
            justifyContent: 'center',
        },
        getstarted: {
            color: '#FFF',
            fontSize: 16,
            fontWeight: 600,
        }
    });