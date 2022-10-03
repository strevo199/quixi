
import { StyleSheet} from 'react-native'
import { COLOURS } from '../../theme'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    mainPlayerView: {
        flex: 1,
        backgroundColor: COLOURS.primary,
    },
    videoView: {
        width: '100%',
        height: height/3,
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
        width: '100%',
        height: '100%',
        borderRadius: 10,
        
    
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
})