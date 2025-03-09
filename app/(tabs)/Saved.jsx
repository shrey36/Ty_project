import { View, Text, FlatList, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import Shared from './../../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../Config/FirebaseConfig';
import PostList from './../../components/Home/PostList';
import ReelsList from './../../components/Reels/ReelsList'; // Import the ReelsList component
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Saved() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]); // State to store favorite post IDs
  const [favItems, setFavItems] = useState([]); // State to store the list of favorite items (posts and reels)
  const [refreshing, setRefreshing] = useState(false); // State to manage the refresh control

  // useEffect hook to fetch favorite post IDs and related posts when the user is available
  useEffect(() => {
    if (user) {
      GetFavIds(); // Fetch favorite post IDs if user is logged in
    }
  }, [user]);

  // Fetch favorite post IDs from the Shared utility
  const GetFavIds = async () => {
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorite || []); // Set the favorite post IDs
    GetFavItems(result?.favorite || []); // Fetch items (posts and reels) related to the favorite IDs
  };

  // Fetch related items (posts and reels) based on favorite IDs
  const GetFavItems = async (favIds) => {
    setFavItems([]);
    if (!favIds || favIds.length === 0) return; // Guard clause for empty favorite IDs

    // Create queries to fetch posts and reels where the ID is in the list of favorite IDs
    const postQuery = query(collection(db, 'Post'), where('id', 'in', favIds));
    const reelQuery = query(collection(db, 'Reels'), where('id', 'in', favIds));

    // Fetch posts
    const postSnapshot = await getDocs(postQuery);
    let posts = [];
    postSnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data(), type: 'post' }); // Add fetched posts to the posts array
    });

    // Fetch reels
    const reelSnapshot = await getDocs(reelQuery);
    let reels = [];
    reelSnapshot.forEach((doc) => {
      reels.push({ id: doc.id, ...doc.data(), type: 'reel' }); // Add fetched reels to the reels array
    });

    // Combine posts and reels into a single array
    const favItems = [...posts, ...reels];

    // Sort items by date (descending order, latest items first)
    favItems.sort((a, b) => new Date(b.date) - new Date(a.date)); // Assuming items have a 'date' field

    setFavItems(favItems); // Set the state with the sorted items
    setRefreshing(false); // Stop the refreshing animation after data is loaded
  };

  // Handle pull-to-refresh action
  const onRefresh = () => {
    setRefreshing(true); // Set refreshing state to true
    GetFavIds(); // Fetch the favorite items again to refresh the list
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      {/* Header Section */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
        
      </View>

      {/* FlatList to display the list of favorite items (posts and reels) */}
      <FlatList
        data={favItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 15, marginBottom: 15 }}>
            {item.type === 'post' ? (
              <PostList post={item} />
            ) : (
              <ReelsList reels={item} />
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}
