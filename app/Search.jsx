import React, { useState, useEffect } from 'react';
import {
  StyleSheet, TextInput, ActivityIndicator, View, Text, FlatList, Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../Config/FirebaseConfig'; // Adjust the import path if necessary

export default function Search() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [allPosts, setAllPosts] = useState([]);

  // Fetch all posts when the component loads
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, 'Post');
        const querySnapshot = await getDocs(postsCollection);
        const posts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setAllPosts(posts);
        setSearchResults(posts);
      } catch (error) {
        console.error("Firebase Error: ", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Function to filter posts based on user input
  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);

    if (searchTerm.trim() === "") {
      setSearchResults(allPosts);
    } else {
      const filteredResults = allPosts.filter(post =>
        post.Caption.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filteredResults);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Enter search query"
          style={styles.searchBox}
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="always"
        />
      </View>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      )}

      {/* Error Handling */}
      {error && (
        <View style={styles.centeredView}>
          <Text>{error}</Text>
        </View>
      )}

      {/* No Results */}
      {!isLoading && searchResults.length === 0 && (
        <View style={styles.centeredView}>
          <Text>No related content available</Text>
        </View>
      )}

      {/* Search Results List */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            {/* Username at the top of the image */}
            <View style={styles.userInfo}>
              <Image source={{ uri: item.userImage }} style={styles.userImage} />
              <Text style={styles.username}>{item.username || "Unknown User"}</Text>
            </View>

            {/* Post Image */}
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.postImage} />}

            {/* Caption below the image */}
            <Text style={styles.caption}>{item.Caption}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBox: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  postContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  postImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  caption: {
    fontSize: 15,
    color: "#555",
    marginTop: 5,
  },
});



// ============== CODE WITH UI=============================
// import React, { useState, useEffect, useRef } from 'react';
// import {
//   StyleSheet, TextInput, ActivityIndicator, View, Text, FlatList, Image, TouchableOpacity, Animated
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from './../Config/FirebaseConfig'; // Adjust as necessary

// export default function Search() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(null);
//   const [allPosts, setAllPosts] = useState([]);

//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   // Fetch all posts when the component loads
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const postsCollection = collection(db, 'Post');
//         const querySnapshot = await getDocs(postsCollection);
//         const posts = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));

//         setAllPosts(posts);
//         setSearchResults(posts);
//       } catch (error) {
//         console.error("Firebase Error: ", error);
//         setError("Error fetching data. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Function to filter posts based on user input
//   const handleSearch = (searchTerm) => {
//     setSearchQuery(searchTerm);

//     if (searchTerm.trim() === "") {
//       setSearchResults(allPosts);
//     } else {
//       const filteredResults = allPosts.filter(post =>
//         post.Caption.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//       setSearchResults(filteredResults);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Search Bar Section */}
//       <Animated.View style={[styles.searchContainer, { opacity: fadeAnim }]}>
//         <TextInput
//           placeholder="Search..."
//           style={styles.searchBox}
//           autoCapitalize="none"
//           autoCorrect={false}
//           value={searchQuery}
//           onChangeText={handleSearch}
//           clearButtonMode="always"
//           placeholderTextColor="#888"
//         />
//         <Ionicons name="search" size={22} color="#888" style={styles.searchIcon} />
//       </Animated.View>

//       {/* Loading Indicator Section */}
//       {isLoading && (
//         <View style={styles.centeredView}>
//           <ActivityIndicator size="large" color="#555" />
//         </View>
//       )}

//       {/* Error Handling Section */}
//       {error && (
//         <View style={styles.centeredView}>
//           <Text style={styles.errorText}>{error}</Text>
//         </View>
//       )}

//       {/* No Results Section */}
//       {!isLoading && searchResults.length === 0 && (
//         <View style={styles.centeredView}>
//           <Text style={styles.noResultsText}>No results found</Text>
//         </View>
//       )}

//       {/* Search Results Section (Card-Based List) */}
//       <FlatList
//         data={searchResults}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.card} activeOpacity={0.8}>
//             <View style={styles.cardHeader}>
//               <Image source={{ uri: item.userImage }} style={styles.userImage} />
//               <Text style={styles.username}>{item.Caption}</Text>
//             </View>
//             {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.postImage} />}
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     paddingHorizontal: 16,
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     marginVertical: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   searchIcon: {
//     marginLeft: 10, // Position the search icon to the right
//   },
//   searchBox: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     marginBottom: 15,
//     padding: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 12,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: '#333',
//   },
//   postImage: {
//     width: '100%',
//     height: 250,
//     borderRadius: 10,
//     marginTop: 8,
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   noResultsText: {
//     color: '#888',
//     fontSize: 16,
//   },
// });
