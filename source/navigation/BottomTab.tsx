import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackNavigator from './Stack'

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
        <BottomTab.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
            <BottomTab.Screen name="StackNavigator" component={StackNavigator} options={{ 
                tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />
                }}/>
        </BottomTab.Navigator>
    </NavigationContainer>
  )
}

