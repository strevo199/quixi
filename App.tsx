/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useMemo, useState } from 'react';
import {

  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppFlow } from './src/navigation'; 
import { COLOURS, SIZES } from './src'
import FlashMessage from "react-native-flash-message";
import {requestUserPermission, notificationListener} from './src'
import DeviceInfo from 'react-native-device-info';

const App = () => {
 
  useEffect(() => {
    requestUserPermission();
    notificationListener(); 
  }, [])
  
  return (
    <View style ={styles.app}>
      <FlashMessage position="center" />
      <AppFlow />
    </View>

  );
};

const styles = StyleSheet.create({
  app:{
    width: '100%',
    height: '100%',
    backgroundColor: COLOURS.primary
  }
});

export default App;
