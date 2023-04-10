import React from "react";
import {
    View, Text, StyleSheet, Image, TouchableOpacity, Linking, Dimensions
} from 'react-native';
import { getPhotoByIdAPI } from "../api";

const { width, height } = Dimensions.get('window')

export interface IPhoto {
    id: string,
    color: string,
    alt_description: string,
    urls: {
        full: string,
    },
    likes: number,
    user: {
        id: string,
        username: string,
        name: string,
        portfolio_url: string,
        profile_image: {
            medium: string
        },
        total_photos: number
    }
}

export default function Detail (props: any){
    const [ item, setItem ] = React.useState<IPhoto>()

    React.useEffect(()=>{
        getPhotoByIdAPI(props.route.params["id"]).then(response=>{
            setItem(response.data)
        })
    },[])

    return <View style={styles.container}>
        <Image source={{ uri: item?.urls.full }} style={styles.imgStyle} />
        
        <View style={styles.rowItem}>
            <Image source={{ uri: item?.user.profile_image.medium }} style={styles.profileImg}/>
            <View style={styles.rowBtn}>
                <TouchableOpacity onPress={()=>{ Linking.openURL(item["user"]["portfolio_url"]) }}>
                    <Text style={styles.userNameStyle}>
                        @{item?.user.username}
                    </Text>
                    <Text>Total photos: {item?.user.total_photos}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookmarkBtn}>
                    <Text>Сохранить</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.content}>
            <Text style={styles.descStyle}>{item?.alt_description}</Text>
        </View>
        
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgStyle: {
        width: '100%',
        height: height/2
    },
    rowItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
        paddingHorizontal: 16
    },
    profileImg: {
        width: 36,
        height: 36,
        marginRight: 12,
        borderRadius: 36
    },
    content: {
        paddingHorizontal: 16
    },
    descStyle: {
        fontSize: 16,
        fontWeight: '600'
    },
    userNameStyle: {
        color: 'blue'
    },
    bookmarkBtn: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 24,
        backgroundColor: '#c0c0c0'
    },
    rowBtn: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexGrow: 1 
    }
})