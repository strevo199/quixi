
import { StyleSheet, Dimensions, Platform} from 'react-native'
import { COLOURS, SIZES } from '../../theme/Theme'
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor:COLOURS.primary,
        ...StyleSheet.absoluteFillObject,
      },
      map: {
        height: 300,
        width: 400,
      },
      container2: {
        flex: 1,
        backgroundColor:COLOURS.primary,
      },
      inputContainer:{
        backgroundColor:COLOURS.primary,
        borderBottomColor:COLOURS.grey,
        borderBottomWidth:2,
        width:'100%',
        color: COLOURS.white,
        fontSize: 16,
        padding: 10,
        marginTop: 20
    },
    descContainer:{
      backgroundColor:COLOURS.primary,
      borderColor:COLOURS.secondary,
      borderWidth:1,
      width: WIDTH/1.1,
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
    width: WIDTH/1.1,
    borderRadius: 10,
    color: COLOURS.white,
    fontSize: 16,
    padding: 10,
    marginTop: 20,
    textAlignVertical: 'top'
},
    placeHolder: {
        color: COLOURS.grey
    },
    button:{
        backgroundColor:COLOURS.secondary,
        height:SIZES.largeTitle,
        width:WIDTH/1.5,
        borderRadius:SIZES.radius,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 40,
        padding: 10,
    },
    buttonText:{
        color:COLOURS.white,
        textTransform:'uppercase',
        fontWeight:'bold',
        letterSpacing:1,
    },
    categories: {
       padding: 5, 
       margin: 10, 
       borderRadius: 5, 
       width: 100, 
       alignItems: 'center',
    },
    line: { 
      marginLeft: 20,
      marginRight: 20,
      height: 40, 
      borderRightColor: 
      COLOURS.secondary, 
      borderRightWidth: 2
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      width: WIDTH
    },
    modalView: {
      backgroundColor: COLOURS.white,
      borderRadius: 20,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button1: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: COLOURS.primary,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginTop: 20,
      marginBottom: 15,
      textAlign: "center",
      fontWeight: 'bold'
    },
    logo: {
      width: WIDTH/3,
      height: HEIGHT/10
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
  locationBtn:  {
    height: Platform.OS === 'android' ? 40 : 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
}
})