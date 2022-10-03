// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import {

//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Platform
// } from 'react-native';
// import Animated from 'react-native-reanimated';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { GiftedChat } from 'react-native-gifted-chat'
// import { COLOURS } from '../../theme';
// import io from 'socket.io-client/dist/socket.io';
// import { BASE_URL, SOCKET_URL } from '../../constants/APIs';
// import AsyncStorage from '@react-native-community/async-storage';
// import axios from 'axios';


// export const Conservation = ({ animatedStyle }) => {

  


//   const navigation = useNavigation()
//   const route = useRoute();
//   const [loading , setLoading] = useState(false)
//   const socket = useRef(null)
//   const [messages, setMessages] = useState([]);  
//   const [me,setMe] = useState(null);
//   const [arrvialMessages,setArrvialMessages] = useState(null);
//   const [receiver] = useState(route.params?.receiver);
//   const [meId] = useState(route.params?.meId);



  


//   const loadPChats = async () => {
//     let token = null
//     try {
//         token = await AsyncStorage.getItem('token')


//     } catch (error) {
//         console.log('-------eer1', error);
//     }

    
//     const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer '+token
//       }

//     setLoading(true)
//     axios({
//         method: 'GET',
//         url: `${BASE_URL}/chat-messages/chats/${receiver._id}`,
//         headers: headers
//     })
//     .then(async (data) => {
//         setLoading(false)
//         if (data) {                
//        console.log('---------------------------',data.data);
//        const lala  = data.data.data.data.map(item => {
//       //  console.log('lala----------------',item)

//         return  ({
//           _id: item._id,// receiver id
//           text:item.chat_message.message,
//           createdAt: item.chat_message.created_at,
//           user: {
//             _id: item.chat_message.sender,  // sender id
//             // name: name,
//             // avatar: image_path,
//           },

 




import { View, Text, TouchableOpacity, Platform, Image, TextInput, FlatList } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { styles } from './Conservation.style'
import { COLOURS } from '../../theme'
import io from 'socket.io-client/dist/socket.io';
import uuid from 'react-native-uuid';
import {SOCKET_URL } from '../../constants/APIs';
import AsyncStorage from '@react-native-community/async-storage';
import Animated from 'react-native-reanimated'
import { useNavigation, useRoute } from '@react-navigation/native';
import { baselineSend } from '../../constants'
import { ChatBubble } from '../../components/chatBubble/ChatBubble'

export const Conservation = () => {
  const navigation = useNavigation()
  const route = useRoute();
  const [receiver] = useState(route.params?.receiver);
    const [meId] = useState(route.params?.meId);
    const [msg, setMsg] = useState('')
    const [me,setMe] = useState(null);
    const [messages, setmessages] = useState([])
    const chatList = useRef(null)
    const socket = useRef(null)


    const scrollToBottom = () => {
        setTimeout(() => {
          chatList.current.scrollToEnd({animated:true})
        }, 100);
    }
    
    useEffect(() => {
      socket.current  = io(SOCKET_URL)
    }, [])
    






    useEffect(() => {
      scrollToBottom()
    }, [messages])
    const  socketFix = async () =>{
          try {
            const   value = await AsyncStorage.getItem('user')          
              setMe(value)
             } catch (error) {
                 console.log('-------eer1',error);
             }
             
          
       
         
             if (me !== null) {
           console.log('userrrrrrrrrrrrr--------',me);
          console.log('Start'); 
          
           socket.current.connect();
           socket.current.on('connected', (msg) => {
            console.log('called',msg);
      
          });
           socket.current.emit('register',{user:JSON.parse(me)})
           socket.current.on('chat', (data) => {
            console.log('-----------------clnsdcuscksc',data.message)
        //     if (data.data) {
        //       var sentMessages = { 
        //         _id: dat a.data.receiver,
        //         text: data.message.message,
        //         createdAt: new Date(data.message.time_created * 1000),
        //         user: {
        //           _id: data.data.senderId,
        //           // name: name,
        //           // avatar: image_path,
        //         },
        //       }
              // setMessages(previousMessages => GiftedChat.append(previousMessages, sentMessages))
              
        //     }
          })   
         }
        }

        useEffect(() => {
          
          socketFix()
          socket.current.disconnect()
        }, [me])
        
    useEffect(() => {
      
    
     setmessages([
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'61fad06a1325ce5fbfb7d770',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'61fad06a1325ce5fbfb7d770',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'61fad06a1325ce5fbfb7d770',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'61fad06a1325ce5fbfb7d770',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'61fad06a1325ce5fbfb7d770',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'61fad06a1325ce5fbfb7d770',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'61fad06a1325ce5fbfb7d770',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'61fad06a1325ce5fbfb7d770',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
       {
         text:'is simply dummy text of the printing and typesetting industry',
         user:'620b06755ea64c1e189e845b',
         avatar:'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg',
         create_at:Date.now()
       },
     ]) 
    }, [])
    
  const onSend = useCallback(() => {
    
    let message = {
      text:msg,
      create_at:Date.now(),
      user:meId,
      receiver:receiver._id,
    } 
    
    
    let obj = {
      user: meId,
      receiver: receiver._id,
      message:msg,
      uid:uuid.v4()
    }
      socket.current.emit('chat',obj )
    setmessages(Prevmessages => [...Prevmessages,message])
  }, [msg])

  return (
    <Animated.View style ={styles.container}>
     
     <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 10,
            borderColor: COLOURS.blue,
            borderWidth: 1,
            padding: 7,
            borderRadius: 10
          }}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: 'bold',
              color: COLOURS.white,
            }}
          >{`Back`}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection:'row', alignItems:'center' }}>
          <Image
            style={{
              height: 30,
              width: 30,
              borderRadius: Platform.OS === 'android' ? 50 : 30,
              borderColor: '#ddd',
              marginRight: 10
            }}
            source={{ uri: receiver?.avatar ?  receiver?.avatar : 'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg' }}
            resizeMode='contain'
          />
          <Text style={{
            fontSize: 15,
            color: COLOURS.white
          }}>{receiver.last_name}</Text>
        </View>
      </View>
      <View style = {styles.chatbody}>
      <FlatList
            ref={chatList}
            keyExtractor={(item): any => item.id}
            data={messages}
            renderItem={({item, index}) => {
                
                return (
                  <React.Fragment>
                    <ChatBubble item ={item} meId ={meId} />                    
                  </React.Fragment>
                            
                   
                ) 
            }} 
        >
        </FlatList>

      </View>
      <View style ={styles.footer}>
      <TextInput
            multiline
            placeholder="Description:"
            placeholderTextColor={COLOURS.grey}
            style={[styles.msgContainer]}
            onChangeText={(val) => setMsg(val)}
            onFocus = {scrollToBottom}
          />
          <TouchableOpacity
            onPress={onSend}
          >
          <Image
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLOURS.white
            }}
            source={baselineSend}
          />
          </TouchableOpacity>
      </View> 
    </Animated.View>
  )
}

