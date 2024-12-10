import { View, Text } from 'react-native'
import React from 'react'

export default function About({post}) {
  return (
    <View style={{
        padding:12,
        backgroundColor: 'whitesmoke'
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:16
      }}>Description  {post?.Caption}</Text> 
      <Text>{post?.about}</Text>
    </View>
  )
}