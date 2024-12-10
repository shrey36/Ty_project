import { View, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import Post from '../../components/Home/Post';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      {/* Post List */}
      <Post />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Ensure space for the header
    backgroundColor: '#fff',
  },
});
