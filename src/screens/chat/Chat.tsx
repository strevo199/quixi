import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Image, useWindowDimensions, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { styles } from './Chat.style'
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLOURS, SIZES } from '../../theme'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {Images, dummyData, messages} from './data'
import { LazyImage } from '../../components'
import { AppFlowRouteName } from '../../navigation'
import { useNavigation } from '@react-navigation/native'; 
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../components'
import axios from 'axios';
import { RequestList } from './RequestList';
import { BASE_URL } from '../../constants/APIs';


const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width


const SecondRoute = ({navigation,chatsList}) => { 
    console.log('-------chatsList lala',chatsList);


      return(
    chatsList.length ?
    <View style={{ flex: 1, backgroundColor: COLOURS.primary }} >
        <FlatList
            keyExtractor={(item): any => item.id}
            data={chatsList}
            renderItem={({item, index}) => {
                // console.log('-------chatsList lalal',item);
                
                return (
                    <View style={{
                        marginTop: 20,
                        marginBottom: 20,
                        width: Width,
                        flexDirection:'row', 
                        justifyContent: 'space-between'
                    }}>
                        <TouchableOpacity
                            onPress={ () =>{
                                navigation.navigate(AppFlowRouteName.Conservation,{
                                    receiver: item.contact,
                                    meId: item.sender._id
                                })
                            }}

                            style={{
                                flexDirection:'row', justifyContent: 'flex-start',
                            }}>
                                
                                <Image
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 55,
                                        borderWidth: 0.5,
                                        borderColor: '#ddd',
                                        marginRight: 10
                                    }}
                                    source={{ uri: item.contact.avatar }}
                                    resizeMode='contain'
                                />
                                <View>
                                    <Text style={{color: COLOURS.white, fontSize: 14, fontWeight:'500'}}>{item.contact.last_name}</Text>
                                    {/* <Text style={{color: COLOURS.white, fontSize: 12, flexWrap: 'wrap'}}>{item.message.substring(0, 50)+'...'}</Text> */}
                                </View>
                            </TouchableOpacity>
                            
                            <FontAwesome name='camera' size={25} color={COLOURS.white} />
                    </View>
                ) 
            }} 
        >
        </FlatList>
    </View>: (null)
    )
    }
; 

const ThirdRoute = () => (
    <ScrollView>
        <View style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            flexWrap:'wrap'
            }}>
                {
                    
                    Images.map((image, index) => (
                        <TouchableOpacity onPress={() => {}}>
                            <LazyImage
                                source={{uri: image}}
                                style={{height: Height/5, width: Width / 3 - 6, borderRadius: 10, margin: 2}}
                                resizeMode="cover"
                            />
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
);

const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: COLOURS.white }}
      style={{ backgroundColor: COLOURS.primary }}
    />
  );



interface ActivationProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}
export const Chat:React.FC <ActivationProps>= (props) => {
    const layout = useWindowDimensions();
    const [loading , setLoading] = useState(false)
    const [chatsList, setChatsList] = useState([])

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Request' },
        { key: 'second', title: 'Community' },
        { key: 'third', title: 'All' },
    ]);    
    const loadChats = async () => {
        let token = null
        try {
            token = await AsyncStorage.getItem('token')


        } catch (error) {
            console.log('-------eer1', error);
        }

        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          }

        setLoading(true)
        axios({
            method: 'GET',
            url: `${BASE_URL}/chats`,
            headers: headers
        })
        .then(async (data) => {
            setLoading(false)
            if (data.data.success) {                
            setChatsList(data.data.data.data) 
            
        } 
            
        }).catch(err => {
            setLoading(false) 
            console.log('-------chatsError er',err.response.data.message);
            
        })
    }


    
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <RequestList {...props} />;
                case 'second':
                    return <SecondRoute {...props} chatsList ={chatsList}/>;
                    case 'third':
                        return <ThirdRoute  />;
                        default:
                            return null;
                        }
                    };
                    
    
    useEffect( () => {
        
        loadChats();
    }, [])

    return (
        <View style ={[styles.constainer]}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                marginTop: 32
            }}>
                <TouchableOpacity>
                    
                </TouchableOpacity>
                <Text  style={styles.headerTitle}>Chat</Text>
                <TouchableOpacity onPress={() => {}}>
                    {/* <Ionicons name='checkmark' style={{fontSize: 32, color: COLOURS.secondary}} /> */}
                </TouchableOpacity>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
                sceneContainerStyle={{backgroundColor: COLOURS.primary}}
                initialLayout={{ width: layout.width }}

            />
        </View>
    )
}