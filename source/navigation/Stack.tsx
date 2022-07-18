import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {UserStackRouteParams, PasswordMenuStackRouteParams} from '../types'

import Home from '../screens/Home'
import Registration from '../screens/Registration'
import Login from '../screens/Login'
import MyPasswords from '../screens/MyPasswords'
import AddPassword from '../screens/addPassword'

const Stack = createNativeStackNavigator<UserStackRouteParams>();

export default function UserStackNavigator() {
  return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Registration" component={Registration}/>
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
  )
}

const PassMenuStack = createNativeStackNavigator<PasswordMenuStackRouteParams>();

export function PasswordMenuStackNavigator(){
  return (
    <PassMenuStack.Navigator initialRouteName='MyPasswords' screenOptions={{headerShown: false}}>
        <PassMenuStack.Screen name="MyPasswords" component={MyPasswords}/>
        <PassMenuStack.Screen name="AddPassword" component={AddPassword}/>
    </PassMenuStack.Navigator>
)
}