import React, {useEffect, useState, useContext } from 'react'
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
//import VideoPlayer from 'react-native-video-controls'
import { COLOURS, SIZES } from '../../theme'
import { LazyImage } from '../../components'
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../components'
import axios from 'axios';
import { AppFlowRouteName } from '../../navigation'
import { showMessage } from 'react-native-flash-message'
import { styles } from './IncomingRequest.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../../constants/APIs'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}


interface ActivationProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}
export const IncomingRequest:React.FC <ActivationProps>= ({route, navigation}) => {
    const { signOut } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = React.useState(false);
    const [requests, setRequests] = useState([])
    const [token, setToken] = useState(null);

    const onRefresh = React.useCallback(() => {
        apiWithToken()
        setRefreshing(true);
        setLoading(true);
        wait(2000).then(() => {
            setRefreshing(false)
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        apiWithToken()
    }, [])

    const apiWithToken =  async () => {
        let tokenData;
            tokenData = null;
            try {
                tokenData = await AsyncStorage.getItem('token')
               if(tokenData){
                   console.log(tokenData)
                   setToken(tokenData)
                   handleRequest(tokenData)
                //setToken(token)
               }else(
                signOut()
               )
            } catch (error) {
                console.log(error)
            }
    }

    // useEffect(() => {
    //     setTimeout(async() =>{
    //         handleRequest()
    //     },5000)
    // }, [])

    const handleRequest = (apiToken) => {
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+apiToken
          }
          console.log(headers)
        
          axios({
              method: 'get',
              url: BASE_URL+'/request-contents',
              headers: headers
            }).then((res) => {
                setLoading(false)
                console.log("LOGIN HERE",res.data)
                if(res.data.success){
                    console.log('GOT API', res.data.data)
                    setRequests(res.data?.data?.data)
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

    if (loading) return <View><ActivityIndicator color={COLOURS.red}/></View>

    return (
        <View style={styles.main}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                marginTop: 32
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back' style={{fontSize: 32, color: COLOURS.white}} />
                </TouchableOpacity>
                <Text  style={styles.headerTitle}>Incoming Requests</Text>
                <TouchableOpacity onPress={() => {}}>
                </TouchableOpacity>
            </View>
            <ScrollView  refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                />
            }>
            <View style={{ 
                flex: 1,
                marginTop: 20
                }}>
                    { 
                        requests.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => { navigation.navigate(AppFlowRouteName.RequestDetail, {data: item})}}>
                                <View style={{flexDirection:'row', justifyContent: 'flex-start', marginTop: 20, marginBottom: 10}}>
                                    <Image
                                        style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: 20,
                                            borderWidth: 0.5,
                                            borderColor: '#ddd',
                                            marginRight: 10
                                        }}
                                        source={{ uri: item?.user?.avatar ? item?.user?.avatar : 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg' }}
                                        resizeMode='contain'
                                    />
                                    <View>
                                        <Text style={{color: COLOURS.white, fontSize: 12, textTransform: 'uppercase'}}>{item?.user?.last_name}</Text>
                                        <Text style={{color: COLOURS.white, fontSize: 14}}>{item.title}</Text>
                                    </View>

                                </View>
                            </TouchableOpacity>
                        ))
                    }
            </View>
        </ScrollView>
        </View>
       
    )
}


