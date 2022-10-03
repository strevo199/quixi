
import { StyleSheet} from 'react-native'
import { COLOURS, SIZES } from '../../theme'


export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLOURS.primary,
        justifyContent:'center',
        paddingHorizontal:SIZES.h4
    },
    previewImage:{
        flex:1,
        backgroundColor:COLOURS.primary
    },
    previewContent:{
        flex:2,
        justifyContent:'space-around'
        
    }, descContainer:{
        backgroundColor:COLOURS.primary,
        borderColor:COLOURS.secondary,
        borderWidth:1,
        width: '100%',
        height: 100,
        borderRadius: 10,
        color: COLOURS.white,
        fontSize: 16,
        padding: 10,
        marginTop: 20,
        textAlignVertical: 'top'
    },
    titleContainer:{
        backgroundColor:COLOURS.primary,
        borderColor:COLOURS.secondary,
        borderWidth:1,
        width: '100%',
        borderRadius: 10, 
        color: COLOURS.white,
        fontSize: 16,
        padding: 10,
        marginTop: 20,
        textAlignVertical: 'top'
    },
    button:{
        backgroundColor:COLOURS.secondary,
        height:SIZES.h1,
        borderRadius:SIZES.radius,
        justifyContent:'space-around',
        alignItems:'center',
        width:SIZES.width/4,
        flexDirection:'row'
    },
    buttonText:{
        color:COLOURS.white,
        textTransform:'uppercase',
        fontWeight:'bold',
        letterSpacing:1,
    },
    previewContentForm: {
        justifyContent:'space-between'
    },
    video: {
        width:'100%',
        height:'100%',
    }
})