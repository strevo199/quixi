import React from 'react'
import { StyleSheet } from 'react-native'
import { COLOURS, SIZES } from '../../theme/Theme'



export const styles = StyleSheet.create({
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
