import React, {useState, useEffect} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {PasswordMenuStackRouteParams} from '../types'
import CustomInput from '../components/CustomInput'
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

export default function AddPassword({route, navigation}:NativeStackScreenProps<PasswordMenuStackRouteParams, 'AddPassword'>){
    const [Login, setLogin] = useState<string>()
    const [Password, setPassword] = useState<string>()
    const [Name, setName] = useState<string>()
    const [Type, setType] = useState<string>()
    //State pour éviter plusieurs requêtes de suite
    const [query, setQuery] = useState<boolean>(false)

    useEffect(() => {
      setQuery(false)
    },[useFocusEffect])


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

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.goBackView} onPress={() => navigation.goBack()} hitSlop={{top: 5, bottom:5, right:5, left: 5}}>
                <Icon name='caretleft' size={23}/>
            </TouchableOpacity>
            <ScrollView>
                <Text style={styles.mainTitle}>Ajout de mot de passe</Text>
            
                <View style={styles.formView}>
                    <CustomInput placeholder='Login' onChangeText={(text) => setLogin(text)}/>
                    <CustomInput placeholder='Mot de passe' onChangeText={(text) => setPassword(text)} type='password'/>
                    <CustomInput placeholder='Nom du service' onChangeText={(text) => setName(text)} />
                    <CustomInput placeholder='Type de service (optionnel)' onChangeText={(text) => setType} />
                </View>

                <TouchableOpacity style={styles.button} onPress={() => registerData()}>
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
    goBackView: {
      alignSelf: 'flex-start',
      marginTop: 21,
      marginLeft: 21,
      padding: 21,
    },
    mainTitle: {
      fontSize: 27,
      fontWeight: '600',
      marginTop: 40,
      color: 'black'
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
  })