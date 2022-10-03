import React, { useState, useContext } from 'react'
import { View, Text, StatusBar, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { styles } from './Activation.style'
import Formik from 'react-native-formik'
import * as Yup from 'yup';
import { Route } from '@react-navigation/native';
import { AppFlowRouteName } from '../../../navigation'
import { AuthContext } from '../../../components'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../../../constants/APIs'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import { COLOURS, FONTS, SIZES } from '../../../theme/Theme';
import { StackNavigationProp } from '@react-navigation/stack';

  const CELL_COUNT = 6;

  interface ActivationProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}

export const Activation:React.FC <ActivationProps>= ({route, navigation}) => {
    const { user, token } = route.params;
    const [loading , setLoading] = useState(false)

    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const { activation } = useContext(AuthContext)

    const handleActivation = () => {
      setLoading(true)
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    
      axios({
          method: 'post',
          url: BASE_URL+'/activation/code',
          data: {
            code: value,
          },
          headers: headers
        }).then((res) => {
            setLoading(false)

            console.log("LOGIN HERE",res.data)
            if(res.data.success){
              activation(res.data.user, token)
            }
        }).catch((err) => {
            setLoading(false)
           console.log(err)
            if(err.response?.data?.message){
              toastHandler(err.response.data.message)
            }else{
                toastHandler(err.response.data.error_message)
            }
        })
    }


    const handleResendCode = () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }

      axios({
          method: 'post',
          url: BASE_URL+'/activation/resend',
          data: {},
          headers: headers
        }).then((res) => {
            console.log("LOGIN HERE",res.data)
            if(res.data.success){
              toastHandler('Code successfully sent')
            }
        }).catch((err) => {
           console.log(err)
            if(err.response?.data?.message){
              toastHandler(err.response.data.message)
            }else{
                toastHandler(err.response.data.error_message)
            }
        })
    }

    const toastHandler = (message) => {
      Toast.show(message, Toast.LONG);
    }

  

    return (
      <View style={styles.activation}>
        <StatusBar hidden={true}/>
        
          <View
            style={{
              alignItems: 'center',
              flex:1,
              justifyContent:'space-around',
              marginVertical: 60,
            }}>
                <View>
                    <Text style ={{color:COLOURS.white,...FONTS.h2}}>Enter Activation Code.</Text>
                </View>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />

            {loading ? (<ActivityIndicator color={COLOURS.red} />) 
            : (
              <TouchableOpacity
              onPress={() => {
                handleActivation()
              }}
              style={[styles.verifyButton, {backgroundColor:value.length !== 6 ? COLOURS.white : COLOURS.secondary,}]}>
              <Text >
                Verify
              </Text>
            </TouchableOpacity>
            )}

            
                <View>
                    <Text style ={{textAlign:'center',color:COLOURS.white}}> You did not get the code? <Text onPress={() => handleResendCode()}>resend code</Text> </Text>
                </View>
          </View>
      </View>
    );
}