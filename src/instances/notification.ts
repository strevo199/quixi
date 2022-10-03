import React from 'react';
import messaging from '@react-native-firebase/messaging';
import { ReactNativeFirebase } from '@react-native-firebase/app';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, FontWeight } from '@values';
import { useCallback, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { Device } from './device';
import { defaultRegistry } from 'react-sweet-state';
import { api } from './api';
import { Keyboard, Platform, AppState } from 'react-native';
import { NotificationServices } from '@services';
import { DETAIL_REQUEST } from '@models';
import { GlobalUIManager } from '@components';
import { AppFlowRouteName } from '@navigation';
import PushNotification from 'react-native-push-notification'

function createAppNotification() {
    let fcmToken = ''
    let badgeCount = 0
    let lastMessageId = ""
    let navigation: StackNavigationProp<any> = <StackNavigationProp<any>>{}
    const init = (propsNavigation: StackNavigationProp<any>) => {
        navigation = propsNavigation
        requestUserPermisstion();
        messaging().onTokenRefresh((newFcmToken: string) => {
            saveDeviceToken(newFcmToken)
        });
        messaging().getInitialNotification().then(async (notification) => {
            if (!notification) return;
            if (notification.messageId !== lastMessageId) {
                lastMessageId = notification.messageId || ""
            }
            badgeCount += 1;
            console.log("-----getInitialNotification", notification);
            handleUserInteractionNotification(notification)
        })
        messaging().onMessage((notification) => {
            if (notification.messageId !== lastMessageId) {
                lastMessageId = notification.messageId || ""
                badgeCount += 1;
                handleNotiOnForeground(notification)
            }
        });
        messaging().onNotificationOpenedApp((notification) => {
            if (notification.messageId !== lastMessageId) {
                lastMessageId = notification.messageId || ""
            }
            badgeCount -= 1;
            console.log("-----onNotificationOpenedApp", notification);
            handleUserInteractionNotification(notification)
        });
        messaging().setBackgroundMessageHandler(async (notification) => {
            console.log('------noti', notification)
            if (notification.messageId !== lastMessageId) {
                lastMessageId = notification.messageId || ""
            }
           
            badgeCount += 1;
            console.log("-----setBackgroundMessageHandler", notification);
            handleUserInteractionNotification(notification)
        })
    }

    const requestUserPermisstion = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            const newFcmToken = await messaging().getToken();
            saveDeviceToken(newFcmToken)
        }
    }

    const setBadgeCount = (count: number) => {
        console.log('count badge', count)
        badgeCount = count
        PushNotification.setApplicationIconBadgeNumber(count)
    }

    const handleUserInteractionNotification = (message: any) => {
        let { notification, data } = message
        let title = "";
        let bodyMessage = "";
        let params = JSON.parse(data.params);
        try {
            if (Device.isIos) {
                title = notification.title
                bodyMessage = notification.body
            } else {
                title = notification.title
                bodyMessage = notification.message
            }
            if (!!params.request && !!params.request.id) {
                let request: DETAIL_REQUEST = params.request;
                console.log("-----request", request)
                GlobalUIManager.view.showPopup(request)
                return;
            }
        } catch (error) {
            console.log("----err", error);

        }
        GlobalUIManager.navigation.push(data.screen, params)
    }

    const getToken = async () => await messaging().getToken();

    const handleNotiOnForeground = (message: any) => {
        console.log("-----notification", message)
        let { notification, data } = message
        let title = "";
        let bodyMessage = "";
        let params = JSON.parse(data.params);
        let { route } = GlobalUIManager
        let navigationParams: any = route.params
        title = notification.title
        bodyMessage = notification.body
        if (
            !!navigationParams &&
            !!navigationParams.request_id &&
            !!params.request_id &&
            params.request_id === navigationParams.request_id &&
            params.receiver_user_id === navigationParams.receiver_user_id
        ) {
            //Check if receive notification from the member in current screen chat
            return;
        }
        try {
            if (!!params.request && !!params.request.id && route.name !== AppFlowRouteName.Chat) {
                let request: DETAIL_REQUEST = params.request;
                console.log("-----request", request)
                try {
                    Keyboard.dismiss();
                } catch (error) {

                }
                GlobalUIManager.view.showPopup(request)
                return;
            }
        } catch (error) {
            console.log("----err", error);
        }
        showMessage({
            onPress: () => {
                try {
                    Keyboard.dismiss();
                } catch (error) {

                }
                if (route.name !== AppFlowRouteName.Chat) {
                    !!params && GlobalUIManager.navigation.push(data.screen, params)
                } else {
                    !!params && GlobalUIManager.view.showPopup(params.request)
                }
            },
            type: "warning",
            // ,
            duration: 3000,
            message: title,
            description: bodyMessage,
            //@ts-ignore
            titleStyle: {
                color: Color.Success,
                ...FontWeight[600]
            },
            textStyle: {
                color: Color.Black,
                ...FontWeight[500]
            }
        })

    }

    const saveDeviceToken = (newFcmToken: string) => {
        console.log("-----newFcmToken", newFcmToken);
        fcmToken = newFcmToken
        try {
            NotificationServices.saveDeviceTokenService({
                "token": newFcmToken,
                "type": Device.isIos ? 0 : 1,
                "os_version": Platform.Version,
                "app_version": "1.0.1",
                "os_name": Platform.OS,
                "locale": "en",
                "user_type": "0"
            })
        } catch (error) {
            console.log("----err", error);
        }
    }

    return {
        setBadgeCount,
        requestUserPermisstion,
        fcmToken,
        init,
        getToken
    }
}

export const AppNotification = createAppNotification()