import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import { styles } from './MyContents.style';
import { Logo } from '../../constants/Images';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '@react-navigation/native';
import { AppFlowRouteName } from '../../navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOURS, SIZES } from '../../theme'
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../components'
import { showMessage } from 'react-native-flash-message'
import axios from 'axios';
import { LazyImage } from '../../components'
import Video from 'react-native-video';
import { BASE_URL } from '../../constants/APIs'
import Toast from 'react-native-simple-toast';

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

interface RelatedContentsProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>,
}

export const MyContents: React.FC<RelatedContentsProps>  = ({route, navigation}) => {
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState()
    const [refreshing, setRefreshing] = React.useState(false);
    const { signOut } = useContext(AuthContext)
    const [contents, setContents] = useState([])
    
    const onRefresh = React.useCallback(() => {
        handleSearch(token)
        setRefreshing(true);
        setLoading(true);
        wait(2000).then(() => {
            setRefreshing(false)
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setTimeout(async() =>{
            let tok;
            tok = null;
            try {
               tok = await AsyncStorage.getItem('token')
               if(tok){
                setToken(tok)
                handleSearch(tok)
               }else(
                signOut()
               )
            } catch (error) {
                console.log(error)
            }
        },3000)
    }, [])


    const handleSearch = (tokening) => {
        setLoading(true)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+tokening
          }
        
          axios({
              method: 'get',
              url: BASE_URL+'/contents/user/list',
              headers: headers
            }).then((res) => {
                setLoading(false)
                console.log("LOGIN HERE",res.data)
                if(res.data.success){
                    console.log('GOT API', res.data?.data)
                    setContents(res.data?.data.data)
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
        <View style ={[styles.main]}>
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
                <Text  style={styles.headerTitle}>My Contents</Text>
                <TouchableOpacity onPress={() => {}}>
                    {/* <Ionicons name='checkmark' style={{fontSize: 32, color: COLOURS.secondary}} /> */}
                </TouchableOpacity>
            </View>
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
        </View>
    )
}