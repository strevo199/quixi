import React, {useEffect, useState, useContext} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './RequestDetail.style'
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
//import VideoPlayer from 'react-native-video-controls'
import { COLOURS } from '../../theme'
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../components'
import axios from 'axios';
import { AppFlowRouteName } from '../../navigation'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../constants/APIs'
import Toast from 'react-native-simple-toast';

interface ActivationProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}
export const RequestDetail:React.FC <ActivationProps>= ({route, navigation}) => {
    const { data } = route.params;
    const { signOut } = useContext(AuthContext)
    const [token, setToken] = useState()
    const [loading, setLoading] = useState(false)
    const [request, setRequest] = useState(data)


    console.log(data)
    useEffect(() => {
        setTimeout(async() =>{
            let token;
            token = null;
            try {
               token = await AsyncStorage.getItem('token')
               if(token){
                setToken(token)
                handleRequest(token)
               }else(
                signOut()
               )
            } catch (error) {
                console.log(error)
            }
        },3000)
    }, [])

    const handleRequest = token => {
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          }
          console.log(headers)
        
          axios({
              method: 'get',
              url: BASE_URL+'/request-contents/'+data._id,
              headers: headers
            }).then((res) => {
                setLoading(false)
                console.log("LOGIN HERE",res.data)
                if(res.data.success){
                    console.log('GOT API', res.data?.data)
                    setRequest(res.data.data)
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

    return (
        <View style={styles.mainPlayerView}>
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
                <Text  style={styles.headerTitle}>Request Details</Text>
                <TouchableOpacity onPress={() => {
                    navigation.navigate(AppFlowRouteName.ReplyContent, {request: data._id, owner: data?.user?._id})
                }}>
                    <Text style={{color: COLOURS.white, fontSize: 16}}>Reply</Text>
                </TouchableOpacity> 
            </View>
            {/* <View style={styles.header}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text  style={styles.headerTitle}>Request Details</Text>
                    <TouchableOpacity onPress={() => {navigation.goBack()}}>
                        <Text  style={styles.headerTitle}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
           <View style={styles.subTitle}>
                <Text  style={styles.subTitleTxt}>Instruction</Text>
               <Text style={styles.subTitleSmall}>{ request.description }</Text>
           </View>
           <View style={styles.subTitle}>
                <Text  style={styles.subTitleTxt}>Location</Text>
               <Text style={styles.subTitleSmall}>{ request.where_request }</Text>
           </View>
           <View>

           </View>
        </View>
    )
}


