import React, {useState} from 'react'
import {TextInput, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'

type customInputProps = {
    type?: string
    onChangeText: (text:any) => void
    onBlur?: () => void
    value?: string
    placeholder?: string
    width?: number
}

export default function CustomInput(props:customInputProps){

    const [showPassword, setShowPassWord ] = useState<boolean>(false)

    return (
        <View style={styles.inputView}>
            <TextInput 
                    onChangeText={(text) => props.onChangeText(text)} 
                    onBlur={() => props.onBlur ? props.onBlur() : null} 
                    style={styles.input} 
                    value={props.value}
                    placeholder={props.placeholder}
                    secureTextEntry = {!showPassword}
                    keyboardType = {(props.type == 'numeric') ? 'numeric' : 
                                    (props.type == 'date') ? 'numbers-and-punctuation' : 
                                    (props.type =='email' ? 'email-address' : 'default')}
            />
            {
                props.type == 'password' ? <Icon name={showPassword ? 'eye' : 'eye-with-line'}
                                                size={20}
                                                style={styles.icon}
                                                onPress={() => setShowPassWord(showPassword ? false : true)}
                                                /> 
                                                : null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 257,
        height: 38,
        paddingVertical: 0,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginVertical: 8,
        borderRadius: 4,
        paddingLeft: 5,
        fontSize: 16.5,
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        position: 'relative',
        right: 30,
        marginRight: -19.5
    }
})