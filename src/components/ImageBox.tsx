import React from 'react'
import { View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { IPhoto } from '../screens/Detail'

const { width, height } = Dimensions.get('window')

const IMG_W = width / 2
const IMG_H = width / 2

interface IProps {
    item: IPhoto
    onPress: () => void
}

const ImageBox: React.FC<IProps>  = (props: IProps): JSX.Element => {
    const { item, onPress } = props

    return <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.boxStyle}>
            <Image source={{ uri: item.urls.full }} style={styles.imageStyle} />
        </View>
    </TouchableWithoutFeedback>
}

export default ImageBox

const styles = StyleSheet.create({
    boxStyle: {
        width: IMG_W,
        height: IMG_H,
        padding: 8,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 8
    }
})