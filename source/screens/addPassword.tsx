import React, {useState, useEffect} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {PasswordMenuStackRouteParams} from '../types'
import CustomInput from '../components/CustomInput'
import { useIsFocused } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

export default function AddPassword({route, navigation}:NativeStackScreenProps<PasswordMenuStackRouteParams, 'AddPassword'>){

    let infos = route?.params?.currentItemInfos
    //let edit = route?.params?.edit
    const [Login, setLogin] = useState<string>(infos?.Login ? infos.Login : '')
    const [Password, setPassword] = useState<string>(infos?.Password ? infos.Password : '')
    const [Name, setName] = useState<string>(infos?.Name ? infos.Name : '')
    const [Type, setType] = useState<string>(infos?.Type ? infos.Type : '')
    //State pour éviter plusieurs requêtes de suite
    const [query, setQuery] = useState<boolean>(false)

    if (useIsFocused() == true && !auth().currentUser){
      navigation.goBack()
    } 

    useEffect(() => {
      const subscriber = () => {
        setQuery(false)
      }
      return subscriber
    },[useIsFocused()])


    function registerData(){
      if (Login && Password && Name && !query){
          firestore().collection('Users').doc(auth().currentUser?.uid).collection('Accounts').add({
              Login: Login,
              Password: Password,
              Name: Name,
              Type: Type ? Type : '',
              createdAt: firestore.FieldValue.serverTimestamp(),
          })
          .then((response) => { response && setQuery(true); navigation.goBack() })
      }
    }
    function updateData(){
      let errorList:Array<any> = []
      if (Login && Password && Name && !query){
          firestore().collection('Users').doc(auth().currentUser?.uid).collection('Accounts').doc(infos?.docId).set({
              Login: Login,
              Password: Password,
              Name: Name,
              Type: Type ? Type : '',
              createdAt: firestore.FieldValue.serverTimestamp(),
          })
          .catch(errors => errors && errorList.push(errors))
          .then(() => { errorList.length == 0 && setQuery(true); navigation.goBack() })
      } else {
        console.warn('erreur')
      }
  }

//Function d'avertissement et de suppression de l'item
  const deleteAlert = () =>
  Alert.alert(
    "Avertissement",
    "Êtes-vous certain de vouloir supprimer cet item ?",
    [
      {
        text: "Supprimer",
        onPress: () => { 
        let errorList:Array<any> = []
        firestore().collection('Users').doc(auth().currentUser?.uid)
          .collection('Accounts').doc(infos?.docId).delete()
          .catch(errors => errors && errorList.push(errors))
          .then(() => { if (errorList.length == 0){
              setQuery(true)
              Alert.alert('L\'item a bien été supprimé')
              navigation.goBack()
            }
          })
        },
        style: "destructive",
      },
      {
        text: "Annuler",
        style: "cancel",
      },
    ],
    {
      cancelable: true,
    }
  )

    return(
        <SafeAreaView style={styles.container}>
          <View style={styles.topView}>
            <TouchableOpacity style={styles.goBackOpacity} onPress={() => navigation.goBack()} hitSlop={{top: 5, bottom:5, right:5, left: 5}}>
                <Icon name='caretleft' size={23}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteOpacity} onPress={() => deleteAlert()} hitSlop={{top:1, bottom:1, right:1, left:1}}>
                <Ionicon name='trash-outline' color='black' size={28}/>
            </TouchableOpacity>
          </View>
            <ScrollView>
                <Text style={styles.mainTitle}>{route?.params?.edit ? 'Modifier les infos' : 'Ajout de mot de passe'}</Text>
            
                <View style={styles.formView}>
                    <CustomInput defaultValue={Login} placeholder='Login' onChangeText={(text) => setLogin(text)}/>
                    <CustomInput defaultValue={Password} placeholder='Mot de passe' onChangeText={(text) => setPassword(text)} type='password'/>
                    <CustomInput defaultValue={Name} placeholder='Nom du service' onChangeText={(text) => setName(text)} />
                    <CustomInput defaultValue={Type} placeholder='Type de service (optionnel)' onChangeText={(text) => setType} />
                </View>

                <TouchableOpacity style={styles.button} onPress={() => route?.params?.edit ? updateData() : registerData()}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                </TouchableOpacity>
                
            </ScrollView>
        </SafeAreaView>
        
    )
}




const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FB8500',
      flex: 1,
      alignItems: 'center',
    },
    goBackOpacity: {
      marginTop: 21,
      marginLeft: 21,
      padding: 21,
      flex: 1
    },
    deleteOpacity: {
      marginTop: 20.5,
      marginRight: 19,
      padding: 17,
      flex: 1,
      alignItems: 'flex-end'
    },
    mainTitle: {
      fontSize: 27,
      fontWeight: '600',
      marginTop: 40,
      color: 'black',
      alignSelf: 'center',
    },
    infoTitleRow: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 38,
    },
    infoTitle: {
      alignSelf: 'center',
      fontSize: 20,
      fontWeight: '500',
      color: 'black',
      marginHorizontal: 5,
    },
    infoContainer: {
      marginTop: 13,
    },
    formView: {
        marginTop: 39, 
        alignSelf: 'center'
    },
    button:{
      marginTop: 26,
      backgroundColor: 'white',
      paddingHorizontal: 19,
      paddingVertical: 8,
      borderRadius: 6,
      width: 135,
      alignSelf: 'center',
    },
    buttonText: {
      fontSize: 17.5,
      fontWeight: '500',
      color: '#FB8500',
      textAlign: 'center'
    },
    topView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    }
  })