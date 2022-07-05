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
  let hiddenPassword = '*'.repeat(10)

    return(
        <View style={styles.infoView}>
          <Text style={styles.infoText}>{props.doc.Login}</Text>
          <Text style={styles.infoTextMiddle}>{showPassword ? props.doc.Password : hiddenPassword}</Text>
          <Text style={styles.infoTextShort}>{props.doc.Name}</Text>
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
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 6
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
    }
})