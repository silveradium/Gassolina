import * as React from 'react';
import { Button, View, Text } from 'react-native';


export default function SignUp({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SignUp</Text>
      <Button
        title="Go to Wifi"
        onPress={() => navigation.navigate('Wifi')}
      />
    </View>
  );
}