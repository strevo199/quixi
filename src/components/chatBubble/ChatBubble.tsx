import { View, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import {styles} from './chatBubble.style'
import { COLOURS, SIZES } from '../../theme';
import AsyncStorage from '@react-native-community/async-storage';
import {person} from '../../constants'

export const  ChatBubble:React.FC <{item:{},meId: string}> = ({item,meId}) => {


  
  
  return (
    <View>
      <View  style ={item?.user === meId ?[styles.ownmessage]:[styles.message] }>
        <Image
        style ={{
          width:32,
          height:32,
         
          borderRadius:50
        }}
          source={{uri :'https://www.beautifulhomes.com/content/dam/beautifulhomes/images/user-image-icon-11.jpg'}}
        />
        <Text  style ={item?.user === meId ?[styles.ownmessageText]:[styles.messageText] }>{item.text}</Text>
      </View>
      <View> 
        <Text  style ={item?.user === meId ?[styles.ownmessageBottom]:[styles.messageBottom] }>{item.create_at}</Text>
      </View>
    </View>
  );
}
