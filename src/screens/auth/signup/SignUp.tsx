import React, { useRef, useState } from 'react'
import { View, Text, Image, Pressable, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Logo } from '../../../constants/Images'
import { COLOURS, FONTS, SIZES } from '../../../theme'
import { styles } from './SignUp.style'
import PhoneInput from 'react-native-phone-number-input'
import { TextInput } from 'react-native-gesture-handler'
import { Route } from '@react-navigation/native';
import { AppFlowRouteName } from '../../../navigation'
import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../../../constants/APIs'
const loginValidate = Yup.object().shape({
    phone: Yup.string().required('phone field is required!'),
});

interface LoginProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}

export const SignUp:React.FC<LoginProps> = (props) => {
    const {navigation} = props;
    const phoneInput = useRef(null)
    const [loading , setLoading] = useState(false)

    const handleSignUp = (phone) => {
        setLoading(true)
        axios({
            method: 'post',
            url: BASE_URL+'/signup',
            data: {
              phone: phone            }
          }).then((res) => {
            setLoading(false)

              console.log("LOGIN HERE",res.data.token)
              if(res.data.success){
                navigation.navigate(AppFlowRouteName.Activation, {
                    user: res.data.user,
                    token: res.data.token
                })
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

    const toastHandler = (message) => {
        Toast.show(message, Toast.LONG);
    }

    return (
        <View style={[styles.signupContainer]}>
            <View style ={[styles.signupcontent]}>
                <View style ={[styles.signupHeader]}>
                    <Text style = {[FONTS.largeTitle,styles.headerText]}>QUIXI</Text>
                    <Image style ={styles.logo} source={Logo} resizeMode="cover" />
                </View>
                    <Text style ={[FONTS.h3,styles.signupHeadertext]}>You request it. They film it.</Text>
            </View>
            <Formik
                        initialValues={{
                        phone: '',
                        }}
                        validationSchema={loginValidate}
                        onSubmit={(values) => {
                            handleSignUp(values.phone)
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
                        <View style={[styles.signupBody]}>
                            <PhoneInput
                                ref={phoneInput}
                                defaultValue={values.phone}
                                defaultCode='US'
                                layout = "first"
                                autoFocus
                                containerStyle ={styles.phoneContainer}
                                textInputStyle ={{color:COLOURS.white}}
                                textContainerStyle = {styles.textInput}
                                value={values.phone}
                                onChangeFormattedText={handleChange('phone')} 
                            />
                            {(errors.phone && touched.phone) &&
                                <Text style={{color:'#ff0000'}}>{errors.phone}</Text>
                            }
                           
                            <View style ={styles.signupBodyContent}>
                                {loading ? (<ActivityIndicator color={COLOURS.red} />) 
                                : (
                                    <TouchableOpacity
                                    style ={styles.button}
                                    onPress={handleSubmit}
                                    >
                                        <Text style ={styles.buttonText}>Sign up</Text>
                                    </TouchableOpacity>
                                )}
                                
                                <Text style ={{textAlign:'center',paddingTop:SIZES.h1,color:COLOURS.white}}>By Clicking Sign up, you agree to our <Text onPress={() => navigation.navigate(AppFlowRouteName.Signup)} style ={{color:COLOURS.secondary}}>Terms of serivces</Text> Terms of serivces And that you have read our <Text onPress={() => navigation.navigate(AppFlowRouteName.Signup)} style ={{color:COLOURS.secondary}}>Privacy policy</Text></Text>

                            </View>
                            
                            <View>
                                <Text style ={{textAlign:'center',color:COLOURS.white}}>Have an account already? <Text onPress={() => navigation.navigate(AppFlowRouteName.Login)} style ={{color:COLOURS.secondary}}>Login</Text> </Text>
                            </View>
                        </View>
                    )}
                </Formik>
        </View>
    )
}

