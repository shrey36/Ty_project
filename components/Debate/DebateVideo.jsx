import { View, FlatList, RefreshControl } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from '../../Config/FirebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import DebateList from './DebateList';

export default function DebateVideo() {
  const [videoList, setVideoList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    GetVideoList();
  }, []);

  const GetVideoList = async () => {
    setRefreshing(true);
    const q = query(collection(db, 'Debate'));
    const querySnapshot = await getDocs(q);

    const videos = [];
    querySnapshot.forEach(doc => {
      videos.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setVideoList(videos);
    setRefreshing(false);
  };

  return (
    <View>
      <FlatList
        data={videoList}
        renderItem={({ item }) => (
          <DebateList debate={item} />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={GetVideoList}
            colors={['#0891b2']}
            tintColor="#0891b2"
          />
        }
      />
    </View>
  );
}
