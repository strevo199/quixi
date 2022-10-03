import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './chatBox.style';
import { ChatBubble } from '../chatBubble';

export const   ChatBox = ({messages,scrollToBottom}) => {
  const ref = useRef(null);



useEffect(() => {
  scrollToBottom(ref)
}, [messages]);


  return (
    <View  style ={[styles.bodyContainer]}>
              <FlatList
              ref={ref}
            keyExtractor={(item): number => item.id}
            data={messages}
            renderItem={({item, index}) => {
                return (
                    <ChatBubble messages = {item} />
                )
            }} 
        >
        </FlatList>
    </View>
  );
}
  