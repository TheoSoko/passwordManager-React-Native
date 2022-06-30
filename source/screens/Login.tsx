import React, {useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {StackRouteParams} from '../types'
import validator from 'validator';
import auth from '@react-native-firebase/auth';
import CustomInput from '../components/customInput'



// COMPOSANT ECRAN LOGIN
export default function Login({navigation, route}:NativeStackScreenProps<StackRouteParams, 'Login'>){

  const [emailState, setEmail] = useState<string>('')
  const [passwordState, setPassword] = useState<string>('')
  const [loginError, setloginError] = useState<string|null>()
  const [successMessage, setSuccessMessage] = useState<string|null>()

  function firebaseLogin(email:string, password:string){
     auth().signInWithEmailAndPassword(email, password)
     .catch((error) => {
     if (error.code === 'auth/wrong-password' || 'auth/user-not-found') {
        setloginError('Le nom d\'utilisateur ou le mot de passe est incorrect')
     } else if (error.code === 'auth/invalid-email'){
        setloginError('L\'adresse mail que vous avez entré n`\'est pas valide')
     }
     }).then((data) => data !== undefined && loggedIn()) 
   }

   function loggedIn():void{
    setSuccessMessage('Vous êtes bien connecté!')
    setloginError(null)
   }
   
    //Bouton de validation (ne s'affiche que si il n'y a pas d'erreur)
    function renderButton(){
      if (emailState.length > 3 && passwordState.length > 3) {
          return (
            <TouchableOpacity style={styles.button} onPress={() => firebaseLogin(emailState, passwordState)}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
          )
      }
    }

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.goBackView} onPress={() => navigation.goBack()}>
          <Icon name='caretleft' size={23}/>
        </TouchableOpacity>
        <Icon name="adduser" size={48} style={styles.icon}/>
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
        {loginError ? <View><Text style={styles.error}>{loginError}</Text></View> : null}
        {successMessage ? <View><Text style={styles.error}>{successMessage}</Text></View> : null}

          {renderButton()}
        </View>

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
    fontSize: 26,
    fontWeight: '600',
    marginTop: 8,
  },
  icon: {
    marginTop: 9,
  },
  goBackView: {
    alignSelf: 'flex-start',
    marginTop: 22,
    marginLeft: 22,
  }, 
  error: {
    fontSize: 15, 
  },
  errorView: {
    alignItems: 'center'
  },
  formView: {
    marginTop: 27,
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'mediumturquoise',
    marginTop: 24,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 17, 
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center',
  }
})