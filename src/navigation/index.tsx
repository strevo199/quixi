import React, {useEffect, useMemo, useReducer, useState} from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import {Splash,Login,SignUp,Conservation, Activation,Home,Preview, ViewMedia, RequestDetail, EditProfile, RelatedContents, ReplyContent, IncomingRequest} from '../screens';
import { Tabs } from './Tabs';
import { AuthContext } from '../components/context'
import AsyncStorage from '@react-native-community/async-storage';
import { MyContents } from '../screens/myContents';
const Stack = createStackNavigator();


export const AppFlow  = () => {
    const initialAuthState = {
        isLoading: true,
        user: null,
        token: null
    };

    const authReducer = (prevState: any, action: any) => {
        switch(action.type){
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    token: action.token,
                    isLoading: false
                }
            case 'LOGIN':
                return {
                    ...prevState,
                    user: action.user,
                    token: action.token,
                    isLoading: false
                }
            case 'ACTIVATION':
                return {
                    ...prevState,
                    user: action.user,
                    token: action.token,
                    isLoading: false
                }
            case 'LOGOUT':
                return {
                    ...prevState,
                    user: null,
                    token: null,
                    isLoading: false
                }
        }
    };
    const [ authState, dispatch ] = useReducer(authReducer, initialAuthState)
    const authContext = useMemo<any>(() => ({
        login: async(userInfo, userToken, ) => {
            let token = null;
            let user = null;
            if(userToken && userInfo){
                token = userToken
                user = userInfo
                try {
                    await AsyncStorage.setItem('token', token)
                    await AsyncStorage.setItem('user', JSON.stringify(user))
                } catch (error) {
                    console.log(error)
                }
            }
            dispatch({ type: 'LOGIN', user: user, token: token })
        },
        activation:async (userInfo, userToken) => {
            let token = null;
            let user = null;
            if(userToken && userInfo){
                token = userToken
                user = userInfo
                try {
                    await AsyncStorage.setItem('token', token)
                    await AsyncStorage.setItem('user', JSON.stringify(user))
                } catch (error) {
                    console.log(error)
                }
            }
            dispatch({ type: 'ACTIVATION', user: user, token: token })
        },
        signOut:async () => {
            try {
                await AsyncStorage.removeItem('token')
                await AsyncStorage.removeItem('user')
            } catch (error) {
                console.log(error)
            }
            dispatch({ type: 'LOGOUT' })
        },
    }), [] );

    useEffect(() => {
        setTimeout(async() =>{
            let token;
            token = null;
            try {
               token = await AsyncStorage.getItem('token')
            } catch (error) {
                console.log(error)
            }
            dispatch({ type: 'RETRIEVE_TOKEN', token: token })
        },3000)
        return () => clearTimeout(5000);
    }, [])


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown:false
                    }}
            >
                { authState.isLoading ? (
                    <Stack.Screen
                        name = "Splash"
                        component ={Splash}
                    />
                ) : ( 
                    null
                )}

                {!authState.isLoading && !authState.token ? (
                    <>
                    <Stack.Screen
                        name = "Login"
                        component ={Login}
                    />
                    
                    <Stack.Screen
                        name = "Signup"
                        component ={SignUp}
                    />   
                    
                    <Stack.Screen
                        name = "Activation"
                        component ={Activation}
                    /> 
                
                    </>
                ) : null}
                
                {!authState.isLoading && authState.token ? (
                    <>
                       
                       <Stack.Screen
                            name = "Home"
                            component ={Tabs}
                        /> 

                        <Stack.Screen
                            name = "View Media"
                            component ={ViewMedia}
                        /> 
                        <Stack.Screen
                            name = "Preview"
                            component ={Preview}
                        /> 
                        <Stack.Screen
                            name = "Conservation"
                            component ={Conservation}
                        /> 

                        <Stack.Screen
                            name = "Reply"
                            component ={ReplyContent}    
                        /> 

                         <Stack.Screen
                            name = "Request Detail"
                            component ={RequestDetail}
                            
                        />

                        <Stack.Screen
                            name = "Edit Profile"
                            component ={EditProfile}
                            
                        /> 

                        <Stack.Screen
                            name = "Related Contents"
                            component ={RelatedContents}
                            
                        /> 

                        <Stack.Screen
                            name = "Incoming"
                            component ={IncomingRequest}
                            
                        /> 

                        <Stack.Screen
                            name = "Mine"
                            component ={MyContents}
                            
                        /> 

                    </>
                ) : null}
    
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}
 
export const AppFlowRouteName = {
    //Authentication
    Splash: 'Splash',
    Login: 'Login',
    Signup: 'Signup',
    Activation: 'Activation',
    Home: 'Home',
    ViewMedia: 'View Media',
    RequestDetail: 'Request Detail',
    EditProfile: "Edit Profile",
    Preview: "Preview",
    RelatedContents: "Related Contents",
    ReplyContent: "Reply",
    Conservation: "Conservation",
    IncomingRequest: "Incoming",
    MyContents: "Mine"
  }; 
  