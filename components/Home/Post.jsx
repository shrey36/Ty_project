import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore';
import PostList from './PostList';
import { db } from '../../Config/FirebaseConfig';

export default function Post() {
  const [postList, setPost] = useState([]);

  useEffect(() => {
    GetPostList();
  }, [])

  const GetPostList = async () => {
    const q = query(collection(db, 'Post'));
    const querySnapshot = await getDocs(q);
    
    // Collecting all posts in an array
    const posts = [];
    querySnapshot.forEach(doc => {
      posts.push(doc.data());
    });

    // Setting the state once
    setPost(posts);
  }

  return (
    <View style={{ marginTop: 60}}> {/* Added marginTop to avoid overlapping with header */}
      <FlatList
        data={postList}
        renderItem={({ item, index }) => (
          <PostList post={item} />
        )}
        keyExtractor={(item, index) => index.toString()} // Unique key for FlatList
      />
    </View>
  )
}
