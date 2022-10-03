import React, {useEffect, useState, useContext } from 'react'
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl, Dimensions } from 'react-native'
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
import Video from 'react-native-video';
import { BASE_URL } from '../../constants/APIs'
import Toast from 'react-native-simple-toast';

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

interface RequestListProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}
export const RequestList:React.FC <RequestListProps>= ({route, navigation}) => {
    const { signOut } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = React.useState(false);
    const [contents, setContents] = useState([])
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
              url: BASE_URL+'/contents/my/requests',
              headers: headers
            }).then((res) => {
                setLoading(false)
                console.log("LOGIN HERE",res.data)
                if(res.data.success){
                    console.log('GOT API', res.data.data)
                    setContents(res.data?.data?.data)
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
        <ScrollView refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            />
        }>
            <View style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap:'wrap'
                    }}>
                        {
                            
                            contents?.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => { navigation.navigate('View Media', {post:item})}}>
                                    {item.media_type == 'video' ? (
                                            <Video paused={true} source={{uri: item?.url}} 
                                            style={{height: Height/5, width: Width / 3 - 6, borderRadius: 10, margin: 2}}
                                            resizeMode="cover"/>
                                        ) : (
                                            <LazyImage
                                                source={{uri: item?.url ? item?.url : 'https://vietnaminsider.vn/wp-content/uploads/2019/07/dsc04863-1562049466991278800048-1562142033.jpg'}}
                                                style={{height: Height/5, width: Width / 3 - 6, borderRadius: 10, margin: 2}}
                                                resizeMode="cover"
                                            />
                                        )}
                
                                    <View style={{
                                        height: 30,
                                        width: 30,
                                        borderRadius: 15,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                        position: 'absolute',
                                        margin: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{fontSize: 10, color: COLOURS.white}}>Dec</Text>
                                        <Text style={{fontSize: 10, color: COLOURS.white}}>10</Text>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                </View>
        </ScrollView>
    )
}


