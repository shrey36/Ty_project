import { View, Text, Image } from 'react-native';
import React from 'react';

export default function OwnerInfo({ post }) {
  
   // Debugging: Log the post object to check its contents
  console.log('Post Object in OwnerInfo:', JSON.stringify(post, (key, value) => (typeof value === 'object' && value !== null ? JSON.stringify(value) : value), 2));

    // Check if post is null or undefined
    if (!post) {
      console.error('Post object is null or undefined');
      return null;
    }

   // Debugging: Log the user object to check its contents
  console.log('User Object in OwnerInfo:', JSON.stringify(post.user, (key, value) => (typeof value === 'object' && value !== null ? JSON.stringify(value) : value), 2));

  return (
    <View
      style={{
        width: '100%', // Full width of the screen
        paddingTop: 8, // Touch the top of the screen
        flexDirection: 'row',
        alignItems: 'center',
       // backgroundColor: 'white',
       // borderBottomWidth: 1, // Border between sections
       // borderBottomColor: '#ddd', // Subtle border color
        paddingHorizontal: 15, // Horizontal padding
        paddingVertical: 12, // Vertical padding
       // elevation: 2, // Shadow for iOS
      //  shadowColor: '#000', // Shadow for Android
      //  shadowOffset: { width: 0, height: 2 },
      //  shadowOpacity: 0.1,
       // shadowRadius: 3,
      }}
    >
      {/* User Image */}
      <Image
        source={{ uri:post?.user?.imageUrl || "https://media.istockphoto.com/id/2060433249/photo/photo-of-young-girl-wearing-t-shirt-isolated-yellow-background-stock-photo.jpg?s=1024x1024&w=is&k=20&c=cFqmrswXYvxFJTBOEkvTEr6h_lrlGbss9i6clrJVt0Q="}}
        style={{
          width: 40,
          height: 40,
          borderRadius: 25, // Round the image
          marginRight: 12, // Space between image and text
          marginLeft:15
        }}
      />

      {/* User Info */}
      <View>
        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 16,
            color: '#333',
          }} 
        >
          {/* If username is not available, show "Unknown" */}
          {post?.user?.name || 'Unknown'}
        </Text>

        <Text
          style={{
            fontFamily: 'outfit',
            color: '#999',
            fontSize: 14,
          }}
        >
          Author
        </Text>
      </View>
    </View>
  );
}
