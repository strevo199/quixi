
import { StyleSheet, Dimensions} from 'react-native'
import { COLOURS, SIZES } from '../../theme'
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    chat:{
        flex:1,
        backgroundColor:COLOURS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtColor: {
        color: COLOURS.white
    },
    imageSlider: {
        width: width,
        height: "100%",
        // borderRadius: 15
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    titleImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: COLOURS.secondary
    },
    activeOverlayer:{
        width:'100%',
        height:SIZES.height,
        alignItems:'flex-end',
        justifyContent:'space-around'
    }
})