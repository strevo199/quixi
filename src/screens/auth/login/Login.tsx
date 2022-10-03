import React, { useContext, useRef, useState } from 'react'
import { View, Text, Image, Alert, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Logo } from '../../../constants/Images'
import { COLOURS, FONTS, SIZES } from '../../../theme'
import { styles } from './Login.style'
import PhoneInput from 'react-native-phone-number-input'
import { TextInput } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { Route } from '@react-navigation/native';
import { AppFlowRouteName } from '../../../navigation'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../../components'
import axios from 'axios';
import { BASE_URL } from '../../../constants/APIs'
import Toast from 'react-native-simple-toast';

const loginValidate = Yup.object().shape({
    phone: Yup.string().required('phone field is required!'),
    password: Yup.string().min(6).required('password field is required!'),
});

interface LoginProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}


export const Login:React.FC<LoginProps> = (props) => {
    const {navigation} = props
    const [hidePwd, setHidePwd] = useState(true);
    const phoneInput = useRef(null)
    const [loading , setLoading] = useState(false)
    const { login } = useContext(AuthContext)

    const changeHidePwd =() =>{
        setHidePwd(prev => !prev);
    }

    const toastHandler = (message) => {
        Toast.show(message, Toast.LONG);
    }

    const handleLogin = (phone, password) => {
        setLoading(true)
        axios({
            method: 'post',
            url: BASE_URL+'/login',
            data: {
              phone: phone,
              password: password
            }
          }).then((res) => {
                setLoading(false)

              console.log("LOGIN HERE",res.data.token)
              if(res.data.success){
                login(res.data.user, res.data.token)
              }
              if(!res.data.success){
                toastHandler(res.data.message)
              }
          }).catch((err) => {
             setLoading(false)
             if(err.response?.data?.message){
                toastHandler(err.response.data.message)
             }else{
                toastHandler(err.response.data.error_message)
             }
          })
    }


    return (
        <>
            <View style={[styles.loginContainer]}>
                <View style ={[styles.logincontent]}>
                    <View style ={[styles.loginHeader]}>
                        <Text style = {[FONTS.largeTitle,styles.headerText]}>QUIXI</Text>
                        <Image style ={styles.logo} source={Logo} resizeMode="cover" />
                    </View>
                        <Text style ={[FONTS.h3,styles.loginHeadertext]}>You request it. They film it.</Text>
                </View>
                <Formik
                        initialValues={{
                        phone: '',
                        password: '',
                        }}
                        validationSchema={loginValidate}
                        onSubmit={(values) => {
                            handleLogin(values.phone, values.password)
                            //Alert.alert(JSON.stringify(values))
                    }}>
                    {({ values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit, 
                        isValid,
                        setFieldTouched,
                    }) => (
                        <View style={[styles.loginBody]}>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={values.phone}
                                defaultCode='US'
                                layout = "first"
                    
                                autoFocus
                                containerStyle ={styles.phoneContainer}
                                textInputStyle ={styles.textInput}
                                textContainerStyle = {styles.textInput}
                                value={values.phone}
                                onChangeFormattedText={handleChange('phone')} 
                            />
                            {(errors.phone && touched.phone) &&
                                <Text style={{color:'#ff0000'}}>{errors.phone}</Text>
                            }
                            <TextInput
                                style ={styles.passwordInput}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={() => setFieldTouched('password')}
                                placeholder='enter a password'
                                placeholderTextColor="grey" 
                                secureTextEntry={hidePwd}
                                />
                                {(errors.password && touched.password) &&
                                    <Text style={{color:'#ff0000'}}>{errors.password}</Text>
                                }
                            <View style ={styles.loginBodyCOntent}>
                                {loading ? (<ActivityIndicator color={COLOURS.red} />) 
                                : (
                                    <TouchableOpacity
                                    style ={styles.button}
                                    onPress={handleSubmit}
                                    >
                                        <Text style ={styles.buttonText}>Sign In</Text>
                                    </TouchableOpacity>
                                )}
                                
                                
                            </View>
                            <View>
                                <Text style ={{textAlign:'center',color:COLOURS.white}}>Dont have an account already? <Text onPress={() => navigation.navigate(AppFlowRouteName.Signup)} style ={{color:COLOURS.secondary}}>Sign up</Text></Text>
                            </View>
                        </View>
                    )}
                </Formik>
                
            </View>
        </>
    )
}

