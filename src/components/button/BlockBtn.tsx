import { Pressable, StyleSheet, Text, View } from 'react-native';
import { styles } from '../button/BlockBtn.style';

const  BlockBtn =() => {
    return (
        <Pressable>
            <Text style ={styles.buttonText}>Sign In</Text>
        </Pressable>
    )
}


export default  BlockBtn 