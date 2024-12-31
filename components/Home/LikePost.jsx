// LikePost.jsx
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, collection, query, where, onSnapshot, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { app } from '../../Config/FirebaseConfig';

const db = getFirestore(app);

const LikePost = ({ postId, userId, initialLikeCount = 0 }) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    console.log('LikePost useEffect triggered for postId:', postId, 'userId:', userId);
    const likePostCollection = collection(db, 'likePost');
    const q = query(likePostCollection, where('postId', '==', postId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log('LikePost snapshot:', querySnapshot.docs);
      setLikeCount(querySnapshot.size);
      const userLiked = querySnapshot.docs.some(doc => doc.data().userId === userId);
      setIsLiked(userLiked);
    });

    return () => unsubscribe();
  }, [postId, userId]);

  const toggleLike = async () => {
    console.log('toggleLike called for postId:', postId, 'userId:', userId);
    const likePostCollection = collection(db, 'likePost');

    // Check if the user has already liked the post
    const q = query(likePostCollection, where('postId', '==', postId), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // User has not liked the post, add a like
      try {
        await addDoc(likePostCollection, { postId, userId, timestamp: new Date() });
        setLikeCount(likeCount + 1);
        setIsLiked(true);
        console.log('Like added successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to like the post. Please try again.');
        console.error('Error adding like:', error);
      }
    } else {
      // User has liked the post, remove the like
      try {
        await deleteDoc(querySnapshot.docs[0].ref);
        setLikeCount(likeCount - 1);
        setIsLiked(false);
        console.log('Like removed successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to unlike the post. Please try again.');
        console.error('Error removing like:', error);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
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

export default LikePost;
