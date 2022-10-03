import { StyleSheet } from 'react-native';
import { COLOURS } from '../../theme';

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
});