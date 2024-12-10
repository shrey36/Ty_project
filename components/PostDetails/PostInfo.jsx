import { View, Text,Image } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PostInfo({post}) {
  return (
    <View style={{backgroundColor: 'whitesmoke'}}>
        <Image source={{uri:post.imageUrl}}
        style={{
            width:'100%',
            height:350,
            resizeMode: 'cover'
        }}
        />
        
        <View style={{ 
            padding: 8,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
            }}>
            <View style={{ 
                flex: 1,
                 marginRight: 10 }}>
                <Text style={{
                    fontFamily:'outfit-bold',
                    fontSize:25,
                // paddingTop:10,
                // marginLeft:10    
                }}>{post?.Caption}</Text>
                
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:15,
                    //  marginLeft:10,
                    color:'#656969'
                }}>{post?.Date}</Text>
            </View>
            <Ionicons name="bookmark-outline" size={30} color="black" />
        </View>
        
    </View>
  )
}