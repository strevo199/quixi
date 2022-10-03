
import { StyleSheet} from 'react-native'
import { COLOURS,SIZES } from '../../theme'


export const styles = StyleSheet.create({
    container:{
        paddingHorizontal:SIZES.h4,
        flex:1,
        backgroundColor:COLOURS.primary,
    },
    txtColor: {
        color: COLOURS.white
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
    }, 
    contentContainer: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1, 
        borderBottomColor: COLOURS.secondary
    },
    cardContainer:{
        resizeMode: 'stretch',
        height: 200, 
        width: '100%', 
        borderRadius:SIZES.radius,
        padding:SIZES.h4,
        backgroundColor:COLOURS.blueSky,
    },
    cardContent_1:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        flex:1
    },
    cardContent_2:{
        flex:1,
        // alignItems:'flex-end',
    },
    cardContent_3:{
        flexDirection:'row',
        alignItems:'center',
        flex:1
    },
    cardContent_4:{
        flexDirection:'row',
        alignItems:'stretch',
        flex:1
    },
    logoName:{
        color:COLOURS.white,
        fontWeight:'bold',
        fontSize:SIZES.h3,
        paddingLeft:15
    },
    cardlayer:{
        flex:1,
        bao:0.3,
        transform: [{ rotate: '90deg' },{ rotateZ: '3.13rad' }]
    }
})


