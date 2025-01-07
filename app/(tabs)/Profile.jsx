import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SectionList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from './../../Config/FirebaseConfig'; // Ensure the path is correct

export default function Profile() {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState('Post');
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [debates, setDebates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

        setPosts(postsData);
        setReels(reelsData);
        setDebates(debatesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id) {
      fetchData();
    }
  }, [user]);

  const sections = [
    { title: 'Post', data: posts },
    { title: 'Reels', data: reels },
    { title: 'Debate', data: debates },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemContent}>{item.content}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderEmptySection = (title) => (
    <View style={styles.emptySection}>
      <Text style={styles.emptySectionText}>No {title.toLowerCase()} available</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Link href={'/add-new-post'} style={styles.addNewPost}>
        <Ionicons name="add-circle-outline" size={32} color="black" />
      </Link>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        {user?.imageUrl ? (
          <Image
            source={{ uri: user.imageUrl }}
            style={styles.image}
          />
        ) : (
          <Text>No Image</Text> // Fallback if image URL is not available
        )}
      </View>

      {/* User Details */}
      <View style={styles.details}>
        <Text style={styles.name}>{user?.fullName || 'Guest User'}</Text>
        <Text style={styles.email}>{user?.primaryEmailAddress?.emailAddress || 'No Email'}</Text>
      </View>

      {/* Section Tabs */}
      <View style={styles.tabsContainer}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.title}
            style={[styles.tab, activeSection === section.title && styles.activeTab]}
            onPress={() => setActiveSection(section.title)}
          >
            <Text style={styles.tabText}>{section.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SectionList */}
      {sections.map((section) => (
        <View key={section.title}>
          {section.title === activeSection && (
            <View>
              {section.data.length > 0 ? (
                <SectionList
                  sections={[section]}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
                  renderSectionHeader={renderSectionHeader}
                />
              ) : (
                renderEmptySection(section.title)
              )}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'whitesmoke'
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
