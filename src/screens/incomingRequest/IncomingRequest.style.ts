
import { StyleSheet, Dimensions} from 'react-native'
import { COLOURS } from '../../theme'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor: COLOURS.primary,
    },
    header: {
        marginTop: 36,
        padding: 10,
        borderBottomColor: COLOURS.white, 
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLOURS.white,
        paddingBottom:10
    },
    subTitle: {
        marginTop: 20,
        padding: 10,
    },
    subTitleTxt: {
        fontSize: 16,
        color: COLOURS.secondary,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subTitleSmall: {
        fontSize: 16,
        color: COLOURS.white,
        marginBottom: 10,
        lineHeight: 30,
    },
    videoView: {
        width: '100%',
        height: HEIGHT/3,
        backgroundColor: COLOURS.grey
    },
    video:{
        width: '100%',
        height: '100%'
    },
    subHeader: {
        fontSize: 16,
        marginTop: 15,
        marginLeft: 10,
        paddingBottom: 5,
        color: COLOURS.white
    },
    subHeaderSmall: {
        fontSize: 12,
        marginTop: 15,
        marginLeft: 10,
        paddingBottom: 5,
        color: COLOURS.white
    },
    bigImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    topFlatListContainer: {
        borderBottomColor: COLOURS.white, 
        borderBottomWidth: 1,
        marginTop: 32,
    },
    flatListContainer: {
        borderBottomColor: COLOURS.white, 
        borderBottomWidth: 1
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        width: WIDTH
    },
})