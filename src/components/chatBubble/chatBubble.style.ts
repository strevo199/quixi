import { StyleSheet} from 'react-native';
import { COLOURS } from '../../theme';


export const styles = StyleSheet.create({

    message: {
        flexDirection:'row',
        marginVertical:5
    },
    messageText: {
        color:COLOURS.white,
        backgroundColor:COLOURS.blurBlueSky,
        maxWidth:280,
        padding:5,
        borderRadius:20,
        marginHorizontal:10
    },
    messageBottom: {
        color:COLOURS.white,
        fontSize:10,
        marginTop:10
    },
    ownmessageBottom: {
        color:COLOURS.white,
        fontSize:10,
        marginTop:10,
        textAlign:'right'
    },

    ownmessage:{
        justifyContent:'flex-end',
        flexDirection:'row'
    },
    ownmessageText: {
        color:COLOURS.white,
        backgroundColor:COLOURS.blueSky,
        maxWidth:280,
        padding:5,
        borderRadius:20,
        marginHorizontal:10
    }

});

