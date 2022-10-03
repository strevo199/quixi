
import { StyleSheet} from 'react-native'
import { COLOURS, SIZES } from '../../theme'


export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLOURS.primary,
        justifyContent:'center',
        alignItems: 'center',
    },
    txtColor: {
        color: COLOURS.white
    },
    preview:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    cambottomBtnContainer:{
        width:SIZES.width,
        justifyContent:'space-around',
        flexDirection:'row',
        alignItems:'center',
        bottom:'20%'
    },
    camoverlayer:{
        justifyContent:'space-between', 
        flex:1,
    },
    cambtnStyle: {
        width:20,
        height:20
    },
    snapcam:{
        height:60,
        width:60,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'

        
    },
    camTopContainer: {
        height:50,
        justifyContent:'center',
        paddingRight:SIZES.h4,
        alignItems:'flex-end'    
    }

})