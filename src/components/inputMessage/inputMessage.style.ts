import { Platform, StyleSheet } from 'react-native';
import { COLOURS, SIZES } from '../../theme';




export const styles = StyleSheet.create({

    footerContainer: {
        width: '100%',
        height:'8%',
        paddingHorizontal:SIZES.h4,
        flexDirection:'row',
        marginBottom: Platform.OS === 'ios' ? 30 : 5
    },
    msgContainer: { 
        borderWidth:1,
        flex:1,
        color:COLOURS.white,
        borderColor:COLOURS.gray,
        borderRadius: SIZES.radius,
        backgroundColor:COLOURS.blurBlueSky,
        marginRight:SIZES.h4,
        padding:4


    }
});
