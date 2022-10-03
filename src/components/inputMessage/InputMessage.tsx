import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import { COLOURS } from '../../theme';
import { styles } from './inputMessage.style';
import React, { useRef, useState } from 'react';
import {person} from '../../constants'
import { baselineSend } from '../../constants';

export const   InputMessage:React.FC <{ handleSendMsg}>= ({ handleSendMsg}) => {
    const [msg, setmsg] = useState('');

  return (
    <View style={[styles.footerContainer]}>
      <TextInput
        multiline
        placeholder="Description:"
        placeholderTextColor={COLOURS.white}
        style={[styles.msgContainer]}
        onChangeText={(val) => setmsg(val)}
      />
      <TouchableOpacity
        style ={{justifyContent:'center'}}
        onPress ={() =>handleSendMsg(msg)}
      >
        <Image
          style={{
            tintColor: COLOURS.white,
            height: 22,
            width: 25,
          }}
          source={baselineSend} 
        />
      </TouchableOpacity>
    </View>
  );
}
