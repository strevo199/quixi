import React, { useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { View, Text, Image, useWindowDimensions, ScrollView, Dimensions, TouchableOpacity, Alert, Switch, ActivityIndicator, ImageBackground, Platform } from 'react-native'
import { styles } from './Profile.style'
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLOURS, SIZES } from '../../theme'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Logo } from "../../constants/Images";


import { LazyImage } from '../../components'
import { AppFlowRouteName } from '../../navigation'
import { AuthContext } from '../../components'
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../../constants/APIs'

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width


interface screenProps {
    route: Route<any>,
    navigation: StackNavigationProp<any>
}
export const Profile: React.FC<screenProps> = ({ navigation }) => {
    const layout = useWindowDimensions();
    const { signOut } = useContext(AuthContext)
    const [index, setIndex] = useState(0);
    const [token, setToken] = useState('');
    const [user, setUser] = useState({});
    const [isEnabled, setIsEnabled] = useState(false);
    const [loading, setLoading] = useState(false)
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        console.log(isEnabled)
        videoGrapherHandler()
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTimeout(async () => {
                try {
                    let newToken = await AsyncStorage.getItem('token')
                    let newUserObj = await AsyncStorage.getItem('user')
                    let newUser = JSON.parse(newUserObj);
                    console.log("TOKEN", newToken)
                    if (newToken) {
                        setToken(newToken)
                    }
                    if (newUser) {
                        getUser(newToken, newUser)
                    }
                } catch (error) {
                    console.log(error)
                }
            }, 3000)
        });
        return unsubscribe;
    }, [navigation])

    const getUser = (passToken, newUser) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + passToken
        }
        console.log("HEADERS", headers)

        axios({
            method: 'get',
            url: BASE_URL+'/accounts/' + newUser._id,
            headers: headers
        }).then((res) => {
            setLoading(false)
            if (res.data.success) {
                console.log('GET PROFILE API', res.data?.data)
                setUser(res.data?.data)
                //setRequest(res.data/.data)
                //navigation.navigate(AppFlowRouteName.Home)
            }
        }).catch((err) => {
            setLoading(false)
            console.log(err)
            if(err.response?.data?.message){
                toastHandler(err.response.data.message)
                if(err.response.data.message == 'Session expired'){
                    signOut()
                }
            }else{
                toastHandler(err.response.data.error_message)
            }
        })
    }

    const toastHandler = (message) => {
        Toast.show(message, Toast.LONG);
    }

    const videoGrapherHandler = () => {
        const body = {
            videographer: isEnabled,
        }

        console.log("VIDEO", body)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        console.log(headers)
        axios({
            method: 'patch',
            url: BASE_URL+'/accounts',
            data: body,
            headers: headers
        }).then((res) => {
            setLoading(false)
            if (res.data.success) {
                console.log("VIDEO DATA", res.data?.data)
                toastHandler(`Videographer turned ${isEnabled ? 'On' : 'Off'}`)
                setUser(res.data?.data)
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
    return (
        <View style={[styles.container]}>
            {loading ? (<ActivityIndicator color={COLOURS.red} />) : (
                <>
                    <View style={{ marginTop: 40, marginBottom: 40 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: Platform.OS === 'android' ? 50 : 30,
                                        borderColor: '#ddd',
                                        marginRight: 10
                                    }}
                                    source={{ uri: user?.avatar ? user?.avatar : 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg' }}
                                    resizeMode='contain'
                                />
                                <View>
                                    <Text style={{ color: COLOURS.white, fontWeight: 'bold', fontSize: 16, textTransform: 'uppercase' }}>{user?.last_name ? user?.last_name : 'User'}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: COLOURS.white }}>Videographer Mode:</Text>
                                        <Text style={{ color: COLOURS.secondary, marginLeft: 5 }}>{user?.videographer ? "On" : "Off"}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <FontAwesome name='star' size={15} color={COLOURS.secondary} />
                                        <Text style={{ color: COLOURS.white, marginLeft: 5 }}>4.5</Text>
                                        <Text style={{ color: COLOURS.white, marginLeft: 5 }}>(20)</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate(AppFlowRouteName.EditProfile, { user: user })

                                //signOut()
                            }}>
                                <FontAwesome name='list-ul' size={25} color={COLOURS.secondary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View >
                        <ImageBackground source={Logo} style={[styles.cardContainer]} >
                            <View style={styles.cardContent_1}>
                                <Image style={{
                                    width: 20,
                                    height: 30, transform: [{ rotate: '90deg' }, { rotateZ: '3.13rad' }]

                                }} source={Logo} />

                            </View>
                            <View >
                                <Text style={{
                                    color: COLOURS.white, fontWeight: '600', fontSize: SIZES.h3, textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                    textShadowOffset: { width: -1, height: 1 },
                                    textShadowRadius: 10
                                }}>{user?.last_name ? user?.last_name : 'User'}</Text> 
                            </View>
                            <View style={styles.cardContent_4} >
                                <Text style={{
                                    color: COLOURS.white, fontWeight: '600', letterSpacing: 4, fontSize: SIZES.h2, textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: { width: -1, height: 1 },
                                    textShadowRadius: 10
                                }}>5555 2222 4444 9999</Text>

                            </View>
                            <View style={styles.cardContent_2} >
                                <Text style={{ color: COLOURS.white, fontSize: SIZES.h4 }} >BALANCE</Text>
                                <Text style={{ color: COLOURS.white, fontWeight: 'bold', fontSize: SIZES.h2 }} >$ 50000</Text>
                            </View>

                        </ImageBackground>
                    </View>
                    <ScrollView>
                        <View style={{ backgroundColor: COLOURS.gray, height: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 18, paddingLeft: 10 }}>Videographer Mode</Text>
                            <Switch
                                trackColor={{ false: COLOURS.success, true: COLOURS.primary }}
                                thumbColor={isEnabled ? COLOURS.white : "#f4f3f4"}
                                ios_backgroundColor={COLOURS.success}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate(AppFlowRouteName.MyContents)} style={{ backgroundColor: COLOURS.gray, height: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 18, paddingLeft: 10 }}>My Conents</Text>
                            <Ionicons name='chevron-forward-outline' style={{ fontSize: 20, color: COLOURS.primary, paddingRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ backgroundColor: COLOURS.gray, height: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 18, paddingLeft: 10 }}>My Request</Text>
                            <Ionicons name='chevron-forward-outline' style={{ fontSize: 20, color: COLOURS.primary, paddingRight: 10 }} />
                        </TouchableOpacity>
                       {
                           user.videographer ? (
                            <TouchableOpacity onPress={() => navigation.navigate(AppFlowRouteName.IncomingRequest)} style={{ backgroundColor: COLOURS.gray, height: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                                <Text style={{ fontSize: 18, paddingLeft: 10 }}>Incoming Request</Text>
                                <Ionicons name='chevron-forward-outline' style={{ fontSize: 20, color: COLOURS.primary, paddingRight: 10 }} />
                            </TouchableOpacity>
                           ) : null
                       }
                        <TouchableOpacity onPress={() => signOut()} style={{ backgroundColor: COLOURS.gray, height: 35, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 18, paddingLeft: 10, fontWeight: '600', color: COLOURS.primary }}>Logout</Text>
                            <Ionicons name='chevron-forward-outline' style={{ fontSize: 20, color: COLOURS.primary, paddingRight: 10 }} />
                        </TouchableOpacity>
                    </ScrollView>
                </>
            )}

        </View>
    )
}