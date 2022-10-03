import { Platform, StyleSheet} from 'react-native';
import React from 'react';
import { COLOURS, SIZES } from '../../theme';



export const styles = StyleSheet.create({
    container:{
        backgroundColor:COLOURS.primary,
        flex:1,
    },
    headerContainer: {
        height:'8%',
        marginTop: Platform.OS === 'ios' ? 40 : 5,
        backgroundColor: COLOURS.blurPrimary,
        alignItems: "center",
        borderWidth: 2,
        borderBottomColor: COLOURS.gray,
        justifyContent: 'center',
        width: '100%'
    },
    footer:{
        height:'10%',
        marginBottom: Platform.OS === 'ios' ? 20 : 5,
        flexDirection:'row',
        paddingLeft:10,
    },
    chatbody: {
        flex:1,
        paddingBottom:50,
        overflow:'scroll'
    },
    msgContainer: { 
        borderWidth: 2,
        borderRadius:10,
        marginRight:5,
        backgroundColor:COLOURS.blurPrimary,
        borderColor: COLOURS.grey,
        flex:1,
        padding:2,
        color:COLOURS.white
    }
    
  
    
});
