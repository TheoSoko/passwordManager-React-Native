import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {StackRouteParams} from '../types'
import InfoItem from '../components/infoItem'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


type dataType = {
  Login: string
  Name: string
  Password: string
  Type: string
}

export default function MyPasswords(){

    const [user, setUser] = useState<any>();
    const [firestoreCollection, setFirestoreCollection] = useState<Array<dataType>>();

    useEffect(() => {
        let currentUser = auth().currentUser
        if (currentUser !== undefined){
          setUser(currentUser)
          let dataArray:any = []
          firestore().collection('Users').doc(auth().currentUser?.uid).collection('Accounts').get()
          .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                  if (documentSnapshot.exists){
                    dataArray.push(documentSnapshot.data())
                  }
              })
              setFirestoreCollection(dataArray)
          })
          }
        //setFirestoreCollection(firestore().collection('Users').doc(auth().currentUser?.uid).collection('Accounts').doc('0').get().then(docSnap => docSnap.data()))
      }, [useIsFocused()])


      
      function infoDisplay():JSX.Element[]{
        let jsxArray:Array<JSX.Element> = [] 
        if (firestoreCollection){
          firestoreCollection.map((document:dataType) => {
            if (document){
              jsxArray.push(
                <InfoItem doc={document}/>
              )
            }
          })
        }
        return jsxArray
      }
      
      


  return (
    <SafeAreaView style={styles.container}>
        <Icon name="key" size={55} style={styles.icon}/>
        <Text style={styles.hello}>{user ? 'Bonjour ' + user.email : 'Je sais pas t\'es qui.'}</Text>
        <Text style={styles.infoTitle}>Infos de comptes </Text>
        <View style={styles.infoContainer}>
          {
            infoDisplay()
          }
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
    fontSize: 27,
    fontWeight: '600',
    marginTop: 9,
  },
  icon: {
    marginTop: 50,
  },
  hello: {
    marginTop: 22,
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: '500',
    color: 'black'
  },
  infoTitle: {
    marginTop: 37,
    alignSelf: 'center',
    fontSize: 19,
    fontWeight: '400',
    color: 'black'
  },
  infoContainer: {
    marginTop: 13,
  },
})
