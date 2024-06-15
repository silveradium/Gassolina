import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/main/Home';
import Settings from '../screens/main/Settings';
import Analytics from '../screens/main/Analytics';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();


export default function Main() {
  return (
    <Tab.Navigator initialRouteName='Home'>
                <Tab.Group
                
                screenOptions={{
                    tabBarStyle: { position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                    height: 60,
                    paddingBottom: 20,
                    //paddingTop: 10, 
                    borderRadius: 22,
                    ...styles.shadow,
                    },
                    headerShown: false,
                    tabBarShowLabel: false,
                  }} 
                  > 
                    <Tab.Screen name="Analytics" component={Analytics} options={{
                      tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                          <Image
                            source={require('../assets/icons/Analytics.png')}
                            resizeMode="contain"
                            style={{
                              width: focused ? 29 : 25,
                              height: 29,
                              tintColor: focused ? '#4E4B4F' : '#615E62',
                            }}
                          />
                          <Text style={{ color: focused ? '#4E4B4F' : '#615E62', fontSize: 10, fontFamily: "MontserratAlternates-SemiBold" }}>Analytics</Text>
                        </View>
                      ),
                    }} />
                    <Tab.Screen name="Home" component={Home} options={{ 
                      tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                          <Image
                            source={require('../assets/icons/Home.png')}
                            resizeMode="contain"
                            style={{
                              width: focused ? 29 : 25,
                              height: 29,
                              tintColor: focused ? '#4E4B4F' : '#615E62',
                            }}
                          />
                          <Text style={{ color: focused ? '#4E4B4F' : '#615E62', fontSize: 10, fontFamily: "MontserratAlternates-SemiBold" }}>Home</Text>
                        </View>
                      ),
                     }} />
                    <Tab.Screen name="Settings" component={Settings} options={{ 
                      tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                          <Image
                            source={require('../assets/icons/Settings.png')}
                            resizeMode="contain"
                            style={{
                              width: focused ? 29 : 25,
                              height: 29,
                              tintColor: focused ? '#4E4B4F' : '#615E62',
                            }}
                          />
                          <Text style={{ color: focused ? '#4E4B4F' : '#615E62', fontSize: 10, fontFamily: "MontserratAlternates-SemiBold" }}>Settings</Text>
                        </View>
                      ),
                     }} />
                </Tab.Group>
            </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5,
  }
})