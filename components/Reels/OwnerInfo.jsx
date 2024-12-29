import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

export default function OwnerInfo({ reels }) {
  // Debugging: Log the reel object to check its contents
  console.log('Reel Object in OwnerInfo:', JSON.stringify(reels, (key, value) => (typeof value === 'object' && value !== null ? JSON.stringify(value) : value), 2));

  // Check if reel is null or undefined
  if (!reels) {
    console.error('Reel object is null or undefined');
    return null;
  }

  // Debugging: Log the user object to check its contents
  console.log('User Object in OwnerInfo:', JSON.stringify(reels.user, (key, value) => (typeof value === 'object' && value !== null ? JSON.stringify(value) : value), 2));

  return (
    <View style={styles.container}>
      {/* User Image */}
      <Image
        source={{ uri: reels?.user?.imageUrl || "https://media.istockphoto.com/id/2060433249/photo/photo-of-young-girl-wearing-t-shirt-isolated-yellow-background-stock-photo.jpg?s=1024x1024&w=is&k=20&c=cFqmrswXYvxFJTBOEkvTEr6h_lrlGbss9i6clrJVt0Q=" }}
        style={styles.image}
      />

      {/* User Info */}
      <View>
        <Text style={styles.name}>
          {/* If username is not available, show "Unknown" */}
          {reels?.user?.name || 'Unknown'}
        </Text>
        <Text style={styles.role}>
          Author
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', // Full width of the screen
    paddingTop: 8, // Touch the top of the screen
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15, // Horizontal padding
    paddingVertical: 12, // Vertical padding
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 25, // Round the image
    marginRight: 12, // Space between image and text
    marginLeft: 15,
  },
  name: {
    fontFamily: 'outfit-medium',
    fontSize: 16,
    color: '#333',
  },
  role: {
    fontFamily: 'outfit',
    color: '#999',
    fontSize: 14,
  },
});
