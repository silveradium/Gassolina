import * as React from 'react';
import { Button, View, Text } from 'react-native';


export default function Bluetooth({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Start-up</Text>
      <Button
        title="Go to Sign-up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}