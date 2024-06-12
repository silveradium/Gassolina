import * as React from 'react';
import { Button, View, Text } from 'react-native';


export default function Profile({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Profile</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
}