import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Home,Request,Profile,CreateContent,Chat} from "../screens";
import { COLOURS } from "../theme/Theme";
import { Image, Text } from "react-native";
import { Logo } from "../constants/Images";
// import camera from '../assets/icons/lala.png'



const Tab = createBottomTabNavigator()

export const Tabs = () =>{
    return(
        <Tab.Navigator
       
        screenOptions={({route}) =>({
            tabBarStyle: {backgroundColor:COLOURS.primary,paddingBottom:10 },
            headerShown:false,
            tabBarIcon:({focused}) =>{
                const tintColor = focused ? COLOURS.secondary : COLOURS.white
                switch (route.name) {
                    case "Home":
                        return(
                            <Image
                                resizeMode="contain"
                                style={{
                                    width:35,
                                    height:35,
                                    tintColor:tintColor
                                }}
                                source={require('../assets/icons/outlineplayarrow.png')}
                            />
                        )
                    case "CreateContent":
                        return(
                            <Image
                                resizeMode="contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:tintColor
                                }}
                                source={require('../assets/icons/outlinephoto.png')}
                            />
                        )
                    case "Profile":
                        return(
                            <Image
                                resizeMode="contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:tintColor
                                }}
                                source={require('../assets/icons/outlinepersonblack.png')}
                            />
                        )
                    case "Request":
                        return( 
                            <Image
                                resizeMode="contain"
                                style={{
                                    width:60,
                                    height:60,
                                    transform: [{ rotate: '90deg' },{ rotateZ: '3.13rad' }]
                                }}
                                source={(Logo)} 
                            />
                        )
                    case "Chat":
                        return(
                            <Image
                                resizeMode="contain"
                                style={{
                                    width:25,
                                    height:25,
                                    tintColor:tintColor
                                }}
                                source={require('../assets/icons/outlinechatanswerblack.png')}
                            />
                        )
                }
            }
        })} 
            tabBarOptions={{
                showLabel:false,
                 
            }}
        >
            <Tab.Screen name="Home" component ={Home}/>
            <Tab.Screen name="CreateContent" component ={CreateContent}/>
            <Tab.Screen name="Request" component ={Request}/>
            <Tab.Screen name="Chat" component ={Chat}/>
            <Tab.Screen name="Profile" component ={Profile}/>
        </Tab.Navigator>
    )
}
