import React, {useState, useEffect, ReactElement } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {UserStackRouteParams} from '../types'
import validator from 'validator';
import auth from '@react-native-firebase/auth';
import CustomInput from '../components/CustomInput'
import { MMKVLoader } from "react-native-mmkv-storage";
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()

rnBiometrics.isSensorAvailable()
  .then((resultObject) => {
    if (resultObject && resultObject.available && resultObject.biometryType === BiometryTypes.Biometrics) {
      console.warn('Biometrics is supported')
    } else {
      console.warn('Biometrics not supported')
    }
  })

//Framework MMKV Storage: solution de stockage
const MMKV = new MMKVLoader().initialize()


// COMPOSANT ECRAN LOGIN
export default function Login({navigation, route}:NativeStackScreenProps<UserStackRouteParams, 'Login'>){

  const [emailState, setEmail] = useState<string>('')
  const [passwordState, setPassword] = useState<string>('')
  const [loginError, setloginError] = useState<string|null>()
  const [successMessage, setSuccessMessage] = useState<string|null>()
  const [showSignInButton, setShowSignInButton] = useState<boolean>(true)

//Connexion à Firebase
  function firebaseLogin(email:string, password:string):void{
     auth().signInWithEmailAndPassword(email, password)
     .catch((error) => {
     if (error.code === 'auth/wrong-password' || 'auth/user-not-found') {
        setloginError('Le nom d\'utilisateur ou le mot de passe est incorrect.')
     } else if (error.code === 'auth/invalid-email'){
        setloginError('L\'adresse mail que vous avez entré n`\'est pas valide')
     }
     }).then((success) => { success !== undefined && loggedIn(email, password) }) 
   }

//Fonction appelée quand la connexion a été établie
   async function loggedIn(email:string, password:string){
    setSuccessMessage('Vous êtes bien connecté!')
    setloginError(null)
    setShowSignInButton(false)
    await MMKV.setStringAsync('email', email)
    await MMKV.setStringAsync('password', password)
   }
   
//Bouton de validation (ne s'affiche que si il n'y a pas d'erreur)
    function renderButton():JSX.Element|null{
      if (emailState.length > 3 && passwordState.length > 3 && showSignInButton == true) {
          return (
            <TouchableOpacity style={styles.button} onPress={() => firebaseLogin(emailState, passwordState)}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          )
      } else {
        return (null)
      }
    }

// AFFICHAGE
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.goBackView} onPress={() => navigation.goBack()}>
          <Icon name='caretleft' size={23}/>
        </TouchableOpacity>
        <Icon name="user" size={48} style={styles.userIcon} color='black'/>
        <Text style={styles.mainTitle}>Connexion</Text>

        { /* Formulaire */ }

        <View style={styles.formView}>
          <CustomInput
              onChangeText={(text) => setEmail(text)}
              placeholder='Email'
              type= 'email'
              value={emailState}
              />
          <CustomInput
              onChangeText={(text) => setPassword(text)}
              placeholder='Mot de passe'
              type= 'password'
              value={passwordState}
              />
        {/* Erreur */ loginError && <View style={styles.messageView}><Text style={styles.error}>{loginError}</Text></View>}
        {/* Succès */ successMessage && <View style={styles.messageView}><Text style={styles.success}>{successMessage}</Text></View>}

        {/* Bouton de connexion */ renderButton()}

        </View>

    </SafeAreaView>
  )

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FB8500',
    flex: 1,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginTop: 10,
    color: 'black'
  },
  userIcon: {
    marginTop: 16,
  },
  goBackView: {
    alignSelf: 'flex-start',
    marginTop: 22,
    marginLeft: 22,
    padding: 5,
  }, 
  error: {
    marginTop: 8,
    fontSize: 16.5, 
    color: 'black',
    fontWeight: '500'
  },
  success: {
    marginTop: 15,
    fontSize: 18, 
    fontWeight: '500',
    color: 'black',
    textAlign: 'center'
  },
  messageView: {
    marginHorizontal: 'auto',
    justifyContent: 'center'
  },
  formView: {
    marginTop: 28.5,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'mediumturquoise',
    marginTop: 26.5,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 17, 
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
  }
})