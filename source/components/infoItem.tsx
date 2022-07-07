import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'


type dataType = {
    Login: string
    Name: string
    Password: string
    Type: string
  }


export default function  InfoItem(props:{doc:dataType, key?:number}) {
  const [showPassword, setShowPassWord ] = useState<boolean>(false)
  let hiddenPassword = '*'.repeat(10)

  const [itemHeight, setItemHeight] = useState<number|null>()

    return(
        <View style={styles.infoView}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mainView} onLayout={(event) => setItemHeight(event.nativeEvent.layout.height)}>
              <Text style={styles.infoText}>{props.doc.Login}</Text>
              <Text style={styles.infoTextMiddle}>{showPassword ? props.doc.Password : hiddenPassword}</Text>
              <Text style={styles.infoTextShort}>{props.doc.Name}</Text>
              <EntypoIcon name={showPassword ? 'eye' : 'eye-with-line'}
                                                    size={20}
                                                    style={styles.icon}
                                                    onPress={() => setShowPassWord(!showPassword)}
                                                    /> 
            </View>
            <View style={styles.emptyView}></View>
          </ScrollView>
          
          <View style={[styles.scrollToDelete, {height: itemHeight ? itemHeight : 10}]}>
            <MaterialIcon name="delete" size={28.5} color='black' style={styles.deleteIcon}/>
          </View>

        </View>
    )
}

const styles = StyleSheet.create({
    deleteIcon:{
      padding: 4,
      marginRight: 10.5,
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
        width: 97,
      },
      infoText: {
        fontSize: 16,
        marginHorizontal: 6,
        fontWeight: '500',
        color: 'black',
        textAlign: 'left',
        width: 105,
      },
      infoTextMiddle: {
        fontSize: 16,
        marginHorizontal: 6,
        fontWeight: '500',
        color: 'black',
        textAlign: 'center',
        width: 105,
      },
      infoTextShort: {
        fontSize: 16,
        marginLeft: 4,
        marginRight: 7,
        fontWeight: '500',
        color: 'black',
        textAlign: 'right',
        width: 92,
      },
      icon: {
        paddingLeft: 7,
    },

})