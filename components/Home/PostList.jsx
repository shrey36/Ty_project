// PostList.jsx
import { View, Text, Image, StyleSheet, TouchableOpacity, Share, Alert, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import OwnerInfo from '../PostDetails/OwnerInfo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { reportPost } from '../../Shared/reportPost';
import ReportModal from '../../Shared/ReportModel';
import Comment from './Comment';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../../Config/FirebaseConfig';
import LikePost from './LikePost'; // Import the LikePost component

const db = getFirestore(app);

export default function PostList({ post, userName }) {
  const router = useRouter();
  const navigation = useNavigation();
  const [isReportModalVisible, setReportModalVisible] = useState(false); // Report part
  const [isCommentModalVisible, setCommentModalVisible] = useState(false); // Comment Part
  const [commentCount, setCommentCount] = useState(0); // Comment Count
  const userId = 'currentUserId'; // Replace with the actual user ID

  const openCommentModal = () => {
    setCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setCommentModalVisible(false);
  };

  const extractedUserName = post?.user?.name || userName || 'Unknown';
  const extractedUserId = post?.user?.id || userId || 'Unknown';

  const onShare = async () => {
    try {
      const deepLinkUrl = `inflow://home/post/${post.id}`; // Use your deep link scheme
      const message = `Check out this post: ${post.Caption}\n${deepLinkUrl}`;

      const result = await Share.share({
        message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Report calling
  const onReport = async (reason) => {
    const ownerInfo = {
      name: post.user.name, // Assuming post.user.name contains the owner's name
      email: post.user.email, // Assuming post.user.email contains the owner's email
    };
    await reportPost(post.id, 'userId', reason, ownerInfo);
    Alert.alert('Post Reported', 'Your report has been submitted successfully.');
  };

  useEffect(() => {
    if (!post?.id) return;

    const commentsCollection = collection(db, 'comments');
    const q = query(commentsCollection, where('postId', '==', post.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCommentCount(querySnapshot.size);
    });

    return () => unsubscribe();
  }, [post?.id]);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/post-details',
          params: post,
        })
      }
      style={styles.postContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.ownerInfoContainer}
        >
          <OwnerInfo post={post} />
        </TouchableOpacity>

        {/* Report */}
        <TouchableOpacity
          onPress={() => setReportModalVisible(true)}
          style={styles.reportButton}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image source={{ uri: post?.imageUrl }} style={styles.postImage} />

      {/* Like and Comments */}
      <View style={styles.likeCommentContainer}>
        <LikePost postId={post.id} userId={userId} initialLikeCount={post.likeCount || 0} />
        <TouchableOpacity
          style={styles.comments}
          onPress={openCommentModal}
        >
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text style={styles.commentCount}>{commentCount}</Text>
        </TouchableOpacity>
      </View>

      {/* Share */}
      <View style={styles.shareContainer}>
        <TouchableOpacity
          onPress={onShare}
          style={styles.shareButton}
        >
          <Ionicons name="share-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      {/* Caption (Title) */}
      <Text style={styles.caption}>{post?.Caption}</Text>

      {/* Date and Time */}
      <Text style={styles.date}>{post?.Date}</Text>

      {/* Comment Modal */}
      <Modal
        visible={isCommentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCommentModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Comments</Text>
            <Comment postId={post?.id} onClose={closeCommentModal} userName={extractedUserName} userId={extractedUserId} />
          </View>
        </View>
      </Modal>

      {/* Report Modal */}
      <ReportModal
        isVisible={isReportModalVisible}
        onClose={() => setReportModalVisible(false)}
        onReport={onReport}
      />
    </TouchableOpacity>
  );
}

// Sorting the posts by timestamp when displaying them (usually in the parent component)
export const sortPostsByTimestamp = (posts) => {
  return posts.sort((a, b) => b?.timestamp?.seconds - a?.timestamp?.seconds); // b to show latest first
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff', // White background for posts
    borderBottomWidth: 1, // Border line separating each post (similar to Reddit)
    borderColor: '#ddd', // Light gray border color
    paddingVertical: 10, // Padding for vertical spacing
    paddingHorizontal: 16, // Horizontal padding for left and right
    marginBottom: 15, // Space between posts
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ownerInfoContainer: {
    flex: 1,
    marginLeft: -29
  },
  reportButton: {
    marginRight: -5,
  },
  postImage: {
    width: '100%', // Image will take up full width
    height: 250, // Image height
    resizeMode: 'cover', // Ensure proper aspect ratio while covering the area
    borderRadius: 5, // Rounded corners for the image
  },
  likeCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: -24,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Add margin to separate from the like icon
  },
  commentCount: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  caption: {
    fontSize: 16, // Standard font size for captions
    fontFamily: 'outfit-bold', // Bold font for emphasis
    marginTop: 10, // Space between the image and caption
    color: '#333', // Dark color for readability
  },
  date: {
    fontSize: 12, // Smaller font size for the date
    fontFamily: 'outfit-medium', // Medium weight for date
    color: '#777', // Light gray color for the date
    marginTop: 5, // Space between the username and date
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
