import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableOpacityBase, Animated} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import auth, { firebase } from '@react-native-firebase/auth'
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'
import {fireStoreMainCollectionType} from '../types'




export default function  InfoItem(props:{doc:FirebaseFirestoreTypes.DocumentData, key?:number}) {
  const [showPassword, setShowPassWord ] = useState<boolean>(false)
  let hiddenPassword = '*'.repeat(10)

  const [itemHeight, setItemHeight] = useState<number|null>()

  const ref:any = useRef()

    return(
        <View style={styles.infoView}>

          <ScrollView horizontal={true} 
                      showsHorizontalScrollIndicator={false} 
                      ref={ref} onScrollEndDrag={(event) => 
                          event.nativeEvent.contentOffset.x > 60 ? 
                          ref.current.scrollToEnd(Animated) : 
                          event.nativeEvent.contentOffset.x !== 0 ? 
                          ref.current.scrollTo({x:0}, Animated) : null}
                      >

            <View style={styles.mainView} onLayout={(event) => setItemHeight(event.nativeEvent.layout.height) }>
              <Text style={styles.infoText}>{props.doc.Login}</Text>
              <Text style={styles.infoTextMiddle}>{showPassword ? props.doc.Password : hiddenPassword}</Text>
              <Text style={styles.infoTextShort}>{props.doc.Name}</Text>
              <EntypoIcon name={showPassword ? 'eye' : 'eye-with-line'}
                          size={20}
                          style={styles.icon}
                          onPress={() => setShowPassWord(!showPassword)}
                          /> 

              <EntypoIcon name={'chevron-right'}
                          size={20}
                          style={{marginLeft:10}}
                          onPress={() => null}
                          /> 
            </View>

            {/* Vue transparente pour slider*/}
            <View style={styles.emptyView}>
              <TouchableOpacity style={{width:60, height: itemHeight ? itemHeight : 36 }} 
                                onPress={() => firestore().collection('Users').doc(auth().currentUser?.uid)
                                               .collection('Accounts').doc(String(props.doc.docId)).delete()}>
              </TouchableOpacity>
            </View>

          </ScrollView>

          <View style={[styles.scrollToDelete, {height: itemHeight ? itemHeight : 39}]}>
            <TouchableOpacity>
              <MaterialIcon name="delete" 
                            size={28.5} 
                            color='black' 
                            style={styles.deleteIcon}
                            />
            </TouchableOpacity>
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
    scrollToDelete: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      zIndex: -1, // ios
      elevation: -1, // android
      width: 367,
      backgroundColor: 'red',
      borderRadius: 6,
      marginTop: 10,

      position: 'absolute',
      right: 15,

      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    mainView: {
      flexDirection: 'row',
      paddingVertical: 9,
      paddingHorizontal: 12,
      zIndex: 0, // ios
      elevation: 0, // android
      width: 385,
      backgroundColor: 'white',
      borderRadius: 6,
      marginTop: 10,
      marginLeft: 15,
    },
    emptyView:{
      width: 95,
      alignItems: 'center'
    },
    infoText: {
      fontSize: 16,
      marginHorizontal: 4,
      fontWeight: '500',
      color: 'black',
      textAlign: 'left',
      width: 100,
    },
    infoTextMiddle: {
      fontSize: 16,
      marginHorizontal: 4,
      fontWeight: '500',
      color: 'black',
      textAlign: 'center',
      width: 100,
    },
    infoTextShort: {
      fontSize: 16,
      marginRight: 7,
      fontWeight: '500',
      color: 'black',
      textAlign: 'center',
      width: 87,
    },
    icon: {
      paddingLeft: 7,
    },

})