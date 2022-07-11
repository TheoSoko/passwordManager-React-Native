import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {PasswordMenuStackRouteParams} from '../types'
import {fireStoreMainCollectionType} from '../types'
import InfoItem from '../components/infoItem'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


export default function MyPasswords({route, navigation}:NativeStackScreenProps<PasswordMenuStackRouteParams, 'MyPasswords'>){

    //Firebase Auth 
    const [user, setUser] = useState<any>()
    const [initializing, setInitializing] = useState(true)

    //FireStore
    const [firestoreCollection, setFirestoreCollection] = useState<Array<JSX.Element|null>>()

    //Vérifie si un utilisateur est connecté (au changement de focus)
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
          setUser(user)
          initializing && setInitializing(false)
          firestore().collection('Users').doc(auth().currentUser?.uid).collection('Accounts').orderBy('createdAt').onSnapshot(querySnapshot => {
            let collection:Array<JSX.Element|null> = []
            querySnapshot.forEach((documentSnapshot, index) => 
              collection.push(
                <InfoItem doc={{... documentSnapshot.data(), docId: documentSnapshot.id}} key={index}/>
              )
            )
            setFirestoreCollection(collection)
          })
        })
        
        return subscriber
    }, [])





  // N'affiche rien avant d'avoir récupéré l'utilisateur
  if (initializing){
    return null
  }

  //AFFICHAGE
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.hello}>{user ? 'Bonjour ' + user.email : 'Vous n\'êtes pas connecté..'}</Text>

        {
          user && 
            <View style={styles.infoTitleRow}>
              <View style={styles.emptyView}></View>
              <View style={styles.infoTitleView}><Text style={styles.infoTitle}> Comptes </Text></View>
              <TouchableOpacity onPress={() => navigation.navigate('AddPassword')} style={styles.addIcon}>
                <IonIcon name="add-circle" size={32} color='black'/>
              </TouchableOpacity> 
            </View>
        }
        {
          user && 
            <ScrollView contentContainerStyle={styles.contentScrollView} style={{flexWrap: 'wrap'}}>
                {
                  firestoreCollection
                }
            </ScrollView>
        }

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
    fontSize: 27,
    fontWeight: '600',
    marginTop: 9,
  },
  keyIcon: {
    marginTop: 41,
  },
  hello: {
    marginTop: 65,
    marginBottom: 20,
    alignSelf: 'center',
    fontSize: 23,
    fontWeight: '500',
    color: 'black'
  },
  contentScrollView: {
    paddingBottom: 140,
    marginTop: 26,
  },
  infoTitleRow: {
    flexDirection: 'row',
    marginTop: 39,
    justifyContent: 'space-evenly'
  },
  emptyView:{
    flex: 1
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    alignSelf: 'center'
  },
  infoTitleView: {
    flex: 1,
  },
  addIcon: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    marginTop: -15,
  },
  touchableIcon: {
    padding: 8,
  },
  infoContainer: {

  },

})
