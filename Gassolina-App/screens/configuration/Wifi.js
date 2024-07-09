import * as React from 'react';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard, Button, ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const wifi = [
  {
    id: 1,
    name: 'Wifi 1',
    password: null
  },
  {
    id: 2,
    name: 'Wifi 2',
    password: null
  },
  {
    id: 3,
    name: 'Wifi 3',
    password: null
  },
  {
    id: 4,
    name: 'Wifi 4',
    password: null
  },
  {
    id: 5,
    name: 'Wifi 5',
    password: null
  },
  {
    id: 6,
    name: 'Wifi 4',
    password: null
  },
  {
    id: 7,
    name: 'Wifi 5',
    password: null
  },
]



const WifiCard = ({ item, expanded, onPress }) => {
  const [password, setPassword] = useState('');

//when password is submitted
const onSubmitPassword = () => {
  Keyboard.dismiss();
  console.log(password);
  setPassword('');


}
  return (
    <View style={styles.wifiGroup}>
      <TouchableWithoutFeedback style={styles.displayName} onPress= {onPress}>
        <Image source={require('../../assets/wifi-icon.png')} style={ styles.wifiIconFlatlist } />
        <Text style={styles.wifiNames} >{item.name}</Text>
      </TouchableWithoutFeedback>
      {expanded && (<View style={{flexDirection: 'row', justifyContent: 'space-between'}}><TextInput style={styles.input} 
      placeholder='Wifi Password'
      value = {password}
      onChangeText={(text) => setPassword(text)}
      /><Button title=">" onPress={onSubmitPassword} style={{fontFamily: 'Poppins-Light'}}/></View>)}
      
    </View>
  )
}

export default function Wifi({ route, navigation }) {

  const { itemId, otherParam } = route.params;

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

  const addEmail = (email) => {
    if (!email) return;
    setEmails([...emails, email]);
    setEmail('');
    console.log(itemId, otherParam);
  }


  const displayWifi = () => {

  }

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/background.png')} style={ styles.background } />
      
      <Text style={styles.steps}>Step 1/5</Text>
      <View style={styles.top}>
        <Text style={styles.heading}>Connect Gassolina to Wifi</Text>
        <Text style={styles.description}>Please select a wifi to connect with gassolina</Text>
        <TouchableOpacity style={styles.searchbutton} onPress={displayWifi}>
            <Text style={styles.search}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchbutton} onPress={() => navigation.navigate('Bluetooth')}>
            <Text style={styles.search}>Next</Text>
        </TouchableOpacity>
        <Text style={styles.searchdes}>Please turn on your Wifi.....</Text>
      </View>
      
      
      <View style={styles.middle}>
      <Image source={require('../../assets/wifi-icon.png')} style={ styles.wifiIcon } />
      </View>
      <View style={styles.bottom}> 
        <FlatList
            style={{width: '90%'}}
            data={wifi}
            keyExtractor={item => item.id}
            ListHeaderComponent={<Text style={styles.flatlistTitle}>Tap to select and enter password</Text>}
            renderItem={ renderItem }
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={ItemSeparator}
        />
      </View>
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
  }
});