import * as React from 'react';
import { Button, View, Text } from 'react-native';
import auth from '@react-native-firebase/auth';

const onPress = () => {
  auth()
  .createUserWithEmailAndPassword('janiee.doe@example.com', 'SuperSecretPassword!')
  .then(() => {
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
}




export default function SignUp({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SignUp</Text>
      <Button
        title="Go to Wifi"
        onPress={() => navigation.navigate('Wifi')}
      />
      <Button
        title="Go to Wifi"
        onPress={onPress}
      />
    </View>
  );
}