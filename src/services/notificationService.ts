import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getfcmToken()
  }
}

const getfcmToken = async ()  => {
    let brand = await DeviceInfo.getBrand()
    let version = await DeviceInfo.getVersion()
    let getSystemName = await DeviceInfo.getSystemName()
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    let deviceId = DeviceInfo.getDeviceId();
    let systemVersion = DeviceInfo.getSystemVersion();
    let uniqueId = DeviceInfo.getUniqueId();

    console.log(fcmToken, 'the old token')
    if(!fcmToken){
        try {
            const fcmToken = await messaging().getToken();
            if(fcmToken){
                console.log(fcmToken, 'newly set fcm token')
                await AsyncStorage.setItem('fcmToken', fcmToken)
                let deviceInfo = {
                  fcm: fcmToken,
                  brand: brand,
                  version: version,
                  os: getSystemName,    
                  deviceId: deviceId,
                  appVersion: systemVersion,
                  platformId: uniqueId
                }
                await AsyncStorage.setItem('deviceInfo', JSON.stringify(deviceInfo))
            }      
        } catch (error) {
            console.log(error, 'fcm error')

        }
    }else{
      let deviceInfo = {
        fcm: fcmToken,
        brand: brand,
        version: version,
        os: getSystemName,
        deviceId: deviceId,
        appVersion: systemVersion,
        platformId: uniqueId
      }
      await AsyncStorage.setItem('deviceInfo', JSON.stringify(deviceInfo))
      console.log("DEVICE INFO", deviceInfo)
    }
}

export const notificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
    });

    messaging().onMessage(async remoteMessage => {
        console.log('receive in foreground', remoteMessage)
    })

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
}