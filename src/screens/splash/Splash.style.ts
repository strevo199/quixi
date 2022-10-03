import { StyleSheet } from 'react-native';
import { COLOURS } from '../../theme';

export const styles = StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:COLOURS.primary,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:150,
        height:350,
        transform: [{ rotate: '90deg' },{ rotateZ: '3.1rad' }]
    }
});