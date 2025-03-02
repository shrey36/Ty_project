// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "homepage-61ce9.firebaseapp.com",
  projectId: "homepage-61ce9",
  storageBucket: "homepage-61ce9.firebasestorage.app",
  messagingSenderId: "969420022231",
  appId: "1:969420022231:web:68e1ccbe53b1258440ab92",
  measurementId: "G-WPGV0HVDK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage=getStorage(app);
//const analytics = getAnalytics(app);




// i want to create a seach funtionality for my app
// so the things i want is :
// 1) I should be able to enter a query ( a word or phrase).
// 2) It should search the database and check if the word matches any of the caption present in the collection of firestore firebase databse
// 3) if it matches it should return me with images associated to that caption along with the user name and userImage
// 4) if theres nothing then should say "No  related content aviliable"

// ill proivde you my firebaseconfig file where firebase is initialized 
// firebaseConfig.js
// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet, TextInput, ActivityIndicator, View, Text, FlatList, Image
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { db } from './../Config/FirebaseConfig'; // Adjust the import path as necessary

// export default function Search() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [data, setData] = useState([]);
//   const [fullData, setFullData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const postsCollection = collection(db, 'Post');
//       const q = query(postsCollection);
//       const querySnapshot = await getDocs(q);
//       const posts = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setData(posts);
//       setFullData(posts);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = async (query) => {
//     setSearchQuery(query);
//     const formattedQuery = query.toLowerCase();

//     if (formattedQuery) {
//       try {
//         const postsCollection = collection(db, 'Post');
//         const q = query(postsCollection, where('caption', '>=', formattedQuery), where('caption', '<=', formattedQuery + '\uf8ff'));
//         const querySnapshot = await getDocs(q);
//         const filteredData = querySnapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         setData(filteredData);
//       } catch (error) {
//         setError(error);
//       }
//     } else {
//       setData(fullData);
//     }
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.centeredView}>
//         <ActivityIndicator size="large" color="#5500dc" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centeredView}>
//         <Text>Error fetching data. Please check your internet connection.</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
//         <TextInput
//           placeholder="Search"
//           style={styles.searchBox}
//           autoCapitalize="none"
//           autoCorrect={false}
//           value={searchQuery}
//           onChangeText={handleSearch}
//           clearButtonMode="always"
//         />
//       </View>

//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             <Image source={{ uri: item.userImage }} style={styles.userImage} />
//             <View style={styles.postContent}>
//               <Text style={styles.textName}>{item.caption}</Text>
//               <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
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

// if you  have any question or want anything ask me now ill provide you everything