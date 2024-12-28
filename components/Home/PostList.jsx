import { View, Text, Image, StyleSheet, TouchableOpacity, Share, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import OwnerInfo from '../PostDetails/OwnerInfo';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Linking from 'expo-linking';
import { reportPost } from '../../Shared/reportPost';
import ReportModal from '../../Shared/ReportModel';
import { useState } from 'react';

export default function PostList({ post }) {
  const router = useRouter();
  const navigation = useNavigation();
  const [isReportModalVisible, setReportModalVisible] = useState(false); // Report part

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
    await reportPost(post.id, 'userId', reason ,ownerInfo);
    Alert.alert('Post Reported', 'Your report has been submitted successfully.');
  };

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
          //onPress={onReport}
          onPress={() => setReportModalVisible(true)}
          style={styles.reportButton}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image source={{ uri: post?.imageUrl }} style={styles.postImage} />

      {/* Share */}
      <TouchableOpacity
        onPress={onShare}
        style={styles.shareButton}
      >
        <Ionicons name="share-outline" size={26} color="black" />
      </TouchableOpacity>

      {/* Caption (Title) */}
      <Text style={styles.caption}>{post?.Caption}</Text>

      {/* Date and Time */}
      <Text style={styles.date}>{post?.Date}</Text>


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
    marginLeft:-29
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
  shareButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
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
});
