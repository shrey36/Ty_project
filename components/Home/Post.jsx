import { View, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import PostList from './PostList';
import { db } from '../../Config/FirebaseConfig';

export default function Post() {
  const [postList, setPost] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    GetPostList();
  }, []);

  const GetPostList = async () => {
    setRefreshing(true); // Start refreshing indicator
    const q = query(collection(db, 'Post'));
    const querySnapshot = await getDocs(q);

    const posts = [];
    querySnapshot.forEach(doc => {
      posts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setPost(posts); // Update the state with fetched posts
    setRefreshing(false); // Stop refreshing indicator
  };

  return (
    //{/* Added marginTop to avoid overlapping with header */}
    <View style={{  }}> 
      <FlatList
        data={postList}
        renderItem={({ item, index }) => (
          <PostList post={item} />
        )}
        keyExtractor={(item, index) => index.toString()} // Unique key for FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={GetPostList} // Trigger refresh when pulled
            colors={['#0891b2']} // Refresh spinner color for Android
            tintColor="#0891b2" // Refresh spinner color for iOS
          />
        }
      />
    </View>   
  );
} 
 