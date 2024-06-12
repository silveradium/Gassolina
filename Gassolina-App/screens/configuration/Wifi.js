import * as React from 'react';
import { Button, View, Text } from 'react-native';


export default function Wifi({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Wifi</Text>
      <Button
        title="Go to Bluetooth"
        onPress={() => navigation.navigate('Bluetooth')}
      />
    </View>
  );
}