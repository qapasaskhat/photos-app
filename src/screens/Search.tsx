import React from 'react'
import { 
    View, 
    StyleSheet,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import ImageBox from '../components/ImageBox'
import { searchPhotosAPI } from '../api'
import { useNavigation } from '@react-navigation/native'
import { ScreenNavigationProp } from '../route'

export default function Search(){
    const [ text, setText ] = React.useState('')
    const [ data, setData ] = React.useState([])

    const navigation = useNavigation<ScreenNavigationProp>()

    const searchItem = () => {
        console.log(text)
        searchPhotosAPI(text).then(response=>{
            setData(response.data.results)
        }).catch(error=> console.log(error) )
    }

    return <View style={styles.container}>
        <View style={styles.searchHeader}>
            <TextInput placeholder='Search...' value={text} onChangeText={value=> setText(value) }/>
            <TouchableOpacity onPress={searchItem}>
                <Text>Search</Text>
            </TouchableOpacity>
        </View>
        <View>
            <FlatList 
                data={data}
                numColumns={2}
                ListEmptyComponent={<View>
                    <Text>empty</Text>
                </View>}
                renderItem={({item, index})=>{
                    return <ImageBox item={item} onPress={()=>{ navigation.navigate('DetailScreen',{ id: item['id'] }) }}/>
                }}
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchHeader: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})