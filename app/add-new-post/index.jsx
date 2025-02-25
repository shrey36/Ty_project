import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from './../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { collection, addDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { uploadToCloudinary } from '../../Service/cloudinaryService';
import { db } from './../../Config/FirebaseConfig';
import mime from 'mime';

export default function AddNewPost() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({});
  const [media, setMedia] = useState();
  const [loader, setLoader] = useState(false);
  const route = useRouter();
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Post'
    });
  }, []);

  const mediaPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  };

  const onSubmit = () => {
    if (Object.keys(formData).length !== 3) {
      ToastAndroid.show('Enter All Details', ToastAndroid.SHORT);
      return;
    }
    uploadMedia();
  };

  const uploadMedia = async () => {
    setLoader(true);
    console.log('Upload started...');

    // Log "Uploading..." every second
    const uploadInterval = setInterval(() => {
      console.log('Uploading...');
    }, 1000);

    try {
      const uploadResult = await uploadToCloudinary(media);
      console.log('Upload result:', uploadResult);

      const mediaType = mime.getType(media);
      if (mediaType.startsWith('image')) {
        console.log('Uploading image to Firestore...');
        await saveFormData(uploadResult.secure_url, 'posts');
        route.replace('/(tabs)/home');
      } else if (mediaType.startsWith('video')) {
        console.log('Uploading video to Firestore...');
        await saveFormData(uploadResult.secure_url, 'Reels');
        route.replace('/(tabs)/Reels');
      } else {
        console.error('Unsupported media type');
      }
    } catch (error) {
      console.error('Error uploading media:', error);
    } finally {
      clearInterval(uploadInterval); // Stop logging "Uploading..."
      console.log('Upload process completed.');
      setLoader(false);
    }
  };

  const saveFormData = async (mediaUrl, collectionName) => {
    if (!user) {
      console.error('User is not authenticated');
      return;
    }

    try {
      await addDoc(collection(db, collectionName), {
        ...formData,
        mediaUrl: mediaUrl,
        userId: user.id,
        username: user.firstName || 'Anonymous',
        email: user.primaryEmailAddress.emailAddress || 'unknown@example.com',
        userImage: user.imageUrl || '',
        createdAt: new Date()
      });
      console.log('Document successfully written to Firestore!');
    } catch (error) {
      console.error('Error writing document to Firestore:', error);
      if (error.code === 'permission-denied') {
        console.error('Permission denied. Check your Firestore rules.');
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>Add New Post</Text>

      <Pressable onPress={mediaPicker}>
        {!media ? (
          <Image
            source={require('./../../assets/images/placeholder.jpg')}
            style={{ width: 100, height: 100, borderRadius: 15, borderWidth: 1, borderColor: Colors.GRAY }}
          />
        ) : (
          <Image
            source={{ uri: media }}
            style={{ width: 100, height: 100, borderRadius: 15, borderColor: Colors.GRAY }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Caption</Text>
        <TextInput style={styles.input} onChangeText={(value) => handleInputChange('Caption', value)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => handleInputChange('Date', value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange('about', value)}
        />
      </View>

      <TouchableOpacity style={styles.button} disabled={loader} onPress={onSubmit}>
        <Text style={{ fontFamily: 'outfit', textAlign: 'center' }}>Upload</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5
  },
  input: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 7,
    fontFamily: 'outfit'
  },
  label: {
    marginVertical: 5,
    fontFamily: 'outfit'
  },
  button: {
    padding: 15,
    backgroundColor: Colors.Blue,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 50
  }
});
