import React from "react";
import {
    View, Text, FlatList, StyleSheet, Dimensions
} from 'react-native'
import ImageBox from "../components/ImageBox";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../route";
import { getPhotosListAPI } from "../api";

const { width, height } = Dimensions.get('window')

export default function Main() {
    const [ data, setData ] = React.useState([])
    const [ page, setPage ] = React.useState(1)

    React.useEffect(()=>{
        getPhotosListAPI(16, page, '').then(response => {
            setData(response.data)
        })
    },[])

    const onEndReached = () => {
        setPage(page+1)
        getPhotosListAPI(16, page+1, '').then(response => {
            setData([...data, ...response.data])
        })
    }

    const navigation = useNavigation<ScreenNavigationProp>()

    return <View style={styles.container}>
        <FlatList 
            data={data}
            keyExtractor={(_, index)=>index.toString()}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.2}
            onEndReached={onEndReached}
            numColumns={2}
            renderItem={({item, index})=> {
                return <ImageBox item={item} onPress={()=>{ navigation.navigate('DetailScreen',{ id: item['id'] }) }}/>
            }}
            ListEmptyComponent={<View style={styles.loadView}>
                <Text>loading...</Text>
            </View>}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height-100
    }
})