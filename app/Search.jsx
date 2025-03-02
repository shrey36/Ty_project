// import React, { useState } from 'react';
// import {
//   StyleSheet, TextInput, ActivityIndicator, View, Text, FlatList, Image
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from './../Config/FirebaseConfig'; // Adjust the import path as necessary

// export default function SearchApp() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(null);

//   const handleSearch = async (searchTerm) => {
//     setSearchQuery(searchTerm);
//     setIsLoading(true);
//     setError(null);

//     const formattedQuery = searchTerm.toLowerCase();

//     try {
//       const postsCollection = collection(db, 'Post');
//       const q = query(
//         postsCollection,
//         where('Caption', '>=', formattedQuery),
//         where('Caption', '<=', formattedQuery + '\uf8ff')
//       );

//       const querySnapshot = await getDocs(q);
//       const results = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
      
//       setSearchResults(results);
//     } catch (error) {
//       console.error("Firebase Error: ", error);
//       setError("Error fetching data. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
//         <TextInput
//           placeholder="Enter search query"
//           style={styles.searchBox}
//           autoCapitalize="none"
//           autoCorrect={false}
//           value={searchQuery}
//           onChangeText={handleSearch}
//           clearButtonMode="always"
//         />
//       </View>

//       {isLoading && (
//         <View style={styles.centeredView}>
//           <ActivityIndicator size="large" color="#5500dc" />
//         </View>
//       )}

//       {error && (
//         <View style={styles.centeredView}>
//           <Text>{error}</Text>
//         </View>
//       )}

//       {!isLoading && searchResults.length === 0 && (
//         <View style={styles.centeredView}>
//           <Text>No related content available</Text>
//         </View>
//       )}

//       <FlatList
//         data={searchResults}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <Image source={{ uri: item.userImage }} style={styles.userImage} />
//             <View style={styles.postContent}>
//               <Text style={styles.textName}>{item.Caption}</Text>
//               {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.postImage} />}
//             </View>
//           </View>
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginHorizontal: 20,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#f0f0f0",
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   searchIcon: {
//     marginRight: 8,
//   },
//   searchBox: {
//     flex: 1,
//     paddingVertical: 12,
//     fontSize: 16,
//   },
//   itemContainer: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   userImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   postContent: {
//     flex: 1,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     marginTop: 5,
//   },
//   textName: {
//     fontSize: 17,
//     fontWeight: "600",
//   },
// });


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
  const [allPosts, setAllPosts] = useState([]); // Store all posts initially

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

        setAllPosts(posts); // Store all posts
        setSearchResults(posts); // Initially show all posts
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
      setSearchResults(allPosts); // Show all posts if search is empty
    } else {
      const filteredResults = allPosts.filter(post =>
        post.Caption.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(filteredResults);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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

      {isLoading && (
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color="#5500dc" />
        </View>
      )}

      {error && (
        <View style={styles.centeredView}>
          <Text>{error}</Text>
        </View>
      )}

      {!isLoading && searchResults.length === 0 && (
        <View style={styles.centeredView}>
          <Text>No related content available</Text>
        </View>
      )}

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.userImage }} style={styles.userImage} />
            <View style={styles.postContent}>
              <Text style={styles.textName}>{item.Caption}</Text>
              {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.postImage} />}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginTop: 5,
  },
  textName: {
    fontSize: 17,
    fontWeight: "600",
  },
});
