import React, {useState, useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback, Pressable, ToastAndroid} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {PasswordMenuStackRouteParams} from '../types'
import {fireStoreMainCollectionType} from '../types'
import InfoItem from '../components/infoItem'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


export default function MyPasswords({route, navigation}:NativeStackScreenProps<PasswordMenuStackRouteParams, 'MyPasswords'>){

    //Firebase Auth, Firebase, et initialisation
    const [user, setUser] = useState<any>()
    const [firestoreCollection, setFirestoreCollection] = useState<Array<JSX.Element|null>>()
    const [initializing, setInitializing] = useState(true)

    //Booléen indiquant si une scrollview est ouverte
    const [isThereOpenScroll, setIsThereOpenScroll] = useState<boolean>(false)
    //Booléan indiquant si un élément autre qu'une scrollview ouverte a été cliqué (doit de remettre à false après)
    const [pressEvent, setPressEvent] = useState<boolean>(false)

    //Visibilité de du pop-up quand le mdp est copié
    const [modalVisible, setModalVisible] = useState<boolean>(false)


    //Utilise un listener pour l'utilisateur
    //Utilise un listener pour les données firestore
    //S'execute au premier chargement, puis au changements sur isThereOpenScroll et pressEvent
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
          setUser(user)
          firestore().collection('Users').doc(auth().currentUser?.uid).collection('Accounts').orderBy('createdAt').onSnapshot(querySnapshot => {
            let collection:Array<JSX.Element|null> = []
            querySnapshot.forEach((documentSnapshot, index) => {
              let data = documentSnapshot.data()
              collection.push(
                <InfoItem doc={{... data, docId: documentSnapshot.id}} 
                          key={index} 
                          onEditPress={() => navigation.navigate('AddPassword', {edit: true, currentItemInfos: {
                            Login: data.Login,
                            Name: data.Name,
                            Password: data.Password,
                            Type: data.Type,
                            createdAt: data.createdAt,
                            docId: documentSnapshot.id
                          }})}
                          bringUpScrollStatus = {(isOpened) => {
                            setIsThereOpenScroll(isOpened)
                          }}
                          isThereOpenScroll = {isThereOpenScroll}
                          hasBeenPressed = {() => setPressEvent(true)}
                          closeTheScroll = {pressEvent}
                          passwordPressed = {() => ToastAndroid.showWithGravityAndOffset('Mot de passe copié !', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0, 155)}
                        />
              )
              //console.warn(openScroll)
            })
            setFirestoreCollection(collection)
            setPressEvent(false)
          })
        })
        initializing && setInitializing(false)
        return subscriber
    }, [isThereOpenScroll, pressEvent])





  // N'affiche rien avant d'avoir récupéré l'utilisateur
  if (initializing){
    return null
  }

  //AFFICHAGE
  return (
      <SafeAreaView style={styles.container} >
        <Pressable onPress={() => setPressEvent(true)}>

            <Text style={styles.hello}>
              {user ? 'Bonjour, ' + user.email.substring(0, user.email.indexOf('@')) + ' !' : 'Vous n\'êtes pas connecté..'}
            </Text>
            {
              user && 
                <View style={styles.accountsTitleRow}>
                  <View style={styles.emptyView}></View>
                  <View style={styles.infoTitleView}><Text style={styles.infoTitleAccounts}> Comptes </Text></View>
                  <TouchableOpacity onPress={() => navigation.navigate('AddPassword')} style={styles.addIcon}>
                    <IonIcon name="add-circle" size={32} color='black'/>
                  </TouchableOpacity>
                </View>
            }
            {
              user && 
                <View style={styles.scrollContainer}>
                  <ScrollView contentContainerStyle={styles.contentScrollView} style={{flexWrap: 'wrap'}}>
                      {
                        firestoreCollection
                      }
                  </ScrollView>
                </View>
            }

        </Pressable>
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
    marginTop: 72,
    marginBottom: 23,
    alignSelf: 'center',
    fontSize: 23,
    fontWeight: '500',
    color: 'black'
  },
  contentScrollView: {
    paddingBottom: 140,
  },
  scrollContainer: {
    marginTop: 10,
  },
  accountsTitleRow: {
    flexDirection: 'row',
    marginTop: 34,
    justifyContent: 'space-evenly'
  },
  emptyView:{
    flex: 1
  },
  infoTitleAccounts: {
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
    paddingVertical: 15,
    marginTop: -15,
  },
  touchableIcon: {
    padding: 8,
  },
  infoContainer: {

  },

})
