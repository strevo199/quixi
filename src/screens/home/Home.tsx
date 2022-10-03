import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, Image, Platform, ActivityIndicator } from 'react-native'
import { styles } from './Home.style'
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
//import VideoPlayer from 'react-native-video-controls'
import { COLOURS, SIZES } from '../../theme'
import { LazyImage } from '../../components'
import { showMessage } from 'react-native-flash-message'
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { Thumbnail } from 'react-native-thumbnail-video';
import Video from 'react-native-video';
import { BASE_URL } from '../../constants/APIs'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../components'

const dummyData = [
    {
        id: 1,
        title: 'Sunset in Santa Monica',
        name: 'Video 1',
        img: 'https://media.istockphoto.com/photos/trail-runners-ascend-high-mountain-ridge-picture-id1257851030?b=1&k=20&m=1257851030&s=170667a&w=0&h=IReSSKiIEfjiDDjiNqLAdjinufzCoDaWQw67Z-wfuWY=',
        desc: 'Sunset in Santa Monica Sunset in Santa Monica Sunset in Santa Monica Sunset in Santa Monica',
        thumbnail: 'https://i.pinimg.com/originals/53/fe/f4/53fef4bf64313be53c0f352687676666.jpg',
        media_type: 'video',
        user: {
            avatar: 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
            username: 'JKST023'
        },
        video: {
            url: 'https://quixi-assets.s3.amazonaws.com/200/61df109672b55ba0356296c0_1642116624629.mp4'
        },
        images: [
            {img: 'https://thumbs.dreamstime.com/b/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg'},
            {img: 'https://vietnaminsider.vn/wp-content/uploads/2019/07/dsc04863-1562049466991278800048-1562142033.jpg'}
        ]
    },
    {
        id: 2,
        title: 'Sunset in Santa Monica',
        name: 'Video 2',
        desc: 'Sunset in Santa Monica Sunset in Santa Monica Sunset in Santa Monica Sunset in Santa Monica',
        img: 'https://thumbs.dreamstime.com/b/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg',
        media_type: 'image',
        user: {
            avatar: 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
            username: 'JKST023'
        },
        video: {
            url: ''
        },
        images: [
            {img: 'https://thumbs.dreamstime.com/b/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg'},
            {img: 'https://vietnaminsider.vn/wp-content/uploads/2019/07/dsc04863-1562049466991278800048-1562142033.jpg'}
        ]
    },
    {
        id: 3,
        title: 'Sunset in Santa Monica',
        name: 'Video 3',
        desc: 'Sunset in Santa Monica Sunset in Santa Monica Sunset in Santa Monica Sunset in Santa Monica',
        img: 'https://cdn.cnn.com/cnnnext/dam/assets/180328101426-azerai-hotel-can-tho---floating-market---beautiful-vietnam.jpg',
        media_type: 'video',
        user: {
            avatar: 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
            username: 'JKST023'
        },
        video: {
            url: 'https://quixi-assets.s3.amazonaws.com/200/61df109672b55ba0356296c0_1642116624629.mp4'
        },
        images: [
            {img: 'https://thumbs.dreamstime.com/b/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg'},
            {img: 'https://vietnaminsider.vn/wp-content/uploads/2019/07/dsc04863-1562049466991278800048-1562142033.jpg'}
        ]
    },
    {
        id: 4,
        title: 'Dubai desert',
        name: 'Video 4',
        desc: 'Sunset in Santa Monica Sunset in Santa Monica Sunset in Santa Monica Sunset in Santa Monica',
        img: 'https://vietnaminsider.vn/wp-content/uploads/2019/07/dsc04863-1562049466991278800048-1562142033.jpg',
        media_type: 'image',
        user: {
            avatar: 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
            username: 'JKST023'
        },
        video: {
            url: ''
        },
        images: [
            {img: 'https://thumbs.dreamstime.com/b/happy-travel-woman-vacation-concept-funny-traveler-enjoy-her-trip-ready-to-adventure-happy-travel-woman-vacation-concept-118679424.jpg'},
            {img: 'https://vietnaminsider.vn/wp-content/uploads/2019/07/dsc04863-1562049466991278800048-1562142033.jpg'}
        ]
    },
]


