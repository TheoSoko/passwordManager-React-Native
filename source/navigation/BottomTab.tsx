import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserStackNavigator, {PasswordMenuStackNavigator} from './Stack'
import MyPasswords from '../screens/MyPasswords';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
        <BottomTab.Navigator initialRouteName='Home' 
                             screenOptions={ ({route}) => ({
                                            headerShown: false, 
                                            tabBarLabelStyle:{paddingBottom: 2.8, fontSize: 10.5}, 
                                            tabBarIconStyle: {marginTop: 2.8},
                                            tabBarActiveTintColor: '#FB8500'
                                          })}>
            <BottomTab.Screen name="UserStackNavigator" 
                              component={UserStackNavigator} 
                              options={{ tabBarLabel: 'Accueil', 
                                         tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={27.5} />
                                      }}/>
            <BottomTab.Screen name="PasswordMenuStackNavigator" 
                              component={PasswordMenuStackNavigator} 
                              options={{ tabBarLabel: 'Mots de passes', 
                                         tabBarIcon: ({ color, size }) => <Icon name="key" color={color} size={27.5} />
                                      }}/>
        </BottomTab.Navigator>
    </NavigationContainer>
  )
}

