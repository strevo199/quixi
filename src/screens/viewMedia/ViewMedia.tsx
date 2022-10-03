import React, {useState, useRef, useEffect, useContext} from 'react'
import { styles } from './ViewMedia.styles'
import { Text, View, Dimensions, ViewStyle, Platform, Image, TouchableOpacity} from 'react-native'
import { LazyImage, VideoModal } from '../../components'
import { Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { COLOURS, SIZES } from '../../theme';
import { solidheart,heart, visibility } from "../../constants/Images";
import {Rating,AirbnbRating} from 'react-native-ratings'
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import {ICON_EXIT, ICON_PERSON, PLAY_VIDEO} from '../../assets';
import { isIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../constants/APIs'
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../components'
import axios from 'axios';
import { AppFlowRouteName } from '../../navigation';

const { width, height } = Dimensions.get('window');

interface ActivationProps {
    route:Route<any>,
    navigation: StackNavigationProp<any>
}
export const ViewMedia:React.FC <ActivationProps>= ({route, navigation}) => {
    //const [post, setPost] = useState(route.params)
    const { post } = route.params;
    const [images, setImages] = useState([{img:post.url}])
    const [like, setlike] = useState(false)
    const [content, setContent] = useState(post)
    const [loading, setLoading] = useState(false)
    const [token, setToken] = useState()
    const { signOut } = useContext(AuthContext)

    // const ratingCompleted =(rating) => {
    //   console.log("Rating is: " + rating)
    // }

    const handleLike = () => {
      if (!like) {
        setlike(true)
      }else{
        setlike(false)
      }
      
    }

    useEffect(() => {
      setTimeout(async() =>{
          let tok;
          tok = null;
          try {
             tok = await AsyncStorage.getItem('token')
             if(tok){
              setToken(tok)
              handleSearch(tok)
             }else(
              signOut()
             )
          } catch (error) {
              console.log(error)
          }
      },3000)
  }, [])


  const handleSearch = (tokening) => {
      setLoading(true)
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+tokening
        }
      
        axios({
            method: 'get',
            url: BASE_URL+'/contents/'+post?._id,
            headers: headers
          }).then((res) => {
              setLoading(false)
              console.log("LOGIN HERE",res.data)
              if(res.data.success){
                  console.log('GOT API', res.data?.data)
                  setContent(res.data?.data)
                //navigation.navigate(AppFlowRouteName.Home)
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


  const ratingCompleted = (rating) => {
    setLoading(true)
    let body = {
      rating: rating,
      comment: " "
    }
    console.log("RATING HERE",body)

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      }
    
      axios({
          method: 'post',
          url: BASE_URL+'/contents/'+post?._id+'/rating',
          data: body,
          headers: headers
        }).then((res) => {
            setLoading(false)
            console.log("LOGIN HERE",res.data)
            if(res.data.success){
                console.log('GOT API RATING', res.data)
                handleSearch(token)
            }
        }).catch((err) => {
            setLoading(false)
           console.log(err)
           if(err.response?.data?.message){
            toastHandler(err.response.data.message)
            }else{
                toastHandler(err.response.data.error_message)
            }
        })
}

    const toastHandler = (message) => {
        Toast.show(message, Toast.LONG);
    }
  
    
    return (
      <View style={[styles.chat]}>
        {content.media_type === "video" ? (
          <VideoView post={content} />
        ) : (
          <ImageSlider post={content} images={images} />
        )}
        <View
          style={{
            position: "absolute",
            top: getStatusBarHeight() + 15,
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <Title
            onBack={navigation.goBack}
            onPress={() => {
              // if (!!post.id) {
              //   navigation.navigate(AppFlowRouteName.PublicProfile, {
              //     id: post.user.id,
              //   });
              // }
            }}
            post={content}
          />
          <View style={styles.activeOverlayer}>
            <View style={{ padding: 4, backgroundColor: COLOURS.blurPrimary }}>
              <View style={{ paddingVertical: SIZES.h4,alignItems:'center' }}>
                <TouchableOpacity 
                  onPress={handleLike}
                >
                  <Ionicons name={ like ? 'heart': 'heart-outline'} size={20} color={like ? COLOURS.red :  COLOURS.white }/>
                </TouchableOpacity>
                <Text style={{ color: COLOURS.white }}>1</Text>
              </View>
              <View style ={{alignItems:'center' }}>
                <Ionicons name='eye-outline' size={20} color={COLOURS.white }/>
                <Text style={{ color: COLOURS.white }}>{content.views}</Text>
              </View>
              <View style ={{alignItems:'center', marginTop: 15 }}>
                <Ionicons name='star-half-outline' size={20} color={COLOURS.white}/>
                <Text style={{ color: COLOURS.white }}>{content.rating.toFixed(1)}</Text>
              </View>
            </View>
            <View style={{ width: "100%" , flexDirection:'row', justifyContent:'space-around',alignItems:'center'}}>
              <AirbnbRating
                count={5}
                reviews={["1/5", "2/5", "3/5", "4/5", "5/5"]}
                defaultRating={0}
                size={25}
                onFinishRating={(rating) => ratingCompleted(rating)}
              />
              {
                content.owner ? (
              <TouchableOpacity
                 onPress={() => navigation.navigate(AppFlowRouteName.Conservation,{receiver:content.user,meId:content.owner})}
                //  onPress={() => navigation.navigate(AppFlowRouteName.Conservation,{receiver:content})}
              >
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        tintColor:COLOURS.white
                      }}
                      source={require('../../assets/icons/outlinechatanswerblack.png')}
                    />
              </TouchableOpacity>

                ) : (null)
              }
            </View>
          </View>
        </View>
      </View>
    );
}

const VideoView = (props: {post: any}) => {
    let {post} = props;
    let [visible, setVisible] = useState(false);
    let [pause, setPause] = useState(true);
    let videoRef = useRef<Video>();
    let videoStyle: ViewStyle = Platform.OS === 'ios' ? {flex: 1} : {display: 'none'};
    return (
      <View
        style={{
          width: width,
          height: '100%',
          justifyContent: 'center',
        }}>
        {Platform.OS !== 'ios' && (
          <Image
            source={{uri: post.url}}
            style={{flex: 1}}
            resizeMode="contain"
          />
        )}
        <Video
          //@ts-ignore
          ref={videoRef}
          paused={pause}
          fullscreen={Platform.OS === 'ios'}
          // controls={!pause}
          source={{uri: post.url}}
          // style={{ display: 'none' }}
          onLoad={() => {
            videoRef.current?.seek(0.01);
          }}
          style={{...videoStyle, backgroundColor: COLOURS.primary}}
          // onReadyForDisplay={() => {
          //     videoRef.current?.seek(1)
          // }}
          onVideoError={() => {}}
          onError={(err) => {
            console.log('----------err', err);
          }}
        />
        {/* <LazyImage style={{ flex: 1, borderRadius: 15, backgroundColor: Color.Dark }} source={{ uri: video.thumbnail }} /> */}
        <VideoModal
          url={post.url}
          visible={visible}
          onClose={() => setVisible(false)}
        />
        <TouchableOpacity
          onPress={() => {
            try {
              if (Platform.OS !== 'ios') {
                setVisible(true);
              } else {
                videoRef.current?.presentFullscreenPlayer();
              }
            } catch (error) {
              console.log('00000000error', error);
            }
          }}
          style={{
            position: 'absolute',
            alignSelf: 'center',
          }}>
          <FastImage source={PLAY_VIDEO} style={{width: 50, height: 50}} />
        </TouchableOpacity>
      </View>
    );
  };
  

const ImageSlider = (props: {post: any, images: any}) => {
    let [activeSlide, setActiveSlide] = useState(0);
    let {post, images} = props;
    console.log(post)
    const renderItem = ({item, index}: {item: any; index: number}) => {
      return (
        <LazyImage
          source={{uri: item.img}}
          style={styles.imageSlider}
          resizeMode="contain"
        />
      );
    };
    return (
      <View style={[styles.imageSlider]}>
        <Carousel
          data={images}
          renderItem={renderItem}
          onSnapToItem={(slideIndex) => {
            setActiveSlide(slideIndex);
          }}
          sliderWidth={width}
          itemWidth={width}
        />
        <Pagination
          dotContainerStyle={{backgroundColor: COLOURS.transparent}}
          dotsLength={images.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            backgroundColor: COLOURS.transparent,
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
          }}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: COLOURS.white,
          }}
          inactiveDotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
    );
  };

  const Title = (props: {
    post: any;
    onPress: () => void;
    onBack: () => void;
  }) => {
    let {post} = props;
    return (
      <TouchableOpacity onPress={props.onPress} style={styles.titleContainer}>
        <LazyImage
          source={!!post._id ? {uri: post.user.avatar} : ICON_PERSON}
          style={styles.titleImage}
        />
        <Text style={{
            flex: 1,
            color: COLOURS.white,
            fontWeight: '700',
            paddingHorizontal: 10
        }}>
            {!!post._id ? post.user.last_name : 'username'}
        </Text>

        <TouchableOpacity
          
          onPress={props.onBack}>
            <Ionicons name='close-outline' style={{fontSize: 32, color: COLOURS.white}} />

        </TouchableOpacity>
      </TouchableOpacity>
    );
  };



