// LikeReels.jsx
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, collection, query, where, onSnapshot, getDocs, addDoc, deleteDoc, doc, updateDoc, increment } from 'firebase/firestore';
import { app } from '../../Config/FirebaseConfig';

const db = getFirestore(app);

const LikeReels = ({ reelId, userId, initialLikeCount = 0 }) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likesCollection = collection(db, 'likes');
    const q = query(likesCollection, where('reelId', '==', reelId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLikeCount(querySnapshot.size);
      const userLiked = querySnapshot.docs.some(doc => doc.data().userId === userId);
      setIsLiked(userLiked);
    });

    return () => unsubscribe();
  }, [reelId, userId]);

  const likeReel = async () => {
    const likesCollection = collection(db, 'likes');

    // Check if the user has already liked the reel
    const q = query(likesCollection, where('reelId', '==', reelId), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // User has not liked the reel, add a like
      await addDoc(likesCollection, { reelId, userId, timestamp: new Date() });
      setLikeCount(likeCount + 1);
      setIsLiked(true);

      // Increment the like count for the reel
      const reelsCollection = collection(db, 'reels');
      const reelDocRef = doc(reelsCollection, reelId);
      await updateDoc(reelDocRef, { likeCount: increment(1) });
    } else {
      // User has liked the reel, remove the like
      await deleteDoc(querySnapshot.docs[0].ref);
      setLikeCount(likeCount - 1);
      setIsLiked(false);

      // Decrement the like count for the reel
      const reelsCollection = collection(db, 'reels');
      const reelDocRef = doc(reelsCollection, reelId);
      await updateDoc(reelDocRef, { likeCount: increment(-1) });
    }
  };

  return (
    <TouchableOpacity style={styles.likeButton} onPress={likeReel}>
      <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? 'red' : 'black'} />
      <Text style={styles.likeCount}>{likeCount}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  likeCount: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default LikeReels;
