import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {StackRouteParams} from '../types'


export default function Home({navigation, route}:NativeStackScreenProps<StackRouteParams, 'Home'>){


  return (
    <View style={styles.container}>
        <Icon name="home" size={50} style={styles.icon}/>
        <Text style={styles.mainTitle}>YouShallPass</Text>
        <View style={styles.buttonView}>
          <View style={styles.registerButton}>
            <Button title={'S\'inscire'} onPress={() => navigation.navigate('Registration')}/>
          </View>
          <View style={styles.loginButton}>
            <Button title={'Connexion'} onPress={() => navigation.navigate('Registration')}/>
          </View>

        </View>
    </View>
  )

}



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgrey',
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 8,
  },
  icon: {
    marginTop: 35,
  },
  buttonView: {
    flexDirection: 'row',
    marginTop: 32,
  },
  registerButton: {
    marginRight: 10,
  },
  loginButton: {
    marginLeft: 10,
  }
})