interface ActivationProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}
export const Home:React.FC <ActivationProps>= ({navigation}) => {
    const [contents, setContents] = useState([])
    const [contentsViews, setContentsViews] = useState([])
    const [contentsRecent, setContentsRecent] = useState([])
    const { signOut } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState('');
    const [device, setDevice] = useState({});
    const [user, setUser] = useState({});


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setTimeout(async() =>{
                try {
                   let newToken = await AsyncStorage.getItem('token')
                   let newUserObj = await AsyncStorage.getItem('user')
                   let newDeviceInfoObj = await AsyncStorage.getItem('deviceInfo')
                   let newUser = JSON.parse(newUserObj);
                   let newDeviceInfo = JSON.parse(newDeviceInfoObj);
                   console.log("TOKEN",newToken)
                   if(newToken){
                    setToken(newToken)
                   }
                   if(newUser){
                    setUser(newUser)
                    setDevice(newDeviceInfo)
                    getContents(newToken, newUser,newDeviceInfo )
                    getContentsViews(newToken)
                    getContentsRecent(newToken )
                   }
                } catch (error) {
                    console.log(error)
                }
            },3000)
          });
          return unsubscribe;
    }, [navigation])


    const getContents = (passToken, newUser, newDeviceInfo,) => {
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+passToken,
            'x-device-id': newDeviceInfo.deviceId,
            'app-id':  newDeviceInfo.appVersion,
            'x-os': newDeviceInfo.os,
            'x-version-code': newDeviceInfo.version,
            'x-fcm': newDeviceInfo.fcm,
            'x-platform-id': newDeviceInfo.platformId
          }
          console.log("HEADERS",headers)
        
          axios({
              method: 'get',
              url: BASE_URL+'/contents',
              headers: headers
            }).then((res) => {
                setLoading(false)
                if(res.data.success){
                    setContents(res.data?.data.data)
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

    const getContentsViews = (passToken) => {
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+passToken,
          }        
          axios({
              method: 'get',
              url: BASE_URL+'/contents/most/viewed',
              headers: headers
            }).then((res) => {
                setLoading(false)
                if(res.data.success){
                    setContentsViews(res.data?.data.data)
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

    const getContentsRecent = (passToken) => {
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+passToken,
          }        
          axios({
              method: 'get',
              url: BASE_URL+'/contents/most/recent',
              headers: headers
            }).then((res) => {
                setLoading(false)
                if(res.data.success){
                    setContentsRecent(res.data?.data.data)
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

    return (
        <View style={styles.mainPlayerView}>
            {/* <View style={styles.videoView}>
                <VideoPlayer
                    source={{uri: 'https://quixi-assets.s3.amazonaws.com/500/61df109672b55ba0356296c0_1642117892556.mp4'}}
                    style={styles.video}
                />
            </View> */}
                <View style={styles.header}>
                        <Text  style={styles.headerTitle}>Browse</Text>
                </View>
            <View>

                    {loading ? (<ActivityIndicator color={COLOURS.red}/>) : (
                        <FlatList
                        keyExtractor={(item): number => item._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={contents}
                        renderItem={({item, index}) => {
                            return (
                                
                                <View style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                    marginLeft: index === 0 ? 25 : 0,
                                    marginRight: index === contents.length - 8 ? 0 : 10
                                }}>
                                    <View style={{
                                        marginBottom: 20,
    
                                }}>
                                        <Text style={{color: COLOURS.white}}>{item.title}</Text>
                                        <Text style={{color: COLOURS.white, fontSize: 10}}>{item?.description?.substring(0, 35)+'...'}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('View Media', {post:item})
                                        }}
                                        style={{
                                            width: 200,
                                            height: 120,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 20
                                        }}>
                                            {item.media_type == 'video' ? (
                                                <Video paused={true} source={{uri: item?.url}} style={[styles.bigImage, {marginBottom: 10}]}
                                                resizeMode="cover"/>
                                            ) : (
                                                <LazyImage
                                                    source={{uri: item?.url ? item?.url : 'https://vietnaminsider.vn/wp-content/uploads/2019/07/dsc04863-1562049466991278800048-1562142033.jpg'}}
                                                    style={[styles.bigImage, {marginBottom: 10}]}
                                                    resizeMode="cover"
                                                />
                                            )}
                                            
                                        </TouchableOpacity>
                                        <View style={{flexDirection:'row', justifyContent: 'flex-start', marginTop: 3}}>
                                            <Image
                                                style={{
                                                    height: 15,
                                                    width: 15,
                                                    borderRadius: Platform.OS === 'android' ? 50 : 7.5,
                                            
                                                    marginRight: 10
                                                }}
                                                source={{ uri: item?.user?.avatar ? item?.user?.avatar : 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg' }}
                                                resizeMode='contain'
                                            />
                                            <Text style={{color: COLOURS.white, fontSize: 10}}>{item?.user?.last_name}</Text>

                                        </View>

                                </View>
                            )
                        }} 
                    >
                    </FlatList>
                    )}
                </View>
            <ScrollView>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.subHeader]}>Trending Videos</Text>
                    <Text style={[styles.subHeaderSmall]}>See all</Text>
                </View>
                <View >
                <FlatList
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={contentsViews}
                        renderItem={({item, index}) => {
                            return (
                                <View style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                    marginLeft: index === 0 ? 25 : 0,
                                    marginRight: index === dummyData.length - 1 ? 0 : 10
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('View Media', {post:item})
                                        }}
                                        style={{
                                            width: 160,
                                            height: 100,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 20
                                        }}>
                                             {item.media_type == 'video' ? (
                                                <Video paused={true} source={{uri: item?.url}} 
                                                style={[styles.bigImage, {marginBottom: 10}]}
                                                resizeMode="cover"/>
                                            ) : (
                                                <LazyImage
                                                    source={{uri: item.url}}
                                                    style={[styles.bigImage, {marginBottom: 10}]}
                                                    resizeMode="cover"
                                                />
                                            )}
                                            
                                        </TouchableOpacity>
                                        <View style={{flexDirection:'row', justifyContent: 'flex-start', marginTop: 3}}>
                                            <Image
                                                style={{
                                                    height: 15,
                                                    width: 15,
                                                    borderRadius: Platform.OS === 'android' ? 50 : 7.5,
                                            
                                                    marginRight: 10
                                                }}
                                                source={{ uri: item?.user?.avatar ? item?.user?.avatar : 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg' }}
                                                resizeMode='contain'
                                            />
                                            <Text style={{color: COLOURS.white, fontSize: 10}}>{item?.user?.last_name}</Text>

                                        </View>

                                </View>
                            )
                        }} 
                    >

                    </FlatList>
                </View>

                {/* second */}
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.subHeader]}>Recent Videos</Text>
                    <Text style={[styles.subHeaderSmall]}>See all</Text>
                </View>
                <View>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={contentsRecent}
                        renderItem={({item, index}) => {
                            return (
                                <View style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                    marginLeft: index === 0 ? 25 : 0,
                                    marginRight: index === dummyData.length - 1 ? 0 : 10
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.navigate('View Media', {post:item})
                                        }}
                                        style={{
                                            width: 160,
                                            height: 100,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 20
                                        }}>
                                             {item.media_type == 'video' ? (
                                                <Video paused={true} source={{uri: item?.url}} 
                                                style={[styles.bigImage, {marginBottom: 10}]}
                                                resizeMode="cover"/>
                                            ) : (
                                                <LazyImage
                                                    source={{uri: item.url}}
                                                    style={[styles.bigImage, {marginBottom: 10}]}
                                                    resizeMode="cover"
                                                />
                                            )}
                                            
                                        </TouchableOpacity>
                                        <View style={{flexDirection:'row', justifyContent: 'flex-start', marginTop: 3}}>
                                            <Image
                                                style={{
                                                    height: 15,
                                                    width: 15,
                                                    borderRadius: Platform.OS === 'android' ? 50 : 7.5,
                                            
                                                    marginRight: 10
                                                }}
                                                source={{ uri: item?.user?.avatar ? item?.user?.avatar : 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg' }}
                                                resizeMode='contain'
                                            />
                                            <Text style={{color: COLOURS.white, fontSize: 10}}>{item?.user?.last_name}</Text>

                                        </View>

                                </View>
                            )
                        }} 
                    >

                    </FlatList>
                </View>
            </ScrollView>
        </View>
    )
}


