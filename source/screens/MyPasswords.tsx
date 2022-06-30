import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {StackRouteParams} from '../types'
import auth from '@react-native-firebase/auth';

export default function MyPasswords(){

    let currentUser = auth().currentUser
    const [user, setUser] = useState<any>();

    useEffect(() => {
        currentUser && setUser(currentUser)
      }, [useIsFocused()])


  return (
    <SafeAreaView style={styles.container}>
        <Icon name="key" size={55} style={styles.icon}/>
        <Text style={styles.hello}>{user ? 'Bonjour ' + user.email : 'Je sais pas t\'es qui.'}</Text>
    </SafeAreaView>
  )

}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 27,
    fontWeight: '600',
    marginTop: 9,
  },
  icon: {
    marginTop: 35,
  },
  hello: {
    marginTop: 65,
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: '500',
    color: 'black'
  }

})
