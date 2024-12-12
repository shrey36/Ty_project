
import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'

export default function About({post}) {

  {/* creating a const for read more */}
 // const [readMore,setReadMore]=useState(true)

  return (
    <View style={{
        padding:12,
        backgroundColor: 'whitesmoke'
    }}>
      
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:16
      }}>Description  {post?.Caption}</Text> 

     {/*  For read more  setting nos of line
      <ScrollView>
         <Text numberOfLines={readMore?3:undefined}>{post?.about}</Text>
      </ScrollView>
      */}
       <Text>{post?.about}</Text>

      {/* 
      {readMore&&
        <Pressable onPress={()=>setReadMore(false)}>
          <Text style={{
              fontFamily:'outifit-medium', 
              fontSize:16,
              color:'#6fb9ed'
          }}
          >Read More</Text>
        </Pressable>
      }
        */}
    </View>
  )
}
