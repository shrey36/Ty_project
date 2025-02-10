import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getFirestore, collection, query, where, onSnapshot, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo'; // Import Clerk's useUser hook
import { app } from '../../Config/FirebaseConfig';

const db = getFirestore(app);

const LikeDebate = ({ debateId, initialLikeCount = 0 }) => {
  const { user } = useUser(); // Get the logged-in user from Clerk
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const likesCollection = collection(db, 'likes');
    const q = query(likesCollection, where('debateId', '==', debateId));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setLikeCount(querySnapshot.size);
      const userLiked = querySnapshot.docs.some(doc => doc.data().userId === user.id);
      setIsLiked(userLiked);
    });

    return () => unsubscribe();
  }, [debateId, user]);

  const likeDebate = async () => {
    if (isLoading || !user) return;

    setIsLoading(true);
    try {
      const likesCollection = collection(db, 'likes');

      // Check if the user has already liked the debate
      const q = query(likesCollection, where('debateId', '==', debateId), where('userId', '==', user.id));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // User has not liked the debate, add a like
        await addDoc(likesCollection, { debateId, userId: user.id, timestamp: new Date() });
        setLikeCount(likeCount + 1);
        setIsLiked(true);
      } else {
        // User has liked the debate, remove the like
        await deleteDoc(querySnapshot.docs[0].ref);
        setLikeCount(likeCount - 1);
        setIsLiked(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update like status. Please try again.');
      console.error('Error updating like status: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity style={styles.likeButton} onPress={likeDebate} disabled={isLoading || !user}>
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

export default LikeDebate;
