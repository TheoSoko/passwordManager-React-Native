import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {StackRouteParams} from '../types'
import auth from '@react-native-firebase/auth';


export default function Home({navigation, route}:NativeStackScreenProps<StackRouteParams, 'Home'>){
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();
  const [userHasSignedOut, setUserHasSignedOut] = useState<boolean>(false)

  
    useEffect(() => {
      const subscriber = auth().onAuthStateChanged((user) => {
        setUser(user);
        initializing && setInitializing(false)
        user && setUserHasSignedOut(false)
      })
      return subscriber
    }, [])



  function signOut(){
    auth().signOut()
    setUserHasSignedOut(true)
  }

  // N'affiche rien avant d'avoir récupéré l'utilisateur
  if (initializing){
    return null
  }
  
  return (
    <View style={styles.container}>
        <Icon name="home" size={55} style={styles.icon}/>
        <Text style={styles.mainTitle}>YouShallPass</Text>
        
        {
          /* Si l'utilisateur n'est pas connecté */
          !user ?
            <View style={styles.buttonView}>
              <View style={styles.registerButton}>
                  <Button title={'S\'inscire'} 
                          onPress={() => navigation.navigate('Registration')} 
                          accessibilityLabel="Inscription"
                          />
              </View>
              <View style={styles.loginButton}>
                  <Button title={'Connexion'} 
                          onPress={() => navigation.navigate('Login')}
                          accessibilityLabel="Connexion"
                          />
              </View>
          </View>
        :
          /* Si l'utilisateur est connecté */
          <TouchableOpacity style={styles.signOut} onPress={() => signOut()}>
              <Text style={styles.signOutText}>Déconnexion</Text>
          </TouchableOpacity>
        }
        {
          /* Si l'utilisateur vient de se déconnecter */
          userHasSignedOut && <Text style={styles.signedOutMessage}>Vous êtes déconnecté</Text>
        }

    </View>
  )

}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FB8500',
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
  buttonView: {
    flexDirection: 'row',
    marginTop: 35,
  },
  registerButton: {
    marginRight: 13,
  },
  loginButton: {
    marginLeft: 13,
  },
  signOut: {
    marginTop: 30,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 3,
  },
  signOutText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  signedOutMessage: {
    marginTop: 30,
    fontSize: 17,
    color: 'black',
    fontWeight: '500'
  }
})


