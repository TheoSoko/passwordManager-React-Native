import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native'



export default function AddPassword(){

    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.mainTitle}>Ajouter un mot de passe</Text>
            
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
    hello: {
      marginTop: 22,
      alignSelf: 'center',
      fontSize: 26,
      fontWeight: '500',
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
  
  })