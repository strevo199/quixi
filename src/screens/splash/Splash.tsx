import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { styles } from './Splash.style';
import { Logo } from '../../constants/Images';
import { StackNavigationProp } from '@react-navigation/stack';
import { Route } from '@react-navigation/native';
import { AppFlowRouteName } from '../../navigation';


// interface SplashProps {
//     route:Route<any>,
//     navigation: StackNavigationProp<any>,
// }

export const Splash: React.FC<{navigation:any; token:boolean}>  = ({token,navigation}) => {
    
    
    // useEffect(() => {
    //     setTimeout(() =>{
    //         console.log('This will run after 3 second');
    //         navigation.navigate(AppFlowRouteName.Login)
    //         console.log(token);
    //     },3000)
    //     return () => clearTimeout(5000);
    // }, [])
 
    return (
        <View style ={[styles.container]}>
            <Image style ={styles.logo} source={Logo} resizeMode="cover" />
        </View>
    )
}