import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function About({ post }) {

  {/* creating a const for read more */}
  // const [readMore, setReadMore] = useState(true)

  return (
    <View style={styles.container}>
      
      {/* Description and Caption */}
      <Text style={styles.descriptionText}>Description</Text> 
    
      {/* Post about section */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>{post?.about}</Text>

        {/* 
        {readMore && 
          <Pressable onPress={() => setReadMore(false)}>
            <Text style={styles.readMoreText}>Read More</Text>
          </Pressable>
        }
        */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'whitesmoke',
  },
  descriptionText: {
    fontFamily: 'Arial',
    fontSize: 16,
    fontWeight: 'bold',  // Bold for the "Description" label
    marginBottom: 6,    // Space below the description label
    marginLeft:7  ,
  },
  captionText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#333',  // Dark color for better contrast and readability
    marginBottom: 10, // Space below the caption
    marginLeft:7 ,
  },
  aboutContainer: {
    marginTop: 8,  // Added space between caption and about section
  },
  aboutText: {
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#656969', // Lighter text color for the description
    lineHeight: 20,   // Adjusted line height for better text spacing
    marginLeft:7  ,
  },
  readMoreText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#6fb9ed',  // Color for the "Read More" text
    marginTop: 10,     // Added space before "Read More"
  },
});
