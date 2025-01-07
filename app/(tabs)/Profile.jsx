import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SectionList, TouchableOpacity } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

// Mock data for posts, reels, and debates
const posts = [
  { id: '1', title: 'Post 1', content: 'This is the content of post 1' },
  { id: '2', title: 'Post 2', content: 'This is the content of post 2' },
];

const reels = [
  { id: '1', title: 'Reel 1', content: 'This is the content of reel 1' },
  { id: '2', title: 'Reel 2', content: 'This is the content of reel 2' },
];

const debates = [
  { id: '1', title: 'Debate 1', content: 'This is the content of debate 1' },
  { id: '2', title: 'Debate 2', content: 'This is the content of debate 2' },
];

const sections = [
  { title: 'Posts', data: posts },
  { title: 'Reels', data: reels },
  { title: 'Debates', data: debates },
];

export default function Profile() {
  const { user } = useUser();
  const [activeSection, setActiveSection] = useState('Posts');

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemContent}>{item.content}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

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
      <SectionList
        sections={sections.filter((section) => section.title === activeSection)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
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
  addNewPost: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: -10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  details: {
    alignItems: 'center',
    marginTop: 15,
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
});
