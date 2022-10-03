import React from 'react'
import { StyleSheet} from 'react-native'
import { COLOURS, SIZES } from '../../../theme'

export const styles = StyleSheet.create({
    activation:{
        backgroundColor:COLOURS.primary,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: SIZES.h1 *1.7,
      height: SIZES.h1 *1.7,
      lineHeight:SIZES.h1 * 1.7,
      fontSize: SIZES.h2,
      color:COLOURS.white,
      borderWidth: 2,
      borderRadius: 10,
      marginHorizontal:2,
      borderColor: COLOURS.secondary,
      textAlign: 'center',
    },
    focusCell: {
      borderColor: COLOURS.white,
      
    },
    verifyButton: {
      height: 50,
      width:SIZES.h1 *3,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      // marginBottom: 50,
    },
    verify:{

    }
 })

 