import React, {useState, useRef, createRef, useEffect, useContext} from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Modal, ActivityIndicator, Image, Platform } from 'react-native'
import { styles } from './Request.style'
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { COLOURS } from '../../theme/Theme'
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../components'
import axios from 'axios';
import { AppFlowRouteName } from '../../navigation'
import { LOGO } from '../../assets';
import { Logo2 } from "../../constants/Images";
import { BASE_URL } from "../../constants/APIs";
import Toast from 'react-native-simple-toast';


interface screenProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}
export const Request:React.FC <screenProps>= ({navigation}) => {
    const ref = useRef();
    const { signOut } = useContext(AuthContext)
    const mapRef = createRef();
    const [title, setTitle] = useState('');
    const [instruction, setInstruction] = useState('');
    const [token, setToken] = useState(null);
    const [loading , setLoading] = useState(false)


    const [pin, setPin] = useState({
        latitude: null,
        longitude: null
    })
    const [region, setRegion] = useState({
        latitude: 7.4765177,
        longitude: 8.9961791,
        latitudeDelta: 0.1,
        longitudeDelta: 0.05
    })
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [conutry, setConutry] = useState('');

    const [day, setDay] = useState('2022-01-16');
    const [zoom, setZoom] = useState(''); //initiates variable zoom
    const [step, setStep] = useState(1);
    const [video, setVideo] = useState(false);
    const [worldwide, setWorldwide] = useState(false);
    const [image, setImage] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        setTimeout(async() =>{
            let token;
            token = null;
            try {
               token = await AsyncStorage.getItem('token')
               if(token){
                setToken(token)
               }else(
                signOut()
               )
            } catch (error) {
                console.log(error)
            }
        },3000)
    }, [])

    const handleRequest = () => {
        if(!instruction){
            toastHandler('Instruction is requred')
            return
        }
        if(!worldwide && pin.latitude == null){
            toastHandler('Please select content location')
            return
        }
        const body = {
            title: instruction.substring(10),
            description: instruction,
            where_request: worldwide ? 'worldwide' : 'location',
        }
        if(pin.longitude && pin.latitude){
            body.longitude = pin.longitude
            body.latitude = pin.latitude
        }
        if(address){
            body.address = address
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
          }

          console.log(body)
          console.log(headers)
        
          axios({
              method: 'post',
              url: BASE_URL+'/request-contents',
              data: body,
              headers: headers
            }).then((res) => {
                setLoading(false)
                console.log("LOGIN HERE",res.data)
                if(res.data.success){
                    clearData()
                    toastHandler('Request successfully created')
                    navigation.navigate(AppFlowRouteName.RelatedContents, {search: instruction})
                }
            }).catch((err) => {
                setLoading(false)
               console.log(err)
               if(err.response?.data?.message){
                toastHandler(err.response.data.message)
                if(err.response.data.message == 'Session expired'){
                    signOut()
                  }
                }else{
                    toastHandler(err.response.data.error_message)
                }
            })
    }

    const clearData = () => {
        setTitle('')
        setInstruction(''),
        setWorldwide(false)
        setPin({
            latitude: 0,
            longitude: 0
        })

    }

    const toastHandler = (message) => {
        Toast.show(message, Toast.LONG);
    }

    return (
        <View style={[styles.container2]}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                marginTop: 32
            }}>
                <TouchableOpacity onPress={() => {}}>
                    {/* <Ionicons name='close-outline' style={{fontSize: 32, color: COLOURS.white}} /> */}
                </TouchableOpacity>
                <Text  style={styles.headerTitle}>Request</Text>
                <TouchableOpacity onPress={() => {}}>
                    {/* <Ionicons name='checkmark' style={{fontSize: 32, color: COLOURS.secondary}} /> */}
                </TouchableOpacity>
            </View>
            <ScrollView style={{marginTop: 45, backgroundColor: '#ooo'}}>
                <View style={{padding: 10}}>
                    
                    <View style={{alignItems: 'center', justifyContent:'center', marginTop: 30}}>
                        
                        <Image style={styles.logo} source={Platform.OS === 'android'  ? Logo2 : LOGO} />

                        <View style={{marginTop: 20, alignItems: 'center'}}>
                            <TextInput 
                                value={instruction}
                                placeholder='Request a video or photo of anything!' 
                                placeholderTextColor={COLOURS.grey} 
                                style={[styles.titleContainer]} 
                                onChangeText={(text) => setInstruction(text) }
                            /> 
                            {/* <TextInput multiline 
                                value={instruction}
                                placeholder='Instruction' 
                                placeholderTextColor={COLOURS.grey} 
                                style={[styles.descContainer]} 
                                onChangeText={(text) => setInstruction(text) }
                            />  */}
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40}}>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    setPin({
                                        longitude: 0,
                                        latitude: 0
                                    })
                                    setWorldwide(!worldwide)
                                }}
                                style={[styles.locationBtn, {backgroundColor: worldwide ? COLOURS.secondary : COLOURS.gray,}]}
                                >
                                    <Text style={{color: worldwide ? COLOURS.purpleBlue : COLOURS.white, fontSize: 12, fontWeight: 'bold'}}>Worldwide</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.line}></View>
                            <View >
                                <TouchableOpacity onPress={() => {
                                    setWorldwide(false)
                                    setModalVisible(!modalVisible)
                                }}
                                style={[styles.locationBtn, {backgroundColor: pin.latitude > 0 ? COLOURS.secondary : COLOURS.gray}]}
                                
                                >
                                    <Text style={{color: pin.latitude > 0 ? COLOURS.purpleBlue : COLOURS.white, fontSize: 12, fontWeight: 'bold'}}>Find Location</Text>
                                </TouchableOpacity>
                                {/* <Text style={{color: COLOURS.white, fontSize: 20, fontWeight: 'bold', marginTop: 10}}>{city+', '+conutry}</Text> */}
                            </View>
                        </View>
                        </View>
                        {loading ? (<ActivityIndicator color={COLOURS.red} />) 
                                : (
                                    <TouchableOpacity
                                        style ={styles.button}
                                        //onPress={ () => handleSubmit()}
                                        onPress={ () => handleRequest()}

                                    >
                                        <Text style ={styles.buttonText}>send</Text>
                                    </TouchableOpacity>
                                )}
                        
                    </View>
                </View>

                
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                    <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalText}>Select Location!</Text>
                    {address ? (
                        <View style={{marginLeft: 10}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
                                <Text style={{fontWeight:'bold', flexWrap:'wrap'}}>Address: </Text>
                                <Text>{address}</Text>
                            </View>
                            {/* <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
                                <Text style={{fontWeight:'bold', flexWrap:'wrap'}}>City: </Text>
                                <Text>{city}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
                                <Text style={{fontWeight:'bold', flexWrap:'wrap'}}>Country: </Text>
                                <Text>{conutry}</Text>
                            </View> */}
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10}}>
                                <Text style={{fontWeight:'bold'}}>Longitude: </Text>
                                <Text>{pin.longitude}</Text>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start',  marginBottom: 10}}>
                                <Text style={{fontWeight:'bold'}}>Latitude: </Text>
                                <Text>{pin.latitude}</Text>
                            </View>
                        </View>
                    ) : <View></View>}
                    <View style={{marginTop: 20,marginBottom: 100}}>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            fetchDetails={true}
                            GooglePlacesSearchQuery={{
                                rankby: 'distance'
                            }}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                setAddress(details.formatted_address);
                                setCity(details.address_components[2].long_name)
                                setConutry(details.address_components[5].long_name)
                                console.log('TEST STARTS FROM HERE',details.address_components);
                                console.log('TEST STARTS',details.address_components[4].types[0]);


                                setPin({
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng,
                                })
                            }}
                            query={{
                                key: 'AIzaSyAZapha4xAXnhah5hwoKq4Hp44Emv6gg1s',
                                language: 'en',
                            }}
                            styles={{
                                container: {flex: 0, position: 'absolute', width: '100%', zIndex: 1, borderColor: COLOURS.secondary, borderWidth: 1, borderRadius: 10},
                                listView: {backgroundColor: '#fff'}
                            }}
                        />
                        
                    </View>
                    
                </View>
                </View>
            </Modal>
            {/* <ScrollView>
                <TextInput 
                    placeholder='Title' 
                    placeholderTextColor={COLOURS.grey} 
                    style={styles.inputContainer} 
                    onChangeText={(text) => setAddress(text)}
                />
                <TextInput placeholder='Description' placeholderTextColor={COLOURS.grey} style={[styles.inputContainer, {textAlignVertical: 'top'}]} /> 
                <TextInput 
                    placeholder='Address' 
                    placeholderTextColor={COLOURS.grey} 
                    style={styles.inputContainer} 
                    value={address}
                    
                />    
                <RNPickerSelect
                    style={{
                        inputAndroid: styles.inputContainer,
                        inputIOS: styles.inputContainer
                    }}
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: 'Football', value: 'football' },
                        { label: 'Baseball', value: 'baseball' },
                        { label: 'Hockey', value: 'hockey' },
                    ]}
                />           
                <DatePicker
                    style={{width: '100%', color: COLOURS.white, marginTop: 30}}
                    date={day}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2022-01-16"
                    maxDate="2022-06-30"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36,
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: COLOURS.white,
                        }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => setDay(date)}
                />
                <TouchableOpacity
                    style ={styles.button}
                    //onPress={ () => handleSubmit()}
                    onPress={ () => Alert.alert('Request Successful')}

                >
                    <Text style ={styles.buttonText}>Post Request</Text>
                </TouchableOpacity>
            </ScrollView> */}
        </View>   
    )
}


