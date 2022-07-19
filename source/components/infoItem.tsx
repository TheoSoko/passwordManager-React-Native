import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableOpacityBase, Animated, Pressable, Vibration} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IconButton } from 'react-native-paper';
import Clipboard from '@react-native-clipboard/clipboard';
import auth, { firebase } from '@react-native-firebase/auth'
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import {fireStoreMainCollectionType} from '../types'


type InfoItemprops = {
  doc:FirebaseFirestoreTypes.DocumentData,
  key?:number, 
  onEditPress:() => void,
  bringUpScrollStatus:(arg:boolean) => void
  isThereOpenScroll:boolean
  hasBeenPressed:() => void
  closeTheScroll: boolean
}

export default function InfoItem(props:InfoItemprops) {

  let hiddenPassword = '*'.repeat(10)

  const [showPassword, setShowPassWord ] = useState<boolean>(false)
  const [itemHeight, setItemHeight] = useState<number|null>()
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const _scrollRef:any = useRef()

  useEffect(()=>{
    if (props.closeTheScroll && isOpened){
      closeScroll()
    }
  }, [props.closeTheScroll])

  function openScroll(){
    if (!props.isThereOpenScroll || isOpened ) {
      _scrollRef.current.scrollToEnd(Animated)
      setIsOpened(true)
      props.bringUpScrollStatus(true)
    }
  }

  function closeScroll(){
    _scrollRef.current.scrollTo({x:0}, Animated)
    setIsOpened(false)
    props.bringUpScrollStatus(false)
  }


    return(
        <View style={styles.infoView}>
          <ScrollView horizontal={true}
                      bounces={false}
                      showsHorizontalScrollIndicator={false} 
                      scrollEnabled = {isOpened ? true : !props.isThereOpenScroll}
                      ref={_scrollRef} 
                      onMomentumScrollEnd={(event) => {
                          let scrollposition = event.nativeEvent.contentOffset.x
                          scrollposition > 53 ? openScroll() : closeScroll()
                        }}
                      >

              {/* 
              Vue principale (avec Pressable englobant afin de gérer les contraintes d'ouverture de scroll) 
              Au clic sur la scrollview, elle se ferme, et on envoie l'info au composant parent
              */}
              <Pressable onPress={() => props.hasBeenPressed() }> 
                  <View style={styles.mainView} onLayout={(event) => setItemHeight(event.nativeEvent.layout.height) }>
                    <Text style={styles.infoLogin}>{props.doc.Login}</Text>
                    <TouchableOpacity style={styles.infoPassword} onLongPress={() => {
                                                                                Clipboard.setString(props.doc.Password)
                                                                                Vibration.vibrate(180)
                                                                              }}
                                                                              >
                      <Text style={styles.infoPassword} selectable>{showPassword ? props.doc.Password : hiddenPassword} </Text>
                    </TouchableOpacity>
                    <Text style={styles.infoTextShort}>{props.doc.Name}</Text>
                    <EntypoIcon name={showPassword ? 'eye' : 'eye-with-line'}
                                size={20}
                                style={styles.EyeIcon}
                                onPress={() => setShowPassWord(!showPassword)}
                                /> 
                    <TouchableOpacity hitSlop={{top: 2, bottom:2, right:2, left: 2}} 
                                      style={{justifyContent: 'center'}}
                                      onPress={() => isOpened ? closeScroll() : openScroll()}
                                      >
                        <EntypoIcon name={'chevron-right'} size={22} style={{marginLeft:10, alignSelf: 'center'}} /> 
                    </TouchableOpacity>
                  </View>
              </Pressable>

              {/* Vue transparente pour slider (avec nav édition puisque couche supérieure)*/}
              <View style={styles.emptyView}>
                <TouchableOpacity style={{width:60, height: itemHeight ? itemHeight : 36 }} 
                                  onPress={() => props.onEditPress()}>
                </TouchableOpacity>
              </View>

          </ScrollView>
          
          {/* Vue z-index -1 avec icône d'édition */}
          <View style={[styles.scrollToEdit, {height: itemHeight ? itemHeight : 39}]}>
              <IconButton   icon="account-edit" 
                            size={28.5} 
                            color='black' 
                            style={styles.deleteIcon}
                            />
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
    deleteIcon:{
      padding: 4,
      marginRight: 9.5,
    },
    infoView: {
      flexDirection: 'row'
    },
    scrollToEdit: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      zIndex: -1, // ios
      elevation: -1, // android
      width: 367,
      backgroundColor: '#lightgrey',
      borderRadius: 6,
      marginTop: 10,

      position: 'absolute',
      right: 15,

      justifyContent: 'flex-end',
      alignItems: 'center',

      borderWidth: 1.2,
      borderColor: 'black',

    },
    mainView: {
      flexDirection: 'row',
      paddingVertical: 9,
      paddingHorizontal: 12,
      zIndex: 0, // ios
      elevation: 0, // android
      width: 385,
      backgroundColor: '#faf2ef',
      borderRadius: 6,
      marginTop: 10,
      marginLeft: 15,
      borderWidth: 1.2,
      borderColor: 'black',
    },
    emptyView:{
      width: 95,
      alignItems: 'center'
    },
    infoLogin: {
      fontSize: 16,
      marginHorizontal: 4,
      fontWeight: '500',
      color: 'black',
      textAlign: 'left',
      width: 100,
      alignSelf: 'center',
    },
    infoPassword: {
      fontSize: 16,
      marginHorizontal: 4,
      fontWeight: '500',
      color: 'black',
      textAlign: 'center',
      width: 100,
      alignSelf: 'center',
    },
    infoTextShort: {
      fontSize: 16,
      marginRight: 7,
      fontWeight: '500',
      color: 'black',
      textAlign: 'center',
      width: 87,
      alignSelf: 'center',
    },
    EyeIcon: {
      paddingLeft: 3,
      paddingRight: 1,
      alignSelf: 'center',
    },

})