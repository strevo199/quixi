import * as React from 'react'
import { Modal, StyleSheet } from 'react-native'
import Video from 'react-native-video';
//@ts-ignore
import VideoPlayer from 'react-native-video-controls';

// in the component's render() function

export interface VideoModalProps {
    visible: boolean
    onClose: () => void
    url: string
}

export function VideoModal(props: VideoModalProps) {
    const { visible, onClose, url } = props
    // let playerRef = use
    return (
        <Modal visible={visible}>
            <VideoPlayer
                onBack={onClose}
                source={{ uri: url }}
            />
        </Modal>
    )
}


const styles = StyleSheet.create({

});