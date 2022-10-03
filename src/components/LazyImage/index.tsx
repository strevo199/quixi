import { COLOURS } from '../../theme'
import * as React from 'react'
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
export interface LazyImageProps extends FastImageProps {
}

export function LazyImage(props: LazyImageProps) {
    const { ...rest } = props
    let opacity = useSharedValue(1)
    let onLoadEnd = React.useCallback(() => {
        opacity.value = withTiming(0, {
            duration: 500
        })
    }, [])
    let indicatorStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value
        }
    })

    return (
        <View style={[props.style, { overflow: 'hidden', borderWidth: 0, padding: 0 }]}>
            <Animated.View style={[{
                position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', backgroundColor: COLOURS.grey
            }, indicatorStyle]}>
                <ActivityIndicator style={{ width: 15, height: 15, alignSelf: 'center' }} color={COLOURS.white} size='small' />
            </Animated.View>
            <FastImage
                onLoadStart={() => { opacity.value = 1 }}
                onLoadEnd={onLoadEnd}
                {...rest}
                style={[props.style, { margin: 0 }]}
            />


        </View>
    )
}


const styles = StyleSheet.create({

});