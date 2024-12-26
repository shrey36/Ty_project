import { View, StyleSheet, Text, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Post from '../../components/Home/Post';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header 
      <Header />  */}

      {/* Post List */}
      <View style={styles.postContainer}>
        <Post />
      </View>

      {/* Adding new post */}
      <Link href={'/add-new-post'} 
      style={styles.addNewPost}>
        <Text style={styles.addNewPostText}>Add new post</Text>
      </Link>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container take up the full screen
    backgroundColor: '#fff',
  },
  postContainer: {
    flex: 1, // Allow the post list to grow and take up available space
  },
  addNewPost: {
    display:'flex',
    padding: 16,
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    backgroundColor:'yellow',
    borderWidth:1,
    borderRadius:20
   

  },
  addNewPostText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
