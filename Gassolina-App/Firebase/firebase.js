import * as React from 'react';
import { View, Text, StyleSheet, Image, Button, FlatList } from 'react-native';
import { ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState, createContext, useContext } from 'react';

const FirebaseContext = createContext();

export default function FirebaseProvider ({children}) {
    const [user, setUser] = useState(); // Initial empty array of users
    const [weight, setWeight] = useState(0);

    useEffect(() => {
        const unsubscribe = firestore().collection('7nNXGvfQT4bHKC3iF8htlkjSJ6W2').orderBy("timestamp", "desc").onSnapshot(
          (querySnapshot) => {
            const usersList = [];
            querySnapshot.forEach((doc) => {
              usersList.push({ id: doc.id, ...doc.data() });
            });
            setUser(usersList[0]);
          },
          (error) => {
            console.error('Error getting Users collection:', error);
          }
        );
    
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
      }, []);

      //linear regression function to estimate end date


      //remaining battery level

      //function to put consumption rates into days and hours etc

      return (
        <FirebaseContext.Provider value={user}>
          {children}
        </FirebaseContext.Provider>
      );

}

export const useFirebase = () => {
    return useContext(FirebaseContext);
  };

