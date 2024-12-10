import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function PostList({ post }) {
  return (
    <View style={styles.postContainer}>
      {/* Post Image */}
      <Image
        source={{ uri: post?.imageUrl }}
        style={styles.postImage}
      />
      
      {/* Caption (Title) */}
      <Text style={styles.caption}>{post?.Caption}</Text>
      
      {/* Date and Time */}
      <Text style={styles.date}>{post?.Date}</Text>
      
      {/* User Name (Optional) */}
      <Text style={styles.userName}>{post?.userName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20, // Add some space between posts
    backgroundColor: '#fff', // White background for posts
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // To keep the image and elements inside the post container
    shadowColor: '#000', // Shadow for a subtle elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // For Android shadow effect
    marginHorizontal: 16, // To give space on the sides
  },
  postImage: {
    width: '100%', // Image will take up full width
    height: 200, // Fixed height for the image
    resizeMode: 'cover', // Cover the area properly
  },
  caption: {
    fontSize: 16,
    fontFamily: 'outfit-bold', // Use the provided font
    marginTop: 10,
    marginHorizontal: 12,
  },
  date: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#555', // Lighter color for date
    marginTop: 5,
    marginLeft: 12,
  },
  userName: {
    fontFamily: 'outfit-medium',
    fontSize: 14,
    color: '#007BFF', // Blue color for the user name
    marginTop: 5,
    marginLeft: 12,
  },
});
