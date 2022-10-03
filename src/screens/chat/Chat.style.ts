
import { StyleSheet} from 'react-native'
import { COLOURS, SIZES } from '../../theme'


export const styles = StyleSheet.create({
    constainer:{
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
    topFlatListContainer: {
        borderBottomColor: COLOURS.white, 
        borderBottomWidth: 1,
        marginTop: 32,
        marginBottom: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLOURS.white,
        paddingBottom:10
    },
})