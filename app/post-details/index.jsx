import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import PostInfo from '../../components/PostDetails/PostInfo';
import About from '../../components/PostDetails/About';

export default function PostDetails() {
 
  { /* Fetching details from the Post list for more details */}
  const  post=  useLocalSearchParams();

  {/*  Making header transparent*/}
  const navigation=useNavigation();

  useEffect(()=>{
      navigation.setOptions({
          headerTransparent:true,
          headerTitle:''
      })
  },[])

  return (
    <View>
         
         {/* Post Info*/}
         <PostInfo post={post} />
  
        {/* Post Properties*/}

        {/* about*/}
        <About post={post}/>

        {/* Owner details */}



    </View>
  )
}