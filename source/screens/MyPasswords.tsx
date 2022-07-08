import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {PasswordMenuStackRouteParams} from '../types'
import InfoItem from '../components/infoItem'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

  
type dataType = {
  Login: string
  Name: string
  Password: string
  Type: string
  docId: number
  createdAt: Date
}

export default function MyPasswords({route, navigation}:NativeStackScreenProps<PasswordMenuStackRouteParams, 'MyPasswords'>){

    //Firebase Auth 
    const [user, setUser] = useState<any>()
    const [initializing, setInitializing] = useState(true)

    //FireStore
    const [firestoreCollection, setFirestoreCollection] = useState<Array<dataType>>()


    //Vérifie si un utilisateur est connecté (au changement de focus)
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
          setUser(user);
          initializing && setInitializing(false)
        })

        //Récupère la collection de l'utilisateur et change l'état
        if (user){
          firestore().collection('Users').doc(auth().currentUser?.uid).collection('Accounts').orderBy('createdAt').onSnapshot(querySnapshot => {
            let dataArray:any = []
              querySnapshot.forEach(documentSnapshot => {
                  let docId = documentSnapshot.id
                  if (documentSnapshot.exists){ // <-- Important (jsp pourquoi) // (if (docSnapshot.data()) <-- Nope))
                    dataArray.push({...documentSnapshot.data(), docId})
                  }
              })
              setFirestoreCollection(dataArray)
          })
        }
        
        return subscriber
    }, [])


      
      //Crée une liste de composants avec les infos
      function infoDisplay():JSX.Element[]{
        let jsxArray:Array<JSX.Element> = []
        if (firestoreCollection){
          firestoreCollection.map((document:dataType, key:number) => {
            if (document){
              jsxArray.push(
                <InfoItem doc={document} key={key}/>
              )
            }
          })
        }
        return jsxArray
      }

  // N'affiche rien avant d'avoir récupéré l'utilisateur
  if (initializing){
    return null
  }

  //AFFICHAGE
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.hello}>{user ? 'Bonjour ' + user.email : 'Vous n\'êtes pas connecté..'}</Text>

        {
          //Si un utilisateur est connecté
          user && 
          <View>
            <View style={styles.infoTitleRow}>
                <View style={styles.emptyView}></View>
                <View style={styles.infoTitleView}><Text style={styles.infoTitle}> Comptes </Text></View>
                <View style={styles.addIcon} >
                  <TouchableOpacity onPress={() => navigation.navigate('AddPassword')}>
                    <IonIcon name="add-circle" size={32} color='black'/>
                  </TouchableOpacity> 
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.contentScrollView}>
              <View style={styles.infoContainer}>
                  {infoDisplay()}
              </View>
            </ScrollView>
          </View>
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
  },
  infoTitleRow: {
    flexDirection: 'row',
    marginTop: 28,
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
    alignItems: 'center'
  },
  infoContainer: {
    marginTop: 23,
  },

})
