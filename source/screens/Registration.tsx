import React, {useState, useEffect } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {UserStackRouteParams} from '../types'
import validator from 'validator';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomInput from '../components/CustomInput'



// COMPOSANT ECRAN REGISTRATION
export default function Registration({navigation, route}:NativeStackScreenProps<UserStackRouteParams, 'Registration'>){

  const [emailState, setEmail] = useState<string>('')
  const [passwordState, setPassword] = useState<string>('')
  const [emailError, setEmailError] = useState<string|null>()
  const [passWordError, setPasswordError] = useState<string|null>()

  //FireBase
  function fireBaseRegistration(email:string, password:string){
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      response && firestore().collection('Users').doc(auth().currentUser?.uid).set({Email: auth().currentUser?.email})
      firestore().collection('Users').doc(auth().currentUser?.uid).get().then((docSnapshot) => docSnapshot.exists && navigation.goBack())
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.warn('Votre adresse mail est déjà utilisée...');
      }
      if (error.code === 'auth/invalid-email') {
        console.warn('Votre adresse mail est invalide (impossible)');
      }
      console.error(error);
    })
  }

  //Vérifie les champs
  function checkField(type:'email'|'password'){
    if (type == 'email'){
      setEmailError(validator.isEmail(emailState) ? null : 'Veuillez entrez une adresse email valide')
    }
    if (type == 'password'){
      setPasswordError(validator.isStrongPassword(passwordState) ? null : 'Le mot de passe doit contenir: \n - Au moins 8 caractères, \n - Un chiffre, \n - Un caractère spécial')
    }
  }

  //Retire l'erreur quand plus de texte
  useEffect(() => {   
      emailState.length == 0 && setEmailError(null)
      passwordState.length == 0 && setPasswordError(null)
    })

    //Bouton de validation (ne s'affiche que si il n'y a pas d'erreur)
    function renderButton(){
      if (validator.isEmail(emailState) && validator.isStrongPassword(passwordState)) {
        if (emailError === null && passWordError === null){
          return (
            <TouchableOpacity style={styles.button} onPress={() => fireBaseRegistration(emailState, passwordState)}>
              <Text style={styles.buttonText}>Valider l'inscription</Text>
            </TouchableOpacity>
          )
        }
      }
    }

// AFFICHAGE
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.goBackView} onPress={() => navigation.goBack()}>
          <Icon name='caretleft' size={23}/>
        </TouchableOpacity>
        <Icon name="adduser" size={48} style={styles.icon}/>
        <Text style={styles.mainTitle}>Inscription</Text>

        { /* Formulaire */ } 

        <View style={styles.formView}>
          <CustomInput 
              onChangeText={(text) => setEmail(text)} 
              onBlur={() => emailState.length > 0 ? checkField('email') : null} 
              placeholder='Email' 
              type= 'email'
              value={emailState}
              />
          {emailError ? <View><Text style={styles.error}>{emailError}</Text></View> : null}
          <CustomInput 
              onChangeText={(text) => setPassword(text)} 
              onBlur={() => passwordState.length > 0 ? checkField('password') : null} 
              placeholder='Mot de passe'
              type= 'password'
              value={passwordState}
              />
          {passWordError ? <View style={styles.errorView}><Text style={styles.error}>{passWordError}</Text></View> : null}

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