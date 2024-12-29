import { View, Text, StyleSheet, TouchableOpacity, Share, Alert, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import OwnerInfo from './OwnerInfo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { reportPost } from '../../Shared/reportPost';
import ReportModal from '../../Shared/ReportModel';
import Comment from './Comment';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import { app } from '../../Config/FirebaseConfig';
import { Video } from 'expo-av';
import MarkFav from './MarkFav';

const db = getFirestore(app);

export default function ReelsList({ reels }) {
  const navigation = useNavigation();
  const [isReportModalVisible, setReportModalVisible] = useState(false);
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const openCommentModal = () => {
    setCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setCommentModalVisible(false);
  };

  const extractedUserName = reels?.user?.name || 'Unknown';
  const extractedUserId = reels?.user?.id || 'Unknown';

  const onShare = async () => {
    try {
      const deepLinkUrl = `inflow://home/Reels/${reels.id}`;
      const message = `Check out this video: ${reels.Caption}\n${deepLinkUrl}`;

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

  const onReport = async (reason) => {
    const ownerInfo = {
      name: reels.user.name,
      email: reels.user.email,
    };
    await reportPost(reels.id, 'userId', reason, ownerInfo);
    Alert.alert('Video Reported', 'Your report has been submitted successfully.');
  };

  useEffect(() => {
    if (!reels?.id) return;

    const commentsCollection = collection(db, 'comments');
    const q = query(commentsCollection, where('reelId', '==', reels.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCommentCount(querySnapshot.size);
    });

    return () => unsubscribe();
  }, [reels?.id]);

  return (
    <View style={styles.videoContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.ownerInfoContainer}
        >
          <OwnerInfo reels={reels} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setReportModalVisible(true)}
          style={styles.reportButton}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Video
        source={{ uri: reels?.videoUrl }}
        style={styles.video}
        resizeMode="cover"
        useNativeControls
        isLooping
        onError={(error) => console.error('Video error:', error)} // Add error handling
      />

      <View style={styles.commentsContainer}>
        <TouchableOpacity
          style={styles.comments}
          onPress={openCommentModal}
        >
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text style={styles.commentCount}>{commentCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.shareButton}
          onPress={onShare}
        >
          <Ionicons name="share-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.shareContainer}>
        <MarkFav reels={reels}  />
      </View>

      <Text style={styles.caption}>{reels?.Caption}</Text>
      <Text style={styles.date}>{reels?.Date}</Text>

      <Modal
        visible={isCommentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCommentModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Comments</Text>
            <Comment reelId={reels?.id} onClose={closeCommentModal} userName={extractedUserName} userId={extractedUserId} />
          </View>
        </View>
      </Modal>

      <ReportModal
        isVisible={isReportModalVisible}
        onClose={() => setReportModalVisible(false)}
        onReport={onReport}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 15,
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
  video: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  commentsContainer: {
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
    marginLeft: 10, // Add margin to separate from the comment icon
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  caption: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
    marginTop: 10,
    color: '#333',
  },
  date: {
    fontSize: 12,
    fontFamily: 'outfit-medium',
    color: '#777',
    marginTop: 5,
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
