import { View, Text, Image } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import OwnerInfo from './OwnerInfo';
import MarkFav from '../MarkFav';

export default function PostInfo({ post }) {
  return (
                  
    <View style={{ backgroundColor: 'whitesmoke', paddingHorizontal: 16 }}>  {/* Added padding for left-right space */}
      <OwnerInfo post={post} />

      <Image
        source={{ uri: post.imageUrl }}
        style={{
          width: '100%',
          height: 250,  // Reduced the height of the image
          resizeMode: 'cover',
         //  borderRadius: 10,  // Optional: rounded corners for the image
          marginTop: 10,     // Added some space above the image
        }}
      />

      <View
        style={{
          padding: 10,    // Uniform padding for the content section
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 12,   // Space between image and text
        }}
      >
        <View style={{ flex: 1, marginRight: 10 }}>
          <Text
            style={{
              fontFamily: 'outfit-bold',
              fontSize: 25,
              color: '#333',   // Ensured text is darker for better readability
            }}
          >{post?.Caption}</Text>

          <Text
            style={{
              fontFamily: 'outfit',
              fontSize: 15,
              color: '#656969',
            }}
          > {post?.Date}
          </Text>
          
        </View>

        <MarkFav post={post}/>

      </View>
    </View>
  );
}
