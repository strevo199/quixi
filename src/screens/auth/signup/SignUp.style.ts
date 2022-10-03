import React from 'react'
import { StyleSheet} from 'react-native'
import { COLOURS, FONTS, SIZES } from '../../../theme'

export const styles = StyleSheet.create({
    signupContainer:{
        backgroundColor:COLOURS.primary,
        flex:1
    },
    signupcontent:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    signupHeader:{
        backgroundColor:COLOURS.primary,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    phoneContainer:{
        backgroundColor:COLOURS.primary,
        borderBottomColor:COLOURS.grey,
        borderBottomWidth:2,
        width:'100%',
        marginBottom:10,
        color: COLOURS.white
    },
    textInput:{
        backgroundColor:COLOURS.primary,
    },
    signupBody:{
        flex:2,  
        marginHorizontal:SIZES.h2
    },
    headerText:{
        fontWeight:'bold',
        color:COLOURS.white,
        letterSpacing:3
    },
    passwordInput:{
        color:COLOURS.white,
        height:SIZES.h1 * 1.8,
        borderBottomColor:COLOURS.grey,
        borderBottomWidth:2,
        paddingLeft: SIZES.h4
    },
    logo:{
        width:50,
        marginLeft:20,
        height:100,
        transform: [{ rotate: '90deg' },{ rotateZ: '3.1rad' }]
    },
    signupHeadertext:{
        color:COLOURS.white,
        fontWeight:'bold',
        marginTop:-SIZES.h2
    },
    signupBodyContent:{
        marginVertical:SIZES.largeTitle * 1.7
    },

    button:{
        backgroundColor:COLOURS.secondary,
        height:SIZES.largeTitle,
        borderRadius:SIZES.radius,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        color:COLOURS.white,
        textTransform:'uppercase',
        fontWeight:'bold',
        letterSpacing:1,
    }
})
