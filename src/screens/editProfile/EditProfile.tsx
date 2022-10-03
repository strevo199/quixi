import React, {useEffect, useState, useContext} from 'react'
import { View, Text, ScrollView, Image, Modal, Dimensions, Alert } from 'react-native'
import { styles } from './EditProfile.style'
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
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';
import { BASE_URL } from '../../constants/APIs'
const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

interface ActivationProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}
export const EditProfile:React.FC <ActivationProps>= ({route, navigation}) => {
    const { user } = route.params;
    const { signOut } = useContext(AuthContext)
    const [token, setToken] = useState()
    const [loading, setLoading] = useState(false)
    const [avatars, setAvatars] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [profileAvatar, setProfileAvatar] = useState('')
    const [showAvatarPicker, setShowAvatarPicker] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [profile, setProfile] = useState(user);
    const [showPass, setShowPass] = useState(false)

    console.log(user)
    useEffect(() => {
        setTimeout(async() =>{
            let token;
            token = null;
            try {
               token = await AsyncStorage.getItem('token')
               if(token){
                setToken(token)
               }else(
                signOut()
               )
            } catch (error) {
                console.log(error)
            }
            getAvatars()
        },3000)
    }, [])

    useEffect(() => {
        handleRequest()
    }, [])

    const handleRequest = () => {
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          }
          console.log(headers)
        
          axios({
              method: 'get',
              url: BASE_URL+'/user/'+user._id,
              headers: headers
            }).then((res) => {
                setLoading(false)
                console.log("LOGIN HERE",res.data)
                if(res.data.success){
                    console.log('GOT API', res.data?.data)
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

    const handleEdit = () => {
        let data = {}
        if(profileAvatar){
            data.avatar = profileAvatar;
        }
        if(username){
            data.last_name = username;
        }
        //Alert.alert(JSON.stringify(data))
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          } 
          console.log(headers)       
          axios({
              method: 'patch',
              url: BASE_URL+'/accounts',
              data: data,
              headers: headers
            }).then((res) => {
                setLoading(false)
                if(res.data.success){
                    console.log('EDIT API', res.data?.data)
                    toastHandler('Profile successfully ddited')
                    navigation.goBack()
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

    const getAvatars = () => {
        const headers = {
            'Content-Type': 'application/json',
          }
          console.log(headers)
        
          axios({
              method: 'get',
              url: BASE_URL+'/avatars',
              headers: headers
            }).then((res) => {
                setLoading(false)
                console.log("LOGIN HERE",res.data)
                if(res.data.success){
                    console.log('GOT API', res.data?.data)
                    setAvatars(res.data?.data?.data) 
                    //setRequest(res.data/.data)
                  //navigation.navigate(AppFlowRouteName.Home)
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

    const savePassHandler = () => {
        if(password.length < 6){
            Alert.alert('Password can not be less that 6 characters')
        }else if(password !== confirmPassword){
            Alert.alert('Password does not march')
        }else{
            Toast.show('Password successfully changed !', Toast.SHORT);
            setShowPass(!showPass)
        }
        const body = {
            password_reset: password,
            phone: profile.phone
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          } 
          console.log(headers)       
          axios({
              method: 'patch',
              url: BASE_URL+'/accounts/password',
              data: body,
              headers: headers
            }).then((res) => {
                setLoading(false)
                if(res.data.success){
                    toastHandler('Password Successfully changed!')
                    setShowPass(!showPass)
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
                    <Ionicons name='close-outline' style={{fontSize: 32, color: COLOURS.white}} />
                </TouchableOpacity>
                <Text  style={styles.headerTitle}>Edit Profile</Text>
                <TouchableOpacity onPress={() => {
                    handleEdit()
                }}>
                    <Ionicons name='checkmark' style={{fontSize: 32, color: COLOURS.secondary}} />
                </TouchableOpacity>
            </View>
            <View style={{padding: 20, alignItems: 'center'}}> 
                <Image 
                    source={{ uri: profileAvatar ? profileAvatar : profile?.avatar }} 
                    style={{width: 80, height: 80, borderRadius: 100}}
                />
                <TouchableOpacity onPress={() => setShowAvatarPicker(!showAvatarPicker)} style={{paddingTop: 20}}>
                    <Text style={{color: COLOURS.secondary}}>Change profile avatar</Text>
                </TouchableOpacity>
            </View>
            <View style={{padding: 10}}>
                <View>
                    <Text style={{opacity: 0.5, color: COLOURS.white, marginBottom:10}}>Username</Text>
                    <TextInput value={username ? username : profile?.last_name} placeholder='Username' onChangeText={(text) => setUsername(text)} style={{fontSize:20, borderBottomColor: COLOURS.secondary, borderBottomWidth: 1, color:COLOURS.white}} />
                </View>
            </View>
            <View style={{alignItems: 'center', marginTop: 20}}>
                <TouchableOpacity onPress={() => setShowPass(!showPass)} style={{width:"50%", height: 40, backgroundColor: COLOURS.secondary, borderRadius: 10}}>
                    <Text style={{color: COLOURS.white, padding: 10}}>Change password</Text>
                </TouchableOpacity>
            </View>
            {showPass ? (
                    <>
                        <View style={{padding: 10}}>
                            <View>
                                <Text style={{opacity: 0.5, color: COLOURS.white, marginBottom:10}}>Password</Text>
                                <TextInput secureTextEntry value={password} placeholder='Password' onChangeText={(text) => setPassword(text)} style={{fontSize:20, borderBottomColor: COLOURS.secondary, borderBottomWidth: 1, color:COLOURS.white}} />
                            </View>
                        </View>
                        <View style={{padding: 10}}>
                            <View>
                                <Text style={{opacity: 0.5, color: COLOURS.white, marginBottom:10}}>Confirm Password</Text>
                                <TextInput secureTextEntry value={confirmPassword} placeholder='Confirm Password' onChangeText={(text) => setConfirmPassword(text)} style={{fontSize:20, borderBottomColor: COLOURS.secondary, borderBottomWidth: 1, color:COLOURS.white}} />
                            </View>
                        </View>
                        <View style={{alignItems: 'center', marginTop: 20}}>
                            <TouchableOpacity onPress={() => savePassHandler()} style={{width:"50%", height: 40, backgroundColor: COLOURS.secondary, borderRadius: 10}}>
                                <Text style={{color: COLOURS.white, padding: 10}}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ): null}
            {showAvatarPicker ? (
                <ScrollView style={{margin:20}}>
                <View style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap:'wrap'
                    }}>
                        {
                            
                            avatars.map((item, index) => (
                                <TouchableOpacity onPress={() => {
                                    setProfileAvatar(item.url)
                                    setShowAvatarPicker(!showAvatarPicker)
                                }}>
                                    <LazyImage
                                        source={{uri: item.url}}
                                        style={{height: 60, width: 60, borderRadius: 30, margin: 10}}
                                        resizeMode="cover"
                                    />
                        
                                </TouchableOpacity>
                            ))
                        }
                </View>
            </ScrollView>
            ) : null}
            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <Text>Avatars</Text>
                </View>
            </Modal> */}
        </View>
    )
}


