import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StackRouteParams} from '../types'

import Home from '../screens/Home'
import Registration from '../screens/Registration'
import Login from '../screens/Login'

const Stack = createNativeStackNavigator<StackRouteParams>();

export default function StackNavigator() {
  return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Registration" component={Registration}/>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
  )
}