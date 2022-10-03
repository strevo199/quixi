import React, { useState } from "react";
import { styles } from "./ReplyContent.style";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Route } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RNCamera } from "react-native-camera";
import { useCamera } from "react-native-camera-hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLOURS } from "../../theme";
import { AppFlowRouteName } from "../../navigation";
//import RNFS from 'react-native-fs'

interface screenProps {
  route: Route<any>;
  navigation: StackNavigationProp<any>;
}
export const ReplyContent: React.FC<screenProps> = ({route, navigation }) => {
  const {request, owner} = route.params

  const [{ cameraRef }, { takePicture }] = useCamera(null);
  const [forcam, setforcam] = useState(true);
  const [isRecording, setisRecording] = useState(false);
  const [makePics, setmakePics] = useState(true);
  

  const capturPiceHandle = async () => {
    try {
      const data = await takePicture();

      
      navigation.navigate(AppFlowRouteName.Preview,{
          image:data,
          request: request,
          owner: owner
          // file:data.exif
      })
    } 
    catch (error) {
      console.log("error2", error);
    }
  };

  const capturVideoHandle = async () => {
      setisRecording(true)
      if (cameraRef) {
          const {uri, codec = "mp4"}  = await cameraRef.current.recordAsync()
          if (uri) {
            // const filePath = uri;
            // const newfilePath = RNFS.ExternalDirectoryPath + '/contentvideo.mp4'
            // RNFS.moveFile(filePath,newfilePath)

            navigation.navigate(AppFlowRouteName.Preview,{
              video:uri,
              request: request,
              owner: owner
            })
            
          }
           
            
            
      }
  }

  const StopVideoRecord = () => {
      setisRecording(false)
      cameraRef.current.stopRecording();
      
  }


  const setforpicture = () => {
        setmakePics(true)
        
  }
  const setforvideo = () => {
        setmakePics(false)
  }

  const handleCamMode = () => {
    if (forcam) {
      setforcam(false);
    } else {
      setforcam(true);
    }
  };

  return (
    <View style={[styles.container]}>
      <RNCamera
        ref={cameraRef}
        flashMode={RNCamera.Constants.FlashMode.on}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['480']}
        type={
          forcam ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }
        style={styles.preview}
      >
        <View style={styles.camoverlayer}>
          <View style={[styles.camTopContainer]}>
            <TouchableOpacity onPress={handleCamMode}>
              <Image
                style={[
                  styles.cambtnStyle,
                  { tintColor: COLOURS.white, marginTop:50,height: 25, width: 25 },
                ]}
                resizeMode={"cover"}
                source={require("../../assets/icons/outline_cached.png")}
              />
            </TouchableOpacity>
            
          </View>
          <View style={styles.cambottomBtnContainer}>
              {
                  isRecording ?
                  ( 
                      <TouchableOpacity     onPress={StopVideoRecord} >
                      <View   style ={{borderRadius:100,height:20,width:20, backgroundColor: COLOURS.cancelRed}}>
                          
                      </View>
                      </TouchableOpacity>
                    ):(

                    <View  style ={ makePics ? {borderRadius:100, borderColor: COLOURS.grey,padding:4,borderWidth:2} :{}}>
                        {
                            makePics ? (
                    <TouchableOpacity onPress={setforvideo}>
                            <Image
                                style={[styles.cambtnStyle, !makePics ? { tintColor: COLOURS.blueSky }:{ tintColor: COLOURS.white } ]}
                                resizeMode={"cover"}
                                source={require("../../assets/icons/videocam.png")}
                            />
                    </TouchableOpacity>
                            ):
                            (
                                null
                            )
                        }   
                    </View>
                    )


              }
            
            <View>
              {makePics ? (
                <TouchableOpacity onPress={capturPiceHandle}>
                  <View
                    style={[styles.snapcam, { borderColor: COLOURS.white,borderWidth:2,borderStyle:'dotted' }]}
                  ></View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={capturVideoHandle}>
                  <View
                    style={[
                      styles.snapcam,
                      isRecording ? { backgroundColor: COLOURS.cancelRed } : { backgroundColor: COLOURS.success },
                    ]}
                  >
                    <Text style={{ fontWeight: "700", color: COLOURS.white }}>
                      rec
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style ={{borderRadius:100, borderColor: COLOURS.grey,padding:4,borderWidth:2}}>
              <TouchableOpacity onPress={() => setforpicture()}>
                <Image
                  style={[styles.cambtnStyle, makePics ? { tintColor: COLOURS.secondary }:{ tintColor: COLOURS.white } ]}
                  resizeMode={"cover"}
                  source={require("../../assets/icons/outlinephoto.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RNCamera>
    </View>
  );
};
