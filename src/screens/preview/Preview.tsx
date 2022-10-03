import { View, Text, Image, TextInput, ActivityIndicator, StatusBar, Alert } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { styles } from './preview.style';
import { COLOURS } from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Video from 'react-native-video'
import axios from 'axios';
import FormData from 'form-data';
import { AuthContext } from '../../components';
import AsyncStorage from '@react-native-community/async-storage';
import GetLocation from 'react-native-get-location'
import { AppFlowRouteName } from '../../navigation'
import { BASE_URL } from '../../constants/APIs';
import Toast from 'react-native-simple-toast';

export const Preview = ({route, navigation}) => {
  const {authState} = useContext(AuthContext);
  const [lat, setlat ] = useState(null)
  const [long, setlong ] = useState(null)
  const [data, setData ] = useState({})
  const {request, owner} = route.params
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {
      console.log(location);
      setlat(location.latitude)
      setlong(location.longitude)
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })

    const image = route.params.image

    // const file = route.params.file
    const video = route.params.video
    let videoRef = useRef<Video>();
    const [title, setTitle] = useState('');
    const [token, settoken] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [description, setDescription] = useState('');


  useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('token')
        settoken(value)
    } catch (error) {
        console.log(error)
    }
  }, []);
  


  const handleSubmitForm = async (uploadData) => { 
      console.log(uploadData);
      
      const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer '+token
      }
      const url = BASE_URL+'/contents'

      fetch(url, {
        method: "POST",
        body: uploadData,
        headers:{
          'Authorization': 'Bearer '+token
        }
     }).then(response => response.json())
     .then((res) => {
      setisLoading(false)
      console.log("LOGIN HERE",res)
      if(res.success){
          //clearData()
          toastHandler( 'Content successfully created')
          navigation.navigate(AppFlowRouteName.Home)

        //navigation.navigate(AppFlowRouteName.RequestDetail, {data: res.data?.data})
      }
      }).catch((err) => {
        setisLoading(false)
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

    const handleFormData = () => {
     
      if(!lat || !long){
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
        .then(location => {
            console.log(location);
            setlat(location.latitude)
            setlong(location.longitude)
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
      }
       

        if (description && title && image) {
          console.log(image)
          let data ={uri:image.uri,
            type:'image/jpeg',
            name:title
          }
            let uploadData = new FormData();
            uploadData.append('description',description)
            uploadData.append('media',data) 
            uploadData.append('title',title)
            uploadData.append('media_type','image')
            uploadData.append('category_name','title')
            uploadData.append('latitude',lat)
            uploadData.append('longitude',long)
            if(request && owner){
              uploadData.append('request',request)
              uploadData.append('owner',owner)
            }

            handleSubmitForm(uploadData)

        }
        else if (description && title && video) {
          let data ={uri:video,
            type:'video/mp4',
            name:title
          }
          let uploadData = new FormData();
            uploadData.append('description',description)
            uploadData.append('media',data) 
            uploadData.append('title',title)
            uploadData.append('media_type','video')
            uploadData.append('category_name','title')
            uploadData.append('latitude',lat)
            uploadData.append('longitude',long)  
            if(request && owner){
              uploadData.append('request',request)
              uploadData.append('owner',owner)
            }
            
            handleSubmitForm(uploadData)
    }
  }

  const toastHandler = (message) => {
    Toast.show(message, Toast.LONG);
}

  
  return (
    <View style={[styles.container]}>
      {image ? (
        <View style={styles.previewImage}>
          <Image
            resizeMode="cover"
            style={{ flex: 1 }}
            source={{ uri: image.uri }}
          />
        </View>
      ) : (
        <View style={styles.previewImage}>
          <Video
            ref= {videoRef}
            source = {{uri: video}}
            paused = {false}
            style = {styles.video}
            controls ={true}
            onLoad ={() => {
              videoRef.current?.seek(0.01)
            }}
            onVideoError={() => {}}
            onError={(err) => {
              console.log('----------err', err);
            }}
          />
        </View>
      )}
      <View style={[styles.previewContent]}>
        <View style={[styles.previewContentForm]}>
          <TextInput
            placeholder="Title:"
            placeholderTextColor={COLOURS.grey}
            style={[styles.titleContainer]}
            onChangeText={(val) => setDescription(val)}
          />
          <TextInput
            multiline
            placeholder="Description:"
            placeholderTextColor={COLOURS.grey}
            style={[styles.descContainer]}
            onChangeText={(val) => setTitle(val)}
          />
        </View>

        <View style={{ alignItems: "center" }}>
        {isLoading ? (
              <ActivityIndicator color={COLOURS.red} />
            ) : (
              <TouchableOpacity
              style={styles.button}
              onPress={handleFormData}
            >
                <Text style={styles.buttonText}>Send</Text>
              
            </TouchableOpacity>
            )}
        </View>
      </View>
    </View>
  );
}