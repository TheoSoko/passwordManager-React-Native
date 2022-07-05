import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'


type dataType = {
    Login: string
    Name: string
    Password: string
    Type: string
  }


export default function  InfoItem(props:{doc:dataType, key?:number}) {
  const [showPassword, setShowPassWord ] = useState<boolean>(false)
  let hiddenPassword = '*'.repeat(props.doc.Password.length)

    return(
        <View style={styles.infoView}>
          <Text style={styles.infoText}>{props.doc.Login}</Text>
          <Text style={styles.infoText}>{showPassword ? props.doc.Password : hiddenPassword}</Text>
          <Text style={styles.infoText}>{props.doc.Name}</Text>
          <Text style={styles.infoText}>{props.doc.Type}</Text>
          <EntypoIcon name={showPassword ? 'eye' : 'eye-with-line'}
                                                size={20}
                                                style={styles.icon}
                                                onPress={() => setShowPassWord(!showPassword)}
                                                /> 
        </View>
    )
}

const styles = StyleSheet.create({
    infoView: {
        marginTop: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        width: '100%',
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 6
      },
      infoText: {
        fontSize: 16,
        marginHorizontal: 10,
        fontWeight: '500',
        color: 'black',
      },
      icon: {
        paddingLeft: 7,
    }
})