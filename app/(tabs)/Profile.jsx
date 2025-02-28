import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from './../../Config/FirebaseConfig';

const Item = React.memo(({ item }) => (
  <View style={styles.itemContainer}>
    {item.imageUrl ? (
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.postImage}
        onError={() => console.log('Failed to load post image')}
      />
    ) : (
      <View style={styles.emptyImage} />
    )}
    <Text style={styles.itemTitle}>{item.Caption || 'No Title'}</Text>
    <Text style={styles.itemContent}>{item.about || 'No Description'}</Text>
  </View>
));

export default function Profile() {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState('Post');
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followerCount, setFollowerCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const postsQuery = query(collection(db, 'Post'), where('userId', '==', user.id));
      const reelsQuery = query(collection(db, 'Reels'), where('userId', '==', user.id));
      const debatesQuery = query(collection(db, 'Debate'), where('userId', '==', user.id));

      const [postsSnapshot, reelsSnapshot, debatesSnapshot] = await Promise.all([
        getDocs(postsQuery),
        getDocs(reelsQuery),
        getDocs(debatesQuery)
      ]);

      const postsData = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const reelsData = reelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const debatesData = debatesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      console.log('Fetched Posts Data:', postsData);
      console.log('Fetched Reels Data:', reelsData); // Log the fetched reels data
      console.log('Fetched Debates Data:', debatesData);

      setPosts(postsData);
      setReels(reelsData);
      setDebates(debatesData);

      const followerDocRef = doc(db, 'FollowerCollection', user.id);
      const followerDocSnap = await getDoc(followerDocRef);

      if (followerDocSnap.exists()) {
        setFollowerCount(followerDocSnap.data().FollowerCount);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.id) {
      fetchData();
    }
  }, [user, fetchData]);

  const sections = {
    Post: posts,
    Reels: reels,
    Debate: debates,
  };

  const renderItem = useCallback(({ item }) => <Item item={item} />, []);

  const renderEmptySection = () => (
    <View style={styles.emptySection}>
      <Text style={styles.emptySectionText}>No {activeSection.toLowerCase()} available</Text>
    </View>
  );

  const renderHeader = () => (
    <>
      <Link href={'/add-new-post'} style={styles.addNewPost}>
        <Ionicons name="add-circle-outline" size={32} color="black" />
      </Link>

      <View style={styles.imageContainer}>
        {user?.imageUrl ? (
          <Image
            source={{ uri: user.imageUrl }}
            style={styles.image}
          />
        ) : (
          <Text>No Image</Text>
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>{user?.fullName || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress || 'No Email'}</Text>
        <View style={styles.followerContainer}>
          <Text style={styles.followerCount}>{followerCount}</Text>
          <Text style={styles.followerLabel}>Followers</Text>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        {Object.keys(sections).map((section) => (
          <TouchableOpacity
            key={section}
            style={[styles.tab, activeSection === section && styles.activeTab]}
            onPress={() => setActiveSection(section)}
          >
            <Text style={styles.tabText}>{section}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionHeader}>{activeSection}</Text>
    </>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={sections[activeSection]}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptySection}
      contentContainerStyle={styles.scrollContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke'
  },
  scrollContainer: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewPost: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 25,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  details: {
    alignItems: 'center',
    marginTop: -15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
  followerContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  followerCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  followerLabel: {
    fontSize: 14,
    color: 'gray',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  emptyImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContent: {
    fontSize: 14,
    color: 'gray',
  },
  emptySection: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptySectionText: {
    fontSize: 16,
    color: 'gray',
  },
});
